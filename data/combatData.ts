
import { Character, CombatStats, CombatUnit, CombatStatus } from '../types';

export type CombatActionType = 'DAMAGE' | 'HEAL_SINGLE' | 'HEAL_ALL' | 'HEAL_MULTI' | 'BUFF_ATK' | 'DEBUFF_DEF' | 'SHIELD' | 'SUMMON';

export interface CharacterCombatData {
  element: 'Physical' | 'Fire' | 'Ice' | 'Lightning' | 'Wind' | 'Quantum' | 'Imaginary';
  path: 'Destruction' | 'Hunt' | 'Erudition' | 'Harmony' | 'Nihility' | 'Preservation' | 'Abundance';
  basicName: string;
  skillName: string;
  skillType: CombatActionType; 
  skillValue?: number; // Multiplier (e.g., 1.5 for dmg) or Value (e.g., 0.4 for 40% buff)
  skillDesc?: string; // Detailed description
  ultName: string;
  ultType: CombatActionType; 
  ultValue?: number;
  ultDesc?: string; // Detailed description
  ultVoice: string; 
  victoryVoice: string; // New: Line spoken at end of battle
}

// --- Localization Maps ---
export const PATH_MAP_CN: Record<string, string> = {
  'Destruction': '毀滅',
  'Hunt': '巡獵',
  'Erudition': '智識',
  'Harmony': '同諧',
  'Nihility': '虛無',
  'Preservation': '存護',
  'Abundance': '豐饒'
};

export const ELEMENT_MAP_CN: Record<string, string> = {
  'Physical': '物理',
  'Fire': '火',
  'Ice': '冰',
  'Lightning': '雷',
  'Wind': '風',
  'Quantum': '量子',
  'Imaginary': '虛數'
};

export const ELEMENT_ICONS: Record<string, string> = {
  'Physical': '⚔️',
  'Fire': '🔥',
  'Ice': '❄️',
  'Lightning': '⚡',
  'Wind': '🍃',
  'Quantum': '⚛️',
  'Imaginary': '✨'
};

export const ELEMENT_COLORS: Record<string, string> = {
  'Physical': 'text-gray-400 border-gray-400',
  'Fire': 'text-red-500 border-red-500',
  'Ice': 'text-cyan-300 border-cyan-300',
  'Lightning': 'text-purple-500 border-purple-500',
  'Wind': 'text-green-400 border-green-400',
  'Quantum': 'text-indigo-500 border-indigo-500',
  'Imaginary': 'text-yellow-400 border-yellow-400'
};

// --- Helper: Get Accumulated Stat Modifiers ---
export const getStatValue = (unit: CombatUnit, statKey: string): number => {
    let total = 0;
    unit.statuses.forEach(s => {
        if (s.stat === statKey) {
            if (s.type === 'BUFF') total += s.value;
            else if (s.type === 'DEBUFF') total -= s.value;
        }
    });
    return total;
};

// --- Realtime Base Stat Calculator (Used for UI display mostly) ---
export const getRealtimeUnitStats = (u: CombatUnit, stat: keyof CombatStats): number => {
    const base = u.stats[stat] || 0;
    // Handle Percentage Buffs (e.g., ATK +50%)
    // Stat Keys in statuses should map to: ATK, DEF, SPD, HP
    const pctBonus = getStatValue(u, stat.toUpperCase()); 
    // Handle Flat Buffs (Not implemented in Status type yet, assuming all value is %)
    const mult = 1 + pctBonus;
    return Math.max(1, Math.floor(base * mult));
};

// --- CORE DAMAGE FORMULA ---
export const calculateDamage = (
    attacker: CombatUnit, 
    defender: CombatUnit, 
    skillMultiplier: number, 
    damageElement: string,
    ignoreWeakness: boolean = false
): { damage: number, isCrit: boolean, details: string } => {
    
    // 1. Base DMG Area
    const atk = getRealtimeUnitStats(attacker, 'atk');
    const baseDmg = atk * skillMultiplier;

    // 2. DMG% Area (Elemental + All Type)
    // Buffs: DMG_BOOST (All), [ELEMENT]_DMG_BOOST
    const allDmgBoost = getStatValue(attacker, 'DMG_BOOST');
    const elemDmgBoost = getStatValue(attacker, `${damageElement.toUpperCase()}_DMG_BOOST`);
    const dmgMult = 1 + allDmgBoost + elemDmgBoost;

    // 3. Crit Area
    let critRate = (attacker.stats.critRate || 0.05) + getStatValue(attacker, 'CRITRATE');
    let critDmg = (attacker.stats.critDmg || 0.50) + getStatValue(attacker, 'CRITDMG');
    const isCrit = Math.random() < critRate;
    const critMult = isCrit ? (1 + critDmg) : 1.0;

    // 4. Def Area (Standard HSR Formula approximation)
    // Defender DEF
    const defBase = getRealtimeUnitStats(defender, 'def');
    // Penetration (Attacker Buffs: DEF_PEN) + Reduction (Defender Debuffs: DEF_DOWN handled in getRealtimeUnitStats)
    const defPen = getStatValue(attacker, 'DEF_PEN'); 
    // Calculate defense reduction from debuffs (already in getRealtimeUnitStats logic as negative value, but DEF_PEN is separate ignore)
    // Formula: DefMult = (200 + 10 * AttackerLv) / ( (200 + 10 * AttackerLv) + DefenderDef * (1 - DefPen) )
    const attackerLvConstant = 200 + 10 * attacker.level;
    const defMult = attackerLvConstant / (attackerLvConstant + defBase * Math.max(0, 1 - defPen));

    // 5. Res Area
    // Base Res usually 20% for non-weak, 0% for weak. 
    // ResPen comes from attacker buffs.
    let baseRes = 0.2; 
    if (ignoreWeakness || defender.weaknesses?.includes(damageElement)) baseRes = 0;
    const resPen = getStatValue(attacker, 'RES_PEN');
    const resReduction = getStatValue(defender, 'RES_DOWN'); // Debuff on enemy
    const resMult = Math.max(0.1, 1 - (baseRes - resPen - resReduction));

    // 6. Vulnerability Area (Taken DMG increased)
    const vuln = getStatValue(defender, 'VULNERABILITY');
    const vulnMult = 1 + vuln;

    // 7. Break / Toughness Multiplier (Simplified)
    const breakMult = defender.currentToughness <= 0 ? 0.9 : 1.0; 
    
    // Final Calculation
    const finalDmg = Math.floor(baseDmg * dmgMult * critMult * defMult * resMult * vulnMult * (defender.currentToughness > 0 ? 0.9 : 1.0));

    // Debug Details
    const details = `Base:${Math.floor(baseDmg)} x Boost:${dmgMult.toFixed(2)} x Crit:${critMult.toFixed(2)} x Def:${defMult.toFixed(2)} x Res:${resMult.toFixed(2)} x Vuln:${vulnMult.toFixed(2)}`;

    return { damage: Math.max(1, finalDmg), isCrit, details };
};

// --- Bond System Helpers ---
export const getBondLevel = (affection: number) => {
    if (affection >= 400) return { level: 5, title: '戀人 (Lover)', bonus: 0.12, color: 'text-pink-500', desc: '解鎖專屬劇情，全數值 +12%' };
    if (affection >= 300) return { level: 4, title: '曖昧 (Crush)', bonus: 0.08, color: 'text-purple-400', desc: '全數值 +8%' };
    if (affection >= 200) return { level: 3, title: '友善 (Friend)', bonus: 0.05, color: 'text-blue-400', desc: '全數值 +5%' };
    if (affection >= 100) return { level: 2, title: '相識 (Known)', bonus: 0.02, color: 'text-green-400', desc: '全數值 +2%' };
    return { level: 1, title: '陌生 (Stranger)', bonus: 0, color: 'text-gray-400', desc: '無加成' };
};

// --- COMPLETE CHARACTER DATA ---
export const CHAR_COMBAT_DATA: Record<string, CharacterCombatData> = {
    // --- Original ---
    'linyun': { element: 'Quantum', path: 'Nihility', basicName: '嘲諷', skillName: '情緒勒索', skillType: 'DEBUFF_DEF', skillDesc: '降低敵方防禦，並使自己受擊機率上升（雖然她很怕痛）。', ultName: '崩潰邊緣', ultType: 'DAMAGE', ultValue: 3.0, ultDesc: '釋放全部負面情緒，對全體造成精神打擊。', ultVoice: '雜魚～去死吧！♥', victoryVoice: '哼，這點程度...勉強合格吧。' },

    // --- HSR: Amphoreus (UPDATED) ---
    'aglaea': { element: 'Lightning', path: 'Preservation', basicName: '金針', skillName: '黃金縫合', skillType: 'SHIELD', skillDesc: '為我方全體提供護盾。', ultName: '命運紡錘', ultType: 'DAMAGE', ultDesc: '以黃金絲線切割命運，對全體造成傷害。', ultVoice: '命運已定，無處可逃。', victoryVoice: '完美的勝利。' },
    'castorice': { element: 'Quantum', path: 'Nihility', basicName: '憶刺', skillName: '記憶篡改', skillType: 'DEBUFF_DEF', skillDesc: '對單體造成傷害並植入負面效果。', ultName: '破碎鏡像', ultType: 'DAMAGE', ultDesc: '引爆所有記憶片段，造成巨額傷害。', ultVoice: '讓我看看你的記憶...碎裂吧。', victoryVoice: '多麼美味的回憶。' },
    'tribbie': { element: 'Quantum', path: 'Harmony', basicName: '星塵', skillName: '幸運占卜', skillType: 'BUFF_ATK', skillDesc: '提升我方攻擊力與幸運。', ultName: '流星雨之夜', ultType: 'HEAL_ALL', ultDesc: '召喚流星雨，治癒全體隊友。', ultVoice: '星星說，今天是大吉！', victoryVoice: '耶！我就知道會贏！' },
    
    'haiseyin': { element: 'Physical', path: 'Nihility', basicName: '小調，止水中迴響', skillName: '泛音，暗流後齊鳴', skillType: 'DEBUFF_DEF', skillDesc: '對全體造成物理傷害，並施加易傷。', ultName: '絕海迴濤，噬魂舞曲', ultType: 'DAMAGE', ultDesc: '展開結界，降低敵方攻防並觸發追加傷害。', ultVoice: '沉入深淵吧，傾聽這絕望之歌。', victoryVoice: '歸於寂靜。' },
    'sapphire': { element: 'Quantum', path: 'Nihility', basicName: '呀，漏網之魚', skillName: '嘿，空手套白銀', skillType: 'DAMAGE', skillDesc: '標記「老主顧」，隊友攻擊時觸發追加攻擊。', ultName: '時空裂隙', ultType: 'DAMAGE', ultDesc: '引爆記錄的傷害值，造成真實傷害。', ultVoice: '這筆帳，我記下了。', victoryVoice: '合作愉快，下次再來。' },
    'kelyudela': { element: 'Wind', path: 'Harmony', basicName: '易位，兵貴神速', skillName: '升變，士皆可帥', skillType: 'BUFF_ATK', skillDesc: '賦予隊友「軍功」，觸發戰技複製。', ultName: '世事如棋，四步堪殺', ultType: 'DAMAGE', ultDesc: '全體傷害並分配軍功。', ultVoice: '榮光屬於凱撒！', victoryVoice: '勝利屬於帝國！' },
    'xilian': { element: 'Ice', path: 'Erudition', basicName: '看！是希望的起始！', skillName: '結界流轉', skillType: 'SUMMON', skillDesc: '召喚憶靈協同攻擊。', ultName: '永恆水晶', ultType: 'BUFF_ATK', ultDesc: '激活全隊終結技，進入爆發狀態。', ultVoice: '願美好永存。', victoryVoice: '大家都很棒哦！' },
    'fengjin': { element: 'Wind', path: 'Abundance', basicName: '當微風輕吻雲沫', skillName: '愛在虹光灑落時', skillType: 'HEAL_ALL', skillDesc: '召喚小伊卡並回復全隊生命。', ultName: '飛入晨昏的我們', ultType: 'HEAL_ALL', ultDesc: '全隊大幅回血並解控。', ultVoice: '別怕，小伊卡會保護大家的。', victoryVoice: '沒人受傷就好。' },

    // --- HSR: Xianzhou ---
    'feixiao': { element: 'Wind', path: 'Hunt', basicName: '裂空', skillName: '天擊', skillType: 'DAMAGE', skillDesc: '對單體造成風屬性傷害，若目標處於虛弱狀態傷害提升。', ultName: '鑿破穹蒼', ultType: 'DAMAGE', ultDesc: '對單體發動無視防禦的致命連擊。', ultVoice: '天擊將軍在此，誰敢放肆！', victoryVoice: '勝負已分。' },
    'lingsha': { element: 'Fire', path: 'Abundance', basicName: '薰風', skillName: '丹心', skillType: 'HEAL_MULTI', skillDesc: '造成火屬性傷害並治療我方全體。', ultName: '醉霧浮煙', ultType: 'HEAL_ALL', ultDesc: '解除我方全體負面效果並回復生命，同時攻擊敵人。', ultVoice: '諸位，且以此香凝神。', victoryVoice: '願世間無疾。' },
    'fugue': { element: 'Fire', path: 'Nihility', basicName: '狐火', skillName: '迷魂', skillType: 'DEBUFF_DEF', skillDesc: '使敵人陷入混亂，並造成火屬性傷害。', ultName: '九尾焚天', ultType: 'DAMAGE', ultDesc: '展現九尾姿態，對全體造成毀滅性傷害。', ultVoice: '恩公～這就是終局了。', victoryVoice: '這場戲，演完了。' },
    'jingliu': { element: 'Ice', path: 'Destruction', basicName: '流影', skillName: '無罅飛光', skillType: 'DAMAGE', skillDesc: '消耗隊友生命值，對擴散範圍造成冰屬性傷害。', ultName: '曇華生滅，天河瀉夢', ultType: 'DAMAGE', ultDesc: '進入轉魄狀態，造成巨額冰屬性傷害。', ultVoice: '此劍，當斬群魔！', victoryVoice: '月色...依舊。' },
    'tingyun': { element: 'Lightning', path: 'Harmony', basicName: '逐客令', skillName: '祥音和韻', skillType: 'BUFF_ATK', skillDesc: '為我方單體提供攻擊力加成並附加雷屬性傷害。', ultName: '慶雲光蓋儀', ultType: 'BUFF_ATK', ultValue: 50, ultDesc: '為我方單體恢復能量並提高傷害。', ultVoice: '恩公，小女子這就為您助興～', victoryVoice: '和氣生財嘛。' },
    'fuxuan': { element: 'Quantum', path: 'Preservation', basicName: '始擊歲星', skillName: '太微行棋，靈台示瑞', skillType: 'SHIELD', skillDesc: '開啟窮觀陣，分攤隊友受到的傷害。', ultName: '天律大衍，歷劫歸一', ultType: 'DAMAGE', ultDesc: '對全體造成量子傷害，並增加全隊生命回復次數。', ultVoice: '因果已定，在劫難逃！', victoryVoice: '一切皆在法眼預料之中。' },
    'huohuo': { element: 'Wind', path: 'Abundance', basicName: '令旗・風雨召來', skillName: '靈符・保命護身', skillType: 'HEAL_MULTI', skillDesc: '為單體及相鄰目標回復生命，並解除負面效果。', ultName: '尾巴・遣神役鬼', ultType: 'BUFF_ATK', ultDesc: '為全隊恢復能量並提高攻擊力。', ultVoice: '尾巴大爺，救命啊！', victoryVoice: '嗚...終於結束了...' },
    'yunli': { element: 'Physical', path: 'Destruction', basicName: '揮劍', skillName: '卻邪', skillType: 'DAMAGE', skillDesc: '對擴散範圍造成物理傷害，並回復自身生命。', ultName: '劍魂覺醒', ultType: 'DAMAGE', ultDesc: '格擋下一次攻擊並發動強力反擊。', ultVoice: '看劍！', victoryVoice: '這把劍還不錯。' },
    'qingque': { element: 'Quantum', path: 'Erudition', basicName: '門前清', skillName: '海底撈月', skillType: 'BUFF_ATK', skillDesc: '抽取瓊玉牌，獲得強化普攻機會。', ultName: '四喜臨門', ultType: 'DAMAGE', ultDesc: '對全體造成量子傷害，並切換至「暗槓」狀態。', ultVoice: '這把牌不錯，胡了！', victoryVoice: '下班下班！' },
    'bailu': { element: 'Lightning', path: 'Abundance', basicName: '望聞問切', skillName: '雲吟垂澤', skillType: 'HEAL_MULTI', skillDesc: '治療單體並在隊友間彈射治療。', ultName: '龍躍淵藪', ultType: 'HEAL_ALL', ultDesc: '治療全體並施加「生息」狀態，受擊時回血。', ultVoice: '乖乖站好，打針囉！', victoryVoice: '別忘了按時吃藥。' },
    'xueyi': { element: 'Quantum', path: 'Destruction', basicName: '破魔錐', skillName: '攝伏諸惡', skillType: 'DAMAGE', skillDesc: '對單體造成量子傷害，無視弱點屬性削減韌性。', ultName: '天罰貫身', ultType: 'DAMAGE', ultDesc: '對單體造成極高量子傷害，無視弱點。', ultVoice: '孽障，受死！', victoryVoice: '惡業已盡。' },
    'hanya': { element: 'Physical', path: 'Harmony', basicName: '冥讖天筆', skillName: '生滅無常', skillType: 'DEBUFF_DEF', skillDesc: '標記敵人，我方攻擊標記目標時回復戰技點。', ultName: '十王敕令，遍土遵行', ultType: 'BUFF_ATK', ultDesc: '提升我方單體速度與攻擊力。', ultVoice: '判官筆下，無所遁形。', victoryVoice: '工作...結束了...' },
    'sushang': { element: 'Physical', path: 'Hunt', basicName: '雲騎劍法', skillName: '雲騎劍經・山勢', skillType: 'DAMAGE', skillDesc: '對單體造成物理傷害，有機率發動劍勢。', ultName: '太虛形蘊・燭夜', ultType: 'DAMAGE', ultDesc: '召喚巨劍對單體造成傷害，並使自身行動提前。', ultVoice: '鳳凰，出來幫個忙！', victoryVoice: '本姑娘果然厲害！' },
    'yukong': { element: 'Imaginary', path: 'Harmony', basicName: '流鏑', skillName: '天闕鳴弦', skillType: 'BUFF_ATK', skillDesc: '獲得「鳴弦號令」，提升全隊攻擊力。', ultName: '貫雲飲羽', ultType: 'DAMAGE', ultDesc: '若有號令，提升全隊暴擊爆傷，並對單體造成傷害。', ultVoice: '這就是羅浮的實力！', victoryVoice: '航線確認安全。' },
    'guinaifen': { element: 'Fire', path: 'Nihility', basicName: '劈空候場', skillName: '迎面開門紅', skillType: 'DAMAGE', skillDesc: '對擴散範圍造成火傷並施加灼燒。', ultName: '給您來段看家本領', ultType: 'DAMAGE', ultDesc: '對全體造成火傷，並引爆灼燒狀態。', ultVoice: '這招叫，家和萬事興！', victoryVoice: '謝謝各位捧場！' },

    // --- HSR: Penacony ---
    'blackswan': { element: 'Wind', path: 'Nihility', basicName: '洞悉', skillName: '失墜的偽神', skillType: 'DEBUFF_DEF', skillDesc: '對擴散範圍造成風傷，並有機率施加「奧跡」。', ultName: '沉醉於彼界的懷抱', ultType: 'DAMAGE', ultDesc: '對全體造成風傷，視「奧跡」層數造成額外效果。', ultVoice: '這份記憶，我就收下了。', victoryVoice: '命運的流向，一如既往。' },
    'sparkle': { element: 'Quantum', path: 'Harmony', basicName: '獨角戲', skillName: '夢遊魚', skillType: 'BUFF_ATK', skillDesc: '使我方單體暴擊傷害提升，並使行動提前。', ultName: '一人千面', ultType: 'BUFF_ATK', ultDesc: '為全隊恢復 4 個戰技點，並提升全隊傷害。', ultVoice: '讓我們把這一切搞得更亂一點吧！', victoryVoice: '哎呀，真無聊。' },
    'acheron': { element: 'Lightning', path: 'Nihility', basicName: '三途枯蝶', skillName: '八雷飛渡', skillType: 'DAMAGE', skillDesc: '獲得一點「集真赤」，對擴散範圍造成雷屬性傷害。', ultName: '羅剎縞素，一際川紅', ultType: 'DAMAGE', ultDesc: '發動三次斬擊與一次終結一擊，無視弱點屬性。', ultVoice: '黃泉...為你而開。', victoryVoice: '歸於虛無。' },
    'robin': { element: 'Physical', path: 'Harmony', basicName: '撲翼白聲', skillName: '翎之詠嘆調', skillType: 'BUFF_ATK', skillDesc: '提升全隊造成的傷害。', ultName: '千音齊奏，群星賦格', ultType: 'BUFF_ATK', ultDesc: '進入「協奏」狀態，全隊攻擊力大幅提升並立即行動。', ultVoice: '這首歌，獻給你們。', victoryVoice: '願歌聲傳遞希望。' },
    'jade': { element: 'Quantum', path: 'Erudition', basicName: '吞索', skillName: '恣肆吞雪的保證書', skillType: 'BUFF_ATK', skillDesc: '指定我方單體成為「收債人」，對其提速並附加傷害。', ultName: '深淵中，那貪饕的誓言', ultType: 'DAMAGE', ultDesc: '對全體敵人造成量子傷害，並強化天賦追擊。', ultVoice: '這就是代價。', victoryVoice: '交易愉快。' },
    'firefly': { element: 'Fire', path: 'Destruction', basicName: '指令-閃燃推進', skillName: '指令-天火轟擊', skillType: 'DAMAGE', skillDesc: '消耗生命值，對單體造成大量火屬性傷害。', ultName: '火螢IV型-完全燃燒', ultType: 'BUFF_ATK', ultDesc: '進入「完全燃燒」狀態，速度與擊破效率大幅提升。', ultVoice: '我將...點燃大海！', victoryVoice: '任務...完成了。' },
    'rappa': { element: 'Imaginary', path: 'Erudition', basicName: '忍・手裡劍', skillName: '忍・霧隱', skillType: 'DAMAGE', skillDesc: '對全體造成虛數傷害。', ultName: '忍法・繚亂夜櫻', ultType: 'DAMAGE', ultDesc: '進入結印狀態，發動連續的虛數忍法轟炸。', ultVoice: '忍法，奧義！', victoryVoice: '這就是忍道！' },

    // --- HSR: Jarilo-VI ---
    'bronya_hsr': { element: 'Wind', path: 'Harmony', basicName: '馭風之彈', skillName: '作戰再部署', skillType: 'BUFF_ATK', skillDesc: '解除我方單體負面效果，並使其立即行動。', ultName: '貝洛伯格進行曲', ultType: 'BUFF_ATK', ultValue: 0.5, ultDesc: '提升全隊攻擊力與暴擊傷害。', ultVoice: '築城者的意志，永不陷落！', victoryVoice: '為了貝洛伯格。' },
    'seele': { element: 'Quantum', path: 'Hunt', basicName: '強襲', skillName: '歸刃', skillType: 'DAMAGE', skillDesc: '對單體造成量子傷害，並提升自身速度。', ultName: '亂蝶', ultType: 'DAMAGE', ultValue: 3.5, ultDesc: '進入增幅狀態，對單體造成巨額量子傷害。', ultVoice: '隨蝴蝶一起消散吧...舊日的幻影！', victoryVoice: '我會守護大家。' },
    'clara': { element: 'Physical', path: 'Destruction', basicName: '史瓦羅看著你', skillName: '史瓦羅保護我', skillType: 'DAMAGE', skillDesc: '對全體敵人造成物理傷害，並標記反擊印記。', ultName: '是約定不是命令', ultType: 'SHIELD', ultDesc: '大幅減少受到的傷害，並強化史瓦羅的反擊。', ultVoice: '幫幫我，史瓦羅先生！', victoryVoice: '我們...贏了嗎？' },
    'serval': { element: 'Lightning', path: 'Erudition', basicName: '雷鳴音階', skillName: '電光石火', skillType: 'DAMAGE', skillDesc: '對擴散範圍造成雷傷，並施加觸電狀態。', ultName: '機械熱潮！登場！', ultType: 'DAMAGE', ultDesc: '對全體造成雷傷，並延長敵人身上的觸電回合。', ultVoice: '現在是搖滾時間！', victoryVoice: '這場演出還不錯吧？' },
    'natasha': { element: 'Physical', path: 'Abundance', basicName: '仁慈的背面', skillName: '愛心救助', skillType: 'HEAL_SINGLE', skillDesc: '治療我方單體，並解除一個負面效果。', ultName: '新生之禮', ultType: 'HEAL_ALL', ultDesc: '為我方全體回復大量生命值。', ultVoice: '別擔心，有我在。', victoryVoice: '大家都平安無事。' },
    'lynx': { element: 'Quantum', path: 'Abundance', basicName: '冰攀前齒', skillName: '露營罐頭', skillType: 'HEAL_SINGLE', skillDesc: '治療單體並提升其生命上限，若目標為毀滅/存護則增加嘲諷。', ultName: '雪原急救方案', ultType: 'HEAL_ALL', ultDesc: '解除全隊負面效果並回復生命。', ultVoice: '感覺好點了嗎？', victoryVoice: '野外求生成功。' },
    'pela': { element: 'Ice', path: 'Nihility', basicName: '冰點射擊', skillName: '低溫妨害', skillType: 'DAMAGE', skillDesc: '解除敵方單體的一個增益效果，並造成冰傷。', ultName: '領域壓制', ultType: 'DEBUFF_DEF', ultDesc: '對全體造成冰傷，並降低防禦力。', ultVoice: '戰術分析完畢，開始殲滅。', victoryVoice: '完全符合預期。' },
    'hook': { element: 'Fire', path: 'Destruction', basicName: '喂！小心火燭', skillName: '嘿！記得虎克嗎', skillType: 'DAMAGE', skillDesc: '對單體造成火傷並施加灼燒。', ultName: '轟！飛來橫禍', ultType: 'DAMAGE', ultDesc: '對單體造成火傷，並強化下一次戰技為擴散攻擊。', ultVoice: '漆黑的虎克大人來囉！', victoryVoice: '鼴鼠黨大獲全勝！' },

    // --- HSR: Herta Space Station ---
    'ruanmei': { element: 'Ice', path: 'Harmony', basicName: '一針幽蘭', skillName: '慢捻抹復挑', skillType: 'BUFF_ATK', skillDesc: '提升全隊傷害與擊破效率。', ultName: '搖花草長，生生不息', ultType: 'BUFF_ATK', ultDesc: '展開結界，提升全隊全屬性抗性穿透。', ultVoice: '這花，開得正好。', victoryVoice: '生命自有出路。' },
    'the_herta': { element: 'Ice', path: 'Erudition', basicName: '極寒', skillName: '真理之冰', skillType: 'DAMAGE', skillDesc: '對全體敵人造成冰屬性傷害，並有機率凍結。', ultName: '這就是魔法', ultType: 'DAMAGE', ultDesc: '對全體造成毀滅性傷害，若敵人已凍結則傷害倍增。', ultVoice: '見識一下天才的實力吧。', victoryVoice: '意料之中。' },
    'herta': { element: 'Ice', path: 'Erudition', basicName: '看什麼看', skillName: '一錘子買賣', skillType: 'DAMAGE', skillDesc: '對全體敵人造成冰屬性傷害。', ultName: '是魔法，我加了魔法', ultType: 'DAMAGE', ultDesc: '對全體造成大量冰屬性傷害。', ultVoice: '轉圈圈～', victoryVoice: '測驗結束。' },
    'asta': { element: 'Fire', path: 'Harmony', basicName: '光譜射線', skillName: '流星群降', skillType: 'DAMAGE', skillDesc: '對隨機敵人造成多次火屬性彈射傷害，累積蓄能。', ultName: '星空祝言', ultType: 'BUFF_ATK', ultDesc: '全隊速度大幅提升。', ultVoice: '群星，聽我號令！', victoryVoice: '這就是天文學的力量。' },

    // --- HSR: Astral Express ---
    'stelle': { element: 'Physical', path: 'Destruction', basicName: '再見安打', skillName: '安息全壘打', skillType: 'DAMAGE', skillDesc: '對單體及相鄰目標造成物理傷害。', ultName: '星辰王牌', ultType: 'DAMAGE', ultValue: 2.5, ultDesc: '規則就是用來打破的！對敵人造成大量物理傷害。', ultVoice: '規則，就是用來打破的！', victoryVoice: '這就是銀河棒球俠的實力。' },
    'himeko': { element: 'Fire', path: 'Erudition', basicName: '武裝調律', skillName: '熔核爆裂', skillType: 'DAMAGE', skillDesc: '對擴散範圍造成火屬性傷害。', ultName: '天墜之火', ultType: 'DAMAGE', ultDesc: '對全體敵人造成大量火屬性傷害。', ultVoice: '人類，從不掩飾掌控星空的慾望。', victoryVoice: '這杯咖啡不錯。' },
    'march7th': { element: 'Ice', path: 'Preservation', basicName: '極寒弓矢', skillName: '可愛即是正義', skillType: 'SHIELD', skillDesc: '為我方單體提供護盾。', ultName: '冰刻箭雨之時', ultType: 'DAMAGE', ultDesc: '對全體造成冰屬性傷害，有機率凍結敵人。', ultVoice: '看我這招！', victoryVoice: '嘿嘿，厲害吧？' },

    // --- HSR: Stellaron Hunters ---
    'kafka': { element: 'Lightning', path: 'Nihility', basicName: '止歇', skillName: '月光摩挲', skillType: 'DAMAGE', skillDesc: '對擴散範圍造成雷傷，並引爆敵人身上的持續傷害。', ultName: '悲劇盡頭的顫音', ultType: 'DAMAGE', ultDesc: '對全體造成雷傷，施加觸電並立即引爆。', ultVoice: '聽我說...這就是結局。', victoryVoice: '劇本已完成。' },
    'silverwolf': { element: 'Quantum', path: 'Nihility', basicName: '系統警告', skillName: '是否允許更改？', skillType: 'DEBUFF_DEF', skillDesc: '對單體造成傷害，並植入一個我方屬性的弱點。', ultName: '帳號已封鎖', ultType: 'DAMAGE', ultDesc: '對單體造成大量量子傷害，並大幅降低防禦。', ultVoice: '這局算我贏。', victoryVoice: '簡單模式。' },

    // --- HSR: IPC ---
    'topaz': { element: 'Fire', path: 'Hunt', basicName: '赤字', skillName: '支付困難？', skillType: 'DAMAGE', skillDesc: '召喚帳帳攻擊單體，並施加「負債證明」。', ultName: '轉虧為盈！', ultType: 'BUFF_ATK', ultDesc: '帳帳進入「漲幅驚人！」狀態，傷害與暴擊傷害提升。', ultVoice: '投資的時刻到了！', victoryVoice: '收益不錯。' },

    // --- Genshin Characters (Mapped) ---
    // Inazuma
    'raiden': { element: 'Lightning', path: 'Nihility', basicName: '源流', skillName: '神變・惡曜開眼', skillType: 'BUFF_ATK', skillDesc: '對隊伍賦予雷罰惡曜之眼，進行協同攻擊並提升大招傷害。', ultName: '奧義・夢想真說', ultType: 'DAMAGE', ultValue: 4.0, ultDesc: '斬出無想的一刀，之後進入夢想一心狀態。', ultVoice: '此刻，寂滅之時！', victoryVoice: '浮世景色，百千年依舊。' },
    'yaemiko': { element: 'Lightning', path: 'Erudition', basicName: '狐靈', skillName: '野干役咒・殺生櫻', skillType: 'SUMMON', skillDesc: '召喚殺生櫻，持續對周圍敵人降下落雷。', ultName: '大密法・天狐顯真', ultType: 'DAMAGE', ultDesc: '解放所有殺生櫻，降下天狐霆雷。', ultVoice: '為所欲為～', victoryVoice: '這點程度，還不夠我解悶呢。' },
    'ayaka': { element: 'Ice', path: 'Destruction', basicName: '神里流・傾', skillName: '神里流・冰華', skillType: 'DAMAGE', skillDesc: '擊飛周圍敵人並造成冰元素傷害。', ultName: '神里流・霜滅', ultType: 'DAMAGE', ultDesc: '釋放持續前進的霜見雪關扉，造成連續冰傷。', ultVoice: '櫻花，隨風而逝。', victoryVoice: '失禮了。' },
    'yoimiya': { element: 'Fire', path: 'Hunt', basicName: '煙火打擊', skillName: '焰硝庭火舞', skillType: 'BUFF_ATK', skillDesc: '將普通攻擊轉化為熾熱箭矢。', ultName: '琉金雲間草', ultType: 'DAMAGE', ultDesc: '造成範圍火傷並標記敵人，隊友攻擊可引爆。', ultVoice: '祭典開始囉！', victoryVoice: '煙花易冷，但我不會。' },
    'kokomi': { element: 'Ice', path: 'Abundance', basicName: '水之誓', skillName: '海月之誓', skillType: 'HEAL_MULTI', skillDesc: '召喚化海月，持續治療隊友並攻擊敵人。', ultName: '海人化羽', ultType: 'BUFF_ATK', ultDesc: '普攻與重擊基於生命值上限提升傷害，並治療全隊。', ultVoice: '深海的加護。', victoryVoice: '休息一下吧。' },
    'kukishinobu': { element: 'Lightning', path: 'Abundance', basicName: '忍流', skillName: '越祓雷草之輪', skillType: 'HEAL_MULTI', skillDesc: '消耗生命值，展開持續治療與攻擊的雷草之輪。', ultName: '御詠鳴神刈山祭', ultType: 'DAMAGE', ultDesc: '在前方創造結界，持續造成雷元素傷害。', ultVoice: '謹遵法度。', victoryVoice: '任務完成，收工。' },
    'kujousara': { element: 'Lightning', path: 'Harmony', basicName: '天狗弓術', skillName: '鴉羽天狗霆雷召咒', skillType: 'BUFF_ATK', skillDesc: '為隊友提供攻擊力加成。', ultName: '煌煌千道鎮式', ultType: 'DAMAGE', ultDesc: '降下天狗咒雷，造成雷傷並提供攻擊力加成。', ultVoice: '常道恢弘，鳴神永恆！', victoryVoice: '為了將軍大人！' },
    
    // Liyue
    'keqing': { element: 'Lightning', path: 'Hunt', basicName: '雲來劍法', skillName: '星斗歸位', skillType: 'DAMAGE', skillDesc: '投擲雷楔，再次施放可瞬移攻擊。', ultName: '天街巡遊', ultType: 'DAMAGE', ultDesc: '化身雷電，對範圍內敵人發動連續斬擊。', ultVoice: '劍光如我，斬盡蕪雜！', victoryVoice: '夠了，收工。' },
    'yelan': { element: 'Ice', path: 'Nihility', basicName: '潛行', skillName: '縈絡縱命索', skillType: 'DAMAGE', skillDesc: '疾走牽引絡命絲，標記並爆發傷害。', ultName: '淵圖玲瓏骰', ultType: 'BUFF_ATK', ultDesc: '召喚玄擲玲瓏協助攻擊，並隨時間提升造成傷害。', ultVoice: '收網了。', victoryVoice: '這就是你的極限？' },
    'ganyu': { element: 'Ice', path: 'Erudition', basicName: '流天射術', skillName: '山澤麟跡', skillType: 'SUMMON', skillDesc: '留下冰蓮嘲諷敵人，隨後爆炸。', ultName: '降眾天華', ultType: 'DAMAGE', ultDesc: '降下冰雨，對範圍內敵人持續造成冰傷。', ultVoice: '風雪的縮影。', victoryVoice: '工作...還沒做完...' },
    'hutao': { element: 'Fire', path: 'Destruction', basicName: '往生槍法', skillName: '蝶引來生', skillType: 'BUFF_ATK', skillDesc: '消耗生命值進入彼岸蝶舞狀態，攻擊力大幅提升。', ultName: '安神秘法', ultType: 'DAMAGE', ultDesc: '揮舞熾熱魂靈，造成大範圍火傷並回復生命。', ultVoice: '吃飽喝飽，一路走好！', victoryVoice: '太陽出來我曬太陽～' },
    'shenhe': { element: 'Ice', path: 'Harmony', basicName: '踏辰攝斗', skillName: '仰靈威召將役咒', skillType: 'BUFF_ATK', skillDesc: '為全隊提供「冰翎」，提升冰元素傷害。', ultName: '神女遣靈真訣', ultType: 'DEBUFF_DEF', ultDesc: '召喚籙靈領域，降低敵人物理與冰元素抗性。', ultVoice: '魂出！', victoryVoice: '心如止水。' },
    'zhongli': { element: 'Imaginary', path: 'Preservation', basicName: '岩雨', skillName: '地心', skillType: 'SHIELD', skillDesc: '生成玉璋護盾，吸收量極高並降低周圍敵人抗性。', ultName: '天星', ultType: 'DAMAGE', ultDesc: '降下巨大星岩，造成巨額傷害並石化敵人。', ultVoice: '天動萬象！', victoryVoice: '此乃天道。' },
    'xianyun': { element: 'Wind', path: 'Harmony', basicName: '清風', skillName: '步天梯', skillType: 'HEAL_ALL', skillDesc: '化為仙鶴衝擊，並為隊友提供下落攻擊加成與治療。', ultName: '暮集竹星', ultType: 'BUFF_ATK', ultDesc: '召喚機關竹星，持續治療並提升跳躍高度。', ultVoice: '機關術的奧妙。', victoryVoice: '哼，雕蟲小技。' },
    'xiangling': { element: 'Fire', path: 'Erudition', basicName: '白案功夫', skillName: '鍋巴出擊', skillType: 'SUMMON', skillDesc: '召喚鍋巴，持續噴火。', ultName: '旋火輪', ultType: 'DAMAGE', ultDesc: '甩出火輪圍繞自身旋轉，造成持續火傷。', ultVoice: '見識下師傅的槍法！', victoryVoice: '好吃的來囉！' },

    // Fontaine
    'furina': { element: 'Ice', path: 'Harmony', basicName: '獨舞', skillName: '孤心沙龍', skillType: 'SUMMON', skillDesc: '召喚沙龍成員攻擊敵人並消耗全隊生命，或召喚歌者治療。', ultName: '萬民歡騰', ultType: 'BUFF_ATK', ultDesc: '根據全隊生命值變動提升造成的傷害與受治療加成。', ultVoice: '好戲開場了！', victoryVoice: '完美的演出。' },
    'navia': { element: 'Imaginary', path: 'Destruction', basicName: '禮儀', skillName: '典儀・晶火', skillType: 'DAMAGE', skillDesc: '展開銃柄傘，打出多枚玫瑰晶彈。', ultName: '如霰澄天的鳴禮', ultType: 'DAMAGE', ultDesc: '召喚金花禮炮，持續轟擊前方敵人。', ultVoice: '火炮，發射！', victoryVoice: '這就是刺玫會的實力。' },
    'clorinde': { element: 'Lightning', path: 'Hunt', basicName: '誓言', skillName: '狩夜之巡', skillType: 'BUFF_ATK', skillDesc: '進入夜巡狀態，結合銃槍與劍術進行攻擊。', ultName: '殘光將終', ultType: 'DAMAGE', ultDesc: '化身雷光，對範圍內敵人造成多段傷害。', ultVoice: '以榮耀之名。', victoryVoice: '決鬥結束。' },
    'arlecchino': { element: 'Fire', path: 'Destruction', basicName: '斬首', skillName: '萬相化灰', skillType: 'DAMAGE', skillDesc: '對周圍敵人造成火傷並施加血償勒令。', ultName: '厄月將升', ultType: 'DAMAGE', ultDesc: '吸收並清除血償勒令，造成範圍火傷並回復生命。', ultVoice: '赤月之宴，開始了。', victoryVoice: '無聊的餘興節目。' },
    'sigewinne': { element: 'Ice', path: 'Abundance', basicName: '標靶治療', skillName: '彈跳水療法', skillType: 'HEAL_MULTI', skillDesc: '發射激流球，在隊友與敵人可見彈跳，治療隊友並攻擊敵人。', ultName: '過飽和心意注射', ultType: 'DAMAGE', ultDesc: '取出巨大針筒衝擊前方。', ultVoice: '該打針囉！', victoryVoice: '大家都很有精神呢。' },

    // Sumeru
    'nahida': { element: 'Wind', path: 'Nihility', basicName: '行相', skillName: '所聞遍計', skillType: 'DEBUFF_DEF', skillDesc: '標記敵人，使他們連結在一起，共享傷害。', ultName: '心景幻成', ultType: 'BUFF_ATK', ultDesc: '展開摩耶之殿，強化隊伍的元素反應。', ultVoice: '這就是智慧的殿堂。', victoryVoice: '知識，是會分享的。' },
    'nilou': { element: 'Ice', path: 'Harmony', basicName: '弦月舞', skillName: '七域舞步', skillType: 'BUFF_ATK', skillDesc: '進入翩轉狀態，使全隊觸發特殊的豐穰之核。', ultName: '浮蓮舞步・遠夢聆泉', ultType: 'DAMAGE', ultDesc: '綻放水蓮，對周圍造成水元素傷害。', ultVoice: '請欣賞這支舞。', victoryVoice: '謝幕了。' },
    'alhaitham': { element: 'Wind', path: 'Hunt', basicName: '溯古', skillName: '共相・理式摹寫', skillType: 'DAMAGE', skillDesc: '突進並獲得琢光鏡，進行協同攻擊。', ultName: '殊境・顯象縛結', ultType: 'DAMAGE', ultDesc: '消耗琢光鏡，造成多次草元素範圍傷害。', ultVoice: '實踐檢驗真理。', victoryVoice: '在意料之中。' },

    // Natlan
    'mavuika': { element: 'Fire', path: 'Destruction', basicName: '戰火', skillName: '焚天之怒', skillType: 'DAMAGE', skillDesc: '釋放火焰領域，持續灼燒敵人。', ultName: '戰爭之神的榮光', ultType: 'DAMAGE', ultDesc: '化身烈焰戰神，對全場造成毀滅性打擊。', ultVoice: '戰爭，永不休止！', victoryVoice: '榮耀歸於納塔。' },
    'mualani': { element: 'Ice', path: 'Hunt', basicName: '踏浪', skillName: '衝浪鯊鯊', skillType: 'DAMAGE', skillDesc: '騎乘鯊魚衝撞敵人，標記並造成額外傷害。', ultName: '爆裂水球', ultType: 'DAMAGE', ultDesc: '發射巨型導彈追蹤敵人。', ultVoice: '衝浪時間到！', victoryVoice: '再來一局？' },
    'xilonen': { element: 'Imaginary', path: 'Harmony', basicName: '鍛打', skillName: '黑曜石工藝', skillType: 'DEBUFF_DEF', skillDesc: '召喚採樣器，降低敵人對應元素抗性。', ultName: '大匠之音', ultType: 'HEAL_ALL', ultDesc: '隨節奏治療隊友並造成傷害。', ultVoice: '這就是我的節奏。', victoryVoice: '完美的工藝品。' },
    'chasca': { element: 'Wind', path: 'Hunt', basicName: '風矢', skillName: '靈魂韁繩', skillType: 'DAMAGE', skillDesc: '騎乘且飛行，在空中進行多重屬性射擊。', ultName: '索魂獵殺', ultType: 'DAMAGE', ultDesc: '發射一發裂魂的重箭。', ultVoice: '你無處可逃。', victoryVoice: '狩獵結束。' },
    'citlali': { element: 'Ice', path: 'Preservation', basicName: '霜星', skillName: '夜神護佑', skillType: 'SHIELD', skillDesc: '召喚黑曜石護盾保護全隊。', ultName: '星落', ultType: 'DAMAGE', ultDesc: '召喚冰隕石砸向地面，凍結敵人。', ultVoice: '夜神在注視著你。', victoryVoice: '安息吧。' },

    // Mondstadt
    'jean': { element: 'Wind', path: 'Abundance', basicName: '西風劍術', skillName: '風壓劍', skillType: 'HEAL_SINGLE', skillDesc: '聚集敵人並擊飛，回復少量生命。', ultName: '蒲公英之風', ultType: 'HEAL_ALL', ultDesc: '展開蒲公英領域，瞬間回復大量生命並持續治療。', ultVoice: '風啊，回應我吧！', victoryVoice: '風神護佑。' },
    'eula': { element: 'Physical', path: 'Destruction', basicName: '西風劍術・宗室', skillName: '冰潮的渦旋', skillType: 'DAMAGE', skillDesc: '揮舞大劍造成冰傷，長按可消耗冷酷之心降低敵人物理抗性。', ultName: '凝浪之光劍', ultType: 'DAMAGE', ultDesc: '創造光降之劍，隨攻擊蓄能，最後引爆造成巨額物理傷害。', ultVoice: '堅冰，斷絕深仇！', victoryVoice: '這個仇，我記下了。' },
    'klee': { element: 'Fire', path: 'Erudition', basicName: '砰砰', skillName: '蹦蹦炸彈', skillType: 'DAMAGE', skillDesc: '投擲彈跳的炸彈，分裂成詭雷。', ultName: '轟轟火花', ultType: 'DAMAGE', ultDesc: '召喚火花持續攻擊附近的敵人。', ultVoice: '轟轟火花，全彈發射！', victoryVoice: '噠噠噠～' },
    'mona': { element: 'Ice', path: 'Nihility', basicName: '因果點破', skillName: '水中幻願', skillType: 'SUMMON', skillDesc: '召喚虛影嘲諷敵人。', ultName: '星命定軌', ultType: 'DEBUFF_DEF', ultDesc: '禁錮敵人並施加星異狀態，大幅提升其受到的傷害。', ultVoice: '這就是命運。', victoryVoice: '命中註定。' },
    'lisa': { element: 'Lightning', path: 'Nihility', basicName: '指尖雷暴', skillName: '蒼雷', skillType: 'DAMAGE', skillDesc: '引導雷電，對範圍內敵人造成雷傷。', ultName: '薔薇的雷光', ultType: 'DEBUFF_DEF', ultDesc: '召喚雷燈，持續攻擊並降低敵人防禦。', ultVoice: '來點刺激的？', victoryVoice: '稍微有點流汗了呢。' },
    'noelle': { element: 'Imaginary', path: 'Preservation', basicName: '西風劍術・女僕', skillName: '護心鎧', skillType: 'SHIELD', skillDesc: '開啟岩護盾，攻擊時有機率回復全隊生命。', ultName: '大掃除', ultType: 'BUFF_ATK', ultDesc: '大劍爆發岩元素之力，攻擊範圍與傷害大幅提升。', ultVoice: '岩石的重量，令人安心。', victoryVoice: '打掃完畢。' },
};

// --- DATA ACCESS ---
export const getCharData = (id: string, name: string): CharacterCombatData => {
    return CHAR_COMBAT_DATA[id] || {
        element: 'Physical',
        path: 'Destruction',
        basicName: '普通攻擊',
        skillName: '戰技',
        skillType: 'DAMAGE',
        skillDesc: '對敵方單體造成傷害。',
        ultName: '終結技',
        ultType: 'DAMAGE',
        ultDesc: '對敵方單體造成大量傷害。',
        ultVoice: '喝！',
        victoryVoice: '勝利。'
    };
};

// --- Stat Calculation Utility ---
export const calculateStats = (char: Character, level: number, ascension: number, affection: number = 0): CombatStats => {
    const isSSR = char.rarity === 5;
    const combatData = getCharData(char.id, char.name); 
    
    let hpWeight = 1.0;
    let atkWeight = 1.0;
    let defWeight = 1.0;
    let spdWeight = 1.0;

    switch (combatData.path) {
        case 'Destruction': hpWeight = 1.1; atkWeight = 1.1; defWeight = 1.0; spdWeight = 0.95; break;
        case 'Hunt': hpWeight = 0.8; atkWeight = 1.2; defWeight = 0.8; spdWeight = 1.15; break;
        case 'Erudition': hpWeight = 0.9; atkWeight = 1.15; defWeight = 0.9; spdWeight = 0.9; break;
        case 'Harmony': hpWeight = 1.1; atkWeight = 0.7; defWeight = 1.1; spdWeight = 1.1; break;
        case 'Nihility': hpWeight = 1.0; atkWeight = 1.0; defWeight = 0.9; spdWeight = 1.05; break;
        case 'Preservation': hpWeight = 1.2; atkWeight = 0.6; defWeight = 1.4; spdWeight = 0.9; break;
        case 'Abundance': hpWeight = 1.3; atkWeight = 0.7; defWeight = 1.0; spdWeight = 0.95; break;
    }

    if (char.id === 'lingsha') atkWeight = 1.0; 

    const baseHp = (isSSR ? 1200 : 950) * hpWeight;
    const baseAtk = (isSSR ? 180 : 140) * atkWeight;
    const baseDef = (isSSR ? 120 : 90) * defWeight;
    const baseSpd = (isSSR ? 105 : 95) * spdWeight;

    const hpGrowth = (isSSR ? 45 : 32) * hpWeight;
    const atkGrowth = (isSSR ? 9.2 : 6.5) * atkWeight;
    const defGrowth = (isSSR ? 7.5 : 5.5) * defWeight;
    
    const ascMult = 1 + (ascension * 0.12); 
    const bondInfo = getBondLevel(affection);
    const bondMult = 1 + bondInfo.bonus;

    return {
        hp: Math.floor((baseHp + (level - 1) * hpGrowth) * ascMult * bondMult),
        atk: Math.floor((baseAtk + (level - 1) * atkGrowth) * ascMult * bondMult),
        def: Math.floor((baseDef + (level - 1) * defGrowth) * ascMult * bondMult),
        spd: Math.floor(baseSpd), 
        critRate: isSSR ? 0.05 + (ascension * 0.03) : 0.05 + (ascension * 0.01), 
        critDmg: isSSR ? 0.5 + (ascension * 0.08) : 0.5 + (ascension * 0.04)
    };
};
