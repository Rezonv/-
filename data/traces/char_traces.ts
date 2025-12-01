import { TraceNode } from '../../types';

// Helper to create standard stat nodes
const createStatNode = (
    charId: string,
    idSuffix: string,
    name: string,
    stat: any,
    x: number, y: number,
    reqLv: number,
    costCredit: number,
    dependsOn: string[] = []
): TraceNode => ({
    id: `${charId}_stat_${idSuffix}`,
    type: 'STAT',
    name,
    description: '提升基礎屬性',
    x, y,
    reqLevel: reqLv,
    reqAscension: Math.floor(reqLv / 20),
    cost: [{ itemId: 'currency_credit', count: costCredit }],
    dependsOn,
    statsModifier: stat,
    icon: '•'
});

const createAbilityNode = (
    charId: string,
    idSuffix: string,
    name: string,
    description: string,
    x: number, y: number,
    reqLv: number,
    costCredit: number,
    dependsOn: string[],
    icon: string = '🌟'
): TraceNode => ({
    id: `${charId}_ability_${idSuffix}`,
    type: 'ABILITY',
    name,
    description,
    x, y,
    reqLevel: reqLv,
    reqAscension: Math.floor(reqLv / 20),
    cost: [{ itemId: 'currency_credit', count: costCredit }],
    dependsOn,
    icon
});

export const CHAR_TRACE_DEFINITIONS: Record<string, TraceNode[]> = {
    // --- HSR: Firefly (流螢) - Shape: Wing / Flame (V-shape) ---
    'firefly': [
        {
            id: 'firefly_core', type: 'CORE', name: '薩姆裝甲 • 啟動', description: '解鎖流螢的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Core at bottom
            statsModifier: { hp: 100, atk: 50, def: 50 }
        },
        // Branch 1: Left Wing (Break Effect)
        createStatNode('firefly', 'be1', '擊破特攻強化', { breakEffect: 0.053 }, 35, 65, 20, 2500, ['firefly_core']),
        createAbilityNode('firefly', 'a2', '模組γ：核心過載', '若能量低於 50% 時，能量恢復效率提高 20%。', 25, 50, 40, 10000, ['firefly_stat_be1']),
        createStatNode('firefly', 'be2', '擊破特攻強化', { breakEffect: 0.08 }, 15, 35, 50, 15000, ['firefly_ability_a2']),

        // Branch 2: Right Wing (Speed)
        createStatNode('firefly', 'spd1', '速度強化', { spd: 2 }, 65, 65, 30, 5000, ['firefly_core']),
        createAbilityNode('firefly', 'a4', '模組β：自律裝甲', '在「完全燃燒」狀態下，效果抵抗提高 35%。', 75, 50, 60, 20000, ['firefly_stat_spd1']),
        createStatNode('firefly', 'hp1', '生命值強化', { hp: 200 }, 85, 35, 70, 30000, ['firefly_ability_a4']),

        // Branch 3: Center Flame (Effect Res)
        createStatNode('firefly', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 50, 60, 30, 5000, ['firefly_core']),
        createAbilityNode('firefly', 'a6', '模組α：抗滯後爆發', '施放終結技時，行動提前 100%。', 50, 40, 70, 30000, ['firefly_stat_res1']),
        createStatNode('firefly', 'be3', '擊破特攻強化', { breakEffect: 0.10 }, 50, 20, 80, 45000, ['firefly_ability_a6']),

        // Extra Stats (Wing Tips)
        createStatNode('firefly', 'atk1', '攻擊力強化', { atk: 50 }, 10, 20, 50, 10000, ['firefly_stat_be2']),
        createStatNode('firefly', 'atk2', '攻擊力強化', { atk: 50 }, 90, 20, 50, 10000, ['firefly_stat_hp1']),
    ],

    // --- HSR: Acheron (黃泉) - Shape: Slash (Diagonal) ---
    'acheron': [
        {
            id: 'acheron_core', type: 'CORE', name: '無', description: '解鎖黃泉的基礎行跡盤',
            x: 20, y: 20, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Top Left start
            statsModifier: { atk: 80, hp: 80 }
        },
        // Main Slash Path (Diagonal down-right)
        createStatNode('acheron', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 35, 35, 20, 2500, ['acheron_core']),
        createAbilityNode('acheron', 'a2', '赤鬼', '戰鬥開始時，獲得 5 點「殘夢」，並對隨機敵方施加 5 層「集真赤」。', 50, 50, 40, 10000, ['acheron_stat_cd1']),
        createStatNode('acheron', 'cd2', '暴擊傷害強化', { critDmg: 0.08 }, 65, 65, 50, 15000, ['acheron_ability_a2']),
        createAbilityNode('acheron', 'a6', '雷心', '終結技的「啼澤雨斬」擊中持有「集真赤」的目標時，傷害提高 30%。', 80, 80, 70, 30000, ['acheron_stat_cd2']),

        // Offshoot 1 (Upper Right)
        createStatNode('acheron', 'atk1', '攻擊力強化', { atk: 0.04 }, 60, 40, 30, 5000, ['acheron_ability_a2']),
        createAbilityNode('acheron', 'a4', '奈落', '我方隊伍中存在 1/2 名「虛無」命途角色時，普攻、戰技、終結技傷害提高 115%/160%。', 70, 30, 60, 20000, ['acheron_stat_atk1']),
        createStatNode('acheron', 'ld1', '雷屬性傷害強化', { atk: 0.06 }, 80, 20, 70, 30000, ['acheron_ability_a4']),

        // Offshoot 2 (Lower Left)
        createStatNode('acheron', 'ld2', '雷屬性傷害強化', { atk: 0.032 }, 40, 60, 30, 5000, ['acheron_ability_a2']),
        createStatNode('acheron', 'atk2', '攻擊力強化', { atk: 0.06 }, 30, 70, 80, 45000, ['acheron_stat_ld2']),
    ],

    // --- Genshin: Raiden Shogun (雷電將軍) - Shape: Lightning (Zig-Zag) ---
    'raiden': [
        {
            id: 'raiden_core', type: 'CORE', name: '無想一心', description: '解鎖雷電將軍的基礎行跡盤',
            x: 50, y: 10, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Top Center
            statsModifier: { energyRegen: 0.1, atk: 50 }
        },
        // Zig-Zag Down
        createStatNode('raiden', 'er1', '能量恢復強化', { energyRegen: 0.05 }, 40, 25, 20, 2500, ['raiden_core']),
        createAbilityNode('raiden', 'a2', '殊勝之體', '基於元素充能效率超過 100% 的部分，每 1% 使雷元素傷害加成提高 0.4%。', 60, 40, 40, 10000, ['raiden_stat_er1']),
        createStatNode('raiden', 'er2', '能量恢復強化', { energyRegen: 0.08 }, 40, 55, 50, 15000, ['raiden_ability_a2']),
        createAbilityNode('raiden', 'a4', '靜電感應', '處於「夢想一心」狀態下攻擊時，為隊伍中附近的所有角色恢復能量。', 60, 70, 60, 20000, ['raiden_stat_er2']),
        createAbilityNode('raiden', 'a6', '雷霆', '施放終結技時，使附近的隊伍中所有角色元素爆發傷害提升。', 40, 85, 70, 30000, ['raiden_ability_a4']),

        // Side Bolts
        createStatNode('raiden', 'ed1', '雷屬性傷害強化', { atk: 0.04 }, 20, 40, 30, 5000, ['raiden_stat_er1']),
        createStatNode('raiden', 'atk1', '攻擊力強化', { atk: 0.06 }, 10, 55, 70, 30000, ['raiden_stat_ed1']),

        createStatNode('raiden', 'atk2', '攻擊力強化', { atk: 0.04 }, 80, 55, 30, 5000, ['raiden_ability_a2']),
        createStatNode('raiden', 'ed2', '雷屬性傷害強化', { atk: 0.06 }, 90, 70, 80, 45000, ['raiden_stat_atk2']),
    ],

    // --- Genshin: Zhongli (鍾離) - Shape: Pillar (Vertical with Base) ---
    'zhongli': [
        {
            id: 'zhongli_core', type: 'CORE', name: '懸岩宸斷', description: '解鎖鍾離的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bottom Center
            statsModifier: { hp: 200, def: 50 }
        },
        // Central Pillar
        createStatNode('zhongli', 'hp1', '生命值強化', { hp: 0.05 }, 50, 70, 20, 2500, ['zhongli_core']),
        createAbilityNode('zhongli', 'a2', '玉璋護盾', '玉璋護盾受到傷害時，護盾強效提升 5%，最多疊加 5 次。', 50, 50, 40, 10000, ['zhongli_stat_hp1']),
        createStatNode('zhongli', 'hp2', '生命值強化', { hp: 0.08 }, 50, 35, 50, 15000, ['zhongli_ability_a2']),
        createAbilityNode('zhongli', 'a6', '磐石', '天星（終結技）造成傷害時，有 100% 機率使敵人陷入石化狀態。', 50, 15, 70, 30000, ['zhongli_stat_hp2']),

        // Base Left
        createStatNode('zhongli', 'gd1', '虛數屬性傷害強化', { atk: 0.04 }, 30, 85, 30, 5000, ['zhongli_core']),
        createAbilityNode('zhongli', 'a4', '炊金饌玉', '基於生命值上限，提高普通攻擊、戰技與終結技的傷害。', 15, 85, 60, 20000, ['zhongli_stat_gd1']),

        // Base Right
        createStatNode('zhongli', 'def1', '防禦力強化', { def: 0.05 }, 70, 85, 30, 5000, ['zhongli_core']),
        createStatNode('zhongli', 'hp3', '生命值強化', { hp: 0.06 }, 85, 85, 80, 45000, ['zhongli_stat_def1']),

        // Top Cross
        createStatNode('zhongli', 'atk1', '攻擊力強化', { atk: 0.06 }, 30, 15, 70, 30000, ['zhongli_ability_a6']),
    ],

    // --- Genshin: Hu Tao (胡桃) - Shape: Butterfly (X-Shape) ---
    'hutao': [
        {
            id: 'hutao_core', type: 'CORE', name: '往生秘傳', description: '解鎖胡桃的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true,
            statsModifier: { hp: 80, atk: 80 }
        },
        // Upper Left Wing
        createStatNode('hutao', 'hp1', '生命值強化', { hp: 0.05 }, 35, 35, 20, 2500, ['hutao_core']),
        createAbilityNode('hutao', 'a2', '蝶隱之時', '蝶引來生施加的「彼岸蝶舞」狀態結束後，隊伍中所有角色（不包括胡桃自己）的暴擊率提高 12%。', 20, 20, 40, 10000, ['hutao_stat_hp1']),

        // Upper Right Wing
        createStatNode('hutao', 'fd1', '火屬性傷害強化', { atk: 0.04 }, 65, 35, 30, 5000, ['hutao_core']),
        createAbilityNode('hutao', 'a4', '血之灶火', '胡桃的生命值低於或等於 50% 時，獲得 33% 的火元素傷害加成。', 80, 20, 60, 20000, ['hutao_stat_fd1']),

        // Lower Left Wing
        createStatNode('hutao', 'cd1', '暴擊傷害強化', { critDmg: 0.05 }, 35, 65, 30, 5000, ['hutao_core']),
        createAbilityNode('hutao', 'a6', '蝶擁', '安神秘法（終結技）命中敵人時，有 100% 機率施加灼燒狀態。', 20, 80, 70, 30000, ['hutao_stat_cd1']),

        // Lower Right Wing
        createStatNode('hutao', 'hp2', '生命值強化', { hp: 0.08 }, 65, 65, 50, 15000, ['hutao_core']),
        createStatNode('hutao', 'atk1', '攻擊力強化', { atk: 0.06 }, 80, 80, 70, 30000, ['hutao_stat_hp2']),

        // Center Top
        createStatNode('hutao', 'cd2', '暴擊傷害強化', { critDmg: 0.08 }, 50, 25, 80, 45000, ['hutao_core']),
    ],

    // --- HSR: Kafka (卡芙卡) - Shape: Spider Web (Radial) ---
    'kafka': [
        {
            id: 'kafka_core', type: 'CORE', name: '折磨', description: '解鎖卡芙卡的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true,
            statsModifier: { atk: 100, hp: 50 }
        },
        // Inner Ring
        createStatNode('kafka', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 30, 20, 2500, ['kafka_core']),
        createStatNode('kafka', 'ehr1', '效果命中強化', { effectHitRate: 0.04 }, 30, 60, 30, 5000, ['kafka_core']),
        createStatNode('kafka', 'ld1', '雷屬性傷害強化', { atk: 0.04 }, 70, 60, 30, 5000, ['kafka_core']),

        // Outer Ring (Abilities)
        createAbilityNode('kafka', 'a2', '荊棘', '終結技、秘技與追加攻擊觸發觸電狀態的基礎機率提高 30%。', 50, 10, 40, 10000, ['kafka_stat_atk1']),
        createAbilityNode('kafka', 'a4', '掠奪', '觸電狀態下的敵人被消滅時，卡芙卡額外恢復 5 點能量。', 10, 70, 60, 20000, ['kafka_stat_ehr1']),
        createAbilityNode('kafka', 'a6', '暴力', '「觸電」狀態下的敵人受到的持續傷害倍率提高 20%。', 90, 70, 70, 30000, ['kafka_stat_ld1']),

        // Web Connectors
        createStatNode('kafka', 'atk2', '攻擊力強化', { atk: 0.06 }, 30, 20, 50, 15000, ['kafka_ability_a2']),
        createStatNode('kafka', 'hp1', '生命值強化', { hp: 0.06 }, 70, 20, 70, 30000, ['kafka_ability_a2']),
        createStatNode('kafka', 'ehr2', '效果命中強化', { effectHitRate: 0.06 }, 50, 80, 80, 45000, ['kafka_core']),
    ],

    // --- HSR: Silver Wolf (銀狼) - Shape: Glitch (Asymmetrical Grid) ---
    'silverwolf': [
        {
            id: 'sw_core', type: 'CORE', name: '篡改', description: '解鎖銀狼的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true,
            statsModifier: { atk: 50, spd: 2 }
        },
        // Top Left Block
        createStatNode('sw', 'ehr1', '效果命中強化', { effectHitRate: 0.04 }, 35, 35, 20, 2500, ['sw_core']),
        createAbilityNode('sw', 'a2', '生成', '「缺陷」的持續時間增加 1 回合。', 35, 20, 40, 10000, ['sw_stat_ehr1']),
        createStatNode('sw', 'ehr2', '效果命中強化', { effectHitRate: 0.06 }, 20, 20, 50, 15000, ['sw_ability_a2']),

        // Bottom Right Block
        createStatNode('sw', 'atk1', '攻擊力強化', { atk: 0.04 }, 65, 65, 30, 5000, ['sw_core']),
        createAbilityNode('sw', 'a4', '注入', '施放戰技時，若敵方目標的弱點數量大於等於 3 個，戰技使其全屬性抗性降低的效果額外降低 3%。', 65, 80, 60, 20000, ['sw_stat_atk1']),
        createStatNode('sw', 'qd1', '量子屬性傷害強化', { atk: 0.05 }, 80, 80, 70, 30000, ['sw_ability_a4']),

        // Disconnected/Floating Nodes (Visual Glitch effect via long connections)
        createStatNode('sw', 'qd2', '量子屬性傷害強化', { atk: 0.03 }, 20, 80, 30, 5000, ['sw_core']),
        createAbilityNode('sw', 'a6', '註解', '施放戰技時，若敵方目標的負面效果數量大於等於 3 個，戰技使其全屬性抗性降低的效果額外降低 3%。', 80, 20, 70, 30000, ['sw_core']),
        createStatNode('sw', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 80, 45000, ['sw_stat_atk1']),
    ],

    // --- HSR: Ruan Mei (阮•梅) - Shape: DNA Helix (S-Curve) ---
    'ruanmei': [
        {
            id: 'ruanmei_core', type: 'CORE', name: '螺旋', description: '解鎖阮•梅的基礎行跡盤',
            x: 50, y: 90, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Start Bottom
            statsModifier: { hp: 100, spd: 5 }
        },
        // Winding Path Upwards
        createStatNode('ruanmei', 'be1', '擊破特攻強化', { breakEffect: 0.053 }, 35, 80, 20, 2500, ['ruanmei_core']),
        createStatNode('ruanmei', 'spd1', '速度強化', { spd: 2 }, 65, 70, 30, 5000, ['ruanmei_stat_be1']),
        createAbilityNode('ruanmei', 'a2', '物體呼吸', '我方全體擊破特攻提高 20%。', 35, 60, 40, 10000, ['ruanmei_stat_spd1']),
        createStatNode('ruanmei', 'def1', '防禦力強化', { def: 0.05 }, 65, 50, 50, 15000, ['ruanmei_ability_a2']),
        createAbilityNode('ruanmei', 'a4', '日消遐思', '阮•梅的回合開始時，恢復 5 點能量。', 35, 40, 60, 20000, ['ruanmei_stat_def1']),
        createStatNode('ruanmei', 'def2', '防禦力強化', { def: 0.075 }, 65, 30, 70, 30000, ['ruanmei_ability_a4']),
        createAbilityNode('ruanmei', 'a6', '落燭照水', '戰鬥中，我方全體造成傷害提高，提高數值等同於阮•梅當前擊破特攻的 36%，最多計入 180% 擊破特攻。', 35, 20, 70, 30000, ['ruanmei_stat_def2']),

        // Top Finisher
        createStatNode('ruanmei', 'be3', '擊破特攻強化', { breakEffect: 0.107 }, 50, 10, 80, 45000, ['ruanmei_ability_a6']),
        createStatNode('ruanmei', 'be2', '擊破特攻強化', { breakEffect: 0.08 }, 80, 40, 50, 15000, ['ruanmei_stat_def1']),
    ],

    // --- HSR: Jingliu (鏡流) - Shape: Crescent Moon (Curved) ---
    'jingliu': [
        {
            id: 'jingliu_core', type: 'CORE', name: '劍首', description: '解鎖鏡流的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true,
            statsModifier: { atk: 80, hp: 80 }
        },
        // Upper Curve
        createStatNode('jingliu', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 35, 35, 20, 2500, ['jingliu_core']),
        createAbilityNode('jingliu', 'a2', '死境', '「轉魄」狀態下，效果抵抗提高 35%。', 25, 20, 40, 10000, ['jingliu_stat_cd1']),
        createStatNode('jingliu', 'cd2', '暴擊傷害強化', { critDmg: 0.08 }, 40, 10, 50, 15000, ['jingliu_ability_a2']),

        // Lower Curve
        createStatNode('jingliu', 'spd1', '速度強化', { spd: 2 }, 35, 65, 30, 5000, ['jingliu_core']),
        createAbilityNode('jingliu', 'a4', '劍首', '施放「無罅飛光」後，下一次行動提前 10%。', 25, 80, 60, 20000, ['jingliu_stat_spd1']),
        createStatNode('jingliu', 'hp1', '生命值強化', { hp: 0.06 }, 40, 90, 70, 30000, ['jingliu_ability_a4']),

        // Inner Arc
        createStatNode('jingliu', 'hp2', '生命值強化', { hp: 0.04 }, 65, 50, 30, 5000, ['jingliu_core']),
        createAbilityNode('jingliu', 'a6', '霜魄', '「轉魄」狀態下，終結技造成的傷害提高 20%。', 80, 50, 70, 30000, ['jingliu_stat_hp2']),
        createStatNode('jingliu', 'spd2', '速度強化', { spd: 3 }, 90, 35, 80, 45000, ['jingliu_ability_a6']),
    ],





    // --- Genshin: Furina (芙寧娜) - Shape: Stage (Semicircle) ---
    'furina': [
        {
            id: 'furina_core', type: 'CORE', name: '眾水之庭', description: '解鎖芙寧娜的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bottom Center
            statsModifier: { hp: 150, critRate: 0.05 }
        },
        // Center Stage
        createStatNode('furina', 'hp1', '生命值強化', { hp: 0.05 }, 50, 60, 20, 2500, ['furina_core']),
        createAbilityNode('furina', 'a2', '停不了的圓舞', '隊伍中角色的生命值並非處於滿值時，治療加成提升。', 50, 40, 40, 10000, ['furina_stat_hp1']),
        createStatNode('furina', 'hp2', '生命值強化', { hp: 0.08 }, 50, 20, 50, 15000, ['furina_ability_a2']),

        // Left Curtain
        createStatNode('furina', 'cr1', '暴擊率強化', { critRate: 0.027 }, 30, 70, 30, 5000, ['furina_core']),
        createAbilityNode('furina', 'a4', '無人聽的自白', '基於生命值上限，提高孤心沙龍的傷害與治療量。', 20, 50, 60, 20000, ['furina_stat_cr1']),
        createStatNode('furina', 'hp3', '生命值強化', { hp: 0.06 }, 30, 30, 70, 30000, ['furina_ability_a4']),

        // Right Curtain
        createStatNode('furina', 'er1', '能量恢復強化', { energyRegen: 0.05 }, 70, 70, 30, 5000, ['furina_core']),
        createAbilityNode('furina', 'a6', '萬眾矚目', '普攻、重擊與下落傷害轉為無法被附魔覆蓋的水元素傷害。', 80, 50, 70, 30000, ['furina_stat_er1']),
        createStatNode('furina', 'cr2', '暴擊率強化', { critRate: 0.04 }, 70, 30, 80, 45000, ['furina_ability_a6']),
    ],



    // --- Genshin: Yelan (夜蘭) - Shape: Dice (5-Point) ---
    'yelan': [
        {
            id: 'yelan_core', type: 'CORE', name: '幽客', description: '解鎖夜蘭的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center Dot
            statsModifier: { hp: 100, critRate: 0.05 }
        },
        // Top Left Dot
        createStatNode('yelan', 'hp1', '生命值強化', { hp: 0.05 }, 25, 25, 20, 2500, ['yelan_core']),
        createAbilityNode('yelan', 'a2', '猜先有方', '隊伍中存在 1/2/3/4 種元素類型的角色時，夜蘭的生命值上限提升 6%/12%/18%/30%。', 15, 15, 40, 10000, ['yelan_stat_hp1']),

        // Top Right Dot
        createStatNode('yelan', 'hp2', '生命值強化', { hp: 0.08 }, 75, 25, 50, 15000, ['yelan_core']),
        createAbilityNode('yelan', 'a4', '妙轉隨心', '「玄擲玲瓏」存在期間，能使隊伍中自己的當前場上角色造成的傷害提高。', 85, 15, 60, 20000, ['yelan_stat_hp2']),

        // Bottom Left Dot
        createStatNode('yelan', 'cr1', '暴擊率強化', { critRate: 0.027 }, 25, 75, 30, 5000, ['yelan_core']),
        createStatNode('yelan', 'hp3', '生命值強化', { hp: 0.06 }, 15, 85, 70, 30000, ['yelan_stat_cr1']),

        // Bottom Right Dot
        createStatNode('yelan', 'wd1', '水屬性傷害強化', { atk: 0.048 }, 75, 75, 30, 5000, ['yelan_core']),
        createAbilityNode('yelan', 'a6', '長考', '執行長距離探索任務時，獲得的獎勵增加 25%。', 85, 85, 70, 30000, ['yelan_stat_wd1']),

        // Center Top
        createStatNode('yelan', 'cr2', '暴擊率強化', { critRate: 0.04 }, 50, 20, 80, 45000, ['yelan_core']),
    ],

    // --- HSR: Feixiao (飛霄) - Shape: Axe / Arrowhead (V-Shape Up) ---
    'feixiao': [
        {
            id: 'feixiao_core', type: 'CORE', name: '天擊將軍', description: '解鎖飛霄的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bottom Center
            statsModifier: { atk: 100, spd: 5 }
        },
        // Left Blade
        createStatNode('feixiao', 'cr1', '暴擊率強化', { critRate: 0.027 }, 35, 65, 20, 2500, ['feixiao_core']),
        createAbilityNode('feixiao', 'a2', '雷霆之勢', '施放追加攻擊時，暴擊傷害提高 36%。', 20, 45, 40, 10000, ['feixiao_stat_cr1']),
        createStatNode('feixiao', 'cd1', '暴擊傷害強化', { critDmg: 0.08 }, 10, 25, 50, 15000, ['feixiao_ability_a2']),

        // Right Blade
        createStatNode('feixiao', 'spd1', '速度強化', { spd: 2 }, 65, 65, 30, 5000, ['feixiao_core']),
        createAbilityNode('feixiao', 'a4', '神速進軍', '戰鬥開始時，行動提前 25%。', 80, 45, 60, 20000, ['feixiao_stat_spd1']),
        createStatNode('feixiao', 'atk1', '攻擊力強化', { atk: 0.06 }, 90, 25, 70, 30000, ['feixiao_ability_a4']),

        // Center Shaft
        createStatNode('feixiao', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 50, 60, 30, 5000, ['feixiao_core']),
        createAbilityNode('feixiao', 'a6', '破陣', '終結技被視為追加攻擊，且無視弱點削減韌性。', 50, 35, 70, 30000, ['feixiao_stat_wd1']),
        createStatNode('feixiao', 'cr2', '暴擊率強化', { critRate: 0.04 }, 50, 10, 80, 45000, ['feixiao_ability_a6']),
    ],

    // --- HSR: Yunli (雲璃) - Shape: Greatsword (Cross) ---
    'yunli': [
        {
            id: 'yunli_core', type: 'CORE', name: '朱明獵劍士', description: '解鎖雲璃的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Hilt Base
            statsModifier: { hp: 150, atk: 50 }
        },
        // Hilt Crossguard
        createStatNode('yunli', 'hp1', '生命值強化', { hp: 0.04 }, 30, 75, 20, 2500, ['yunli_core']),
        createStatNode('yunli', 'atk1', '攻擊力強化', { atk: 0.04 }, 70, 75, 20, 2500, ['yunli_core']),

        // Blade Body
        createAbilityNode('yunli', 'a2', '劍心', '受到攻擊後，下一次反擊傷害提高 30%。', 50, 65, 40, 10000, ['yunli_core']),
        createStatNode('yunli', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 50, 50, 50, 15000, ['yunli_ability_a2']),
        createAbilityNode('yunli', 'a4', '直覺', '生命值低於 50% 時，受到的傷害降低 20%。', 50, 35, 60, 20000, ['yunli_stat_cd1']),
        createStatNode('yunli', 'pd1', '物理屬性傷害強化', { atk: 0.048 }, 50, 20, 70, 30000, ['yunli_ability_a4']),

        // Blade Tip
        createAbilityNode('yunli', 'a6', '反擊風暴', '終結技期間，必定觸發強化反擊，且暴擊傷害提高 100%。', 50, 5, 80, 45000, ['yunli_stat_pd1']),
    ],

    // --- HSR: Robin (知更鳥) - Shape: Angel Wings (Curved Up) ---
    'robin': [
        {
            id: 'robin_core', type: 'CORE', name: '家族歌姬', description: '解鎖知更鳥的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center Body
            statsModifier: { atk: 80, hp: 80 }
        },
        // Left Wing
        createStatNode('robin', 'atk1', '攻擊力強化', { atk: 0.04 }, 35, 70, 20, 2500, ['robin_core']),
        createAbilityNode('robin', 'a2', '協奏曲', '戰鬥開始時，我方全體行動提前 25%。', 20, 50, 40, 10000, ['robin_stat_atk1']),
        createStatNode('robin', 'hp1', '生命值強化', { hp: 0.06 }, 10, 30, 50, 15000, ['robin_ability_a2']),

        // Right Wing
        createStatNode('robin', 'atk2', '攻擊力強化', { atk: 0.04 }, 65, 70, 20, 2500, ['robin_core']),
        createAbilityNode('robin', 'a4', '和聲', '施放終結技後，我方全體全屬性抗性穿透提高 20%。', 80, 50, 60, 20000, ['robin_stat_atk2']),
        createStatNode('robin', 'spd1', '速度強化', { spd: 2 }, 90, 30, 70, 30000, ['robin_ability_a4']),

        // Halo
        createAbilityNode('robin', 'a6', '安魂', '處於「協奏」狀態時，知更鳥免疫控制類負面狀態。', 50, 20, 80, 45000, ['robin_core']),
    ],

    // --- Genshin: Arlecchino (僕人) - Shape: Scythe / X-Shape ---
    'arlecchino': [
        {
            id: 'arlecchino_core', type: 'CORE', name: '赤月之宴', description: '解鎖僕人的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 100, critDmg: 0.1 }
        },
        // Top Left Blade
        createStatNode('arlecchino', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 30, 30, 20, 2500, ['arlecchino_core']),
        createAbilityNode('arlecchino', 'a2', '生命之契', '基於生命之契的數值，提高普通攻擊的傷害。', 15, 15, 40, 10000, ['arlecchino_stat_cd1']),

        // Bottom Right Handle
        createStatNode('arlecchino', 'atk1', '攻擊力強化', { atk: 0.06 }, 70, 70, 30, 5000, ['arlecchino_core']),
        createAbilityNode('arlecchino', 'a4', '肅清', '擊敗敵人後，獲得生命之契並恢復生命值。', 85, 85, 60, 20000, ['arlecchino_stat_atk1']),

        // Cross Slash (Top Right to Bottom Left)
        createStatNode('arlecchino', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 70, 30, 50, 15000, ['arlecchino_core']),
        createAbilityNode('arlecchino', 'a6', '威壓', '重擊消耗體力降低，並造成範圍火元素傷害。', 30, 70, 70, 30000, ['arlecchino_core']),

        // Tip
        createStatNode('arlecchino', 'cd2', '暴擊傷害強化', { critDmg: 0.08 }, 50, 10, 80, 45000, ['arlecchino_core']),
    ],

    // --- Genshin: Navia (娜維婭) - Shape: Umbrella (Semicircle Top + Handle) ---
    'navia': [
        {
            id: 'navia_core', type: 'CORE', name: '刺玫會長', description: '解鎖娜維婭的基礎行跡盤',
            x: 50, y: 60, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Handle Top
            statsModifier: { atk: 80, hp: 100 }
        },
        // Umbrella Canopy
        createStatNode('navia', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 40, 20, 2500, ['navia_core']),
        createStatNode('navia', 'cr1', '暴擊率強化', { critRate: 0.027 }, 50, 30, 30, 5000, ['navia_core']),
        createStatNode('navia', 'atk2', '攻擊力強化', { atk: 0.04 }, 70, 40, 20, 2500, ['navia_core']),

        // Canopy Edges
        createAbilityNode('navia', 'a2', '晶彈', '施放典儀晶火後，普攻、重擊與下落攻擊轉為無法被附魔覆蓋的岩元素傷害。', 15, 50, 40, 10000, ['navia_stat_atk1']),
        createAbilityNode('navia', 'a4', '禮炮', '隊伍中每存在一位火/雷/冰/水元素角色，攻擊力提升 20%，最多疊加 2 層。', 85, 50, 60, 20000, ['navia_stat_atk2']),

        // Handle Bottom
        createStatNode('navia', 'gd1', '虛數屬性傷害強化', { atk: 0.048 }, 50, 80, 70, 30000, ['navia_core']),
        createAbilityNode('navia', 'a6', '調查', '在楓丹執行探索派遣任務時，獲得的獎勵增加 25%。', 50, 95, 80, 45000, ['navia_stat_gd1']),
    ],

    // --- Genshin: Clorinde (克洛琳德) - Shape: Rapier (Linear Vertical) ---
    'clorinde': [
        {
            id: 'clorinde_core', type: 'CORE', name: '決鬥代理人', description: '解鎖克洛琳德的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Hilt
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Blade Upwards
        createStatNode('clorinde', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 70, 20, 2500, ['clorinde_core']),
        createAbilityNode('clorinde', 'a2', '狩獵', '生命之契數值提升時，暴擊率提升。', 50, 55, 40, 10000, ['clorinde_stat_atk1']),
        createStatNode('clorinde', 'cr1', '暴擊率強化', { critRate: 0.027 }, 50, 40, 50, 15000, ['clorinde_ability_a2']),
        createAbilityNode('clorinde', 'a4', '榮耀', '基於攻擊力，提升普通攻擊造成的傷害。', 50, 25, 60, 20000, ['clorinde_stat_cr1']),
        createStatNode('clorinde', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 50, 10, 70, 30000, ['clorinde_ability_a4']),

        // Side Guards
        createStatNode('clorinde', 'hp1', '生命值強化', { hp: 0.05 }, 35, 80, 30, 5000, ['clorinde_core']),
        createAbilityNode('clorinde', 'a6', '精準', '夜巡狀態下，治療效果轉化為生命之契。', 65, 80, 80, 45000, ['clorinde_core']),
    ],

    // --- Genshin: Mualani (瑪拉妮) - Shape: Surfboard / Wave (Curved) ---
    'mualani': [
        {
            id: 'mualani_core', type: 'CORE', name: '流泉嚮導', description: '解鎖瑪拉妮的基礎行跡盤',
            x: 20, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Start Left Bottom
            statsModifier: { hp: 100, critRate: 0.05 }
        },
        // Wave Curve Up-Right
        createStatNode('mualani', 'hp1', '生命值強化', { hp: 0.05 }, 30, 65, 20, 2500, ['mualani_core']),
        createAbilityNode('mualani', 'a2', '衝浪', '衝浪狀態下，移動速度提升，並可穿越水面。', 45, 50, 40, 10000, ['mualani_stat_hp1']),
        createStatNode('mualani', 'wd1', '水屬性傷害強化', { atk: 0.048 }, 60, 40, 50, 15000, ['mualani_ability_a2']),
        createAbilityNode('mualani', 'a4', '激流', '巨浪鯊鯊撕咬造成的傷害提升，基於瑪拉妮的生命值上限。', 75, 35, 60, 20000, ['mualani_stat_wd1']),
        createStatNode('mualani', 'cr1', '暴擊率強化', { critRate: 0.04 }, 90, 30, 70, 30000, ['mualani_ability_a4']),

        // Spray (Offshoots)
        createStatNode('mualani', 'hp2', '生命值強化', { hp: 0.06 }, 50, 25, 30, 5000, ['mualani_ability_a2']),
        createAbilityNode('mualani', 'a6', '鯊魚', '夜魂加持狀態下，獲得額外的傷害加成。', 60, 60, 80, 45000, ['mualani_ability_a2']),
    ],

    // --- HSR: Topaz (托帕) - Shape: Diamond / Coin (Rhombus) ---
    'topaz': [
        {
            id: 'topaz_core', type: 'CORE', name: '戰略投資', description: '解鎖托帕的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Top Corner
        createStatNode('topaz', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['topaz_core']),
        createAbilityNode('topaz', 'a2', '透支', '普通攻擊造成傷害時，被視為發動了追加攻擊。', 50, 5, 40, 10000, ['topaz_stat_fd1']),

        // Bottom Corner
        createStatNode('topaz', 'cr1', '暴擊率強化', { critRate: 0.04 }, 50, 80, 30, 5000, ['topaz_core']),
        createAbilityNode('topaz', 'a4', '金融危機', '對陷入「負債證明」狀態的敵人造成的追加攻擊傷害提高 15%。', 50, 95, 60, 20000, ['topaz_stat_cr1']),

        // Left Corner
        createStatNode('topaz', 'hp1', '生命值強化', { hp: 0.06 }, 20, 50, 50, 15000, ['topaz_core']),
        createAbilityNode('topaz', 'a6', '技術調整', '帳帳發動攻擊後，托帕恢復 10 點能量。', 5, 50, 70, 30000, ['topaz_stat_hp1']),

        // Right Corner
        createStatNode('topaz', 'atk1', '攻擊力強化', { atk: 0.06 }, 80, 50, 50, 15000, ['topaz_core']),
        createStatNode('topaz', 'fd2', '火屬性傷害強化', { atk: 0.032 }, 95, 50, 80, 45000, ['topaz_stat_atk1']),
    ],

    // --- HSR: Bronya (布洛妮婭) - Shape: Medal / Shield (Hexagon) ---
    'bronya_hsr': [
        {
            id: 'bronya_core', type: 'CORE', name: '大守護者', description: '解鎖布洛妮婭的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 100, def: 50 }
        },
        // Top
        createStatNode('bronya', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 50, 25, 20, 2500, ['bronya_core']),
        createAbilityNode('bronya', 'a2', '號令', '普攻暴擊率提高 100%。', 50, 10, 40, 10000, ['bronya_stat_wd1']),

        // Bottom Left
        createStatNode('bronya', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 25, 75, 30, 5000, ['bronya_core']),
        createAbilityNode('bronya', 'a4', '陣地', '戰鬥開始時，我方全體防禦力提高 20%，持續 2 回合。', 10, 90, 60, 20000, ['bronya_stat_cd1']),

        // Bottom Right
        createStatNode('bronya', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 75, 75, 50, 15000, ['bronya_core']),
        createAbilityNode('bronya', 'a6', '軍勢', '布洛妮婭在場時，我方全體造成的傷害提高 10%。', 90, 90, 70, 30000, ['bronya_stat_res1']),

        // Connectors
        createStatNode('bronya', 'cd2', '暴擊傷害強化', { critDmg: 0.08 }, 25, 25, 80, 45000, ['bronya_core']),
        createStatNode('bronya', 'wd2', '風屬性傷害強化', { atk: 0.032 }, 75, 25, 80, 45000, ['bronya_core']),
    ],

    // --- HSR: Seele (希兒) - Shape: Scythe / Butterfly (Sharp Wings) ---
    'seele': [
        {
            id: 'seele_core', type: 'CORE', name: '地火', description: '解鎖希兒的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bottom Center
            statsModifier: { atk: 80, spd: 4 }
        },
        // Left Wing (Sharp)
        createStatNode('seele', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 60, 20, 2500, ['seele_core']),
        createAbilityNode('seele', 'a2', '夜行', '生命值小於等於 50% 時，被敵方攻擊的機率降低。', 15, 40, 40, 10000, ['seele_stat_atk1']),
        createStatNode('seele', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 10, 20, 50, 15000, ['seele_ability_a2']),

        // Right Wing (Sharp)
        createStatNode('seele', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 60, 20, 2500, ['seele_core']),
        createAbilityNode('seele', 'a4', '割裂', '增幅狀態下，量子屬性抗性穿透提高 20%。', 85, 40, 60, 20000, ['seele_stat_atk2']),
        createStatNode('seele', 'spd1', '速度強化', { spd: 2 }, 90, 20, 70, 30000, ['seele_ability_a4']),

        // Center Top
        createStatNode('seele', 'qd1', '量子屬性傷害強化', { atk: 0.048 }, 50, 50, 30, 5000, ['seele_core']),
        createAbilityNode('seele', 'a6', '漣漪', '施放普攻後，下一次行動提前 20%。', 50, 20, 80, 45000, ['seele_stat_qd1']),
    ],

    // --- HSR: Clara (克拉拉) - Shape: Robot Hand (Fingers) ---
    'clara': [
        {
            id: 'clara_core', type: 'CORE', name: '家人', description: '解鎖克拉拉的基礎行跡盤',
            x: 50, y: 90, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Wrist
            statsModifier: { hp: 100, atk: 50 }
        },
        // Thumb
        createStatNode('clara', 'hp1', '生命值強化', { hp: 0.04 }, 20, 70, 20, 2500, ['clara_core']),
        createAbilityNode('clara', 'a2', '家人', '受到攻擊時，有 35% 固定機率解除自身 1 個負面效果。', 10, 50, 40, 10000, ['clara_stat_hp1']),

        // Index Finger
        createStatNode('clara', 'atk1', '攻擊力強化', { atk: 0.04 }, 35, 60, 30, 5000, ['clara_core']),
        createAbilityNode('clara', 'a4', '守護', '對史瓦羅標記「反擊標記」的目標造成的戰技傷害提高 30%。', 35, 30, 60, 20000, ['clara_stat_atk1']),

        // Middle Finger
        createStatNode('clara', 'pd1', '物理屬性傷害強化', { atk: 0.048 }, 50, 55, 50, 15000, ['clara_core']),
        createAbilityNode('clara', 'a6', '復仇', '史瓦羅的反擊造成的傷害提高 30%。', 50, 20, 70, 30000, ['clara_stat_pd1']),

        // Ring Finger
        createStatNode('clara', 'atk2', '攻擊力強化', { atk: 0.06 }, 65, 60, 80, 45000, ['clara_core']),

        // Pinky
        createStatNode('clara', 'hp2', '生命值強化', { hp: 0.06 }, 80, 70, 80, 45000, ['clara_core']),
    ],

    // --- Genshin: Yae Miko (八重神子) - Shape: Fox Head / Torii (Triangular) ---
    'yaemiko': [
        {
            id: 'yae_core', type: 'CORE', name: '鳴神大社', description: '解鎖八重神子的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Chin
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Left Ear
        createStatNode('yae', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 50, 20, 2500, ['yae_core']),
        createAbilityNode('yae', 'a2', '神籬之御蔭', '施放天狐顯真時，每摧毀一株殺生櫻，就會重置一次野干役咒·殺生櫻的冷卻時間。', 20, 20, 40, 10000, ['yae_stat_atk1']),
        createStatNode('yae', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 30, 10, 50, 15000, ['yae_ability_a2']),

        // Right Ear
        createStatNode('yae', 'cr1', '暴擊率強化', { critRate: 0.027 }, 70, 50, 20, 2500, ['yae_core']),
        createAbilityNode('yae', 'a4', '啟蜇之祝詞', '基於元素精通，提高殺生櫻造成的傷害。', 80, 20, 60, 20000, ['yae_stat_cr1']),
        createStatNode('yae', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 10, 70, 30000, ['yae_ability_a4']),

        // Forehead
        createStatNode('yae', 'em1', '元素精通強化', { breakEffect: 0.05 }, 50, 40, 30, 5000, ['yae_core']), // Using breakEffect as placeholder for EM if needed, or just text
        createAbilityNode('yae', 'a6', '密法', '合成天賦素材時，有一定機率產生同地區的其他隨機天賦素材。', 50, 10, 80, 45000, ['yae_stat_em1']),
    ],

    // --- Genshin: Ayaka (神里綾華) - Shape: Fan (Semicircle Up) ---
    'ayaka': [
        {
            id: 'ayaka_core', type: 'CORE', name: '白鷺公主', description: '解鎖神里綾華的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Handle
            statsModifier: { atk: 80, critDmg: 0.1 }
        },
        // Fan Ribs Left
        createStatNode('ayaka', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 60, 20, 2500, ['ayaka_core']),
        createAbilityNode('ayaka', 'a2', '天罪國罪鎮詞', '施放神里流·冰華後的 6 秒內，神里綾華的普通攻擊與重擊造成的傷害提升 30%。', 20, 40, 40, 10000, ['ayaka_stat_atk1']),

        // Fan Ribs Center
        createStatNode('ayaka', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 50, 55, 30, 5000, ['ayaka_core']),
        createAbilityNode('ayaka', 'a4', '寒天宣命祝詞', '神里流·霰步結束時釋放的寒冰擊中敵人時，恢復 10 點體力，並獲得 18% 冰元素傷害加成。', 50, 30, 60, 20000, ['ayaka_stat_cd1']),

        // Fan Ribs Right
        createStatNode('ayaka', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 70, 60, 50, 15000, ['ayaka_core']),
        createAbilityNode('ayaka', 'a6', '霜殺墨染櫻', '合成武器突破素材時，有 10% 機率獲得 2 倍產出。', 80, 40, 70, 30000, ['ayaka_stat_id1']),

        // Top Edge
        createStatNode('ayaka', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 10, 80, 45000, ['ayaka_ability_a4']),
    ],


    // --- Genshin: Nilou (妮露) - Shape: Lotus / Water Splash (Radial) ---
    'nilou': [
        {
            id: 'nilou_core', type: 'CORE', name: '流泉嚮導', description: '解鎖妮露的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 150 }
        },
        // Petal Top
        createStatNode('nilou', 'hp1', '生命值強化', { hp: 0.05 }, 50, 25, 20, 2500, ['nilou_core']),
        createAbilityNode('nilou', 'a2', '落花之舞', '隊伍中所有角色的元素類型均為草元素與水元素時，綻放反應產生的草原核將轉化為「豐穰之核」。', 50, 10, 40, 10000, ['nilou_stat_hp1']),

        // Petal Bottom Left
        createStatNode('nilou', 'hp2', '生命值強化', { hp: 0.06 }, 25, 70, 30, 5000, ['nilou_core']),
        createAbilityNode('nilou', 'a4', '翩轉', '基於妮露的生命值上限，提升處於「金杯的豐餽」狀態下的角色觸發的豐穰之核造成的傷害。', 15, 80, 60, 20000, ['nilou_stat_hp2']),

        // Petal Bottom Right
        createStatNode('nilou', 'hp3', '生命值強化', { hp: 0.06 }, 75, 70, 50, 15000, ['nilou_core']),
        createAbilityNode('nilou', 'a6', '夢中花', '完美烹飪冒險類食物時，有 12% 機率獲得 2 倍產出。', 85, 80, 70, 30000, ['nilou_stat_hp3']),

        // Connectors
        createStatNode('nilou', 'em1', '元素精通強化', { breakEffect: 0.04 }, 30, 40, 80, 45000, ['nilou_core']),
        createStatNode('nilou', 'em2', '元素精通強化', { breakEffect: 0.04 }, 70, 40, 80, 45000, ['nilou_core']),
    ],

    // --- Genshin: Eula (優菈) - Shape: Snowflake / Greatsword (Hexagonal Symmetry) ---
    'eula': [
        {
            id: 'eula_core', type: 'CORE', name: '浪花騎士', description: '解鎖優菈的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, critDmg: 0.1 }
        },
        // Top Blade
        createStatNode('eula', 'pd1', '物理屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['eula_core']),
        createAbilityNode('eula', 'a2', '潮捲冰削', '長按施放冰潮的渦旋時，消耗冷酷之心會降低敵人的物理抗性與冰元素抗性。', 50, 5, 40, 10000, ['eula_stat_pd1']),

        // Bottom Handle
        createStatNode('eula', 'def1', '防禦力強化', { def: 0.05 }, 50, 80, 20, 2500, ['eula_core']),
        createAbilityNode('eula', 'a4', '戰欲湧現', '施放凝浪之光劍時，重置冰潮的渦旋的冷卻時間。', 50, 95, 60, 20000, ['eula_stat_def1']),

        // Top Left
        createStatNode('eula', 'atk1', '攻擊力強化', { atk: 0.04 }, 25, 35, 30, 5000, ['eula_core']),
        createAbilityNode('eula', 'a6', '貴族', '合成角色天賦素材時，有 10% 機率獲得 2 倍產出。', 10, 25, 80, 45000, ['eula_stat_atk1']),

        // Top Right
        createStatNode('eula', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 75, 35, 30, 5000, ['eula_core']),

        // Bottom Left
        createStatNode('eula', 'atk2', '攻擊力強化', { atk: 0.06 }, 25, 65, 50, 15000, ['eula_core']),

        // Bottom Right
        createStatNode('eula', 'pd2', '物理屬性傷害強化', { atk: 0.032 }, 75, 65, 70, 30000, ['eula_core']),
    ],

    // --- Genshin: Jean (琴) - Shape: Dandelion / Sword (Vertical + Radial Top) ---
    'jean': [
        {
            id: 'jean_core', type: 'CORE', name: '蒲公英騎士', description: '解鎖琴的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Hilt/Base
            statsModifier: { hp: 100, atk: 50 }
        },
        // Stem/Blade
        createStatNode('jean', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 60, 20, 2500, ['jean_core']),
        createAbilityNode('jean', 'a2', '順風而行', '普通攻擊命中時，有 50% 機率為隊伍中所有角色恢復生命值，回復量受益於琴的攻擊力。', 50, 40, 40, 10000, ['jean_stat_atk1']),

        // Dandelion Head (Radial)
        createStatNode('jean', 'er1', '能量恢復效率強化', { energyRegen: 0.03 }, 50, 20, 30, 5000, ['jean_ability_a2']), // Top
        createStatNode('jean', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 30, 30, 50, 15000, ['jean_ability_a2']), // Left
        createStatNode('jean', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 30, 50, 15000, ['jean_ability_a2']), // Right

        createAbilityNode('jean', 'a4', '聽憑風引', '使用蒲公英之風後，恢復 20% 元素能量。', 20, 10, 60, 20000, ['jean_stat_wd1']),
        createAbilityNode('jean', 'a6', '引領', '完美烹飪恢復類食物時，有 12% 機率獲得 2 倍產出。', 80, 10, 80, 45000, ['jean_stat_atk2']),
    ],

    // --- Genshin: Klee (可莉) - Shape: Bomb / Clover (Round Core + 3 Loops) ---
    'klee': [
        {
            id: 'klee_core', type: 'CORE', name: '火花騎士', description: '解鎖可莉的基礎行跡盤',
            x: 50, y: 55, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Top Loop
        createStatNode('klee', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 50, 35, 20, 2500, ['klee_core']),
        createAbilityNode('klee', 'a2', '砰砰禮物', '蹦蹦炸彈與普通攻擊造成傷害時，有 50% 機率獲得一朵爆裂火花。', 50, 15, 40, 10000, ['klee_stat_fd1']),

        // Left Loop
        createStatNode('klee', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 65, 30, 5000, ['klee_core']),
        createAbilityNode('klee', 'a4', '火花無限', '重擊造成暴擊後，為隊伍中所有角色恢復 2 點元素能量。', 15, 75, 60, 20000, ['klee_stat_atk1']),

        // Right Loop
        createStatNode('klee', 'fd2', '火屬性傷害強化', { atk: 0.048 }, 70, 65, 50, 15000, ['klee_core']),
        createAbilityNode('klee', 'a6', '全是寶藏', '在小地圖上顯示周圍的蒙德區域特產的位置。', 85, 75, 80, 45000, ['klee_stat_fd2']),

        // Stem
        createStatNode('klee', 'cr1', '暴擊率強化', { critRate: 0.04 }, 50, 80, 70, 30000, ['klee_core']),
    ],

    // --- Genshin: Ganyu (甘雨) - Shape: Bow / Horns (Curved Branching) ---
    'ganyu': [
        {
            id: 'ganyu_core', type: 'CORE', name: '循循守月', description: '解鎖甘雨的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 80, critDmg: 0.1 }
        },
        // Center Stem
        createStatNode('ganyu', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 60, 20, 2500, ['ganyu_core']),
        createAbilityNode('ganyu', 'a2', '唯此一心', '霜華矢發射後的 5 秒內，下一次霜華矢與隨之綻發的霜華綻發的暴擊率提高 20%。', 50, 40, 40, 10000, ['ganyu_stat_atk1']),

        // Left Horn/Limb
        createStatNode('ganyu', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 30, 30, 30, 5000, ['ganyu_ability_a2']),
        createAbilityNode('ganyu', 'a4', '天地交泰', '降眾天華領域內的隊伍中當前場上角色，獲得 20% 冰元素傷害加成。', 15, 20, 60, 20000, ['ganyu_stat_cd1']),

        // Right Horn/Limb
        createStatNode('ganyu', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 70, 30, 50, 15000, ['ganyu_ability_a2']),
        createAbilityNode('ganyu', 'a6', '藏弓待用', '合成弓箭類武器時，有 15% 機率歸還消耗的礦石素材。', 85, 20, 80, 45000, ['ganyu_stat_id1']),
    ],

    // --- Genshin: Shenhe (申鶴) - Shape: Talisman / Spear (Linear Vertical + Tags) ---
    'shenhe': [
        {
            id: 'shenhe_core', type: 'CORE', name: '孤辰煢懷', description: '解鎖申鶴的基礎行跡盤',
            x: 50, y: 90, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 100, energyRegen: 0.03 }
        },
        // Main Shaft
        createStatNode('shenhe', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 70, 20, 2500, ['shenhe_core']),
        createAbilityNode('shenhe', 'a2', '大洞彌羅尊法', '仰靈威召將使領域內的當前場上角色冰元素傷害加成提高 15%。', 50, 50, 40, 10000, ['shenhe_stat_atk1']),
        createStatNode('shenhe', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 30, 50, 15000, ['shenhe_ability_a2']),
        createAbilityNode('shenhe', 'a4', '縛靈通真法印', '施放仰靈威召後，使附近的隊伍中所有角色的普通攻擊、重擊與下落攻擊造成的傷害提高 15%。', 50, 10, 60, 20000, ['shenhe_stat_atk2']),

        // Talisman Tag Left
        createStatNode('shenhe', 'er1', '能量恢復效率強化', { energyRegen: 0.03 }, 30, 50, 30, 5000, ['shenhe_ability_a2']),

        // Talisman Tag Right
        createStatNode('shenhe', 'atk3', '攻擊力強化', { atk: 0.06 }, 70, 50, 70, 30000, ['shenhe_ability_a2']),
        createAbilityNode('shenhe', 'a6', '來復知時', '在璃月執行探索派遣任務時，獲得的獎勵增加 25%。', 85, 50, 80, 45000, ['shenhe_stat_atk3']),
    ],

    // --- Genshin: Keqing (刻晴) - Shape: Stiletto / Lightning (Zigzag) ---
    'keqing': [
        {
            id: 'keqing_core', type: 'CORE', name: '玉衡星', description: '解鎖刻晴的基礎行跡盤',
            x: 20, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Start
            statsModifier: { atk: 80, critDmg: 0.1 }
        },
        // Zigzag Path
        createStatNode('keqing', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 40, 65, 20, 2500, ['keqing_core']),
        createAbilityNode('keqing', 'a2', '抵天雷罰', '雷楔存在期間再次施放星斗歸位，刻晴獲得雷元素附魔，持續 5 秒。', 60, 50, 40, 10000, ['keqing_stat_ed1']),
        createStatNode('keqing', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 40, 35, 50, 15000, ['keqing_ability_a2']),
        createAbilityNode('keqing', 'a4', '玉衡之貴', '施放天街巡遊時，刻晴的暴擊率提升 15%，元素充能效率提升 15%。', 60, 20, 60, 20000, ['keqing_stat_cd1']),
        createStatNode('keqing', 'atk1', '攻擊力強化', { atk: 0.06 }, 80, 10, 70, 30000, ['keqing_ability_a4']),

        // Offshoot
        createAbilityNode('keqing', 'a6', '總務土地', '在璃月執行探索派遣任務時，探險時間縮短 25%。', 80, 35, 80, 45000, ['keqing_stat_cd1']),
    ],



    // --- HSR: Tingyun (停雲) - Shape: Fan / Fox Tail (Curved Fan) ---
    'tingyun': [
        {
            id: 'tingyun_core', type: 'CORE', name: '天舶司接渡使', description: '解鎖停雲的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Handle
            statsModifier: { atk: 80, spd: 4 }
        },
        // Fan Ribs Left
        createStatNode('tingyun', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 60, 20, 2500, ['tingyun_core']),
        createAbilityNode('tingyun', 'a2', '駐顏有術', '施放戰技時，停雲的速度提高 20%，持續 1 回合。', 20, 40, 40, 10000, ['tingyun_stat_atk1']),
        createStatNode('tingyun', 'def1', '防禦力強化', { def: 0.05 }, 30, 20, 50, 15000, ['tingyun_ability_a2']),

        // Fan Ribs Center
        createStatNode('tingyun', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 55, 30, 5000, ['tingyun_core']),
        createAbilityNode('tingyun', 'a4', '止厄', '普攻造成的傷害提高 40%。', 50, 30, 60, 20000, ['tingyun_stat_atk2']),

        // Fan Ribs Right
        createStatNode('tingyun', 'ld1', '雷屬性傷害強化', { atk: 0.048 }, 70, 60, 50, 15000, ['tingyun_core']),
        createAbilityNode('tingyun', 'a6', '亨通', '停雲的回合開始時，恢復 5 點能量。', 80, 40, 70, 30000, ['tingyun_stat_ld1']),
        createStatNode('tingyun', 'atk3', '攻擊力強化', { atk: 0.08 }, 70, 20, 80, 45000, ['tingyun_ability_a6']),
    ],

    // --- HSR: Huohuo (藿藿) - Shape: Ghost / Talisman (Paper Talisman) ---
    'huohuo': [
        {
            id: 'huohuo_core', type: 'CORE', name: '十王司判官', description: '解鎖藿藿的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Top Talisman
        createStatNode('huohuo', 'hp1', '生命值強化', { hp: 0.04 }, 50, 30, 20, 2500, ['huohuo_core']),
        createAbilityNode('huohuo', 'a2', '怯懼', '戰鬥開始時，藿藿獲得「禳命」，持續 1 回合。', 50, 15, 40, 10000, ['huohuo_stat_hp1']),

        // Left Talisman Leg
        createStatNode('huohuo', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 30, 70, 30, 5000, ['huohuo_core']),
        createAbilityNode('huohuo', 'a4', '貞凶', '抵抗控制類負面狀態的機率提高 35%。', 20, 85, 60, 20000, ['huohuo_stat_res1']),

        // Right Talisman Leg
        createStatNode('huohuo', 'hp2', '生命值強化', { hp: 0.06 }, 70, 70, 50, 15000, ['huohuo_core']),
        createAbilityNode('huohuo', 'a6', '壓力守護', '天賦觸發為我方目標提供治療時，恢復 1 點能量。', 80, 85, 70, 30000, ['huohuo_stat_hp2']),

        // Floating Spirits
        createStatNode('huohuo', 'spd1', '速度強化', { spd: 2 }, 20, 40, 80, 45000, ['huohuo_core']),
        createStatNode('huohuo', 'hp3', '生命值強化', { hp: 0.08 }, 80, 40, 80, 45000, ['huohuo_core']),
    ],

    // --- HSR: Fu Xuan (符玄) - Shape: Eye / Matrix (Third Eye) ---
    'fuxuan': [
        {
            id: 'fuxuan_core', type: 'CORE', name: '太卜司太卜', description: '解鎖符玄的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Pupil
            statsModifier: { hp: 150, critRate: 0.05 }
        },
        // Upper Eyelid
        createStatNode('fuxuan', 'hp1', '生命值強化', { hp: 0.04 }, 50, 30, 20, 2500, ['fuxuan_core']),
        createAbilityNode('fuxuan', 'a2', '太乙式盤', '「窮觀陣」開啟時，施放戰技將額外恢復 20 點能量。', 50, 15, 40, 10000, ['fuxuan_stat_hp1']),

        // Lower Eyelid
        createStatNode('fuxuan', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 50, 70, 30, 5000, ['fuxuan_core']),
        createAbilityNode('fuxuan', 'a4', '遁甲星輿', '施放終結技時，為我方其他角色恢復等同於符玄生命上限 5% + 133 的生命值。', 50, 85, 60, 20000, ['fuxuan_stat_res1']),

        // Left Corner
        createStatNode('fuxuan', 'hp2', '生命值強化', { hp: 0.06 }, 20, 50, 50, 15000, ['fuxuan_core']),
        createAbilityNode('fuxuan', 'a6', '六壬兆算', '「窮觀陣」開啟時，若敵方目標對我方施加了控制類負面狀態，則我方全體抵抗本次行動中敵方目標施加的所有控制類負面狀態。', 10, 50, 70, 30000, ['fuxuan_stat_hp2']),

        // Right Corner
        createStatNode('fuxuan', 'res2', '效果抵抗強化', { effectRes: 0.06 }, 80, 50, 80, 45000, ['fuxuan_core']),
    ],





    // --- HSR: Himeko (姬子) - Shape: Rose / Satellite (Radial Flower) ---
    'himeko': [
        {
            id: 'himeko_core', type: 'CORE', name: '星際旅行', description: '解鎖姬子的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, breakEffect: 0.1 }
        },
        // Petal Top
        createStatNode('himeko', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 25, 20, 2500, ['himeko_core']),
        createAbilityNode('himeko', 'a2', '星火', '攻擊有 50% 的基礎機率使敵方目標陷入灼燒狀態。', 50, 10, 40, 10000, ['himeko_stat_atk1']),

        // Petal Bottom Left
        createStatNode('himeko', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 25, 70, 30, 5000, ['himeko_core']),
        createAbilityNode('himeko', 'a4', '灼熱', '戰技對灼燒狀態下的敵方目標造成的傷害提高 20%。', 15, 80, 60, 20000, ['himeko_stat_fd1']),

        // Petal Bottom Right
        createStatNode('himeko', 'fd2', '火屬性傷害強化', { atk: 0.048 }, 75, 70, 50, 15000, ['himeko_core']),
        createAbilityNode('himeko', 'a6', '道標', '若生命值大於等於 80%，暴擊率提高 15%。', 85, 80, 70, 30000, ['himeko_stat_fd2']),

        // Thorns
        createStatNode('himeko', 'atk2', '攻擊力強化', { atk: 0.06 }, 20, 40, 80, 45000, ['himeko_core']),
        createStatNode('himeko', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 80, 40, 80, 45000, ['himeko_core']),
    ],

    // --- HSR: March 7th (三月七) - Shape: Camera / Ice Crystal (Hexagon) ---
    'march7th': [
        {
            id: 'march_core', type: 'CORE', name: '少女的特權', description: '解鎖三月七的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { def: 80, effectHitRate: 0.05 }
        },
        // Top Left
        createStatNode('march', 'def1', '防禦力強化', { def: 0.05 }, 35, 35, 20, 2500, ['march_core']),
        createAbilityNode('march', 'a2', '純潔', '施放戰技時，解除我方目標的 1 個負面效果。', 25, 25, 40, 10000, ['march_stat_def1']),

        // Top Right
        createStatNode('march', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 65, 35, 30, 5000, ['march_core']),
        createAbilityNode('march', 'a4', '加護', '戰技提供的護盾持續時間增加 1 回合。', 75, 25, 60, 20000, ['march_stat_id1']),

        // Bottom
        createStatNode('march', 'ehr1', '效果命中強化', { effectHitRate: 0.04 }, 50, 70, 50, 15000, ['march_core']),
        createAbilityNode('march', 'a6', '冰咒', '施放終結技時，凍結敵方目標的基礎機率提高 15%。', 50, 85, 70, 30000, ['march_stat_ehr1']),

        // Sides
        createStatNode('march', 'def2', '防禦力強化', { def: 0.075 }, 20, 50, 80, 45000, ['march_core']),
        createStatNode('march', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 80, 50, 80, 45000, ['march_core']),
    ],





    // --- Genshin: Dehya (迪希雅) - Shape: Lion / Flame Mane (Radial Mane) ---
    'dehya': [
        {
            id: 'dehya_core', type: 'CORE', name: '熾鬃之獅', description: '解鎖迪希雅的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Face
            statsModifier: { hp: 150, atk: 50 }
        },
        // Top Mane
        createStatNode('dehya', 'hp1', '生命值強化', { hp: 0.05 }, 50, 25, 20, 2500, ['dehya_core']),
        createAbilityNode('dehya', 'a2', '不吝佑助', '迪希雅回收淨焰劍獄後，受到的傷害降低 60%。', 50, 10, 40, 10000, ['dehya_stat_hp1']),

        // Left Mane
        createStatNode('dehya', 'atk1', '攻擊力強化', { atk: 0.04 }, 25, 40, 30, 5000, ['dehya_core']),
        createAbilityNode('dehya', 'a4', '崇誠之真', '生命值低於 40% 時，恢復生命值。', 10, 30, 60, 20000, ['dehya_stat_atk1']),

        // Right Mane
        createStatNode('dehya', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 75, 40, 30, 5000, ['dehya_core']),
        createAbilityNode('dehya', 'a6', '日照', '在白天時，隊伍中自己的角色移動速度提高 10%。', 90, 30, 70, 30000, ['dehya_stat_fd1']),

        // Bottom Mane
        createStatNode('dehya', 'hp2', '生命值強化', { hp: 0.08 }, 50, 75, 50, 15000, ['dehya_core']),
        createStatNode('dehya', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 90, 80, 45000, ['dehya_stat_hp2']),
    ],

    // --- Genshin: Faruzan (琺露珊) - Shape: Polyhedron / Triangle (Geometric) ---
    'faruzan': [
        {
            id: 'faruzan_core', type: 'CORE', name: '機關學者', description: '解鎖琺露珊的基礎行跡盤',
            x: 50, y: 60, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, energyRegen: 0.05 }
        },
        // Top Vertex
        createStatNode('faruzan', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 30, 20, 2500, ['faruzan_core']),
        createAbilityNode('faruzan', 'a2', '迅捷流風', '處於「摶風秘道」狀態下時，瞄準射擊所需的蓄力時間減少 60%。', 50, 15, 40, 10000, ['faruzan_stat_atk1']),

        // Bottom Left Vertex
        createStatNode('faruzan', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 25, 80, 30, 5000, ['faruzan_core']),
        createAbilityNode('faruzan', 'a4', '七窟遺智', '基於琺露珊的基礎攻擊力，提高處於「祈風之賜」效果下的角色造成的風元素傷害。', 15, 90, 60, 20000, ['faruzan_stat_wd1']),

        // Bottom Right Vertex
        createStatNode('faruzan', 'er1', '能量恢復效率強化', { energyRegen: 0.04 }, 75, 80, 30, 5000, ['faruzan_core']),
        createAbilityNode('faruzan', 'a6', '千書昔路', '在須彌執行探索派遣任務時，獲得的獎勵增加 25%。', 85, 90, 70, 30000, ['faruzan_stat_er1']),

        // Center Connections
        createStatNode('faruzan', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 45, 80, 45000, ['faruzan_core']),
    ],

    // --- Genshin: Layla (萊依拉) - Shape: Star Chart / Sleepy Face (Curved) ---
    'layla': [
        {
            id: 'layla_core', type: 'CORE', name: '星相學者', description: '解鎖萊依拉的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { hp: 150, def: 50 }
        },
        // Star Arch Left
        createStatNode('layla', 'hp1', '生命值強化', { hp: 0.05 }, 30, 60, 20, 2500, ['layla_core']),
        createAbilityNode('layla', 'a2', '如光驟現', '安眠帷幕護盾存在期間，每獲得一枚晚星，產生深睡效果，護盾強效提升 6%。', 20, 40, 40, 10000, ['layla_stat_hp1']),

        // Star Arch Right
        createStatNode('layla', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 70, 60, 30, 5000, ['layla_core']),
        createAbilityNode('layla', 'a4', '勿擾沉眠', '基於萊依拉的生命值上限，提高飛星造成的傷害。', 80, 40, 60, 20000, ['layla_stat_id1']),

        // Top Star
        createStatNode('layla', 'hp2', '生命值強化', { hp: 0.08 }, 50, 30, 50, 15000, ['layla_core']),
        createAbilityNode('layla', 'a6', '疊影夢照', '合成角色天賦素材時，有 10% 機率獲得 2 倍產出。', 50, 10, 70, 30000, ['layla_stat_hp2']),

        // Side Stars
        createStatNode('layla', 'atk1', '攻擊力強化', { atk: 0.06 }, 20, 80, 80, 45000, ['layla_core']),
        createStatNode('layla', 'def1', '防禦力強化', { def: 0.06 }, 80, 80, 80, 45000, ['layla_core']),
    ],

    // --- Genshin: Sigewinne (希格雯) - Shape: Heart / Pill (Heart Shape) ---
    'sigewinne': [
        {
            id: 'sigewinne_core', type: 'CORE', name: '美露莘護士長', description: '解鎖希格雯的基礎行跡盤',
            x: 50, y: 60, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Left Lobe
        createStatNode('sigewinne', 'hp1', '生命值強化', { hp: 0.05 }, 30, 40, 20, 2500, ['sigewinne_core']),
        createAbilityNode('sigewinne', 'a2', '應激創傷', '施放彈跳水療法時，為自己施加生命之契。', 20, 30, 40, 10000, ['sigewinne_stat_hp1']),

        // Right Lobe
        createStatNode('sigewinne', 'wd1', '水屬性傷害強化', { atk: 0.048 }, 70, 40, 30, 5000, ['sigewinne_core']),
        createAbilityNode('sigewinne', 'a4', '細緻入微', '基於隊伍中所有角色的生命之契總和，提升希格雯的治療量。', 80, 30, 60, 20000, ['sigewinne_stat_wd1']),

        // Bottom Point
        createStatNode('sigewinne', 'hp2', '生命值強化', { hp: 0.08 }, 50, 85, 50, 15000, ['sigewinne_core']),
        createAbilityNode('sigewinne', 'a6', '急救', '在水下時，當前場上角色的生命值降低至 50% 以下時，持續恢復生命值。', 50, 95, 70, 30000, ['sigewinne_stat_hp2']),

        // Inner Heart
        createStatNode('sigewinne', 'hp3', '生命值強化', { hp: 0.06 }, 40, 50, 80, 45000, ['sigewinne_core']),
        createStatNode('sigewinne', 'res1', '效果抵抗強化', { effectRes: 0.06 }, 60, 50, 80, 45000, ['sigewinne_core']),
    ],

    // --- Genshin: Charlotte (夏洛蒂) - Shape: Camera / Newspaper (Rectangular) ---
    'charlotte': [
        {
            id: 'charlotte_core', type: 'CORE', name: '蒸汽鳥報記者', description: '解鎖夏洛蒂的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Lens
            statsModifier: { atk: 80, energyRegen: 0.05 }
        },
        // Top Flash
        createStatNode('charlotte', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 30, 20, 2500, ['charlotte_core']),
        createAbilityNode('charlotte', 'a2', '衝擊力', '擊敗敵人時，夏洛蒂的攻擊力提升。', 50, 15, 40, 10000, ['charlotte_stat_atk1']),

        // Left Grip
        createStatNode('charlotte', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 30, 50, 30, 5000, ['charlotte_core']),
        createAbilityNode('charlotte', 'a4', '多樣性調查', '隊伍中存在楓丹角色時，夏洛蒂獲得治療加成；存在非楓丹角色時，獲得冰元素傷害加成。', 15, 50, 60, 20000, ['charlotte_stat_id1']),

        // Right Grip
        createStatNode('charlotte', 'er1', '能量恢復效率強化', { energyRegen: 0.04 }, 70, 50, 30, 5000, ['charlotte_core']),
        createAbilityNode('charlotte', 'a6', '獨家新聞', '啟用「溫控衝擊模型」時，夏洛蒂的移動速度提升。', 85, 50, 70, 30000, ['charlotte_stat_er1']),

        // Bottom Body
        createStatNode('charlotte', 'atk2', '攻擊力強化', { atk: 0.06 }, 35, 70, 50, 15000, ['charlotte_core']),
        createStatNode('charlotte', 'def1', '防禦力強化', { def: 0.06 }, 65, 70, 80, 45000, ['charlotte_core']),
    ],





    // --- HSR: Jade (翡翠) - Shape: Snake / Contract (Coiled) ---
    'jade': [
        {
            id: 'jade_core', type: 'CORE', name: '戰略投資部', description: '解鎖翡翠的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Tail Base
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Coil 1
        createStatNode('jade', 'qd1', '量子屬性傷害強化', { atk: 0.048 }, 35, 70, 20, 2500, ['jade_core']),
        createAbilityNode('jade', 'a2', '逆購', '敵方目標進入戰鬥時，翡翠獲得「當鋪」層數。', 20, 60, 40, 10000, ['jade_stat_qd1']),

        // Coil 2
        createStatNode('jade', 'atk1', '攻擊力強化', { atk: 0.06 }, 35, 40, 30, 5000, ['jade_ability_a2']),
        createAbilityNode('jade', 'a4', '折牙', '施放終結技時，無視敵方目標 12% 的防禦力。', 50, 30, 60, 20000, ['jade_stat_atk1']),

        // Head
        createStatNode('jade', 'cr1', '暴擊率強化', { critRate: 0.04 }, 65, 40, 50, 15000, ['jade_ability_a4']),
        createAbilityNode('jade', 'a6', '絕當', '天賦的追加攻擊造成的傷害提高 20%。', 80, 50, 70, 30000, ['jade_stat_cr1']),

        // Tongue
        createStatNode('jade', 'atk2', '攻擊力強化', { atk: 0.08 }, 90, 50, 80, 45000, ['jade_ability_a6']),
    ],

    // --- HSR: Rappa (亂破) - Shape: Graffiti / Shuriken (Star/Splash) ---
    'rappa': [
        {
            id: 'rappa_core', type: 'CORE', name: '巡海遊俠', description: '解鎖亂破的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, spd: 4 }
        },
        // Top Point
        createStatNode('rappa', 'be1', '擊破特攻強化', { breakEffect: 0.053 }, 50, 20, 20, 2500, ['rappa_core']),
        createAbilityNode('rappa', 'a2', '忍法', '擊破弱點時，額外造成一次擊破傷害。', 50, 10, 40, 10000, ['rappa_stat_be1']),

        // Left Point
        createStatNode('rappa', 'spd1', '速度強化', { spd: 2 }, 20, 50, 30, 5000, ['rappa_core']),
        createAbilityNode('rappa', 'a4', '塗鴉', '戰鬥開始時，恢復 20 點能量。', 10, 50, 60, 20000, ['rappa_stat_spd1']),

        // Right Point
        createStatNode('rappa', 'gd1', '虛數屬性傷害強化', { atk: 0.048 }, 80, 50, 30, 5000, ['rappa_core']),
        createAbilityNode('rappa', 'a6', '節奏', '施放終結技後，下一次普攻造成的傷害提高 50%。', 90, 50, 70, 30000, ['rappa_stat_gd1']),

        // Bottom Points
        createStatNode('rappa', 'atk1', '攻擊力強化', { atk: 0.06 }, 30, 80, 50, 15000, ['rappa_core']),
        createStatNode('rappa', 'be2', '擊破特攻強化', { breakEffect: 0.08 }, 70, 80, 50, 15000, ['rappa_core']),
    ],

    // --- Genshin: Mona (莫娜) - Shape: Astrolabe / Water Drop (Radial) ---
    'mona': [
        {
            id: 'mona_core', type: 'CORE', name: '阿斯托洛吉斯', description: '解鎖莫娜的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, energyRegen: 0.05 }
        },
        // Top Ring
        createStatNode('mona', 'er1', '能量恢復效率強化', { energyRegen: 0.04 }, 50, 20, 20, 2500, ['mona_core']),
        createAbilityNode('mona', 'a2', '老太婆來抓我啊', '進入虛實流動狀態 2 秒後，如果周圍存在敵人，則自動凝聚一個虛影。', 50, 10, 40, 10000, ['mona_stat_er1']),

        // Left Ring
        createStatNode('mona', 'wd1', '水屬性傷害強化', { atk: 0.048 }, 20, 50, 30, 5000, ['mona_core']),
        createAbilityNode('mona', 'a4', '托付於命運吧', '基於莫娜的元素充能效率，提升水元素傷害加成。', 10, 50, 60, 20000, ['mona_stat_wd1']),

        // Right Ring
        createStatNode('mona', 'atk1', '攻擊力強化', { atk: 0.06 }, 80, 50, 30, 5000, ['mona_core']),
        createAbilityNode('mona', 'a6', '運行原理', '合成武器突破素材時，有 25% 機率歸還部分合成材料。', 90, 50, 70, 30000, ['mona_stat_atk1']),

        // Bottom Ring
        createStatNode('mona', 'er2', '能量恢復效率強化', { energyRegen: 0.06 }, 50, 80, 50, 15000, ['mona_core']),
    ],

    // --- Genshin: Lisa (麗莎) - Shape: Hourglass / Rose (Curved) ---
    'lisa': [
        {
            id: 'lisa_core', type: 'CORE', name: '薔薇魔女', description: '解鎖麗莎的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Waist
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Top Bulb
        createStatNode('lisa', 'em1', '元素精通強化', { breakEffect: 0.04 }, 50, 30, 20, 2500, ['lisa_core']),
        createAbilityNode('lisa', 'a2', '電感餘震', '重擊命中時，為敵人施加引雷狀態。', 50, 15, 40, 10000, ['lisa_stat_em1']),

        // Bottom Bulb
        createStatNode('lisa', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 50, 70, 30, 5000, ['lisa_core']),
        createAbilityNode('lisa', 'a4', '靜電場力', '薔薇的雷光攻擊到的敵人，防禦力降低 15%。', 50, 85, 60, 20000, ['lisa_stat_ed1']),

        // Leaves
        createStatNode('lisa', 'atk1', '攻擊力強化', { atk: 0.06 }, 25, 50, 50, 15000, ['lisa_core']),
        createStatNode('lisa', 'em2', '元素精通強化', { breakEffect: 0.06 }, 75, 50, 50, 15000, ['lisa_core']),
        createAbilityNode('lisa', 'a6', '藥劑通識', '合成藥劑時，有 20% 機率返還部分合成材料。', 85, 50, 70, 30000, ['lisa_stat_em2']),
    ],

    // --- Genshin: Fischl (菲謝爾) - Shape: Raven / Bow (Bird Shape) ---
    'fischl': [
        {
            id: 'fischl_core', type: 'CORE', name: '斷罪皇女', description: '解鎖菲謝爾的基礎行跡盤',
            x: 50, y: 60, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Body
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Left Wing
        createStatNode('fischl', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 40, 20, 2500, ['fischl_core']),
        createAbilityNode('fischl', 'a2', '噬星魔鴉', '菲謝爾以蓄力射擊擊中奧茲時，奧茲會對附近敵人降下聖裁之雷。', 20, 30, 40, 10000, ['fischl_stat_atk1']),

        // Right Wing
        createStatNode('fischl', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 70, 40, 30, 5000, ['fischl_core']),
        createAbilityNode('fischl', 'a4', '斷罪雷影', '奧茲在場時，若當前場上角色觸發了雷元素相關反應，奧茲會對敵人降下聖裁之雷。', 80, 30, 60, 20000, ['fischl_stat_ed1']),

        // Head
        createStatNode('fischl', 'cr1', '暴擊率強化', { critRate: 0.027 }, 50, 30, 50, 15000, ['fischl_core']),
        createAbilityNode('fischl', 'a6', '吾之後花園', '在蒙德執行探索派遣任務時，探險時間縮短 25%。', 50, 15, 70, 30000, ['fischl_stat_cr1']),

        // Tail
        createStatNode('fischl', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 80, 45000, ['fischl_core']),
    ],

    // --- HSR: Lynx (玲可) - Shape: Campfire / Snowflake (Radial Warmth) ---
    'lynx': [
        {
            id: 'lynx_core', type: 'CORE', name: '極地探險家', description: '解鎖玲可的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Fire Center
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Top Flame
        createStatNode('lynx', 'hp1', '生命值強化', { hp: 0.05 }, 50, 25, 20, 2500, ['lynx_core']),
        createAbilityNode('lynx', 'a2', '探測', '施放戰技時，若目標生命值低於 50%，治療量提高 20%。', 50, 10, 40, 10000, ['lynx_stat_hp1']),

        // Left Log
        createStatNode('lynx', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 25, 70, 30, 5000, ['lynx_core']),
        createAbilityNode('lynx', 'a4', '極地', '抵抗控制類負面狀態的機率提高 35%。', 15, 80, 60, 20000, ['lynx_stat_res1']),

        // Right Log
        createStatNode('lynx', 'def1', '防禦力強化', { def: 0.05 }, 75, 70, 30, 5000, ['lynx_core']),
        createAbilityNode('lynx', 'a6', '求生', '天賦的持續治療效果延長 1 回合。', 85, 80, 70, 30000, ['lynx_stat_def1']),

        // Sparks
        createStatNode('lynx', 'hp2', '生命值強化', { hp: 0.06 }, 30, 40, 50, 15000, ['lynx_core']),
        createStatNode('lynx', 'res2', '效果抵抗強化', { effectRes: 0.06 }, 70, 40, 80, 45000, ['lynx_core']),
    ],

    // --- HSR: Pela (佩拉) - Shape: Glasses / Book (Round/Rectangular) ---
    'pela': [
        {
            id: 'pela_core', type: 'CORE', name: '情報官', description: '解鎖佩拉的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bridge
            statsModifier: { atk: 80, effectHitRate: 0.05 }
        },
        // Left Lens
        createStatNode('pela', 'ehr1', '效果命中強化', { effectHitRate: 0.04 }, 30, 50, 20, 2500, ['pela_core']),
        createAbilityNode('pela', 'a2', '痛擊', '對處於負面效果的敵方目標造成的傷害提高 20%。', 20, 50, 40, 10000, ['pela_stat_ehr1']),
        createStatNode('pela', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 30, 30, 50, 15000, ['pela_ability_a2']),

        // Right Lens
        createStatNode('pela', 'atk1', '攻擊力強化', { atk: 0.04 }, 70, 50, 30, 5000, ['pela_core']),
        createAbilityNode('pela', 'a4', '秘策', '佩拉在場時，我方全體效果命中提高 10%。', 80, 50, 60, 20000, ['pela_stat_atk1']),
        createStatNode('pela', 'ehr2', '效果命中強化', { effectHitRate: 0.06 }, 70, 70, 70, 30000, ['pela_ability_a4']),

        // Frame
        createStatNode('pela', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 20, 80, 45000, ['pela_core']),
        createAbilityNode('pela', 'a6', '追擊', '施放戰技解除增益效果後，下一次攻擊造成的傷害提高 20%。', 50, 80, 80, 45000, ['pela_core']),
    ],

    // --- HSR: Hook (虎克) - Shape: Mole / Claw (Digging) ---
    'hook': [
        {
            id: 'hook_core', type: 'CORE', name: '漆黑的虎克大人', description: '解鎖虎克的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Body
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Left Claw
        createStatNode('hook', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 60, 20, 2500, ['hook_core']),
        createAbilityNode('hook', 'a2', '天真', '天賦觸發時，恢復生命值。', 20, 40, 40, 10000, ['hook_stat_atk1']),

        // Right Claw
        createStatNode('hook', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 70, 60, 30, 5000, ['hook_core']),
        createAbilityNode('hook', 'a4', '加料', '戰技對灼燒狀態下的敵方目標造成的傷害提高 20%。', 80, 40, 60, 20000, ['hook_stat_fd1']),

        // Head
        createStatNode('hook', 'hp1', '生命值強化', { hp: 0.06 }, 50, 40, 50, 15000, ['hook_core']),
        createAbilityNode('hook', 'a6', '玩火', '施放終結技後，行動提前 20%，並恢復 5 點能量。', 50, 20, 70, 30000, ['hook_stat_hp1']),

        // Tail
        createStatNode('hook', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 95, 80, 45000, ['hook_core']),
    ],

    // --- HSR: Sushang (素裳) - Shape: Phoenix / Sword (Winged Blade) ---
    'sushang': [
        {
            id: 'sushang_core', type: 'CORE', name: '雲騎新人', description: '解鎖素裳的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Hilt
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Blade
        createStatNode('sushang', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 60, 20, 2500, ['sushang_core']),
        createAbilityNode('sushang', 'a2', '純真', '若場上有敵方目標的弱點被擊破，素裳的速度提高 15%。', 50, 40, 40, 10000, ['sushang_stat_atk1']),
        createStatNode('sushang', 'pd1', '物理屬性傷害強化', { atk: 0.048 }, 50, 20, 50, 15000, ['sushang_ability_a2']),

        // Left Wing
        createStatNode('sushang', 'hp1', '生命值強化', { hp: 0.05 }, 30, 70, 30, 5000, ['sushang_core']),
        createAbilityNode('sushang', 'a4', '逐寇', '施放戰技或終結技後，若場上有敵方目標的弱點被擊破，劍勢的觸發判定次數增加 2 次。', 15, 50, 60, 20000, ['sushang_stat_hp1']),

        // Right Wing
        createStatNode('sushang', 'be1', '擊破特攻強化', { breakEffect: 0.08 }, 70, 70, 30, 5000, ['sushang_core']),
        createAbilityNode('sushang', 'a6', '破敵', '普攻或戰技對弱點被擊破的敵方目標造成的傷害提高 20%。', 85, 50, 70, 30000, ['sushang_stat_be1']),
    ],

    // --- HSR: Yukong (馭空) - Shape: Kite / Bow (V-Shape) ---
    'yukong': [
        {
            id: 'yukong_core', type: 'CORE', name: '司舵', description: '解鎖馭空的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Left Wing
        createStatNode('yukong', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 60, 20, 2500, ['yukong_core']),
        createAbilityNode('yukong', 'a2', '襄尺', '被施加負面效果時，馭空可以抵抗該負面效果，此效果 2 回合後可再次觸發。', 15, 40, 40, 10000, ['yukong_stat_atk1']),

        // Right Wing
        createStatNode('yukong', 'gd1', '虛數屬性傷害強化', { atk: 0.048 }, 70, 60, 30, 5000, ['yukong_core']),
        createAbilityNode('yukong', 'a4', '遲彝', '馭空在場時，我方全體造成的虛數屬性傷害提高 12%。', 85, 40, 60, 20000, ['yukong_stat_gd1']),

        // Top
        createStatNode('yukong', 'hp1', '生命值強化', { hp: 0.06 }, 50, 40, 50, 15000, ['yukong_core']),
        createAbilityNode('yukong', 'a6', '氣壯', '持有「鳴弦號令」時，我方全體行動後，馭空恢復 2 點能量。', 50, 20, 70, 30000, ['yukong_stat_hp1']),

        // Tips
        createStatNode('yukong', 'atk2', '攻擊力強化', { atk: 0.06 }, 10, 20, 80, 45000, ['yukong_ability_a2']),
        createStatNode('yukong', 'res1', '效果抵抗強化', { effectRes: 0.06 }, 90, 20, 80, 45000, ['yukong_ability_a4']),
    ],

    // --- HSR: Guinaifen (桂乃芬) - Shape: Firecracker / Gong (Explosive) ---
    'guinaifen': [
        {
            id: 'guinaifen_core', type: 'CORE', name: '街頭藝人', description: '解鎖桂乃芬的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, effectHitRate: 0.05 }
        },
        // Top Burst
        createStatNode('guinaifen', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 50, 30, 20, 2500, ['guinaifen_core']),
        createAbilityNode('guinaifen', 'a2', '高蹺', '普攻有 80% 基礎機率使敵方目標陷入灼燒狀態。', 50, 15, 40, 10000, ['guinaifen_stat_fd1']),

        // Left Burst
        createStatNode('guinaifen', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 50, 30, 5000, ['guinaifen_core']),
        createAbilityNode('guinaifen', 'a4', '投擲', '戰鬥開始時，行動提前 25%。', 15, 50, 60, 20000, ['guinaifen_stat_atk1']),

        // Right Burst
        createStatNode('guinaifen', 'ehr1', '效果命中強化', { effectHitRate: 0.04 }, 70, 50, 30, 5000, ['guinaifen_core']),
        createAbilityNode('guinaifen', 'a6', '逾距', '對灼燒狀態下的敵方目標造成的傷害提高 20%。', 85, 50, 70, 30000, ['guinaifen_stat_ehr1']),

        // Bottom Burst
        createStatNode('guinaifen', 'be1', '擊破特攻強化', { breakEffect: 0.08 }, 50, 70, 50, 15000, ['guinaifen_core']),
        createStatNode('guinaifen', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 85, 80, 45000, ['guinaifen_stat_be1']),
    ],

    // --- HSR: Bailu (白露) - Shape: Gourd / Dragon Tail (Curved) ---
    'bailu': [
        {
            id: 'bailu_core', type: 'CORE', name: '銜藥龍女', description: '解鎖白露的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Left Curve
        createStatNode('bailu', 'hp1', '生命值強化', { hp: 0.05 }, 30, 70, 20, 2500, ['bailu_core']),
        createAbilityNode('bailu', 'a2', '岐黃精義', '白露對我方其他角色進行治療時，若該目標生命值高於生命上限的 100%，提高目標生命上限 10%，持續 2 回合。', 20, 50, 40, 10000, ['bailu_stat_hp1']),

        // Right Curve
        createStatNode('bailu', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 70, 70, 30, 5000, ['bailu_core']),
        createAbilityNode('bailu', 'a4', '持明脈息', '「生息」效果可觸發次數增加 1 次。', 80, 50, 60, 20000, ['bailu_stat_res1']),

        // Top Curve
        createStatNode('bailu', 'hp2', '生命值強化', { hp: 0.06 }, 50, 40, 50, 15000, ['bailu_core']),
        createAbilityNode('bailu', 'a6', '鱗淵福澤', '擁有「生息」狀態的角色受到的傷害降低 10%。', 50, 20, 70, 30000, ['bailu_stat_hp2']),

        // Tail Tip
        createStatNode('bailu', 'def1', '防禦力強化', { def: 0.06 }, 50, 10, 80, 45000, ['bailu_ability_a6']),
    ],

    // --- HSR: Qingque (青雀) - Shape: Mahjong Tile / Sparrow (Rectangular) ---
    'qingque': [
        {
            id: 'qingque_core', type: 'CORE', name: '太卜司卜者', description: '解鎖青雀的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center Tile
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Top Tile
        createStatNode('qingque', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 20, 20, 2500, ['qingque_core']),
        createAbilityNode('qingque', 'a2', '爭番', '施放戰技時，恢復 1 點戰技點。', 50, 10, 40, 10000, ['qingque_stat_atk1']),

        // Left Tile
        createStatNode('qingque', 'qd1', '量子屬性傷害強化', { atk: 0.048 }, 20, 50, 30, 5000, ['qingque_core']),
        createAbilityNode('qingque', 'a4', '聽牌', '施放戰技後，下一次普攻造成的傷害提高 10%。', 10, 50, 60, 20000, ['qingque_stat_qd1']),

        // Right Tile
        createStatNode('qingque', 'def1', '防禦力強化', { def: 0.05 }, 80, 50, 30, 5000, ['qingque_core']),
        createAbilityNode('qingque', 'a6', '搶槓', '施放強化普攻後，速度提高 10%，持續 1 回合。', 90, 50, 70, 30000, ['qingque_stat_def1']),

        // Bottom Tile
        createStatNode('qingque', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 50, 15000, ['qingque_core']),
        createStatNode('qingque', 'qd2', '量子屬性傷害強化', { atk: 0.064 }, 50, 90, 80, 45000, ['qingque_stat_atk2']),
    ],

    // --- HSR: Xueyi (雪衣) - Shape: Dagger / Chain (Sharp/Linked) ---
    'xueyi': [
        {
            id: 'xueyi_core', type: 'CORE', name: '十王司判官', description: '解鎖雪衣的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Hilt
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Blade
        createStatNode('xueyi', 'be1', '擊破特攻強化', { breakEffect: 0.053 }, 50, 50, 20, 2500, ['xueyi_core']),
        createAbilityNode('xueyi', 'a2', '預兆', '對生命值大於等於 50% 的敵方目標造成的傷害提高 10%。', 50, 30, 40, 10000, ['xueyi_stat_be1']),

        // Chain Left
        createStatNode('xueyi', 'qd1', '量子屬性傷害強化', { atk: 0.048 }, 30, 70, 30, 5000, ['xueyi_core']),
        createAbilityNode('xueyi', 'a4', '觀察', '施放終結技時，造成的削韌幅度提高。', 20, 60, 60, 20000, ['xueyi_stat_qd1']),

        // Chain Right
        createStatNode('xueyi', 'atk1', '攻擊力強化', { atk: 0.04 }, 70, 70, 30, 5000, ['xueyi_core']),
        createAbilityNode('xueyi', 'a6', '機樞', '基於擊破特攻，提高造成的傷害。', 80, 60, 70, 30000, ['xueyi_stat_atk1']),

        // Tip
        createStatNode('xueyi', 'be2', '擊破特攻強化', { breakEffect: 0.08 }, 50, 10, 80, 45000, ['xueyi_ability_a2']),
    ],

    // --- HSR: Hanya (寒鴉) - Shape: Brush / Talisman (Vertical) ---
    'hanya': [
        {
            id: 'hanya_core', type: 'CORE', name: '判官', description: '解鎖寒鴉的基礎行跡盤',
            x: 50, y: 20, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Brush Tip
            statsModifier: { atk: 80, spd: 4 }
        },
        // Brush Body
        createStatNode('hanya', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 40, 20, 2500, ['hanya_core']),
        createAbilityNode('hanya', 'a2', '錄事', '觸發天賦的戰技點恢復效果時，攻擊力提高 10%。', 50, 50, 40, 10000, ['hanya_stat_atk1']),

        // Talisman Left
        createStatNode('hanya', 'hp1', '生命值強化', { hp: 0.05 }, 30, 30, 30, 5000, ['hanya_core']),
        createAbilityNode('hanya', 'a4', '幽冥', '敵方目標陷入「承負」狀態時，受到的傷害提高。', 20, 40, 60, 20000, ['hanya_stat_hp1']),

        // Talisman Right
        createStatNode('hanya', 'spd1', '速度強化', { spd: 2 }, 70, 30, 30, 5000, ['hanya_core']),
        createAbilityNode('hanya', 'a6', '還陽', '施放終結技時，使目標速度提高。', 80, 40, 70, 30000, ['hanya_stat_spd1']),

        // Bottom
        createStatNode('hanya', 'pd1', '物理屬性傷害強化', { atk: 0.064 }, 50, 80, 80, 45000, ['hanya_ability_a2']),
    ],

    // --- Genshin: Nahida (納西妲) - Shape: Leaf / Shrine (Organic) ---
    'nahida': [
        {
            id: 'nahida_core', type: 'CORE', name: '小吉祥草王', description: '解鎖納西妲的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, breakEffect: 0.05 } // Using breakEffect for EM placeholder
        },
        // Top Leaf
        createStatNode('nahida', 'em1', '元素精通強化', { breakEffect: 0.04 }, 50, 20, 20, 2500, ['nahida_core']),
        createAbilityNode('nahida', 'a2', '淨善攝受明論', '施放摩耶之殿時，基於隊伍中元素精通最高的角色的元素精通，提高領域內當前場上角色的元素精通。', 50, 10, 40, 10000, ['nahida_stat_em1']),

        // Left Leaf
        createStatNode('nahida', 'dd1', '草屬性傷害強化', { atk: 0.048 }, 20, 60, 30, 5000, ['nahida_core']),
        createAbilityNode('nahida', 'a4', '慧明緣覺智論', '基於納西妲的元素精通，提高滅淨三業造成的傷害與暴擊率。', 10, 70, 60, 20000, ['nahida_stat_dd1']),

        // Right Leaf
        createStatNode('nahida', 'cr1', '暴擊率強化', { critRate: 0.027 }, 80, 60, 30, 5000, ['nahida_core']),
        createAbilityNode('nahida', 'a6', '諸相隨念淨行', '通過元素戰技採集採集物時，有一定機率獲得雙倍產出。', 90, 70, 70, 30000, ['nahida_stat_cr1']),

        // Stem
        createStatNode('nahida', 'em2', '元素精通強化', { breakEffect: 0.06 }, 50, 80, 80, 45000, ['nahida_core']),
    ],

    // --- Genshin: Collei (柯萊) - Shape: Boomerang / Cat (Curved) ---
    'collei': [
        {
            id: 'collei_core', type: 'CORE', name: '見習巡林員', description: '解鎖柯萊的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Left Curve
        createStatNode('collei', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 60, 20, 2500, ['collei_core']),
        createAbilityNode('collei', 'a2', '飛葉迴側', '飛葉輪返回時，若觸發了草元素相關反應，會賦予角色「新葉」狀態，持續造成草元素傷害。', 20, 40, 40, 10000, ['collei_stat_atk1']),

        // Right Curve
        createStatNode('collei', 'dd1', '草屬性傷害強化', { atk: 0.048 }, 70, 60, 30, 5000, ['collei_core']),
        createAbilityNode('collei', 'a4', '徐如曠林', '柯萊在場時，隊伍中所有角色的元素精通提升。', 80, 40, 60, 20000, ['collei_stat_dd1']),

        // Top Point
        createStatNode('collei', 'em1', '元素精通強化', { breakEffect: 0.06 }, 50, 30, 50, 15000, ['collei_core']),
        createAbilityNode('collei', 'a6', '須彌飛行冠軍', '滑翔消耗的體力降低 20%。', 50, 10, 70, 30000, ['collei_stat_em1']),

        // Cat Ears
        createStatNode('collei', 'atk2', '攻擊力強化', { atk: 0.06 }, 40, 20, 80, 45000, ['collei_ability_a6']),
        createStatNode('collei', 'hp1', '生命值強化', { hp: 0.06 }, 60, 20, 80, 45000, ['collei_ability_a6']),
    ],

    // --- HSR: Black Swan (黑天鵝) - Shape: Tarot Card / Crystal Ball (Rectangular) ---
    'blackswan': [
        {
            id: 'blackswan_core', type: 'CORE', name: '記憶守護者', description: '解鎖黑天鵝的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, effectHitRate: 0.05 }
        },
        // Top Card
        createStatNode('blackswan', 'ehr1', '效果命中強化', { effectHitRate: 0.04 }, 50, 20, 20, 2500, ['blackswan_core']),
        createAbilityNode('blackswan', 'a2', '髒中躁動', '施放戰技時，有 100% 基礎機率使受到攻擊的敵方目標陷入 1 層「奧跡」。', 50, 10, 40, 10000, ['blackswan_stat_ehr1']),

        // Left Card
        createStatNode('blackswan', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 20, 50, 30, 5000, ['blackswan_core']),
        createAbilityNode('blackswan', 'a4', '杯底端倪', '敵方目標進入戰鬥時，有 65% 基礎機率陷入 1 層「奧跡」。', 10, 50, 60, 20000, ['blackswan_stat_wd1']),

        // Right Card
        createStatNode('blackswan', 'atk1', '攻擊力強化', { atk: 0.04 }, 80, 50, 30, 5000, ['blackswan_core']),
        createAbilityNode('blackswan', 'a6', '燭影追隨', '基於效果命中提高造成的傷害。', 90, 50, 70, 30000, ['blackswan_stat_atk1']),

        // Bottom Card
        createStatNode('blackswan', 'ehr2', '效果命中強化', { effectHitRate: 0.06 }, 50, 80, 50, 15000, ['blackswan_core']),
        createStatNode('blackswan', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 90, 80, 45000, ['blackswan_stat_ehr2']),
    ],

    // --- HSR: Sparkle (花火) - Shape: Mask / Fox (Face) ---
    'sparkle': [
        {
            id: 'sparkle_core', type: 'CORE', name: '假面愚者', description: '解鎖花火的基礎行跡盤',
            x: 50, y: 60, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Nose
            statsModifier: { hp: 150, critDmg: 0.1 }
        },
        // Left Ear
        createStatNode('sparkle', 'hp1', '生命值強化', { hp: 0.05 }, 30, 30, 20, 2500, ['sparkle_core']),
        createAbilityNode('sparkle', 'a2', '歲時記', '普攻額外恢復 10 點能量。', 20, 20, 40, 10000, ['sparkle_stat_hp1']),

        // Right Ear
        createStatNode('sparkle', 'cd1', '暴擊傷害強化', { critDmg: 0.08 }, 70, 30, 30, 5000, ['sparkle_core']),
        createAbilityNode('sparkle', 'a4', '人造花', '戰技的暴擊傷害提高效果延長至目標下一個回合開始。', 80, 20, 60, 20000, ['sparkle_stat_cd1']),

        // Chin
        createStatNode('sparkle', 'spd1', '速度強化', { spd: 2 }, 50, 80, 50, 15000, ['sparkle_core']),
        createAbilityNode('sparkle', 'a6', '夜想曲', '我方全體攻擊力提高 15%。', 50, 90, 70, 30000, ['sparkle_stat_spd1']),

        // Cheeks
        createStatNode('sparkle', 'res1', '效果抵抗強化', { effectRes: 0.06 }, 20, 60, 80, 45000, ['sparkle_core']),
        createStatNode('sparkle', 'hp2', '生命值強化', { hp: 0.06 }, 80, 60, 80, 45000, ['sparkle_core']),
    ],

    // --- Genshin: Mavuika (瑪薇卡) - Shape: Sunglasses / Flame (Cool/Hot) ---
    'mavuika': [
        {
            id: 'mavuika_core', type: 'CORE', name: '火神', description: '解鎖瑪薇卡的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 100, critRate: 0.05 }
        },
        // Sunglasses Frame
        createStatNode('mavuika', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 40, 20, 2500, ['mavuika_core']),
        createStatNode('mavuika', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 70, 40, 20, 2500, ['mavuika_core']),

        // Lenses
        createAbilityNode('mavuika', 'a2', '戰爭之火', '處於「焚天」狀態下，全隊攻擊力提升。', 20, 50, 40, 10000, ['mavuika_stat_atk1']),
        createAbilityNode('mavuika', 'a4', '榮耀', '擊敗敵人後，恢復生命值並獲得傷害加成。', 80, 50, 60, 20000, ['mavuika_stat_fd1']),

        // Flame Top
        createStatNode('mavuika', 'cr1', '暴擊率強化', { critRate: 0.027 }, 50, 20, 30, 5000, ['mavuika_core']),
        createAbilityNode('mavuika', 'a6', '不滅', '受到致命傷害時，避免死亡並恢復生命值（冷卻時間 15 分鐘）。', 50, 10, 70, 30000, ['mavuika_stat_cr1']),

        // Flame Bottom
        createStatNode('mavuika', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 50, 15000, ['mavuika_core']),
        createStatNode('mavuika', 'fd2', '火屬性傷害強化', { atk: 0.064 }, 50, 90, 80, 45000, ['mavuika_stat_atk2']),
    ],

    // --- Genshin: Xilonen (希諾寧) - Shape: Roller Skate / Leopard (Speed/Wild) ---
    'xilonen': [
        {
            id: 'xilonen_core', type: 'CORE', name: '納塔名匠', description: '解鎖希諾寧的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Heel
            statsModifier: { def: 100, critRate: 0.05 }
        },
        // Skate Body
        createStatNode('xilonen', 'def1', '防禦力強化', { def: 0.05 }, 50, 60, 20, 2500, ['xilonen_core']),
        createAbilityNode('xilonen', 'a2', '採樣', '夜魂加持狀態下，普攻與重擊造成的傷害基於防禦力提升。', 50, 40, 40, 10000, ['xilonen_stat_def1']),

        // Wheels
        createStatNode('xilonen', 'gd1', '岩屬性傷害強化', { atk: 0.048 }, 30, 80, 30, 5000, ['xilonen_core']),
        createStatNode('xilonen', 'cr1', '暴擊率強化', { critRate: 0.027 }, 70, 80, 30, 5000, ['xilonen_core']),

        // Leopard Spots
        createAbilityNode('xilonen', 'a4', '鍛造', '隊伍中存在不同元素類型的角色時，希諾寧獲得不同的增益效果。', 20, 50, 60, 20000, ['xilonen_stat_gd1']),
        createAbilityNode('xilonen', 'a6', '節奏', '衝刺速度提升，體力消耗降低。', 80, 50, 70, 30000, ['xilonen_stat_cr1']),

        // Toe
        createStatNode('xilonen', 'def2', '防禦力強化', { def: 0.075 }, 50, 20, 80, 45000, ['xilonen_ability_a2']),
    ],

    // --- Genshin: Chasca (恰斯卡) - Shape: Feather / Hat (Aerial/Style) ---
    'chasca': [
        {
            id: 'chasca_core', type: 'CORE', name: '調停人', description: '解鎖恰斯卡的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, critDmg: 0.1 }
        },
        // Feather Shaft
        createStatNode('chasca', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 30, 20, 2500, ['chasca_core']),
        createAbilityNode('chasca', 'a2', '花羽', '在空中施放元素戰技時，可進行空中衝刺。', 50, 10, 40, 10000, ['chasca_stat_atk1']),

        // Feather Vane Left
        createStatNode('chasca', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 30, 40, 30, 5000, ['chasca_core']),
        createAbilityNode('chasca', 'a4', '擴散', '觸發擴散反應後，風元素傷害加成提升。', 15, 30, 60, 20000, ['chasca_stat_wd1']),

        // Feather Vane Right
        createStatNode('chasca', 'cd1', '暴擊傷害強化', { critDmg: 0.053 }, 70, 40, 30, 5000, ['chasca_core']),
        createAbilityNode('chasca', 'a6', '精準', '瞄準射擊造成的傷害提升。', 85, 30, 70, 30000, ['chasca_stat_cd1']),

        // Hat Brim
        createStatNode('chasca', 'atk2', '攻擊力強化', { atk: 0.06 }, 20, 70, 50, 15000, ['chasca_core']),
        createStatNode('chasca', 'wd2', '風屬性傷害強化', { atk: 0.064 }, 80, 70, 80, 45000, ['chasca_core']),
    ],

    // --- Genshin: Chevreuse (夏沃蕾) - Shape: Musket / Hat (Weapon/Uniform) ---
    'chevreuse': [
        {
            id: 'chevreuse_core', type: 'CORE', name: '特巡隊隊長', description: '解鎖夏沃蕾的基礎行跡盤',
            x: 20, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Stock
            statsModifier: { hp: 150, atk: 50 }
        },
        // Barrel
        createStatNode('chevreuse', 'hp1', '生命值強化', { hp: 0.05 }, 40, 60, 20, 2500, ['chevreuse_core']),
        createAbilityNode('chevreuse', 'a2', '尖兵協同', '隊伍中所有角色的元素類型均為火元素與雷元素時，超載反應造成的傷害提升。', 60, 40, 40, 10000, ['chevreuse_stat_hp1']),
        createStatNode('chevreuse', 'atk1', '攻擊力強化', { atk: 0.06 }, 80, 20, 50, 15000, ['chevreuse_ability_a2']),

        // Trigger
        createStatNode('chevreuse', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 40, 80, 30, 5000, ['chevreuse_core']),
        createAbilityNode('chevreuse', 'a4', '縱陣武力', '夏沃蕾發射「超量裝藥彈頭」後，基於夏沃蕾的生命值上限，提升隊伍中所有火元素與雷元素角色的攻擊力。', 50, 90, 60, 20000, ['chevreuse_stat_fd1']),

        // Hat
        createStatNode('chevreuse', 'hp2', '生命值強化', { hp: 0.08 }, 30, 30, 70, 30000, ['chevreuse_stat_hp1']),
        createAbilityNode('chevreuse', 'a6', '迅捷', '衝刺消耗的體力降低 20%。', 50, 10, 80, 45000, ['chevreuse_stat_atk1']),
    ],

    // --- Genshin: Emilie (艾梅莉埃) - Shape: Perfume Bottle / Flower (Elegant) ---
    'emilie': [
        {
            id: 'emilie_core', type: 'CORE', name: '調香師', description: '解鎖艾梅莉埃的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bottle Base
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Bottle Neck
        createStatNode('emilie', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 60, 20, 2500, ['emilie_core']),
        createAbilityNode('emilie', 'a2', '餘薰', '場上存在「柔燈之匣」時，艾梅莉埃對燃燒狀態下的敵人造成的傷害提升。', 50, 40, 40, 10000, ['emilie_stat_atk1']),

        // Flower Petal Left
        createStatNode('emilie', 'dd1', '草屬性傷害強化', { atk: 0.048 }, 30, 30, 30, 5000, ['emilie_ability_a2']),
        createAbilityNode('emilie', 'a4', '精餾', '基於艾梅莉埃的攻擊力，提升「柔燈之匣」造成的傷害。', 20, 20, 60, 20000, ['emilie_stat_dd1']),

        // Flower Petal Right
        createStatNode('emilie', 'cr1', '暴擊率強化', { critRate: 0.027 }, 70, 30, 30, 5000, ['emilie_ability_a2']),
        createAbilityNode('emilie', 'a6', '香氛', '對抗燃燒反應造成的傷害時，火元素抗性提升。', 80, 20, 70, 30000, ['emilie_stat_cr1']),

        // Spray
        createStatNode('emilie', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 10, 80, 45000, ['emilie_ability_a2']),
    ],

    // --- HSR: Lingsha (靈砂) - Shape: Incense Burner / Rabbit (Mystical) ---
    'lingsha': [
        {
            id: 'lingsha_core', type: 'CORE', name: '丹鼎司司鼎', description: '解鎖靈砂的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Burner Base
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Smoke/Rabbit Body
        createStatNode('lingsha', 'be1', '擊破特攻強化', { breakEffect: 0.053 }, 50, 60, 20, 2500, ['lingsha_core']),
        createAbilityNode('lingsha', 'a2', '煙霞', '施放戰技時，解除我方全體 1 個負面效果。', 50, 40, 40, 10000, ['lingsha_stat_be1']),

        // Rabbit Ear Left
        createStatNode('lingsha', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 30, 20, 30, 5000, ['lingsha_ability_a2']),
        createAbilityNode('lingsha', 'a4', '蘭芳', '處於「浮元」狀態下的敵方目標，受到的擊破傷害提高。', 20, 10, 60, 20000, ['lingsha_stat_fd1']),

        // Rabbit Ear Right
        createStatNode('lingsha', 'atk1', '攻擊力強化', { atk: 0.04 }, 70, 20, 30, 5000, ['lingsha_ability_a2']),
        createAbilityNode('lingsha', 'a6', '朱燎', '基於擊破特攻，提高攻擊力與治療量。', 80, 10, 70, 30000, ['lingsha_stat_atk1']),

        // Incense Sticks
        createStatNode('lingsha', 'be2', '擊破特攻強化', { breakEffect: 0.08 }, 30, 80, 50, 15000, ['lingsha_core']),
        createStatNode('lingsha', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 80, 80, 45000, ['lingsha_core']),
    ],

    // --- HSR: Fugue (忘歸人) - Shape: Fox Fire / Fan (Dark/Alluring) ---
    'fugue': [
        {
            id: 'fugue_core', type: 'CORE', name: '絕滅大君(擬)', description: '解鎖忘歸人的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 100, breakEffect: 0.05 }
        },
        // Fan Spread
        createStatNode('fugue', 'be1', '擊破特攻強化', { breakEffect: 0.053 }, 30, 30, 20, 2500, ['fugue_core']),
        createStatNode('fugue', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['fugue_core']),
        createStatNode('fugue', 'atk1', '攻擊力強化', { atk: 0.04 }, 70, 30, 20, 2500, ['fugue_core']),

        // Fox Fire (Abilities)
        createAbilityNode('fugue', 'a2', '狐影', '使敵方目標陷入「迷醉」狀態，受到的擊破傷害提高。', 20, 50, 40, 10000, ['fugue_stat_be1']),
        createAbilityNode('fugue', 'a4', '妖火', '擊破弱點時，額外造成一次火屬性擊破傷害。', 50, 80, 60, 20000, ['fugue_stat_fd1']),
        createAbilityNode('fugue', 'a6', '歸途', '處於「迷醉」狀態下的敵方目標，攻擊力降低。', 80, 50, 70, 30000, ['fugue_stat_atk1']),

        // Tail Tips
        createStatNode('fugue', 'be2', '擊破特攻強化', { breakEffect: 0.08 }, 10, 70, 50, 15000, ['fugue_ability_a2']),
        createStatNode('fugue', 'atk2', '攻擊力強化', { atk: 0.06 }, 90, 70, 80, 45000, ['fugue_ability_a6']),
    ],

    // --- Genshin: Yoimiya (宵宮) - Shape: Fireworks / Goldfish (Explosive) ---
    'yoimiya': [
        {
            id: 'yoimiya_core', type: 'CORE', name: '夏祭女王', description: '解鎖宵宮的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 100, critRate: 0.05 }
        },
        // Firework Burst Top
        createStatNode('yoimiya', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['yoimiya_core']),
        createAbilityNode('yoimiya', 'a2', '袖火百景圖', '普通攻擊命中後，火元素傷害加成提升。', 50, 10, 40, 10000, ['yoimiya_stat_fd1']),

        // Firework Burst Left
        createStatNode('yoimiya', 'atk1', '攻擊力強化', { atk: 0.04 }, 20, 50, 30, 5000, ['yoimiya_core']),
        createAbilityNode('yoimiya', 'a4', '炎晝風物詩', '施放琉金雲間草後，隊伍中其他角色的攻擊力提升。', 10, 50, 60, 20000, ['yoimiya_stat_atk1']),

        // Firework Burst Right
        createStatNode('yoimiya', 'cr1', '暴擊率強化', { critRate: 0.027 }, 80, 50, 30, 5000, ['yoimiya_core']),
        createAbilityNode('yoimiya', 'a6', '炎色配比', '製作裝潢、擺設、景觀類擺設時，有 100% 機率返還部分材料。', 90, 50, 70, 30000, ['yoimiya_stat_cr1']),

        // Goldfish Tail
        createStatNode('yoimiya', 'atk2', '攻擊力強化', { atk: 0.06 }, 30, 80, 50, 15000, ['yoimiya_core']),
        createStatNode('yoimiya', 'fd2', '火屬性傷害強化', { atk: 0.064 }, 70, 80, 80, 45000, ['yoimiya_core']),
    ],

    // --- Genshin: Kokomi (珊瑚宮心海) - Shape: Jellyfish / Shell (Fluid) ---
    'kokomi': [
        {
            id: 'kokomi_core', type: 'CORE', name: '現人神巫女', description: '解鎖心海的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Jellyfish Body
        createStatNode('kokomi', 'hp1', '生命值強化', { hp: 0.05 }, 50, 60, 20, 2500, ['kokomi_core']),
        createAbilityNode('kokomi', 'a2', '匣中玉櫛', '施放海人化羽時，若場上存在化海月，則重置化海月的存在時間。', 50, 40, 40, 10000, ['kokomi_stat_hp1']),

        // Tentacle Left
        createStatNode('kokomi', 'wd1', '水屬性傷害強化', { atk: 0.048 }, 30, 70, 30, 5000, ['kokomi_core']),
        createAbilityNode('kokomi', 'a4', '真珠御唄', '處於海人化羽的儀來羽衣狀態下時，基於治療加成進一步提升普攻與重擊的傷害。', 20, 50, 60, 20000, ['kokomi_stat_wd1']),

        // Tentacle Right
        createStatNode('kokomi', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 70, 70, 30, 5000, ['kokomi_core']),
        createAbilityNode('kokomi', 'a6', '海祇姬君', '隊伍中自己的角色游泳消耗的體力降低 20%。', 80, 50, 70, 30000, ['kokomi_stat_hb1']),

        // Top Bubble
        createStatNode('kokomi', 'hp2', '生命值強化', { hp: 0.08 }, 50, 20, 80, 45000, ['kokomi_ability_a2']),
    ],

    // --- Genshin: Kujou Sara (九條裟羅) - Shape: Fan / Crow Mask (Tengu) ---
    'kujousara': [
        {
            id: 'sara_core', type: 'CORE', name: '天領奉行大將', description: '解鎖九條裟羅的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Handle
            statsModifier: { atk: 80, energyRegen: 0.05 }
        },
        // Fan Spread
        createStatNode('sara', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 60, 20, 2500, ['sara_core']),
        createAbilityNode('sara', 'a2', '不動心', '處於鴉羽天狗霆雷召咒的「烏羽護持」狀態下的角色，攻擊力提升。', 50, 40, 40, 10000, ['sara_stat_atk1']),

        // Left Wing
        createStatNode('sara', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 30, 50, 30, 5000, ['sara_core']),
        createAbilityNode('sara', 'a4', '御公儀', '烏羽護持命中敵人後，基於九條裟羅的元素充能效率，為隊伍中所有角色恢復元素能量。', 20, 30, 60, 20000, ['sara_stat_ed1']),

        // Right Wing
        createStatNode('sara', 'er1', '能量恢復強化', { energyRegen: 0.05 }, 70, 50, 30, 5000, ['sara_core']),
        createAbilityNode('sara', 'a6', '檢地', '在稻妻執行探索派遣任務時，消耗的時間縮短 25%。', 80, 30, 70, 30000, ['sara_stat_er1']),

        // Top
        createStatNode('sara', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 20, 80, 45000, ['sara_ability_a2']),
    ],

    // --- Genshin: Kuki Shinobu (久岐忍) - Shape: Mask / Whip (Ninja) ---
    'kukishinobu': [
        {
            id: 'shinobu_core', type: 'CORE', name: '荒瀧派副手', description: '解鎖久岐忍的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 100, breakEffect: 0.05 }
        },
        // Mask Eyes
        createStatNode('shinobu', 'hp1', '生命值強化', { hp: 0.05 }, 35, 40, 20, 2500, ['shinobu_core']),
        createStatNode('shinobu', 'em1', '元素精通強化', { breakEffect: 0.04 }, 65, 40, 20, 2500, ['shinobu_core']),

        // Whip Lash
        createAbilityNode('shinobu', 'a2', '破籠之志', '越祓雷草之輪的治療量與傷害基於久岐忍的元素精通提升。', 20, 60, 40, 10000, ['shinobu_stat_hp1']),
        createAbilityNode('shinobu', 'a4', '安心之所', '久岐忍的生命值不高於 50% 時，治療加成提升。', 80, 60, 60, 20000, ['shinobu_stat_em1']),

        // Mask Chin
        createStatNode('shinobu', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 50, 80, 50, 15000, ['shinobu_core']),
        createAbilityNode('shinobu', 'a6', '久岐忍流', '在稻妻執行探索派遣任務時，獲得的獎勵增加 25%。', 50, 95, 80, 45000, ['shinobu_stat_ed1']),

        // Top Knot
        createStatNode('shinobu', 'hp2', '生命值強化', { hp: 0.08 }, 50, 20, 70, 30000, ['shinobu_core']),
    ],

    // --- Genshin: Kirara (綺良良) - Shape: Box / Cat Paw (Delivery) ---
    'kirara': [
        {
            id: 'kirara_core', type: 'CORE', name: '快遞員', description: '解鎖綺良良的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Box Base
            statsModifier: { hp: 100, def: 50 }
        },
        // Box Sides
        createStatNode('kirara', 'hp1', '生命值強化', { hp: 0.05 }, 30, 60, 20, 2500, ['kirara_core']),
        createStatNode('kirara', 'hp2', '生命值強化', { hp: 0.05 }, 70, 60, 20, 2500, ['kirara_core']),

        // Cat Paws (Abilities)
        createAbilityNode('kirara', 'a2', '妖說歧尾之變', '嗚喵町飛足撞擊敵人時，為綺良良生成安全運輸護盾。', 20, 40, 40, 10000, ['kirara_stat_hp1']),
        createAbilityNode('kirara', 'a4', '應時惑目之靈', '基於綺良良的生命值上限，提升嗚喵町飛足與秘法·驚喜特派的傷害。', 80, 40, 60, 20000, ['kirara_stat_hp2']),

        // Box Top
        createStatNode('kirara', 'dd1', '草屬性傷害強化', { atk: 0.048 }, 50, 40, 50, 15000, ['kirara_core']),
        createAbilityNode('kirara', 'a6', '祟祟貓箱', '綺良良在隊伍中時，接近產出禽肉、獸肉與冷鮮肉的小動物時，不會輕易驚動牠們。', 50, 20, 80, 45000, ['kirara_stat_dd1']),
    ],

    // --- Genshin: Chiori (千織) - Shape: Scissors / Kimono (Design) ---
    'chiori': [
        {
            id: 'chiori_core', type: 'CORE', name: '千織屋老闆', description: '解鎖千織的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Pivot
            statsModifier: { atk: 80, def: 80 }
        },
        // Blade Left
        createStatNode('chiori', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 30, 20, 2500, ['chiori_core']),
        createAbilityNode('chiori', 'a2', '量體裁衣', '施放羽袖一觸後，依據後續操作產生不同效果（切換角色或自身獲得岩元素附魔）。', 15, 15, 40, 10000, ['chiori_stat_atk1']),

        // Blade Right
        createStatNode('chiori', 'def1', '防禦力強化', { def: 0.05 }, 70, 30, 30, 5000, ['chiori_core']),
        createAbilityNode('chiori', 'a4', '錦上添花', '隊伍中創造岩元素創造物時，千織獲得岩元素傷害加成。', 85, 15, 60, 20000, ['chiori_stat_def1']),

        // Handle Left
        createStatNode('chiori', 'gd1', '岩屬性傷害強化', { atk: 0.048 }, 30, 70, 50, 15000, ['chiori_core']),
        createAbilityNode('chiori', 'a6', '衣香襟影', '隊伍中自己的角色在白天移動速度提升。', 15, 85, 80, 45000, ['chiori_stat_gd1']),

        // Handle Right
        createStatNode('chiori', 'cr1', '暴擊率強化', { critRate: 0.04 }, 70, 70, 70, 30000, ['chiori_core']),
    ],

    // --- HSR: Serval (希露瓦) - Shape: Guitar / Lightning Bolt (Rock) ---
    'serval': [
        {
            id: 'serval_core', type: 'CORE', name: '機械師', description: '解鎖希露瓦的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Guitar Body
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Neck
        createStatNode('serval', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 60, 20, 2500, ['serval_core']),
        createStatNode('serval', 'cr1', '暴擊率強化', { critRate: 0.027 }, 50, 40, 30, 5000, ['serval_core']),

        // Headstock
        createAbilityNode('serval', 'a2', '搖滾', '戰技造成傷害時，有 100% 基礎機率使受到攻擊的敵方目標陷入觸電狀態。', 50, 20, 40, 10000, ['serval_stat_cr1']),

        // Lightning Bolt Left
        createStatNode('serval', 'ld1', '雷屬性傷害強化', { atk: 0.048 }, 30, 70, 50, 15000, ['serval_core']),
        createAbilityNode('serval', 'a4', '電音', '戰鬥開始時，立即恢復 15 點能量。', 20, 50, 60, 20000, ['serval_stat_ld1']),

        // Lightning Bolt Right
        createStatNode('serval', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 70, 70, 30000, ['serval_core']),
        createAbilityNode('serval', 'a6', '狂熱', '擊破敵方目標弱點後，攻擊力提高 20%。', 80, 50, 80, 45000, ['serval_stat_atk2']),
    ],

    // --- HSR: Natasha (娜塔莎) - Shape: Bear / Pill (Doctor) ---
    'natasha': [
        {
            id: 'natasha_core', type: 'CORE', name: '醫生', description: '解鎖娜塔莎的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 100, outgoingHealing: 0.1 }
        },
        // Bear Ears
        createStatNode('natasha', 'hp1', '生命值強化', { hp: 0.05 }, 30, 30, 20, 2500, ['natasha_core']),
        createStatNode('natasha', 'res1', '效果抵抗強化', { effectRes: 0.04 }, 70, 30, 20, 2500, ['natasha_core']),

        // Arms (Abilities)
        createAbilityNode('natasha', 'a2', '舒緩', '戰技解除我方單體的 1 個負面效果。', 20, 50, 40, 10000, ['natasha_stat_hp1']),
        createAbilityNode('natasha', 'a4', '醫者', '娜塔莎的治療量隨目標生命值降低而提高。', 80, 50, 60, 20000, ['natasha_stat_res1']),

        // Body Bottom
        createStatNode('natasha', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 50, 80, 50, 15000, ['natasha_core']),
        createAbilityNode('natasha', 'a6', '恢復', '施放戰技後，持續治療效果延長 1 回合。', 50, 95, 80, 45000, ['natasha_stat_hb1']),
    ],

    // --- HSR: Herta (黑塔) - Shape: Puppet / Diamond (Genius) ---
    'herta': [
        {
            id: 'herta_core', type: 'CORE', name: '黑塔女士', description: '解鎖黑塔的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Diamond Points
        createStatNode('herta', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['herta_core']), // Top
        createStatNode('herta', 'atk1', '攻擊力強化', { atk: 0.04 }, 20, 50, 30, 5000, ['herta_core']), // Left
        createStatNode('herta', 'cr1', '暴擊率強化', { critRate: 0.027 }, 80, 50, 30, 5000, ['herta_core']), // Right
        createStatNode('herta', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 50, 15000, ['herta_core']), // Bottom

        // Abilities (Corners)
        createAbilityNode('herta', 'a2', '效率', '戰技對生命值大於等於 50% 的敵方目標造成的傷害提高 25%。', 20, 20, 40, 10000, ['herta_stat_id1']),
        createAbilityNode('herta', 'a4', '人偶', '觸發追加攻擊後，暴擊率提高。', 80, 20, 60, 20000, ['herta_stat_cr1']),
        createAbilityNode('herta', 'a6', '冰結', '施放終結技時，對凍結狀態下的敵人造成的傷害提高。', 20, 80, 70, 30000, ['herta_stat_atk2']),
    ],

    // --- HSR: Asta (艾絲妲) - Shape: Telescope / Star (Astronomy) ---
    'asta': [
        {
            id: 'asta_core', type: 'CORE', name: '代理站長', description: '解鎖艾絲妲的基礎行跡盤',
            x: 20, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 80, spd: 4 }
        },
        // Telescope Tube
        createStatNode('asta', 'atk1', '攻擊力強化', { atk: 0.04 }, 40, 60, 20, 2500, ['asta_core']),
        createAbilityNode('asta', 'a2', '火花', '普攻有 80% 基礎機率使敵方目標陷入灼燒狀態。', 60, 40, 40, 10000, ['asta_stat_atk1']),
        createStatNode('asta', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 80, 20, 50, 15000, ['asta_ability_a2']),

        // Lens/Star
        createStatNode('asta', 'def1', '防禦力強化', { def: 0.05 }, 30, 30, 30, 5000, ['asta_ability_a2']),
        createAbilityNode('asta', 'a4', '點燃', '艾絲妲在場時，我方全體火屬性傷害提高 18%。', 50, 10, 60, 20000, ['asta_stat_fd1']),

        // Tripod Leg
        createStatNode('asta', 'cr1', '暴擊率強化', { critRate: 0.027 }, 40, 80, 70, 30000, ['asta_core']),
        createAbilityNode('asta', 'a6', '星座', '艾絲妲每擁有 1 層「蓄能」，防禦力提高 6%。', 60, 90, 80, 45000, ['asta_stat_cr1']),
    ],
    // --- Genshin: Beidou (北斗) - Shape: Ship / Sea Serpent (Nautical) ---
    'beidou': [
        {
            id: 'beidou_core', type: 'CORE', name: '南十字頭領', description: '解鎖北斗的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Ship Hull
            statsModifier: { atk: 80, hp: 100 }
        },
        // Mast
        createStatNode('beidou', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 50, 20, 2500, ['beidou_core']),
        createAbilityNode('beidou', 'a2', '遍宇靈光', '在被攻擊的瞬間施放捉浪，擁有最高傷害加成。', 50, 30, 40, 10000, ['beidou_stat_atk1']),

        // Sail Left
        createStatNode('beidou', 'ed1', '雷屬性傷害強化', { atk: 0.048 }, 30, 40, 30, 5000, ['beidou_stat_atk1']),
        createAbilityNode('beidou', 'a4', '霹靂連霄', '施放擁有最高傷害加成的捉浪後的 10 秒內，普攻與重擊傷害提高 15%，攻擊速度提高 15%。', 20, 20, 60, 20000, ['beidou_stat_ed1']),

        // Sail Right
        createStatNode('beidou', 'hp1', '生命值強化', { hp: 0.06 }, 70, 40, 50, 15000, ['beidou_stat_atk1']),
        createAbilityNode('beidou', 'a6', '擁濤踏浪', '游泳消耗的體力降低 20%。', 80, 20, 70, 30000, ['beidou_stat_hp1']),

        // Bow
        createStatNode('beidou', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 10, 80, 45000, ['beidou_ability_a2']),
    ],

    // --- Genshin: Ningguang (凝光) - Shape: Jade Chamber / Screen (Geometric) ---
    'ningguang': [
        {
            id: 'ningguang_core', type: 'CORE', name: '天權星', description: '解鎖凝光的基礎行跡盤',
            x: 50, y: 85, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Floating Platform
        createStatNode('ningguang', 'gd1', '岩屬性傷害強化', { atk: 0.048 }, 50, 60, 20, 2500, ['ningguang_core']),
        createAbilityNode('ningguang', 'a2', '物換星移', '持有星璇時，凝光的重擊不消耗體力。', 50, 40, 40, 10000, ['ningguang_stat_gd1']),

        // Screen Left
        createStatNode('ningguang', 'atk1', '攻擊力強化', { atk: 0.04 }, 20, 60, 30, 5000, ['ningguang_stat_gd1']),
        createAbilityNode('ningguang', 'a4', '儲之千日', '穿過璇璣屏的角色會獲得 12% 岩元素傷害加成。', 20, 40, 60, 20000, ['ningguang_stat_atk1']),

        // Screen Right
        createStatNode('ningguang', 'gd2', '岩屬性傷害強化', { atk: 0.048 }, 80, 60, 50, 15000, ['ningguang_stat_gd1']),
        createAbilityNode('ningguang', 'a6', '奇石寶藏', '在小地圖上顯示周圍的礦脈位置。', 80, 40, 70, 30000, ['ningguang_stat_gd2']),

        // Palace Top
        createStatNode('ningguang', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 20, 80, 45000, ['ningguang_ability_a2']),
    ],

    // --- Genshin: Xiangling (香菱) - Shape: Guoba / Chili (Cute/Spicy) ---
    'xiangling': [
        {
            id: 'xiangling_core', type: 'CORE', name: '萬民堂大廚', description: '解鎖香菱的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Chili Top
        createStatNode('xiangling', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['xiangling_core']),
        createAbilityNode('xiangling', 'a2', '交叉火力', '鍋巴的噴火距離提高 20%。', 50, 10, 40, 10000, ['xiangling_stat_fd1']),

        // Guoba Left Arm
        createStatNode('xiangling', 'em1', '元素精通強化', { breakEffect: 0.04 }, 20, 50, 30, 5000, ['xiangling_core']),
        createAbilityNode('xiangling', 'a4', '絕雲朝天椒', '鍋巴出擊效果結束時，會在消失的位置留下辣椒，拾取後攻擊力提高 10%。', 10, 50, 60, 20000, ['xiangling_stat_em1']),

        // Guoba Right Arm
        createStatNode('xiangling', 'atk1', '攻擊力強化', { atk: 0.04 }, 80, 50, 50, 15000, ['xiangling_core']),
        createAbilityNode('xiangling', 'a6', '萬民堂大廚', '完美烹飪攻擊類食物時，有 12% 機率獲得 2 倍產出。', 90, 50, 70, 30000, ['xiangling_stat_atk1']),

        // Bottom
        createStatNode('xiangling', 'fd2', '火屬性傷害強化', { atk: 0.064 }, 50, 80, 80, 45000, ['xiangling_core']),
    ],

    // --- Genshin: Yanfei (煙緋) - Shape: Scale / Book (Legal) ---
    'yanfei': [
        {
            id: 'yanfei_core', type: 'CORE', name: '律法諮詢師', description: '解鎖煙緋的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Scale Pillar
        createStatNode('yanfei', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 50, 20, 2500, ['yanfei_core']),
        createAbilityNode('yanfei', 'a2', '關聯條款', '煙緋通過重擊消耗丹火印時，每消耗一枚，岩元素傷害加成提升 5%。', 50, 30, 40, 10000, ['yanfei_stat_atk1']),

        // Scale Left Pan
        createStatNode('yanfei', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 20, 60, 30, 5000, ['yanfei_core']),
        createAbilityNode('yanfei', 'a4', '法獸灼眼', '煙緋主動施放的重擊對敵人造成暴擊時，額外造成一次 80% 攻擊力的火元素範圍傷害。', 10, 60, 60, 20000, ['yanfei_stat_fd1']),

        // Scale Right Pan
        createStatNode('yanfei', 'cr1', '暴擊率強化', { critRate: 0.027 }, 80, 60, 50, 15000, ['yanfei_core']),
        createAbilityNode('yanfei', 'a6', '博聞強記', '在小地圖上顯示周圍的璃月區域特產的位置。', 90, 60, 70, 30000, ['yanfei_stat_cr1']),

        // Top Balance
        createStatNode('yanfei', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 10, 80, 45000, ['yanfei_ability_a2']),
    ],

    // --- Genshin: Yun Jin (雲堇) - Shape: Flag / Spear (Opera) ---
    'yunjin': [
        {
            id: 'yunjin_core', type: 'CORE', name: '雲翰社當家', description: '解鎖雲堇的基礎行跡盤',
            x: 50, y: 90, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { def: 80, energyRegen: 0.05 }
        },
        // Spear Shaft
        createStatNode('yunjin', 'def1', '防禦力強化', { def: 0.05 }, 50, 60, 20, 2500, ['yunjin_core']),
        createAbilityNode('yunjin', 'a2', '務守本真', '被攻擊瞬間施放旋雲開相，會以長按二段蓄力的形式施放。', 50, 40, 40, 10000, ['yunjin_stat_def1']),

        // Flag Left
        createStatNode('yunjin', 'er1', '能量恢復效率強化', { energyRegen: 0.04 }, 30, 30, 30, 5000, ['yunjin_ability_a2']),
        createAbilityNode('yunjin', 'a4', '莫從恆蹊', '飛雲旗陣提供的普通攻擊傷害提高，提高值基於隊伍中角色元素類型的數量。', 20, 20, 60, 20000, ['yunjin_stat_er1']),

        // Flag Right
        createStatNode('yunjin', 'gd1', '岩屬性傷害強化', { atk: 0.048 }, 70, 30, 50, 15000, ['yunjin_ability_a2']),
        createAbilityNode('yunjin', 'a6', '清食養性', '完美烹飪冒險類食物時，有 12% 機率獲得 2 倍產出。', 80, 20, 70, 30000, ['yunjin_stat_gd1']),

        // Spear Tip
        createStatNode('yunjin', 'def2', '防禦力強化', { def: 0.075 }, 50, 10, 80, 45000, ['yunjin_ability_a2']),
    ],

    // --- Genshin: Qiqi (七七) - Shape: Talisman / Finches (Undead/Cute) ---
    'qiqi': [
        {
            id: 'qiqi_core', type: 'CORE', name: '採藥姑娘', description: '解鎖七七的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, outgoingHealing: 0.1 }
        },
        // Talisman Top
        createStatNode('qiqi', 'atk1', '攻擊力強化', { atk: 0.04 }, 50, 20, 20, 2500, ['qiqi_core']),
        createAbilityNode('qiqi', 'a2', '延命妙法', '處於仙法·寒病鬼差狀態下的角色觸發元素反應時，受治療加成提升 20%。', 50, 10, 40, 10000, ['qiqi_stat_atk1']),

        // Left Finch
        createStatNode('qiqi', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 20, 50, 30, 5000, ['qiqi_core']),
        createAbilityNode('qiqi', 'a4', '玉籤偶開', '七七的普通攻擊與重擊命中敵人時，有 50% 機率為敵人施加一枚度厄真符。', 10, 50, 60, 20000, ['qiqi_stat_hb1']),

        // Right Finch
        createStatNode('qiqi', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 80, 50, 50, 15000, ['qiqi_core']),
        createAbilityNode('qiqi', 'a6', '前塵舊憶', '在小地圖上顯示周圍的璃月區域特產的位置。', 90, 50, 70, 30000, ['qiqi_stat_id1']),

        // Bottom
        createStatNode('qiqi', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 80, 45000, ['qiqi_core']),
    ],

    // --- Genshin: Yaoyao (瑤瑤) - Shape: Rabbit / Radish (Yuegui) ---
    'yaoyao': [
        {
            id: 'yaoyao_core', type: 'CORE', name: '仙家弟子', description: '解鎖瑤瑤的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Basket
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Left Ear
        createStatNode('yaoyao', 'hp1', '生命值強化', { hp: 0.05 }, 30, 40, 20, 2500, ['yaoyao_core']),
        createAbilityNode('yaoyao', 'a2', '天星漫散', '處於玉顆珊珊月中落狀態下時，瑤瑤移動、衝刺或跳躍會召喚月桂。', 20, 20, 40, 10000, ['yaoyao_stat_hp1']),

        // Right Ear
        createStatNode('yaoyao', 'dd1', '草屬性傷害強化', { atk: 0.048 }, 70, 40, 30, 5000, ['yaoyao_core']),
        createAbilityNode('yaoyao', 'a4', '推己及人', '月桂投擲白玉蘿蔔炸裂時，範圍內的當前場上角色恢復生命值。', 80, 20, 60, 20000, ['yaoyao_stat_dd1']),

        // Radish
        createStatNode('yaoyao', 'hp2', '生命值強化', { hp: 0.06 }, 50, 60, 50, 15000, ['yaoyao_core']),
        createAbilityNode('yaoyao', 'a6', '尾巴', '瑤瑤接近晶蝶等部分生物時，不會驚動牠們。', 50, 40, 70, 30000, ['yaoyao_stat_hp2']),
        createStatNode('yaoyao', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 50, 20, 80, 45000, ['yaoyao_ability_a2', 'yaoyao_ability_a4']),
    ],

    // --- Genshin: Amber (安柏) - Shape: Bunny / Bow (Baron Bunny) ---
    'amber': [
        {
            id: 'amber_core', type: 'CORE', name: '偵察騎士', description: '解鎖安柏的基礎行跡盤',
            x: 50, y: 60, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Head
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Left Ear
        createStatNode('amber', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 30, 20, 2500, ['amber_core']),
        createAbilityNode('amber', 'a2', '百發百中', '箭雨的暴擊率提高 10%，影響範圍擴大 30%。', 20, 10, 40, 10000, ['amber_stat_atk1']),

        // Right Ear
        createStatNode('amber', 'fd1', '火屬性傷害強化', { atk: 0.048 }, 70, 30, 30, 5000, ['amber_core']),
        createAbilityNode('amber', 'a4', '壓制射擊', '瞄準射擊命中弱點時，攻擊力提高 15%。', 80, 10, 60, 20000, ['amber_stat_fd1']),

        // Body
        createStatNode('amber', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 50, 15000, ['amber_core']),
        createAbilityNode('amber', 'a6', '飛行冠軍', '隊伍中自己的角色滑翔消耗的體力降低 20%。', 50, 95, 70, 30000, ['amber_stat_atk2']),
    ],

    // --- Genshin: Barbara (芭芭拉) - Shape: Music Note / Cross (Idol) ---
    'barbara': [
        {
            id: 'barbara_core', type: 'CORE', name: '閃耀偶像', description: '解鎖芭芭拉的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { hp: 150, outgoingHealing: 0.1 }
        },
        // Stem
        createStatNode('barbara', 'hp1', '生命值強化', { hp: 0.05 }, 50, 60, 20, 2500, ['barbara_core']),
        createAbilityNode('barbara', 'a2', '光輝的季節', '演唱，開始♪之環的角色體力消耗降低 12%。', 50, 40, 40, 10000, ['barbara_stat_hp1']),

        // Note Head
        createStatNode('barbara', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 30, 40, 30, 5000, ['barbara_ability_a2']),
        createAbilityNode('barbara', 'a4', '安可', '獲得元素晶球或元素微粒時，演唱，開始♪之環持續時間延長。', 20, 30, 60, 20000, ['barbara_stat_hb1']),

        // Cross Bar
        createStatNode('barbara', 'hp2', '生命值強化', { hp: 0.06 }, 70, 40, 50, 15000, ['barbara_ability_a2']),
        createAbilityNode('barbara', 'a6', '心意注入', '完美烹飪恢復類食物時，有 12% 機率獲得 2 倍產出。', 80, 30, 70, 30000, ['barbara_stat_hp2']),

        // Top
        createStatNode('barbara', 'hp3', '生命值強化', { hp: 0.08 }, 50, 10, 80, 45000, ['barbara_ability_a2']),
    ],

    // --- Genshin: Noelle (諾艾爾) - Shape: Shield / Rose (Maid) ---
    'noelle': [
        {
            id: 'noelle_core', type: 'CORE', name: '萬能女僕', description: '解鎖諾艾爾的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { def: 80, atk: 0.05 }
        },
        // Shield Top
        createStatNode('noelle', 'def1', '防禦力強化', { def: 0.05 }, 50, 20, 20, 2500, ['noelle_core']),
        createAbilityNode('noelle', 'a2', '全心全意', '當諾艾爾在後台，且當前場上角色生命值低於 30% 時，自動生成護心鎧。', 50, 10, 40, 10000, ['noelle_stat_def1']),

        // Shield Left
        createStatNode('noelle', 'gd1', '岩屬性傷害強化', { atk: 0.048 }, 20, 50, 30, 5000, ['noelle_core']),
        createAbilityNode('noelle', 'a4', '乾淨俐落', '普通攻擊或重擊每命中 4 次，護心鎧的冷卻時間減少 1 秒。', 10, 50, 60, 20000, ['noelle_stat_gd1']),

        // Shield Right
        createStatNode('noelle', 'def2', '防禦力強化', { def: 0.06 }, 80, 50, 50, 15000, ['noelle_core']),
        createAbilityNode('noelle', 'a6', '女僕的態度', '完美烹飪防禦類食物時，有 12% 機率獲得 2 倍產出。', 90, 50, 70, 30000, ['noelle_stat_def2']),

        // Bottom
        createStatNode('noelle', 'def3', '防禦力強化', { def: 0.08 }, 50, 80, 80, 45000, ['noelle_core']),
    ],
    // --- HSR: Aglaea (阿格萊雅) - Shape: Golden Thread / Needle (Tailor) ---
    'aglaea': [
        {
            id: 'aglaea_core', type: 'CORE', name: '黃金裁縫', description: '解鎖阿格萊雅的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Needle Eye
            statsModifier: { atk: 80, critRate: 0.05 }
        },
        // Thread Loop
        createStatNode('aglaea', 'ld1', '雷屬性傷害強化', { atk: 0.048 }, 50, 50, 20, 2500, ['aglaea_core']),
        createAbilityNode('aglaea', 'a2', '金縷衣', '戰技為我方單體提供「金縷」狀態，提高防禦力與效果抵抗。', 50, 30, 40, 10000, ['aglaea_stat_ld1']),

        // Needle Tip
        createStatNode('aglaea', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 20, 30, 5000, ['aglaea_ability_a2']),
        createAbilityNode('aglaea', 'a4', '命運編織', '施放終結技後，行動提前 20%。', 50, 10, 60, 20000, ['aglaea_stat_atk1']),

        // Thread End
        createStatNode('aglaea', 'cr1', '暴擊率強化', { critRate: 0.027 }, 70, 20, 50, 15000, ['aglaea_ability_a2']),
        createAbilityNode('aglaea', 'a6', '黃金律法', '戰鬥開始時，我方全體速度提高 10，持續 2 回合。', 80, 50, 70, 30000, ['aglaea_stat_cr1']),

        // Base
        createStatNode('aglaea', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 90, 80, 45000, ['aglaea_core']),
    ],

    // --- HSR: Castorice (遐蝶) - Shape: Butterfly / Mirror (Memory) ---
    'castorice': [
        {
            id: 'castorice_core', type: 'CORE', name: '流光憶者', description: '解鎖遐蝶的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Body
            statsModifier: { atk: 80, effectHitRate: 0.08 }
        },
        // Left Wing Top
        createStatNode('castorice', 'qd1', '量子屬性傷害強化', { atk: 0.048 }, 30, 30, 20, 2500, ['castorice_core']),
        createAbilityNode('castorice', 'a2', '記憶碎片', '普攻有 50% 基礎機率使敵方目標陷入「記憶模糊」狀態。', 20, 20, 40, 10000, ['castorice_stat_qd1']),

        // Right Wing Top
        createStatNode('castorice', 'ehr1', '效果命中強化', { effectHitRate: 0.06 }, 70, 30, 30, 5000, ['castorice_core']),
        createAbilityNode('castorice', 'a4', '深層恐懼', '對陷入持續傷害狀態的敵方目標造成的傷害提高。', 80, 20, 60, 20000, ['castorice_stat_ehr1']),

        // Left Wing Bottom
        createStatNode('castorice', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 70, 50, 15000, ['castorice_core']),
        createAbilityNode('castorice', 'a6', '記憶回溯', '受到致命傷害時，回復 30% 生命值，每場戰鬥觸發一次。', 20, 80, 70, 30000, ['castorice_stat_atk1']),

        // Right Wing Bottom
        createStatNode('castorice', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 70, 80, 45000, ['castorice_core']),
    ],

    // --- HSR: Tribbie (緹寶) - Shape: Star / Pink Cloud (Cute) ---
    'tribbie': [
        {
            id: 'tribbie_core', type: 'CORE', name: '星空預言家', description: '解鎖緹寶的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Star Center
            statsModifier: { hp: 100, spd: 4 }
        },
        // Top Point
        createStatNode('tribbie', 'qd1', '量子屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['tribbie_core']),
        createAbilityNode('tribbie', 'a2', '幸運星', '戰鬥開始時，隨機獲得一個增益效果。', 50, 10, 40, 10000, ['tribbie_stat_qd1']),

        // Left Point
        createStatNode('tribbie', 'hp1', '生命值強化', { hp: 0.05 }, 20, 40, 30, 5000, ['tribbie_core']),
        createAbilityNode('tribbie', 'a4', '電波干擾', '戰技有概率降低敵方攻擊力。', 10, 40, 60, 20000, ['tribbie_stat_hp1']),

        // Right Point
        createStatNode('tribbie', 'spd1', '速度強化', { spd: 2 }, 80, 40, 50, 15000, ['tribbie_core']),
        createAbilityNode('tribbie', 'a6', '星空召喚', '施放終結技時，我方全體能量恢復 5 點。', 90, 40, 70, 30000, ['tribbie_stat_spd1']),

        // Bottom Points
        createStatNode('tribbie', 'hp2', '生命值強化', { hp: 0.06 }, 30, 80, 80, 45000, ['tribbie_core']),
        createStatNode('tribbie', 'res1', '效果抵抗強化', { effectRes: 0.06 }, 70, 80, 80, 45000, ['tribbie_core']),
    ],

    // --- HSR: Haiseyin (海瑟音) - Shape: Siren / Wave (Deep Sea) ---
    'haiseyin': [
        {
            id: 'haiseyin_core', type: 'CORE', name: '深海騎士', description: '解鎖海瑟音的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Tail
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Body
        createStatNode('haiseyin', 'ld1', '雷屬性傷害強化', { atk: 0.048 }, 50, 60, 20, 2500, ['haiseyin_core']),
        createAbilityNode('haiseyin', 'a2', '深海恐懼', '敵方目標每承受一個持續傷害狀態，海瑟音對其造成的傷害提高。', 50, 40, 40, 10000, ['haiseyin_stat_ld1']),

        // Left Wave
        createStatNode('haiseyin', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 50, 30, 5000, ['haiseyin_stat_ld1']),
        createAbilityNode('haiseyin', 'a4', '海妖之歌', '施放戰技時，有概率使敵方陷入睡眠狀態。', 20, 40, 60, 20000, ['haiseyin_stat_atk1']),

        // Right Wave
        createStatNode('haiseyin', 'be1', '擊破特攻強化', { breakEffect: 0.06 }, 70, 50, 50, 15000, ['haiseyin_stat_ld1']),
        createAbilityNode('haiseyin', 'a6', '暗流湧動', '擊破弱點後，使敵方行動延後。', 80, 40, 70, 30000, ['haiseyin_stat_be1']),

        // Head
        createStatNode('haiseyin', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 20, 80, 45000, ['haiseyin_ability_a2']),
    ],

    // --- HSR: Sapphire (賽飛兒) - Shape: Coin / Dagger (Thief) ---
    'sapphire': [
        {
            id: 'sapphire_core', type: 'CORE', name: '多洛斯俠盜', description: '解鎖賽飛兒的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Coin
            statsModifier: { atk: 80, spd: 2 }
        },
        // Top Dagger
        createStatNode('sapphire', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['sapphire_core']),
        createAbilityNode('sapphire', 'a2', '等價交換', '受到攻擊時，有 50% 機率對攻擊者進行反擊。', 50, 10, 40, 10000, ['sapphire_stat_id1']),

        // Left Coin Stack
        createStatNode('sapphire', 'atk1', '攻擊力強化', { atk: 0.04 }, 20, 50, 30, 5000, ['sapphire_core']),
        createAbilityNode('sapphire', 'a4', '順手牽羊', '戰技造成傷害時，額外恢復能量。', 10, 50, 60, 20000, ['sapphire_stat_atk1']),

        // Right Coin Stack
        createStatNode('sapphire', 'be1', '擊破特攻強化', { breakEffect: 0.06 }, 80, 50, 50, 15000, ['sapphire_core']),
        createAbilityNode('sapphire', 'a6', '三百俠盜', '戰鬥勝利後，獲得的信用點增加。', 90, 50, 70, 30000, ['sapphire_stat_be1']),

        // Bottom
        createStatNode('sapphire', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 80, 45000, ['sapphire_core']),
    ],

    // --- HSR: Kelyudela (刻律德菈) - Shape: Chess Piece / Crown (Caesar) ---
    'kelyudela': [
        {
            id: 'kelyudela_core', type: 'CORE', name: '燃冕獨裁官', description: '解鎖刻律德菈的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { def: 100, atk: 0.05 }
        },
        // Body
        createStatNode('kelyudela', 'pd1', '物理屬性傷害強化', { atk: 0.048 }, 50, 50, 20, 2500, ['kelyudela_core']),
        createAbilityNode('kelyudela', 'a2', '絕對命令', '我方全體造成的物理屬性傷害提高。', 50, 30, 40, 10000, ['kelyudela_stat_pd1']),

        // Left Side
        createStatNode('kelyudela', 'def1', '防禦力強化', { def: 0.05 }, 30, 50, 30, 5000, ['kelyudela_stat_pd1']),
        createAbilityNode('kelyudela', 'a4', '鐵壁', '施放戰技後，為我方全體提供護盾。', 20, 40, 60, 20000, ['kelyudela_stat_def1']),

        // Right Side
        createStatNode('kelyudela', 'atk1', '攻擊力強化', { atk: 0.04 }, 70, 50, 50, 15000, ['kelyudela_stat_pd1']),
        createAbilityNode('kelyudela', 'a6', '征服者', '護盾存在時，我方全體攻擊力提高。', 80, 40, 70, 30000, ['kelyudela_stat_atk1']),

        // Crown Top
        createStatNode('kelyudela', 'def2', '防禦力強化', { def: 0.075 }, 50, 10, 80, 45000, ['kelyudela_ability_a2']),
    ],

    // --- HSR: Xilian (昔漣) - Shape: Mirror / Flower (Fairy) ---
    'xilian': [
        {
            id: 'xilian_core', type: 'CORE', name: '黃金妖精', description: '解鎖昔漣的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 100, energyRegen: 0.03 }
        },
        // Top Petal
        createStatNode('xilian', 'id1', '冰屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['xilian_core']),
        createAbilityNode('xilian', 'a2', '鏡中世界', '召喚憶靈，憶靈存在時我方全體受到的傷害降低。', 50, 10, 40, 10000, ['xilian_stat_id1']),

        // Left Petal
        createStatNode('xilian', 'hp1', '生命值強化', { hp: 0.05 }, 20, 50, 30, 5000, ['xilian_core']),
        createAbilityNode('xilian', 'a4', '記憶共鳴', '施放終結技時，複製上一個施放的終結技效果（效果量減半）。', 10, 50, 60, 20000, ['xilian_stat_hp1']),

        // Right Petal
        createStatNode('xilian', 'er1', '能量恢復效率強化', { energyRegen: 0.04 }, 80, 50, 50, 15000, ['xilian_core']),
        createAbilityNode('xilian', 'a6', '純真年代', '戰鬥開始時，我方全體能量恢復 10 點。', 90, 50, 70, 30000, ['xilian_stat_er1']),

        // Bottom Petal
        createStatNode('xilian', 'hp2', '生命值強化', { hp: 0.06 }, 50, 80, 80, 45000, ['xilian_core']),
    ],

    // --- HSR: Fengjin (風堇) - Shape: Cross / Pet (Healer) ---
    'fengjin': [
        {
            id: 'fengjin_core', type: 'CORE', name: '翁法羅斯醫者', description: '解鎖風堇的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { hp: 100, outgoingHealing: 0.1 }
        },
        // Top
        createStatNode('fengjin', 'wd1', '風屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['fengjin_core']),
        createAbilityNode('fengjin', 'a2', '小伊卡', '召喚小伊卡，小伊卡行動時為我方生命值最低的角色回復生命。', 50, 10, 40, 10000, ['fengjin_stat_wd1']),

        // Left
        createStatNode('fengjin', 'hp1', '生命值強化', { hp: 0.05 }, 20, 50, 30, 5000, ['fengjin_core']),
        createAbilityNode('fengjin', 'a4', '溫柔守護', '治療時，若目標生命值小於 50%，治療量提高。', 10, 50, 60, 20000, ['fengjin_stat_hp1']),

        // Right
        createStatNode('fengjin', 'res1', '效果抵抗強化', { effectRes: 0.06 }, 80, 50, 50, 15000, ['fengjin_core']),
        createAbilityNode('fengjin', 'a6', '淨化之風', '施放戰技時，解除目標的一個負面效果。', 90, 50, 70, 30000, ['fengjin_stat_res1']),

        // Bottom
        createStatNode('fengjin', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 50, 80, 80, 45000, ['fengjin_core']),
    ],

    // --- Genshin: Sayu (早柚) - Shape: Leaf / Ninja Star (Tanuki) ---
    'sayu': [
        {
            id: 'sayu_core', type: 'CORE', name: '忍びの里の貉', description: '解鎖早柚的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Center
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Top Leaf
        createStatNode('sayu', 'ad1', '風屬性傷害強化', { atk: 0.048 }, 50, 20, 20, 2500, ['sayu_core']),
        createAbilityNode('sayu', 'a2', '更加合適的人選', '早柚在場上觸發擴散反應時，為隊伍中自己的角色以及附近的友方角色恢復生命值。', 50, 10, 40, 10000, ['sayu_stat_ad1']),

        // Left Leaf
        createStatNode('sayu', 'em1', '元素精通強化', { breakEffect: 0.04 }, 20, 50, 30, 5000, ['sayu_core']),
        createAbilityNode('sayu', 'a4', '早柚不用工作啦', '嗚呼流·影貉繚亂的「不倒貉貉」為角色恢復生命值時，將回復該角色附近的場上其他角色恢復生命值。', 10, 50, 60, 20000, ['sayu_stat_em1']),

        // Right Leaf
        createStatNode('sayu', 'atk1', '攻擊力強化', { atk: 0.04 }, 80, 50, 50, 15000, ['sayu_core']),
        createAbilityNode('sayu', 'a6', '嗚呼流·屏息秘傳', '早柚在隊伍中時，隊伍中自己的角色接近晶蝶等部分生物時，不會驚動牠們。', 90, 50, 70, 30000, ['sayu_stat_atk1']),

        // Bottom
        createStatNode('sayu', 'hb1', '治療加成強化', { outgoingHealing: 0.05 }, 50, 80, 80, 45000, ['sayu_core']),
    ],

    // --- Genshin: Lynette (琳妮特) - Shape: Cat / Card (Magic) ---
    'lynette': [
        {
            id: 'lynette_core', type: 'CORE', name: '魔術助手', description: '解鎖琳妮特的基礎行跡盤',
            x: 50, y: 80, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Base
            statsModifier: { atk: 80, spd: 2 }
        },
        // Card Body
        createStatNode('lynette', 'ad1', '風屬性傷害強化', { atk: 0.048 }, 50, 50, 20, 2500, ['lynette_core']),
        createAbilityNode('lynette', 'a2', '巧施協同', '施放魔術·運變驚奇後的 10 秒內，隊伍中若存在多種元素類型的角色，全體攻擊力提升。', 50, 30, 40, 10000, ['lynette_stat_ad1']),

        // Left Ear
        createStatNode('lynette', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 20, 30, 5000, ['lynette_stat_ad1']),
        createAbilityNode('lynette', 'a4', '道具以此充數', '魔術·運變驚奇召喚的驚奇貓貓盒發生元素轉化後，琳妮特元素爆發造成的傷害提升。', 20, 10, 60, 20000, ['lynette_stat_atk1']),

        // Right Ear
        createStatNode('lynette', 'atk2', '攻擊力強化', { atk: 0.06 }, 70, 20, 50, 15000, ['lynette_stat_ad1']),
        createAbilityNode('lynette', 'a6', '點面面俱到', '在小地圖上顯示周圍的復甦水團的位置。', 80, 10, 70, 30000, ['lynette_stat_atk2']),
    ],
    // --- HSR: Stelle (星) - Shape: Bat / Trash Can (Galactic Baseballer) ---
    'stelle': [
        {
            id: 'stelle_core', type: 'CORE', name: '開拓者', description: '解鎖星的基礎行跡盤',
            x: 50, y: 50, reqLevel: 1, reqAscension: 0, cost: [], isCore: true, // Bat Handle
            statsModifier: { atk: 80, breakEffect: 0.05 }
        },
        // Bat Body
        createStatNode('stelle', 'pd1', '物理屬性傷害強化', { atk: 0.048 }, 50, 30, 20, 2500, ['stelle_core']),
        createAbilityNode('stelle', 'a2', '蓄勢待發', '戰鬥開始時，恢復 15 點能量。', 50, 10, 40, 10000, ['stelle_stat_pd1']),

        // Trash Can Lid
        createStatNode('stelle', 'atk1', '攻擊力強化', { atk: 0.04 }, 30, 40, 30, 5000, ['stelle_core']),
        createAbilityNode('stelle', 'a4', '毀滅', '施放終結技時，對目標造成的傷害提高。', 20, 30, 60, 20000, ['stelle_stat_atk1']),

        // Trash Can Body
        createStatNode('stelle', 'be1', '擊破特攻強化', { breakEffect: 0.06 }, 70, 40, 50, 15000, ['stelle_core']),
        createAbilityNode('stelle', 'a6', '存護', '施放戰技時，為我方全體提供護盾（存護命途）。', 80, 30, 70, 30000, ['stelle_stat_be1']),

        // Bat Tip
        createStatNode('stelle', 'atk2', '攻擊力強化', { atk: 0.06 }, 50, 80, 80, 45000, ['stelle_core']),
    ],


};
