
import { CombatUnit, Enemy, RaidMap } from '../types';

// 1. 定義節點類型
export type NodeType = 'START' | 'COMBAT' | 'ELITE' | 'EVENT' | 'REST' | 'BOSS';

export interface MapNode {
    id: string;
    type: NodeType;
    name: string;
    isCleared: boolean;
    isLocked: boolean;
    enemies?: CombatUnit[]; // 預先生成的敵人
    // UI 顯示用
    x?: number; 
    y?: number;
}

// 3. 創建戰鬥單位實例
const createEnemyInstance = (template: Enemy, level: number, idx: number): CombatUnit => {
    // 數值隨等級膨脹公式
    const scale = 1 + (level * 0.08); 
    return {
        uid: `enemy_${template.id}_${Date.now()}_${idx}`,
        charId: template.id,
        name: template.name,
        isEnemy: true,
        level: level,
        maxHp: Math.floor(template.maxHp * scale),
        currentHp: Math.floor(template.maxHp * scale),
        maxToughness: 100, 
        currentToughness: 100,
        maxEnergy: 0,
        currentEnergy: 0,
        stats: {
            hp: Math.floor(template.maxHp * scale),
            atk: Math.floor(template.atk * scale),
            def: Math.floor(template.def * scale),
            spd: template.spd,
        },
        element: template.element,
        weaknesses: template.weaknesses,
        av: 10000 / template.spd,
        isDead: false,
        avatarUrl: '', // 會在 BattleEngine 中由 enemyImages 填充
        statuses: [],
        shield: 0,
        animState: 'idle'
    };
};

// 4. 生成敵人配置
const generateEnemies = (type: NodeType, pool: {mobs: Enemy[], elites: Enemy[], bosses: Enemy[]}, mapEnemiesFallback: Enemy[], baseLevel: number): CombatUnit[] => {
    const units: CombatUnit[] = [];
    const { mobs, elites, bosses } = pool;

    // STRICT FALLBACK within the passed mapEnemies, NOT global
    const safeMobs = mobs.length > 0 ? mobs : mapEnemiesFallback.filter(e => !e.name.includes('BOSS'));
    const safeElites = elites.length > 0 ? elites : (safeMobs.length > 0 ? safeMobs : mapEnemiesFallback);
    const safeBosses = bosses.length > 0 ? bosses : safeElites;

    // Double check safeMobs isn't empty if mapEnemies only had bosses (shouldn't happen with new raid logic but safety first)
    const finalSafeMobs = safeMobs.length > 0 ? safeMobs : safeElites;

    if (type === 'COMBAT') {
        if (finalSafeMobs.length === 0) return []; // Should not happen
        // 2-3 隻雜魚
        const count = 2 + Math.floor(Math.random() * 2); 
        for(let i=0; i<count; i++) {
            const template = finalSafeMobs[Math.floor(Math.random() * finalSafeMobs.length)];
            units.push(createEnemyInstance(template, baseLevel, i));
        }
    } 
    else if (type === 'ELITE') {
        // 1 隻菁英 + 1-2 隻雜魚
        const elite = safeElites[Math.floor(Math.random() * safeElites.length)];
        units.push(createEnemyInstance(elite, baseLevel + 2, 0));

        const mobCount = 1 + Math.floor(Math.random() * 2);
        for(let i=0; i<mobCount; i++) {
            const mob = finalSafeMobs[Math.floor(Math.random() * finalSafeMobs.length)];
            units.push(createEnemyInstance(mob, baseLevel, i+1));
        }
    } 
    else if (type === 'BOSS') {
        // 1 隻 Boss
        const boss = safeBosses[Math.floor(Math.random() * safeBosses.length)];
        units.push(createEnemyInstance(boss, baseLevel + 5, 0));
    }

    return units;
};

// 5. 主生成函式：生成完整地圖
export const generateMapNodes = (mapConfig: RaidMap): MapNode[] => {
    // CRITICAL FIX: Only use enemies assigned to this map config.
    const mapEnemies = mapConfig.possibleEnemies || [];
    
    const pool = {
        mobs: mapEnemies.filter(e => !e.name.includes('BOSS') && !e.name.includes('Elite')),
        elites: mapEnemies.filter(e => e.name.includes('Elite')),
        bosses: mapEnemies.filter(e => e.name.includes('BOSS'))
    };

    // Check if we actually have a boss available for this map
    const hasTrueBoss = pool.bosses.length > 0;

    const baseLevel = mapConfig.difficulty * 10; // Diff 1 = Lv10, Diff 5 = Lv50
    
    // 根據難度決定藍圖結構
    let blueprint: NodeType[] = [];
    
    if (mapConfig.difficulty <= 2) {
        // 簡單/普通: 4 節點
        blueprint = ['START', 'COMBAT', 'EVENT', 'BOSS'];
    } else if (mapConfig.difficulty <= 4) {
        // 困難: 6 節點
        blueprint = ['START', 'COMBAT', 'COMBAT', 'ELITE', 'REST', 'BOSS'];
    } else {
        // 極難: 8 節點
        blueprint = ['START', 'COMBAT', 'ELITE', 'EVENT', 'COMBAT', 'REST', 'ELITE', 'BOSS'];
    }

    return blueprint.map((type, index) => {
        // FIX: If the blueprint says BOSS but we have no boss in the pool (Zone 1-6), downgrade to ELITE
        let actualType = type;
        if (type === 'BOSS' && !hasTrueBoss) {
            actualType = 'ELITE';
        }

        let name = '';
        switch(actualType) {
            case 'START': name = '登陸點'; break;
            case 'COMBAT': name = '遭遇戰'; break;
            case 'ELITE': name = '強敵'; break;
            case 'EVENT': name = '事件'; break;
            case 'REST': name = '休息區'; break;
            case 'BOSS': name = '區域首領'; break;
        }

        // 難度隨深度微增
        const nodeLevel = baseLevel + index;

        return {
            id: `node_${mapConfig.id}_${index}`,
            type: actualType,
            name,
            isCleared: index === 0, // 起點預設已過
            isLocked: index !== 0,
            enemies: ['COMBAT', 'ELITE', 'BOSS'].includes(actualType) ? generateEnemies(actualType, pool, mapEnemies, nodeLevel) : undefined
        };
    });
};
