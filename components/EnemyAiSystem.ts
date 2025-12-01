
import { CombatUnit } from '../types';
import { EngineApi } from './SkillSystem';

type EnemyBehavior = (actor: CombatUnit, api: EngineApi) => void;

// --- Helper Functions ---

const getTargets = (actor: CombatUnit, api: EngineApi, type: 'ally' | 'enemy' = 'ally'): CombatUnit[] => {
    // Note: api.getUnits() should return fresh data from Ref now
    return api.getUnits().filter(u => 
        !u.isDead && (type === 'ally' ? u.isEnemy === actor.isEnemy : u.isEnemy !== actor.isEnemy)
    );
};

const basicAttack = (actor: CombatUnit, api: EngineApi, mult: number = 1.0, element?: string) => {
    const targets = getTargets(actor, api, 'enemy');
    if (targets.length === 0) return;
    const target = targets[Math.floor(Math.random() * targets.length)];
    api.dealDamage(actor, target, mult, element || actor.element);
};

const focusWeakest = (actor: CombatUnit, api: EngineApi, mult: number = 1.0, element?: string) => {
    const targets = getTargets(actor, api, 'enemy');
    if (targets.length === 0) return;
    const target = targets.sort((a, b) => (a.currentHp / a.maxHp) - (b.currentHp / b.maxHp))[0];
    api.dealDamage(actor, target, mult, element || actor.element);
};

const aoeAttack = (actor: CombatUnit, api: EngineApi, mult: number = 0.8, element?: string) => {
    const targets = getTargets(actor, api, 'enemy');
    targets.forEach(t => api.dealDamage(actor, t, mult, element || actor.element));
};

// --- AI Registry ---

export const EnemyAiRegistry: Record<string, EnemyBehavior> = {
    // ===========================
    // HSR ELITES & BOSSES
    // ===========================
    'void_ranger_eliminator': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            api.addLog(`${actor.name} 發動了連續斬擊`, 'damage');
            api.dealDamage(actor, t, 0.8, 'Fire');
            api.dealDamage(actor, t, 0.8, 'Fire');
            api.dealDamage(actor, t, 0.8, 'Fire');
        }
    },
    'void_ranger_distorter': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[0];
            api.dealDamage(actor, t, 1.2, 'Imaginary');
            api.updateUnit(t.uid, { av: t.av + 20 });
            api.spawnText(t.uid, "推條", 'break');
        }
    },
    'blaze_out_of_space': (actor, api) => {
        const isBuffed = actor.statuses.some(s => s.id === 'molten_core');
        if (!isBuffed) {
            api.addBuff(actor.uid, { id: 'molten_core', name: '熔核', type: 'BUFF', value: 0.3, stat: 'ATK', duration: 3, icon: '🔥', description: '攻擊大幅提升' });
            api.addLog(`${actor.name} 汲取了外宇宙的火焰`, 'buff');
            api.spawnText(actor.uid, "汲取", 'buff');
        } else {
            api.addLog(`${actor.name} 釋放了焚燒殆盡`, 'damage');
            aoeAttack(actor, api, 1.2, 'Fire');
        }
    },
    'automaton_direwolf': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            api.addLog(`${actor.name} 鎖定了 ${t.name}`, 'damage');
            api.dealDamage(actor, t, 2.0, 'Physical');
            api.addBuff(t.uid, { id: `bleed_${Date.now()}`, name: '裂傷', type: 'DEBUFF', value: 0, isDoT: true, dotDamage: 300, duration: 2, icon: '🩸', description: '持續物理傷害' });
        }
    },
    'automaton_grizzly': (actor, api) => {
        if (Math.random() < 0.3) {
            api.addLog(`${actor.name} 釋放了自爆指令`, 'damage');
            aoeAttack(actor, api, 1.5, 'Fire');
        } else {
            focusWeakest(actor, api, 1.2, 'Physical');
        }
    },
    'guardian_shadow': (actor, api) => {
        if (Math.random() < 0.4) {
            api.addLog(`${actor.name} 頒布了【寧靜禁令】`, 'voice');
            const targets = getTargets(actor, api, 'enemy');
            targets.forEach(t => api.spawnText(t.uid, "禁令: 禁止普攻", 'break'));
            aoeAttack(actor, api, 0.8, 'Imaginary');
        } else {
            api.addLog(`${actor.name} 降下了風暴懲罰`, 'damage');
            focusWeakest(actor, api, 1.5, 'Wind');
        }
    },
    'frigid_prowler': (actor, api) => {
        if (Math.random() < 0.3) {
            api.addLog(`${actor.name} 吞噬了冰霜造物，力量提升！`, 'buff');
            api.addBuff(actor.uid, { id: 'devour', name: '吞噬強化', type: 'BUFF', value: 0.4, stat: 'ATK', duration: 2, icon: '❄️', description: '下一次攻擊極強' });
        } else {
            const isBuffed = actor.statuses.some(s => s.id === 'devour');
            aoeAttack(actor, api, isBuffed ? 1.5 : 0.8, 'Ice');
        }
    },
    'aurumaton_spectral_envoy': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[0];
            api.dealDamage(actor, t, 1.5, 'Physical');
            api.addBuff(t.uid, { id: `reverb_${Date.now()}`, name: '強烈震盪', type: 'DEBUFF', value: 0, duration: 1, icon: '💫', description: '受到攻擊時產生額外傷害' });
        }
    },
    'shape_shifter': (actor, api) => {
        if (Math.random() < 0.3) {
            api.addLog(`${actor.name} 喚醒了魔陰身`, 'info');
            api.spawnText(actor.uid, "回復生命", 'heal');
            api.heal(actor.uid, actor.uid, Math.floor(actor.maxHp * 0.2));
        }
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            api.dealDamage(actor, t, 1.2, 'Lightning');
            api.heal(actor.uid, actor.uid, Math.floor(actor.stats.atk * 0.5));
        }
    },
    'malefic_ape': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const target = targets.sort((a, b) => b.currentHp - a.currentHp)[0];
            api.addLog(`${actor.name} 鎖定了 ${target.name}`, 'info');
            api.dealDamage(actor, target, 1.8, 'Wind');
        }
    },
    'sweet_gorilla': (actor, api) => {
        if (actor.shield <= 0) {
            api.updateUnit(actor.uid, { shield: actor.maxHp * 0.2 });
            api.spawnText(actor.uid, "汽水護盾", 'buff');
        } else {
            api.addLog(`${actor.name} 投擲了汽水瓶`, 'damage');
            aoeAttack(actor, api, 1.0, 'Ice');
        }
    },
    'shell_of_faded_rage': (actor, api) => {
        if (!actor.statuses.some(s => s.id === 'weakness_protect')) {
            api.addBuff(actor.uid, { id: 'weakness_protect', name: '弱點防護', type: 'BUFF', value: 0.5, stat: 'DEF', duration: 2, icon: '🛡', description: '受到的傷害降低' });
            api.spawnText(actor.uid, "守備度增加", 'buff');
        }
        basicAttack(actor, api, 1.3, 'Lightning');
    },
    'beyond_overcooked': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        targets.forEach(t => {
            api.dealDamage(actor, t, 0.8, 'Fire');
            api.addBuff(t.uid, { id: `burn_${Date.now()}`, name: '燃燒', type: 'DEBUFF', value: 0, isDoT: true, dotDamage: 150, duration: 2, icon: '🔥', description: '持續傷害' });
        });
    },
    'chrono_sniper': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[0];
            api.addLog(`${actor.name} 進行了精確狙擊`, 'damage');
            api.dealDamage(actor, t, 2.5, 'Quantum');
        }
    },
    'doomsday_beast': (actor, api) => {
        // Robustness fix: Ensure we don't get stuck in charge state
        const isCharging = actor.statuses.some(s => s.id === 'doom_charge');
        
        if (isCharging) {
            api.addLog(`末日獸釋放了【末日臨空】！`, 'damage');
            aoeAttack(actor, api, 2.5, 'Quantum');
            // Important: Use filter to strictly remove the buff
            const newStatuses = actor.statuses.filter(s => s.id !== 'doom_charge');
            api.updateUnit(actor.uid, { statuses: newStatuses });
        } else if (actor.currentHp < actor.maxHp * 0.5 && Math.random() < 0.5) {
            api.addLog(`末日獸正在積蓄毀滅能量...`, 'voice');
            api.spawnText(actor.uid, "毀滅前兆", 'buff');
            api.addBuff(actor.uid, { id: 'doom_charge', name: '毀滅前兆', type: 'BUFF', value: 0, duration: 2, icon: '⚠', description: '下一回合造成毀滅性傷害' });
        } else {
            api.addLog(`末日獸發動了反物質橫掃`, 'info');
            aoeAttack(actor, api, 0.8, 'Quantum');
        }
    },
    'cocolia': (actor, api) => {
        if (Math.random() < 0.35) {
            const targets = getTargets(actor, api, 'enemy');
            if (targets.length > 0) {
                const t = targets[Math.floor(Math.random() * targets.length)];
                api.addLog(`${actor.name}：感受這絕對零度吧！`, 'voice');
                api.dealDamage(actor, t, 1.5, 'Ice');
                api.addBuff(t.uid, { id: `freeze_${Date.now()}`, name: '凍結', type: 'DEBUFF', value: 0, duration: 1, icon: '❄️', description: '無法行動' });
            }
        } else {
            api.addLog(`${actor.name} 召喚了無盡冰鋒`, 'damage');
            aoeAttack(actor, api, 1.0, 'Ice');
        }
    },
    'abundance_deer': (actor, api) => {
        if (actor.currentHp < actor.maxHp * 0.4) {
            api.addLog(`${actor.name} 汲取了建木的生機`, 'heal');
            api.heal(actor.uid, actor.uid, Math.floor(actor.maxHp * 0.25));
            api.spawnText(actor.uid, "生機煥發", 'heal');
        } else {
            api.addLog(`${actor.name} 釋放了斑龍觸角`, 'damage');
            aoeAttack(actor, api, 1.1, 'Wind');
        }
    },
    'something_unto_death': (actor, api) => {
        api.addLog(`${actor.name} 的死亡陰影籠罩了目標...`, 'voice');
        focusWeakest(actor, api, 2.5, 'Quantum');
    },
    'titan_of_time': (actor, api) => {
        api.addLog(`${actor.name} 扭曲了時間流`, 'buff');
        const targets = getTargets(actor, api, 'enemy');
        targets.forEach(t => {
            api.dealDamage(actor, t, 1.2, 'Imaginary');
            api.updateUnit(t.uid, { av: t.av + 40 });
            api.spawnText(t.uid, "時間停滯", 'break');
        });
    },

    // ===========================
    // GENSHIN ELITES & BOSSES
    // ===========================
    'wooden_shield_mitachurl': (actor, api) => {
        if (Math.random() < 0.5) {
            api.updateUnit(actor.uid, { shield: actor.shield + 500 });
            api.spawnText(actor.uid, "舉盾", 'buff');
        } else {
            basicAttack(actor, api, 1.5, 'Physical');
        }
    },
    'abyss_mage_pyro': (actor, api) => {
        if (actor.shield <= 0) {
            api.addLog(`${actor.name} 正在重新吟唱護盾`, 'info');
            api.updateUnit(actor.uid, { shield: 2000 });
        } else {
            api.addLog(`${actor.name} 嘿嘿嘿！`, 'voice');
            basicAttack(actor, api, 1.2, 'Fire');
        }
    },
    'eye_of_the_storm': (actor, api) => {
        if (Math.random() < 0.4) {
            api.addLog(`${actor.name} 高高飛起，準備墜落！`, 'voice');
            aoeAttack(actor, api, 1.8, 'Wind');
        } else {
            basicAttack(actor, api, 1.0);
        }
    },
    'cryo_regisvine': (actor, api) => {
        api.addLog(`${actor.name} 橫掃地面`, 'damage');
        aoeAttack(actor, api, 1.0, 'Ice');
    },
    'pyro_regisvine': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            api.addLog(`${actor.name} 噴射了烈焰種子`, 'damage');
            api.dealDamage(actor, t, 1.5, 'Fire');
            api.addBuff(t.uid, { id: `burn_${Date.now()}`, name: '燃燒', type: 'DEBUFF', value: 0, isDoT: true, dotDamage: 200, duration: 2, icon: '🔥', description: '持續火傷' });
        }
    },
    'stonehide_lawachurl': (actor, api) => {
        if (actor.shield === 0) {
            api.updateUnit(actor.uid, { shield: actor.maxHp * 0.3 });
            api.spawnText(actor.uid, "岩元素護甲", 'buff');
            api.addLog(`${actor.name} 的岩鎧再生了`, 'buff');
        } else {
            api.addLog(`${actor.name} 發動了重碾！`, 'damage');
            focusWeakest(actor, api, 1.8, 'Physical');
        }
    },
    'ruin_drake': (actor, api) => {
        api.addLog(`${actor.name} 釋放了能量洪流`, 'damage');
        aoeAttack(actor, api, 1.2, 'Physical');
    },
    'maguu_kenki_mini': (actor, api) => {
        api.addLog(`${actor.name} 與幻影同時斬擊`, 'damage');
        aoeAttack(actor, api, 1.5, 'Wind');
    },
    'thunder_manifestation_mini': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[Math.floor(Math.random() * targets.length)];
            api.addLog(`${actor.name} 鎖定了 ${t.name}`, 'info');
            api.dealDamage(actor, t, 1.0, 'Lightning');
            api.dealDamage(actor, t, 1.0, 'Lightning');
        }
    },
    'fatui_electrohammer': (actor, api) => {
        if (actor.shield <= 0) {
            api.updateUnit(actor.uid, { shield: actor.maxHp * 0.4 });
            api.spawnText(actor.uid, "雷元素充能", 'buff');
        } else {
            api.addLog(`${actor.name} 蓄力重錘！`, 'damage');
            focusWeakest(actor, api, 1.8, 'Lightning');
        }
    },
    'frost_operative': (actor, api) => {
        const targets = getTargets(actor, api, 'enemy');
        if (targets.length > 0) {
            const t = targets[0];
            api.addLog(`${actor.name} 刺穿了 ${t.name}`, 'damage');
            api.dealDamage(actor, t, 1.5, 'Ice');
            api.addBuff(t.uid, { id: `bond_life_${Date.now()}`, name: '生命之契', type: 'DEBUFF', value: 0, isDoT: true, dotDamage: 500, duration: 3, icon: '🩸', description: '持續流失大量生命' });
        }
    },
    'ruin_hunter': (actor, api) => {
        if (Math.random() < 0.3) {
            api.addLog(`${actor.name} 進入了空中轟炸模式`, 'info');
            aoeAttack(actor, api, 1.5, 'Physical');
        } else {
            basicAttack(actor, api, 1.2, 'Physical');
        }
    },
    'dvalin': (actor, api) => {
        api.addLog(`風魔龍發動了【終天閉幕曲】`, 'voice');
        const targets = getTargets(actor, api, 'enemy');
        targets.forEach(t => {
            api.dealDamage(actor, t, 1.0, 'Wind');
            api.addBuff(t.uid, { id: `anemo_dot_${Date.now()}`, name: '風蝕', type: 'DEBUFF', value: 0, isDoT: true, dotDamage: Math.floor(actor.stats.atk * 0.3), duration: 2, icon: '🍃', description: '持續風元素傷害' });
        });
    },
    'azhdaha': (actor, api) => {
        const elements = ['Fire', 'Ice', 'Lightning', 'Imaginary'];
        const el = elements[Math.floor(Math.random() * elements.length)];
        api.addLog(`若陀龍王汲取了 ${el} 元素之力！`, 'buff');
        api.addLog(`【地震波】`, 'damage');
        aoeAttack(actor, api, 1.3, el);
    },
    'raiden_shogun_boss': (actor, api) => {
        const isMusou = actor.statuses.some(s => s.id === 'musou_state');
        if (!isMusou && actor.currentHp < actor.maxHp * 0.6) {
            api.addLog(`雷電將軍：無念，無想...`, 'voice');
            api.spawnText(actor.uid, "無想之一刀", 'crit');
            api.addBuff(actor.uid, { id: 'musou_state', name: '無想', type: 'BUFF', stat: 'ATK', value: 0.5, duration: 99, icon: '⚡', description: '攻擊大幅提升' });
            const targets = getTargets(actor, api, 'enemy');
            targets.forEach(t => {
                api.dealDamage(actor, t, 2.2, 'Lightning');
                api.updateUnit(t.uid, { currentEnergy: Math.max(0, t.currentEnergy - 50) });
                api.spawnText(t.uid, "能量流失", 'break');
            });
        } else {
            focusWeakest(actor, api, 1.6, 'Lightning');
        }
    },
    'jadeplume_terrorshroom': (actor, api) => {
        if (Math.random() < 0.3) {
            api.addLog(`${actor.name} 進入了活性化狀態！`, 'buff');
            basicAttack(actor, api, 2.0, 'Wind');
        } else {
            api.addLog(`${actor.name} 釋放了不穩定的孢子`, 'damage');
            aoeAttack(actor, api, 1.0, 'Wind');
        }
    },
    'narwhal': (actor, api) => {
        if (Math.random() < 0.4) {
            api.addLog(`${actor.name} 掀起了原始胎海之浪`, 'damage');
            aoeAttack(actor, api, 1.5, 'Ice');
        } else {
            api.addLog(`${actor.name} 嘗試吞噬一切`, 'voice');
            focusWeakest(actor, api, 1.8, 'Quantum');
        }
    },
    'capitano_shadow': (actor, api) => {
        api.addLog(`${actor.name} 發起了榮譽決鬥`, 'voice');
        focusWeakest(actor, api, 2.8, 'Ice');
    },

    // Fallbacks for generic units
    'default': (actor, api) => {
        if (actor.name.includes('BOSS')) aoeAttack(actor, api, 1.0);
        else if (actor.name.includes('Elite')) focusWeakest(actor, api, 1.2);
        else basicAttack(actor, api, 1.0);
    },
    'ruin_guard': (actor, api) => {
        if (Math.random() < 0.4) {
            api.addLog(`${actor.name} 發射了追蹤飛彈`, 'damage');
            const targets = getTargets(actor, api, 'enemy');
            for(let i=0; i<3; i++) { 
                if(targets.length===0) break;
                const t = targets[Math.floor(Math.random() * targets.length)];
                api.dealDamage(actor, t, 0.5, 'Physical');
            }
        } else {
            api.addLog(`${actor.name} 迴旋攻擊`, 'damage');
            aoeAttack(actor, api, 0.8, 'Physical');
        }
    },
};
