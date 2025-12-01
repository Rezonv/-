
import { CombatUnit, CombatStatus, SkillConfig, MechanicTag } from '../types';
import { getCharData, getRealtimeUnitStats } from '../data/combatData';
import { CHARACTER_SKILL_DB } from '../data/skill_db';

export interface EngineApi {
    getUnits: () => CombatUnit[];
    getUnit: (uid: string) => CombatUnit | undefined;
    updateUnit: (uid: string, updates: Partial<CombatUnit>) => void;
    dealDamage: (attacker: CombatUnit, target: CombatUnit, multiplier: number, element?: string, ignoreWeakness?: boolean) => void;
    heal: (sourceUid: string, targetUid: string, amount: number) => void;
    addBuff: (targetUid: string, buff: CombatStatus) => void;
    modifySp: (amount: number) => void;
    spawnText: (uid: string, text: string, type: 'damage' | 'crit' | 'heal' | 'break' | 'buff' | 'resist') => void;
    addLog: (text: string, type?: 'info'|'damage'|'heal'|'buff'|'voice'|'critical'|'break') => void;
    addUnit: (unit: CombatUnit) => void; 
}

// --- Helper Functions ---
const getEnemies = (actor: CombatUnit, api: EngineApi) => api.getUnits().filter(u => u.isEnemy !== actor.isEnemy && !u.isDead);
const getAllies = (actor: CombatUnit, api: EngineApi) => api.getUnits().filter(u => u.isEnemy === actor.isEnemy && !u.isDead);

const applyDoT = (api: EngineApi, attacker: CombatUnit, target: CombatUnit, type: string, ratio: number, turn: number) => {
    const dmg = Math.floor(attacker.stats.atk * ratio);
    const nameMap: Record<string, string> = { 'Shock': '觸電', 'Burn': '灼燒', 'Wind Shear': '風化', 'Bleed': '裂傷', 'Ice': '冰霧' };
    const iconMap: Record<string, string> = { 'Shock': '⚡', 'Burn': '🔥', 'Wind Shear': '🍃', 'Bleed': '🩸', 'Ice': '❄️' };
    
    api.addBuff(target.uid, { 
        id: `${type}_dot_${Date.now()}`, 
        sourceCharId: attacker.charId, // Pass source explicitly
        name: nameMap[type] || type, 
        type: 'DEBUFF', 
        isDoT: true, 
        dotDamage: dmg, 
        value: 0, 
        duration: turn, 
        icon: iconMap[type] || '☠️', 
        description: '持續傷害' 
    });
};

const detonateDoTs = (api: EngineApi, target: CombatUnit, ratio: number) => {
    const dots = target.statuses.filter(s => s.isDoT);
    let totalDmg = 0;
    dots.forEach(d => totalDmg += (d.dotDamage || 0) * ratio);
    if(totalDmg > 0) {
        const freshTarget = api.getUnit(target.uid);
        if (freshTarget && !freshTarget.isDead) {
            const newHp = Math.max(0, freshTarget.currentHp - Math.floor(totalDmg));
            api.updateUnit(target.uid, { currentHp: newHp, isDead: newHp <= 0 });
            api.spawnText(target.uid, Math.floor(totalDmg).toString(), 'damage');
            api.addLog(`${target.name} 受到持續傷害引爆: ${Math.floor(totalDmg)}`, 'damage');
        }
    }
};

const advanceAction = (api: EngineApi, unit: CombatUnit, value: number) => {
    const newAv = Math.max(0, unit.av * (1 - value));
    api.updateUnit(unit.uid, { av: newAv });
    api.spawnText(unit.uid, "行動提前", 'buff');
};

/**
 * Executes a multi-hit attack sequence.
 */
const executeMultiHit = (
    api: EngineApi,
    attackerUid: string, 
    targetUids: string[], 
    totalMultiplier: number, 
    element: string,
    hits: number[],
    interval: number = 150,
    ignoreWeakness: boolean = false
) => {
    let hitIndex = 0;

    const runHit = () => {
        if (hitIndex >= hits.length) return;

        const percent = hits[hitIndex];
        const attacker = api.getUnit(attackerUid);
        
        if (attacker) {
            targetUids.forEach(tid => {
                const target = api.getUnit(tid);
                if (target && !target.isDead) {
                    api.dealDamage(attacker, target, totalMultiplier * percent, element, ignoreWeakness);
                }
            });
        }

        hitIndex++;
        if (hitIndex < hits.length) {
            setTimeout(runHit, interval);
        }
    };

    runHit();
};

/**
 * Retrieves skill configuration.
 * Prioritizes the new Data-Driven DB, falls back to legacy mapping.
 */
const getSkillConfig = (attacker: CombatUnit, isUlt: boolean): SkillConfig => {
    // 1. Try DB
    const dbEntry = CHARACTER_SKILL_DB[attacker.charId];
    if (dbEntry) {
        return isUlt ? dbEntry.ult : dbEntry.skill;
    }

    // 2. Legacy Fallback (for generic enemies/custom chars without DB entry)
    const cData = getCharData(attacker.charId, attacker.name);
    const tags: MechanicTag[] = [];
    const type = isUlt ? cData.ultType : cData.skillType;
    
    if (type === 'DAMAGE') tags.push('Damage');
    if (type === 'HEAL_SINGLE' || type === 'HEAL_ALL' || type === 'HEAL_MULTI') tags.push('Heal');
    if (type === 'SHIELD') tags.push('Shield');
    if (type === 'BUFF_ATK') tags.push('Buff_Atk');
    if (type === 'DEBUFF_DEF') tags.push('Debuff_Def');
    if (type === 'SUMMON') tags.push('Summon');

    return {
        name: isUlt ? cData.ultName : cData.skillName,
        type: isUlt ? 'Ult' : 'Skill',
        element: cData.element,
        spCost: isUlt ? 0 : 1,
        ratio: (isUlt ? cData.ultValue : cData.skillValue) || (isUlt ? 2.5 : 1.5),
        tags: tags,
        healRatio: 1.0, 
        buffValue: 0.3,
        hitSplit: isUlt ? [0.3, 0.3, 0.4] : [1.0] // Default fallback: Ult multihit, others single
    };
};

/**
 * THE CORE ENGINE: Data-Driven Skill Executor
 */
export const executeSkill = (attacker: CombatUnit, target: CombatUnit | null, api: EngineApi, isUlt: boolean, overrideConfig?: SkillConfig) => {
    // 1. Fetch Configuration
    const skillData = overrideConfig || getSkillConfig(attacker, isUlt);
    const tags = skillData.tags;

    // 2. Determine Targets (STRICT IFF LOGIC)
    const isBeneficial = tags.includes('Heal') || tags.includes('Shield') || tags.includes('Buff_Atk') || tags.includes('Energy_Charge') || tags.includes('Buff_Dmg');
    const isHarmful = tags.includes('Damage') || tags.includes('Debuff_Def') || tags.includes('DoT_Shock') || tags.includes('DoT_Burn') || tags.includes('DoT_Wind') || tags.includes('DoT_Bleed') || tags.includes('Debuff_Freeze');

    let primaryTargets: CombatUnit[] = [];
    
    // Auto-Targeting Fix:
    // If target is provided but doesn't match intent (e.g. clicking enemy for a Heal), override it.
    let validTarget = target;
    if (validTarget) {
        if (isBeneficial && validTarget.isEnemy !== attacker.isEnemy) validTarget = null; // Don't heal enemy
        if (isHarmful && validTarget.isEnemy === attacker.isEnemy) validTarget = null; // Don't hurt ally
    }

    // Default Selection if no valid target
    if (!validTarget) {
        if (isBeneficial) {
            const allies = getAllies(attacker, api);
            // Default to lowest HP % or self
            validTarget = allies.sort((a,b) => (a.currentHp/a.maxHp) - (b.currentHp/b.maxHp))[0] || attacker;
        } else {
            const enemies = getEnemies(attacker, api);
            validTarget = enemies[0];
        }
    }

    // AoE / Blast Logic based on validTarget
    if (tags.includes('AoE')) {
        // Energy Charge implies hitting all allies, usually including self, but specific exclusion happens in logic below
        primaryTargets = isBeneficial ? getAllies(attacker, api) : getEnemies(attacker, api);
    } else if (tags.includes('Blast') && validTarget) {
        const group = isBeneficial ? getAllies(attacker, api) : getEnemies(attacker, api);
        // Naive Blast: Target + Random 2
        primaryTargets = [validTarget, ...group.filter(u => u.uid !== validTarget!.uid).slice(0, 2)];
    } else if (validTarget) {
        primaryTargets = [validTarget];
    }

    if (primaryTargets.length === 0) return;

    // 3. Resource Costs
    if (tags.includes('Hp_Cost')) {
        const cost = Math.floor(attacker.maxHp * 0.1); 
        const newHp = Math.max(1, attacker.currentHp - cost);
        api.updateUnit(attacker.uid, { currentHp: newHp });
        api.spawnText(attacker.uid, `HP -${cost}`, 'damage');
    }

    // 4. Execution Loop (Double Cast)
    const iterations = tags.includes('Double_Cast') ? 1 : 1; 
    
    // Special: Action Forward (Double Cast Simulation)
    if (tags.includes('Double_Cast') && validTarget) { 
        // If skill targets self/ally, advance them. If skill attacks enemy, advance SELF (attacker).
        const advanceTarget = isBeneficial ? validTarget : attacker;
        advanceAction(api, advanceTarget, 1.0);
        api.addLog(`${attacker.name} 使 ${advanceTarget.name} 立即行動！`, 'buff');
    }

    for(let i=0; i<iterations; i++) {
        // A. Healing Logic
        if (tags.includes('Heal')) {
            primaryTargets.forEach(t => {
                const baseHeal = attacker.stats.atk * (skillData.healRatio || 1.0) * skillData.ratio;
                const healAmt = Math.floor(baseHeal * (1 + (getRealtimeUnitStats(attacker, 'outgoingHealing') || 0)));
                api.heal(attacker.uid, t.uid, healAmt + 200); 
            });
        }

        // B. Shield Logic
        if (tags.includes('Shield')) {
            primaryTargets.forEach(t => {
                const shieldAmt = attacker.stats.def * 1.5 + 200;
                api.updateUnit(t.uid, { shield: (t.shield || 0) + shieldAmt });
                api.spawnText(t.uid, `護盾 +${Math.floor(shieldAmt)}`, 'buff');
            });
        }

        // C. Buff Logic
        if (tags.includes('Buff_Atk')) {
            primaryTargets.forEach(t => {
                api.addBuff(t.uid, { 
                    id: `buff_${Date.now()}_${t.uid}`, sourceCharId: attacker.charId, name: '攻擊提升', type: 'BUFF', 
                    stat: 'ATK', value: skillData.buffValue || 0.3, duration: 2, icon: '⚔️', description: '攻擊力提升' 
                });
            });
        }
        
        if (tags.includes('Buff_Dmg')) {
             primaryTargets.forEach(t => {
                api.addBuff(t.uid, { 
                    id: `dmg_up_${Date.now()}_${t.uid}`, sourceCharId: attacker.charId, name: '傷害提升', type: 'BUFF', 
                    stat: 'DMG_BOOST', value: skillData.buffValue || 0.3, duration: 2, icon: '💪', description: '造成傷害提升' 
                });
            });
        }

        // D. Damage Logic
        if (tags.includes('Damage')) {
            const ignoreWeakness = tags.includes('Ignore_Weakness');
            
            const applyDot = (t: CombatUnit, type: string) => {
                applyDoT(api, attacker, t, type, 1.0, 2);
            };

            let multiplier = skillData.ratio;
            
            if (tags.includes('Break_Dmg')) {
                const be = getRealtimeUnitStats(attacker, 'breakEffect') || 0;
                multiplier = multiplier * (1 + be); 
            }

            const targetIds = primaryTargets.map(t => t.uid);
            
            // Hit Split Config
            const hits = skillData.hitSplit && skillData.hitSplit.length > 0 ? skillData.hitSplit : [1.0];
            
            executeMultiHit(api, attacker.uid, targetIds, multiplier, skillData.element, hits, 150, ignoreWeakness);

            primaryTargets.forEach(t => {
                if (tags.includes('Debuff_Def')) {
                    api.addBuff(t.uid, { id: `def_down_${Date.now()}`, sourceCharId: attacker.charId, name: '防禦降低', type: 'DEBUFF', stat: 'DEF', value: 0.3, duration: 2, icon: '🛡️', description: '防禦力降低' });
                }
                
                // Control Effects
                if (tags.includes('Debuff_Freeze')) {
                    if (Math.random() < 0.6) {
                        api.addBuff(t.uid, { id: `freeze_${Date.now()}`, sourceCharId: attacker.charId, name: '凍結', type: 'DEBUFF', value: 0, duration: 1, icon: '❄️', description: '無法行動' });
                        api.spawnText(t.uid, "凍結", 'break');
                    }
                }
                
                if (tags.includes('DoT_Shock')) applyDot(t, 'Shock');
                if (tags.includes('DoT_Burn')) applyDot(t, 'Burn');
                if (tags.includes('DoT_Wind')) applyDot(t, 'Wind Shear');
                if (tags.includes('DoT_Bleed')) applyDot(t, 'Bleed');
                if (tags.includes('DoT_Ice')) applyDot(t, 'Ice');
            });
        }

        // E. Special Mechanics
        if (tags.includes('DoT_Detonate')) {
            primaryTargets.forEach(t => detonateDoTs(api, t, 0.8)); 
        }

        if (tags.includes('Self_Heal')) {
            const healAmt = attacker.maxHp * 0.15;
            api.heal(attacker.uid, attacker.uid, healAmt);
            api.spawnText(attacker.uid, "自我回復", 'heal');
        }

        if (tags.includes('Summon')) {
            api.addBuff(attacker.uid, { id: `summon_${Date.now()}`, sourceCharId: attacker.charId, name: '召喚物', type: 'BUFF', value: 0, duration: 2, icon: '👾', description: '召喚物協助戰鬥' });
            api.addLog(`${attacker.name} 召喚了協助單位`, 'buff');
        }
        
        if (tags.includes('Energy_Charge')) {
             let chargedCount = 0;
             primaryTargets.forEach(t => {
                 // Exclude self from energy charge (Standard Mechanic)
                 if (t.uid === attacker.uid) return;

                 if (t.charId === 'acheron') {
                     // Acheron logic: Force fill Slashed Dream to 9 regardless of maxEnergy cap quirk
                     api.updateUnit(t.uid, { currentEnergy: 9 }); 
                     api.spawnText(t.uid, "集真赤・全滿", 'buff');
                     chargedCount++;
                 } else {
                     // Normal logic
                     api.updateUnit(t.uid, { currentEnergy: t.maxEnergy });
                     api.spawnText(t.uid, "終結技就緒", 'buff');
                     chargedCount++;
                 }
             });
             if (chargedCount > 0) {
                 api.addLog(`${attacker.name} 為 ${chargedCount} 名隊友充能完畢！`, 'buff');
             }
        }
    }

    // 5. Energy Regeneration
    if (!isUlt) {
        if (skillData.fixedEnergyGain) {
            // Specialized Energy (e.g. Acheron Stacks)
            const current = attacker.currentEnergy;
            const max = attacker.maxEnergy;
            const newEnergy = Math.min(max, current + skillData.fixedEnergyGain);
            api.updateUnit(attacker.uid, { currentEnergy: newEnergy });
            
            // Visual feedback for special stacks
            if(tags.includes('No_Energy')) {
                api.spawnText(attacker.uid, `+${skillData.fixedEnergyGain} 層`, 'buff');
            }
        } else if (!tags.includes('No_Energy')) {
            // Standard Energy
            const energyGain = 30; 
            api.updateUnit(attacker.uid, { currentEnergy: Math.min(attacker.maxEnergy, attacker.currentEnergy + energyGain) });
        }
    }

    // 6. Follow-Up Attack Logic
    if (tags.includes('FollowUp') && primaryTargets.length > 0) {
        setTimeout(() => {
            const freshAttacker = api.getUnit(attacker.uid);
            if (!freshAttacker || freshAttacker.isDead) return;

            api.addLog(`${freshAttacker.name} 發動了追加攻擊！`, 'damage');
            api.spawnText(freshAttacker.uid, "追加攻擊", 'break');

            const targetIds = primaryTargets.map(t => t.uid);
            // Default follow-up multiplier 50% of ATK if not specified logic
            executeMultiHit(api, attacker.uid, targetIds, 0.5, skillData.element, [1.0], 100);
        }, 800);
    }
};
