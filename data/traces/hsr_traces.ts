import { TraceNode } from '../../types';
import { CHAR_COMBAT_DATA } from '../combatData';
import { CHAR_TRACE_DEFINITIONS } from './char_traces';

// Helper to create standard nodes
const createNode = (
    idBase: string,
    type: 'STAT' | 'ABILITY' | 'BONUS',
    name: string,
    stat: any,
    x: number, y: number,
    reqLv: number,
    costCredit: number,
    dependsOn: string[] = []
): TraceNode => ({
    id: `${idBase}_${type.toLowerCase()}_${Math.floor(Math.random() * 10000)}`,
    type,
    name,
    description: `提升基礎屬性`,
    x, y,
    reqLevel: reqLv,
    reqAscension: Math.floor(reqLv / 20),
    cost: [{ itemId: 'currency_credit', count: costCredit }],
    dependsOn,
    statsModifier: stat,
    icon: type === 'ABILITY' ? '🌟' : '•'
});


// Genshin IDs for flavor text
const genshinIds = [
    'raiden', 'yaemiko', 'furina', 'beidou', 'keqing', 'mualani', 'hutao', 'ganyu', 'shenhe', 'yelan', 'nahida', 'nilou', 'navia', 'arlecchino',
    'ayaka', 'eula', 'jean', 'kokomi', 'clorinde', 'xianyun', 'yoimiya', 'chiori',
    'lisa', 'mona', 'ningguang', 'noelle', 'barbara', 'kukishinobu', 'kirara', 'dehya',
    'rosaria', 'yanfei', 'fischl', 'sucrose', 'kujousara', 'yunjin', 'faruzan', 'layla', 'charlotte', 'lynette', 'chevreuse', 'sigewinne',
    'mavuika', 'xilonen', 'chasca', 'klee', 'xiangling'
];

// Factory to generate a generic trace tree based on Path
export const generateHsrTraces = (charId: string): TraceNode[] => {
    // 1. Check for Unique Definition First
    if (CHAR_TRACE_DEFINITIONS[charId]) {
        return CHAR_TRACE_DEFINITIONS[charId];
    }

    // 2. Fallback to Procedural Generation
    const combatData = CHAR_COMBAT_DATA[charId];
    // Default fallback if combat data missing
    const path = combatData?.path || 'Destruction';
    const element = combatData?.element || 'Physical';

    // Define Stat focus based on Path
    let stat1: any = { atk: 15 };
    let stat2: any = { hp: 50 };

    if (path === 'Destruction') { stat1 = { atk: 20 }; stat2 = { hp: 80 }; }
    if (path === 'Hunt') { stat1 = { atk: 25, critRate: 0.02 }; stat2 = { spd: 2 }; }
    if (path === 'Preservation') { stat1 = { def: 20 }; stat2 = { hp: 100 }; }
    if (path === 'Abundance') { stat1 = { hp: 120 }; stat2 = { def: 15 }; }
    if (path === 'Harmony') { stat1 = { spd: 3 }; stat2 = { hp: 60 }; }
    if (path === 'Nihility') { stat1 = { atk: 18 }; stat2 = { atk: 18 }; }
    if (path === 'Erudition') { stat1 = { atk: 22 }; stat2 = { critDmg: 0.05 }; }

    const isGenshin = genshinIds.includes(charId);
    const coreName = charId === 'linyun' ? '地雷系本能' : (isGenshin ? '命之座 • 覺醒' : '命途啟航');

    const coreNode: TraceNode = {
        id: `${charId}_core`,
        type: 'CORE',
        name: coreName,
        description: '解鎖角色的基礎行跡盤',
        x: 50, y: 50,
        reqLevel: 1,
        reqAscension: 0,
        cost: [],
        isCore: true,
        statsModifier: { hp: 50, atk: 10, def: 10 }
    };

    // Generate Branches
    const nodes: TraceNode[] = [coreNode];

    // Branch 1: Level 20 (Top)
    const n1 = createNode(charId, 'STAT', '基礎強化 I', stat1, 50, 30, 20, 2000, [`${charId}_core`]);
    nodes.push(n1);

    // Branch 2: Level 40 (Left)
    const n2 = createNode(charId, 'STAT', '基礎強化 II', stat2, 30, 50, 40, 5000, [`${charId}_core`]);
    nodes.push(n2);

    // Branch 3: Level 40 (Right)
    const n3 = createNode(charId, 'STAT', '進階強化 I', stat1, 70, 50, 40, 5000, [`${charId}_core`]);
    nodes.push(n3);

    // Ability 1: Level 50 (Top of Top)
    const n4 = {
        id: `${charId}_ability_1`,
        type: 'ABILITY' as const,
        name: '額外能力：突破',
        description: '戰鬥中能量恢復效率提高 5%',
        x: 50, y: 10,
        reqLevel: 50,
        reqAscension: 3,
        cost: [{ itemId: 'currency_credit', count: 10000 }, { itemId: 'enhance_dust', count: 5 }],
        dependsOn: [n1.id],
        statsModifier: { energyRegen: 0.05 },
        icon: '⚡'
    };
    nodes.push(n4);

    // Bonus: Level 60 (Extensions)
    nodes.push(createNode(charId, 'BONUS', '屬性精通', { [element === 'Fire' ? 'atk' : 'hp']: 50 }, 20, 20, 60, 15000, [n2.id]));
    nodes.push(createNode(charId, 'BONUS', '戰技強化', { atk: 30 }, 80, 20, 60, 15000, [n3.id]));

    // Core Passive (Level 70 - Bottom)
    nodes.push({
        id: `${charId}_bonus_crit`,
        type: 'ABILITY' as const,
        name: '核心覺醒',
        description: '暴擊率提高 8%，暴擊傷害提高 15%',
        x: 50, y: 80,
        reqLevel: 70,
        reqAscension: 5,
        cost: [{ itemId: 'currency_credit', count: 50000 }, { itemId: 'starlight', count: 5 }],
        dependsOn: [`${charId}_core`],
        statsModifier: { critRate: 0.08, critDmg: 0.15 },
        icon: '👑'
    });

    return nodes;
};

// Export map
export const TRACE_MAP: Record<string, TraceNode[]> = {};

const allIds = Object.keys(CHAR_COMBAT_DATA);

allIds.forEach(id => {
    TRACE_MAP[id] = generateHsrTraces(id);
});
