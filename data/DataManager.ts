import { TraceNode, AffectionMilestone, CombatStats } from '../types';
import { TRACE_MAP } from './traces/hsr_traces';
import { HSR_AFFECTION_MAP } from './affection/hsr_affection';
import { GENSHIN_AFFECTION_MAP } from './affection/genshin_affection';

// Unified Maps
const ALL_TRACES = TRACE_MAP;
const ALL_AFFECTION = { ...HSR_AFFECTION_MAP, ...GENSHIN_AFFECTION_MAP };

// Fallback Trace Tree generator if missing (Safety net for custom chars)
const generateFallbackTraces = (charId: string): TraceNode[] => {
    return [
        {
            id: `${charId}_core`, type: 'CORE', name: '基礎能力', description: '基礎屬性解鎖',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true,
            statsModifier: { hp: 50, atk: 10 }
        },
        {
            id: `${charId}_atk1`, type: 'STAT', name: '攻擊強化', description: '攻擊力提高',
            x: 50, y: 20, reqLevel: 10, reqAscension: 0, cost: [], dependsOn: [`${charId}_core`],
            statsModifier: { atk: 10 }
        }
    ];
};

// API
export const getTraces = (charId: string): TraceNode[] => ALL_TRACES[charId] || generateFallbackTraces(charId);
export const getAffection = (charId: string): AffectionMilestone[] => ALL_AFFECTION[charId] || [];

// --- CORE LOGIC: Calculate Final Stats ---
// This function aggregates Base Stats + Traces + Affection Bonus
export const calculateFinalStats = (
    baseStats: CombatStats,
    charId: string,
    unlockedTraceIds: string[] = [],
    affectionLevel: number = 0
): CombatStats => {
    const final = { ...baseStats };

    // Ensure critical stats exist
    if (final.critRate === undefined) final.critRate = 0.05;
    if (final.critDmg === undefined) final.critDmg = 0.5;
    if (final.energyRegen === undefined) final.energyRegen = 0;

    const traces = getTraces(charId);
    const milestones = getAffection(charId);

    // 1. Trace Bonuses
    traces.forEach(node => {
        if (unlockedTraceIds.includes(node.id) && node.statsModifier) {
            const mod = node.statsModifier;
            if (mod.hp) final.hp += mod.hp;
            if (mod.atk) final.atk += mod.atk;
            if (mod.def) final.def += mod.def;
            if (mod.spd) final.spd += mod.spd;
            if (mod.critRate) final.critRate = (final.critRate || 0) + mod.critRate;
            if (mod.critDmg) final.critDmg = (final.critDmg || 0) + mod.critDmg;
            if (mod.energyRegen) final.energyRegen = (final.energyRegen || 0) + mod.energyRegen;
        }
    });

    // 2. Affection Bonuses (Percentage based)
    let percentBonus = 0;
    milestones.forEach(m => {
        if (affectionLevel >= m.reqAffection) {
            m.rewards.forEach(r => {
                if (r.type === 'STAT_BONUS' && typeof r.value === 'number') {
                    percentBonus += r.value;
                }
            });
        }
    });

    if (percentBonus > 0) {
        final.hp = Math.floor(final.hp * (1 + percentBonus));
        final.atk = Math.floor(final.atk * (1 + percentBonus));
        final.def = Math.floor(final.def * (1 + percentBonus));
        // Speed usually doesn't scale with generic % bonus in these games, but let's keep it stable
    }

    return final;
};
