
import { SkillConfig } from '../types';

export const CHARACTER_SKILL_DB: Record<string, { basic: SkillConfig, skill: SkillConfig, ult: SkillConfig }> = {
  // ==============================
  // EXISTING BATCH 1 (HSR)
  // ==============================
  'acheron': {
    basic: {
      name: '三途枯蝶',
      type: 'Basic',
      element: 'Lightning',
      spCost: 0,
      ratio: 1.0,
      tags: ['Damage', 'No_Energy'],
      fixedEnergyGain: 1, 
      description: '對敵方單體造成雷屬性傷害，獲得1點「集真赤」。',
      hitSplit: [1.0]
    },
    skill: {
      name: '八雷飛渡',
      type: 'Skill',
      element: 'Lightning',
      spCost: 1,
      ratio: 2.0,
      tags: ['Damage', 'Blast', 'No_Energy'],
      fixedEnergyGain: 3, 
      description: '獲得3點「集真赤」，對擴散範圍造成雷屬性傷害。',
      hitSplit: [0.2, 0.2, 0.6]
    },
    ult: {
      name: '羅剎縞素，一際川紅',
      type: 'Ult',
      element: 'Lightning',
      spCost: 0,
      ratio: 4.5,
      tags: ['Damage', 'AoE', 'Ignore_Weakness', 'No_Energy'],
      description: '發動數次斬擊，無視弱點屬性削減敵方全體韌性。',
      hitSplit: [0.1, 0.1, 0.1, 0.7]
    }
  },
  'firefly': {
    basic: { name: '指令-閃燃推進', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: {
      name: '指令-天火轟擊',
      type: 'Skill',
      element: 'Fire',
      spCost: 1,
      ratio: 2.4,
      tags: ['Damage', 'Hp_Cost', 'Blast'], 
      description: '消耗生命值對敵方單體及相鄰目標造成火屬性傷害。',
      hitSplit: [1.0]
    },
    ult: {
      name: '火螢IV型-完全燃燒',
      type: 'Ult',
      element: 'Fire',
      spCost: 0,
      ratio: 3.8,
      tags: ['Break_Dmg', 'Ignore_Weakness', 'Buff_Atk', 'Double_Cast'],
      description: '進入「完全燃燒」狀態，大幅提升擊破效率並無視弱點。',
      hitSplit: [1.0]
    }
  },
  'kafka': {
    basic: { name: '止歇', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: {
      name: '月光摩挲',
      type: 'Skill',
      element: 'Lightning',
      spCost: 1,
      ratio: 1.6,
      tags: ['Damage', 'Blast', 'DoT_Detonate'],
      description: '對擴散範圍造成雷傷，並額外結算敵人身上的持續傷害。',
      hitSplit: [0.5, 0.5]
    },
    ult: {
      name: '悲劇盡頭的顫音',
      type: 'Ult',
      element: 'Lightning',
      spCost: 0,
      ratio: 2.5,
      tags: ['Damage', 'AoE', 'DoT_Shock', 'DoT_Detonate'],
      description: '對全體造成雷傷，施加觸電並立即引爆。',
      hitSplit: [1.0]
    }
  },
  'ruanmei': {
    basic: { name: '一針幽蘭', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '慢捻抹復挑', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.4, description: '提升全隊傷害與擊破效率。' },
    ult: { name: '搖花草長，生生不息', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.3, description: '展開結界，提升全隊全屬性抗性穿透。' }
  },
  'feixiao': {
    basic: { name: '裂空', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '天擊', type: 'Skill', element: 'Wind', spCost: 1, ratio: 2.2, tags: ['Damage', 'FollowUp'], description: '對單體造成風屬性傷害，並觸發追加攻擊。', hitSplit: [0.5, 0.5] },
    ult: { name: '鑿破穹蒼', type: 'Ult', element: 'Wind', spCost: 0, ratio: 5.0, tags: ['Damage', 'Ignore_Weakness'], description: '對單體發動無視弱點的致命連擊。', hitSplit: [0.1, 0.1, 0.1, 0.1, 0.1, 0.5] }
  },
  'jingliu': {
    basic: { name: '流影', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '無罅飛光', type: 'Skill', element: 'Ice', spCost: 1, ratio: 2.2, tags: ['Damage', 'Blast', 'Hp_Cost'], description: '消耗隊友生命值對敵方單體及相鄰目標造成冰屬性傷害。', hitSplit: [0.2, 0.2, 0.6] },
    ult: { name: '曇華生滅，天河瀉夢', type: 'Ult', element: 'Ice', spCost: 0, ratio: 3.5, tags: ['Damage', 'Blast', 'Buff_Atk'], description: '造成巨額冰屬性傷害，並獲得「朔望」層數。', hitSplit: [1.0] }
  },
  'seele': {
    basic: { name: '強襲', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '歸刃', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 2.2, tags: ['Damage', 'Buff_Atk'], description: '對單體造成傷害並加速。', hitSplit: [0.3, 0.7] },
    ult: { name: '亂蝶', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 4.5, tags: ['Damage', 'Double_Cast'], description: '進入增幅狀態，立即行動並造成巨額傷害。', hitSplit: [1.0] }
  },
  'jingyuan': {
    basic: { name: '石火流光', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '紫霄震曜', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.5, tags: ['Damage', 'AoE', 'Summon'], description: '全體雷傷，神君段數+2。', hitSplit: [0.5, 0.5] },
    ult: { name: '吾身光明', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 2.8, tags: ['Damage', 'AoE', 'Summon'], description: '全體雷傷，神君段數+3。', hitSplit: [1.0] }
  },
  'topaz': {
    basic: { name: '赤字', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage', 'Summon'], hitSplit: [1.0] },
    skill: { name: '支付困難？', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.8, tags: ['Damage', 'FollowUp', 'Debuff_Def', 'Summon'], description: '施加負債證明並召喚帳帳追加攻擊。', hitSplit: [1.0] },
    ult: { name: '轉虧為盈！', type: 'Ult', element: 'Fire', spCost: 0, ratio: 0, tags: ['Buff_Atk', 'Summon'], buffValue: 0.5, description: '帳帳進入「漲幅驚人！」狀態。' }
  },
  'silverwolf': {
    basic: { name: '系統警告', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '是否允許更改？', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 1.8, tags: ['Damage', 'Debuff_Def'], description: '植入弱點。', hitSplit: [1.0] },
    ult: { name: '帳號已封鎖', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 3.5, tags: ['Damage', 'Debuff_Def'], description: '大幅降低防禦。', hitSplit: [1.0] }
  },
  'huohuo': {
    basic: { name: '令旗', type: 'Basic', element: 'Wind', spCost: 0, ratio: 0.5, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '靈符', type: 'Skill', element: 'Wind', spCost: 1, ratio: 0, tags: ['Heal', 'Blast'], healRatio: 1.4, description: '擴散治療並解控。' },
    ult: { name: '尾巴', type: 'Ult', element: 'Wind', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.4, description: '全隊充能與攻擊提升。' }
  },
  'fuxuan': {
    basic: { name: '始擊歲星', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '太微行棋', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 0, tags: ['Shield', 'Buff_Atk'], description: '開啟窮觀陣分攤傷害。' },
    ult: { name: '天律大衍', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'Heal'], description: '全體傷害並回復全隊生命。', hitSplit: [1.0] }
  },
  'sparkle': {
    basic: { name: '獨角戲', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '夢遊魚', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 0, tags: ['Buff_Atk', 'Double_Cast'], buffValue: 0.5, description: '暴傷提升並拉條。' },
    ult: { name: '一人千面', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 0, tags: ['Buff_Atk'], description: '恢復4戰技點並提升全隊傷害。' }
  },
  'robin': {
    basic: { name: '撲翼白聲', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '翎之詠嘆調', type: 'Skill', element: 'Physical', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.5, description: '全隊增傷。' },
    ult: { name: '千音齊奏', type: 'Ult', element: 'Physical', spCost: 0, ratio: 0, tags: ['Buff_Atk', 'Double_Cast'], description: '全隊攻擊大幅提升並立即行動。' }
  },
  'bronya_hsr': {
    basic: { name: '馭風之彈', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '作戰再部署', type: 'Skill', element: 'Wind', spCost: 1, ratio: 0, tags: ['Buff_Atk', 'Double_Cast'], description: '解控並立即行動。' },
    ult: { name: '貝洛伯格進行曲', type: 'Ult', element: 'Wind', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.5, description: '全隊攻擊爆傷提升。' }
  },
  'tingyun': {
    basic: { name: '逐客令', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '祥音和韻', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.5, description: '單體賜福。' },
    ult: { name: '慶雲光蓋儀', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.6, description: '單體回能增傷。' }
  },
  'pela': {
    basic: { name: '冰點射擊', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '低溫妨害', type: 'Skill', element: 'Ice', spCost: 1, ratio: 2.0, tags: ['Damage'], description: '冰傷並解除增益。', hitSplit: [1.0] },
    ult: { name: '領域壓制', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '全體降防。', hitSplit: [1.0] }
  },
  'natasha': {
    basic: { name: '仁慈的背面', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '愛心救助', type: 'Skill', element: 'Physical', spCost: 1, ratio: 0, tags: ['Heal'], healRatio: 1.2, description: '單體治療解控。' },
    ult: { name: '新生之禮', type: 'Ult', element: 'Physical', spCost: 0, ratio: 0, tags: ['Heal', 'AoE'], healRatio: 1.8, description: '全體治療。' }
  },
  'march7th': {
    basic: { name: '極寒弓矢', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '可愛即是正義', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Shield'], description: '單體護盾。' },
    ult: { name: '冰刻箭雨之時', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE'], description: '全體冰傷並凍結。', hitSplit: [0.3, 0.3, 0.4] }
  },
  'clara': {
    basic: { name: '史瓦羅看著你', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '史瓦羅保護我', type: 'Skill', element: 'Physical', spCost: 1, ratio: 1.2, tags: ['Damage', 'AoE'], description: '對敵方全體造成物理傷害。' },
    ult: { name: '是約定不是命令', type: 'Ult', element: 'Physical', spCost: 0, ratio: 0, tags: ['Shield', 'Buff_Atk', 'FollowUp'], description: '減少受到的傷害，並強化反擊。' }
  },
  'serval': {
    basic: { name: '雷鳴音階', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '電光石火', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.4, tags: ['Damage', 'Blast', 'DoT_Shock'], description: '對擴散範圍造成雷傷並施加觸電。' },
    ult: { name: '機械熱潮！登場！', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'DoT_Shock'], description: '全體雷傷並延長觸電狀態。' }
  },
  'himeko': {
    basic: { name: '武裝調律', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '熔核爆裂', type: 'Skill', element: 'Fire', spCost: 1, ratio: 2.0, tags: ['Damage', 'Blast', 'DoT_Burn'], description: '對擴散範圍造成火傷並施加灼燒。' },
    ult: { name: '天墜之火', type: 'Ult', element: 'Fire', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '對敵方全體造成火屬性傷害。' }
  },
  'stelle': {
    basic: { name: '再見安打', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '安息全壘打', type: 'Skill', element: 'Physical', spCost: 1, ratio: 2.0, tags: ['Damage', 'Blast'], description: '對擴散範圍造成物理傷害。' },
    ult: { name: '星辰王牌', type: 'Ult', element: 'Physical', spCost: 0, ratio: 3.0, tags: ['Damage', 'Blast'], description: '規則就是用來打破的！造成大量物理傷害。' }
  },
  'the_herta': {
    basic: { name: '極寒', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '真理之冰', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.8, tags: ['Damage', 'AoE', 'Debuff_Freeze'], description: '全體冰傷並機率凍結。' },
    ult: { name: '這就是魔法', type: 'Ult', element: 'Ice', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE'], description: '對敵方全體造成毀滅性冰傷。' }
  },

  // ==============================
  // BATCH 2: NEW OMPHALOS / CUSTOM (REWORKED)
  // ==============================
  'linyun': {
    basic: { name: '嘲諷', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '情緒勒索', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 1.5, tags: ['Damage', 'Debuff_Def'], description: '駭入敵方系統造成傷害並降低防禦。' },
    ult: { name: '崩潰邊緣', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 4.0, tags: ['Damage', 'Break_Dmg'], description: '對單體造成毀滅性精神打擊。', hitSplit: [1.0] }
  },
  'aglaea': {
    basic: { name: '金針', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '黃金縫合', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 0, tags: ['Summon', 'Buff_Atk'], description: '召喚黃金織物守護並提升速度。' },
    ult: { name: '命運紡錘', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE'], description: '以黃金絲線切割命運，對全體造成傷害。', hitSplit: [0.2, 0.8] }
  },
  'fengjin': {
    basic: { name: '當微風輕吻雲沫', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '愛在虹光灑落時', type: 'Skill', element: 'Wind', spCost: 1, ratio: 0, tags: ['Heal', 'Summon', 'Buff_Atk'], healRatio: 1.2, description: '召喚憶靈「小伊卡」並回復全隊生命。' },
    ult: { name: '飛入晨昏的我們', type: 'Ult', element: 'Wind', spCost: 0, ratio: 0, tags: ['Heal', 'AoE', 'Summon'], healRatio: 2.0, description: '為全隊及小伊卡回復大量生命，並解除負面效果。' }
  },
  'haiseyin': {
    basic: { name: '小調，止水中迴響', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage', 'DoT_Bleed'], hitSplit: [1.0] },
    skill: { name: '泛音，暗流後齊鳴', type: 'Skill', element: 'Physical', spCost: 1, ratio: 1.2, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '對全體造成物理傷害，並使敵方全體獲得易傷。' },
    ult: { name: '絕海迴濤，噬魂舞曲', type: 'Ult', element: 'Physical', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'DoT_Detonate'], description: '展開結界，降低敵方攻防並觸發追加傷害。' }
  },
  'sapphire': {
    basic: { name: '呀，漏網之魚', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '嘿，空手套白銀', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 1.0, tags: ['Damage', 'FollowUp'], description: '標記敵人為「老主顧」，隊友攻擊時觸發追加攻擊。' },
    ult: { name: '時空裂隙', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 4.0, tags: ['Damage', 'Ignore_Weakness'], description: '引爆老主顧身上的記錄值，造成巨額真實傷害。' }
  },
  'kelyudela': {
    basic: { name: '易位，兵貴神速', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '升變，士皆可帥', type: 'Skill', element: 'Wind', spCost: 1, ratio: 0, tags: ['Buff_Atk', 'Double_Cast'], description: '賦予隊友「軍功」，觸發戰技複製（再次行動）。' },
    ult: { name: '世事如棋，四步堪殺', type: 'Ult', element: 'Wind', spCost: 0, ratio: 1.5, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '全體傷害並分配軍功，提升全隊攻擊。' }
  },
  'xilian': {
    basic: { name: '看！是希望的起始！', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '結界流轉', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Summon', 'Buff_Dmg'], buffValue: 0.4, description: '召喚憶靈協同攻擊，提升全隊傷害。' },
    ult: { name: '永恆水晶', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Buff_Atk', 'Energy_Charge', 'AoE'], description: '激活全隊(除自身外)終結技，進入爆發狀態。' }
  },

  // ==============================
  // BATCH 2: HSR REMAINING
  // ==============================
  'blackswan': {
    basic: { name: '洞悉', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage', 'DoT_Wind'], hitSplit: [1.0] },
    skill: { name: '失墜的偽神', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Damage', 'Blast', 'Debuff_Def', 'DoT_Wind'], description: '對擴散範圍造成風傷，並施加「奧跡」。', hitSplit: [0.5, 0.5] },
    ult: { name: '沉醉於彼界的懷抱', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.4, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '對全體造成風傷，並使敵人陷入「揭露」狀態，無視部分防禦。', hitSplit: [1.0] }
  },
  'rappa': {
    basic: { name: '忍・手裡劍', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '忍・霧隱', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 1.8, tags: ['Damage', 'AoE'], description: '對敵方全體造成虛數傷害。', hitSplit: [1.0] },
    ult: { name: '忍法・繚亂夜櫻', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 0, tags: ['Buff_Atk', 'Double_Cast'], buffValue: 0.6, description: '進入結印狀態，強化普攻並立即行動。' }
  },
  'lingsha': {
    basic: { name: '薰風', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '丹心', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.5, tags: ['Damage', 'AoE', 'Heal', 'Summon'], description: '對全體造成火傷，治療我方並召喚「浮元」。', hitSplit: [1.0] },
    ult: { name: '醉霧浮煙', type: 'Ult', element: 'Fire', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'Heal'], description: '對全體造成火傷，治療我方全體並解除負面效果。' }
  },
  'yunli': {
    basic: { name: '揮劍', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '卻邪', type: 'Skill', element: 'Physical', spCost: 1, ratio: 1.8, tags: ['Damage', 'Blast', 'Heal'], healRatio: 0.2, description: '對擴散範圍造成物理傷害並回復自身生命。', hitSplit: [1.0] },
    ult: { name: '劍魂覺醒', type: 'Ult', element: 'Physical', spCost: 0, ratio: 0, tags: ['Shield', 'FollowUp'], description: '格擋下一次攻擊並對攻擊者發動強力反擊。' }
  },
  'jade': {
    basic: { name: '吞索', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage', 'Blast'], hitSplit: [1.0] },
    skill: { name: '恣肆吞雪的保證書', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.3, description: '指定我方單體成為「收債人」，提升速度與攻擊。' },
    ult: { name: '深淵中，那貪饕的誓言', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 2.8, tags: ['Damage', 'AoE', 'FollowUp'], description: '對全體造成量子傷害，並強化追加攻擊。' }
  },
  'xueyi': {
    basic: { name: '破魔錐', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '攝伏諸惡', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 2.0, tags: ['Damage', 'Ignore_Weakness'], description: '對單體造成量子傷害，無視弱點屬性削減韌性。' },
    ult: { name: '天罰貫身', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 3.5, tags: ['Damage', 'Ignore_Weakness'], description: '對單體造成極高量子傷害，無視弱點屬性。' }
  },
  'hanya': {
    basic: { name: '冥讖天筆', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '生滅無常', type: 'Skill', element: 'Physical', spCost: 1, ratio: 1.5, tags: ['Damage', 'Debuff_Def'], description: '造成物理傷害並標記敵人，攻擊標記目標可恢復戰技點。' },
    ult: { name: '十王敕令，遍土遵行', type: 'Ult', element: 'Physical', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.6, description: '大幅提升我方單體速度與攻擊力。' }
  },
  'guinaifen': {
    basic: { name: '劈空候場', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage', 'DoT_Burn'], hitSplit: [1.0] },
    skill: { name: '迎面開門紅', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.5, tags: ['Damage', 'Blast', 'DoT_Burn'], description: '對擴散範圍造成火傷並施加灼燒。' },
    ult: { name: '給您來段看家本領', type: 'Ult', element: 'Fire', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'DoT_Detonate'], description: '對全體造成火傷，並引爆灼燒狀態。' }
  },
  'sushang': {
    basic: { name: '雲騎劍法', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '雲騎劍經・山勢', type: 'Skill', element: 'Physical', spCost: 1, ratio: 2.0, tags: ['Damage', 'Break_Dmg'], description: '對單體造成物理傷害，若目標被擊破則必定暴擊。' },
    ult: { name: '太虛形蘊・燭夜', type: 'Ult', element: 'Physical', spCost: 0, ratio: 3.5, tags: ['Damage', 'Double_Cast'], description: '召喚巨劍對單體造成傷害，並使自身行動提前。' }
  },
  'lynx': {
    basic: { name: '冰攀前齒', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '露營罐頭', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 0, tags: ['Heal', 'Buff_Atk'], healRatio: 1.0, description: '治療單體並提升生命上限，增加毀滅/存護角色的嘲諷值。' },
    ult: { name: '雪原急救方案', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 0, tags: ['Heal', 'AoE'], healRatio: 1.5, description: '治療全體並解除負面效果。' }
  },
  'hook': {
    basic: { name: '喂！小心火燭', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '嘿！記得虎克嗎', type: 'Skill', element: 'Fire', spCost: 1, ratio: 2.0, tags: ['Damage', 'DoT_Burn'], description: '對單體造成火傷並施加灼燒。' },
    ult: { name: '轟！飛來橫禍', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.5, tags: ['Damage', 'Blast'], description: '對單體造成大量火傷，並強化下一次戰技為擴散攻擊。' }
  },
  'herta': {
    basic: { name: '看什麼看', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '一錘子買賣', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.2, tags: ['Damage', 'AoE'], description: '對敵方全體造成冰屬性傷害。' },
    ult: { name: '是魔法，我加了魔法', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.2, tags: ['Damage', 'AoE'], description: '對全體造成大量冰屬性傷害。' }
  },
  'asta': {
    basic: { name: '光譜射線', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '流星群降', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.5, tags: ['Damage', 'Blast'], description: '對隨機敵人造成多次火屬性彈射傷害。', hitSplit: [0.2, 0.2, 0.2, 0.2, 0.2] },
    ult: { name: '星空祝言', type: 'Ult', element: 'Fire', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.5, description: '全隊速度大幅提升。' }
  },
  'qingque': {
    basic: { name: '門前清', type: 'Basic', element: 'Quantum', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '海底撈月', type: 'Skill', element: 'Quantum', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.3, description: '抽取瓊玉牌，獲得強化普攻機會。' },
    ult: { name: '四喜臨門', type: 'Ult', element: 'Quantum', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '對全體造成量子傷害，並切換至「暗槓」狀態。' }
  },
  'yukong': {
    basic: { name: '流鏑', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '天闕鳴弦', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.4, description: '獲得「鳴弦號令」，提升全隊攻擊力。' },
    ult: { name: '貫雲飲羽', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 3.0, tags: ['Damage', 'Buff_Atk'], description: '若有號令，提升全隊暴擊爆傷，並對單體造成傷害。' }
  },
  'bailu': {
    basic: { name: '望聞問切', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '雲吟垂澤', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 0, tags: ['Heal', 'Blast'], healRatio: 1.0, description: '治療單體並在隊友間彈射治療。' },
    ult: { name: '龍躍淵藪', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 0, tags: ['Heal', 'AoE', 'Buff_Atk'], healRatio: 1.5, description: '治療全體並施加「生息」狀態，受擊時回血。' }
  },

  // ==============================
  // BATCH 3: GENSHIN (MONDSTADT)
  // ==============================
  'lumine': {
    basic: { name: '異邦劍術', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '風渦劍', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.8, tags: ['Damage', 'Blast'], description: '聚集風元素，對前方敵人造成傷害。' },
    ult: { name: '隨風而去', type: 'Ult', element: 'Wind', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE'], description: '召喚龍捲風，對路徑上的敵人造成持續傷害。' }
  },
  'jean': {
    basic: { name: '西風劍術', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '風壓劍', type: 'Skill', element: 'Wind', spCost: 1, ratio: 2.0, tags: ['Damage', 'Blast'], description: '聚集敵人並造成風屬性傷害。' },
    ult: { name: '蒲公英之風', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.0, tags: ['Heal', 'AoE', 'Damage'], healRatio: 1.5, description: '展開蒲公英領域，瞬間回復大量生命並對敵人造成傷害。' }
  },
  'eula': {
    basic: { name: '西風劍術・宗室', type: 'Basic', element: 'Physical', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '冰潮的渦旋', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.8, tags: ['Damage', 'Debuff_Def'], description: '造成冰傷並降低敵人物理抗性。' },
    ult: { name: '凝浪之光劍', type: 'Ult', element: 'Physical', spCost: 0, ratio: 4.5, tags: ['Damage', 'AoE', 'FollowUp'], description: '創造光降之劍，延遲引爆造成巨額物理傷害。' }
  },
  'klee': {
    basic: { name: '砰砰', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '蹦蹦炸彈', type: 'Skill', element: 'Fire', spCost: 1, ratio: 2.2, tags: ['Damage', 'Blast'], description: '投擲彈跳的炸彈，分裂成詭雷。' },
    ult: { name: '轟轟火花', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE'], description: '召喚火花持續攻擊附近的敵人。' }
  },
  'mona': {
    basic: { name: '因果點破', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '水中幻願', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Summon', 'Shield'], description: '召喚虛影嘲諷敵人。' },
    ult: { name: '星命定軌', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '禁錮敵人並施加星異狀態，大幅提升其受到的傷害。' }
  },
  'lisa': {
    basic: { name: '指尖雷暴', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '蒼雷', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.8, tags: ['Damage', 'AoE'], description: '引導雷電，對範圍內敵人造成雷傷。' },
    ult: { name: '薔薇的雷光', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '召喚雷燈，持續攻擊並降低敵人防禦。' }
  },
  'amber': {
    basic: { name: '神射手', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '爆彈玩偶', type: 'Skill', element: 'Fire', spCost: 1, ratio: 0, tags: ['Summon', 'Shield'], description: '投擲兔兔伯爵嘲諷敵人。' },
    ult: { name: '箭雨', type: 'Ult', element: 'Fire', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '降下箭雨造成範圍火傷。' }
  },
  'barbara': {
    basic: { name: '水之淺唱', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '演唱，開始♪', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Heal', 'Blast'], description: '喚出歌聲之環，持續治療。' },
    ult: { name: '閃耀奇蹟♪', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Heal', 'AoE'], healRatio: 2.0, description: '為全隊恢復大量生命值。' }
  },
  'noelle': {
    basic: { name: '西風劍術・女僕', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '護心鎧', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 0, tags: ['Shield', 'Heal'], description: '開啟岩護盾，攻擊時有機率回復全隊生命。' },
    ult: { name: '大掃除', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '大劍爆發岩元素之力，攻擊範圍與傷害大幅提升。' }
  },
  'sucrose': {
    basic: { name: '簡易風靈', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '風靈作成・陸三零捌', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '牽引敵人並造成風傷，提升隊友精通。' },
    ult: { name: '禁・風靈作成・柒伍同構貳型', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '投擲大型風靈，持續造成風傷與擴散。' }
  },
  'fischl': {
    basic: { name: '罪滅之矢', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '夜巡影翼', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.5, tags: ['Damage', 'Summon', 'FollowUp'], description: '召喚奧茲，持續攻擊敵人。' },
    ult: { name: '至夜幻現', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 2.8, tags: ['Damage', 'AoE'], description: '化身奧茲高速移動，對路徑上的敵人造成雷傷。' }
  },
  'alhaitham': {
    basic: { name: '溯古', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '共相・理式摹寫', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.8, tags: ['Damage', 'Buff_Atk'], description: '突進並獲得琢光鏡，進行協同攻擊。' },
    ult: { name: '殊境・顯象縛結', type: 'Ult', element: 'Wind', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE'], description: '消耗琢光鏡，造成多次草元素範圍傷害。' }
  },
  'aloy': {
    basic: { name: '快速射擊', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '冰塵雪野', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.8, tags: ['Damage', 'Blast', 'Debuff_Def'], description: '投擲冰塵彈，分裂成冷凍炸彈。' },
    ult: { name: '預言曙光', type: 'Ult', element: 'Ice', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE'], description: '投擲蓄能電池並引爆，造成冰元素範圍傷害。' }
  },

  // ==============================
  // BATCH 3: GENSHIN (LIYUE)
  // ==============================
  'hutao': {
    basic: { name: '往生槍法', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '蝶引來生', type: 'Skill', element: 'Fire', spCost: 1, ratio: 0, tags: ['Buff_Atk', 'Hp_Cost', 'Double_Cast'], buffValue: 0.5, description: '消耗生命值進入彼岸蝶舞狀態，攻擊力大幅提升。' },
    ult: { name: '安神秘法', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE', 'Heal'], description: '揮舞熾熱魂靈，造成大範圍火傷並回復生命。' }
  },
  'yelan': {
    basic: { name: '潛行', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '縈絡縱命索', type: 'Skill', element: 'Ice', spCost: 1, ratio: 2.0, tags: ['Damage', 'Blast'], description: '疾走牽引絡命絲，標記並爆發傷害。' },
    ult: { name: '淵圖玲瓏骰', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Buff_Atk', 'FollowUp', 'Summon'], description: '召喚玄擲玲瓏協助攻擊，並隨時間提升造成傷害。' }
  },
  'ganyu': {
    basic: { name: '流天射術', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '霜華矢', type: 'Skill', element: 'Ice', spCost: 1, ratio: 2.5, tags: ['Damage', 'Blast'], description: '發射霜華矢，造成冰元素範圍傷害。' },
    ult: { name: '降眾天華', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '降下冰雨，對範圍內敵人持續造成冰傷。' }
  },
  'shenhe': {
    basic: { name: '踏辰攝斗', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '仰靈威召將役咒', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.4, description: '為全隊提供「冰翎」，提升冰元素傷害。' },
    ult: { name: '神女遣靈真訣', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '召喚籙靈領域，降低敵人物理與冰元素抗性。' }
  },
  'xianyun': {
    basic: { name: '清風', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '步天梯', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Heal', 'Buff_Atk'], healRatio: 0.8, description: '化為仙鶴衝擊，並為隊友提供下落攻擊加成與治療。' },
    ult: { name: '暮集竹星', type: 'Ult', element: 'Wind', spCost: 0, ratio: 0, tags: ['Heal', 'AoE', 'Buff_Atk'], healRatio: 1.5, description: '召喚機關竹星，持續治療並提升跳躍高度。' }
  },
  'keqing': {
    basic: { name: '雲來劍法', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '星斗歸位', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 2.0, tags: ['Damage'], description: '投擲雷楔，再次施放可瞬移攻擊。' },
    ult: { name: '天街巡遊', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE'], description: '化身雷光，對範圍內敵人發動連續斬擊。', hitSplit: [0.1, 0.1, 0.1, 0.1, 0.6] }
  },
  'beidou': {
    basic: { name: '征濤', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '捉浪', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 2.2, tags: ['Damage', 'Shield'], description: '舉起大劍格擋傷害，隨後發動反擊。' },
    ult: { name: '斫雷', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 3.0, tags: ['Damage', 'Blast', 'FollowUp'], description: '召喚雷獸之盾，普攻時釋放閃電鏈。' }
  },
  'ningguang': {
    basic: { name: '千金擲', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '璇璣屏', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 1.8, tags: ['Shield', 'Damage'], description: '展開璇璣屏阻擋投射物，並造成傷害。' },
    ult: { name: '天權崩玉', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 3.5, tags: ['Damage', 'Blast'], description: '凝聚寶石，對敵人發動自動索敵的攻擊。' }
  },
  'yanfei': {
    basic: { name: '火漆製印', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '丹書立約', type: 'Skill', element: 'Fire', spCost: 1, ratio: 2.0, tags: ['Damage', 'Blast'], description: '召喚烈焰，造成火元素範圍傷害。' },
    ult: { name: '憑此結契', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '噴發烈火，並強化重擊傷害。' }
  },
  'yunjin': {
    basic: { name: '拂雲出手', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '旋雲開相', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 1.5, tags: ['Shield', 'Damage'], description: '蓄力後造成岩元素傷害，並生成護盾。' },
    ult: { name: '破嶂見旌儀', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.4, description: '對全隊施加「飛雲旗陣」，提升普通攻擊傷害。' }
  },
  'xiangling': {
    basic: { name: '白案功夫', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '鍋巴出擊', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.5, tags: ['Damage', 'Summon'], description: '召喚鍋巴，持續噴火攻擊敵人。' },
    ult: { name: '旋火輪', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE', 'FollowUp'], description: '甩出火輪圍繞自身旋轉，造成持續火傷。' }
  },
  'xinyan': {
    basic: { name: '炎舞', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '熱情拂掃', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.2, tags: ['Shield', 'Damage'], description: '揮舞樂器造成火傷，並生成護盾。' },
    ult: { name: '叛逆刮弦', type: 'Ult', element: 'Physical', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE'], description: '引發音波爆炸，造成物理與火元素傷害。' }
  },
  'qiqi': {
    basic: { name: '古雲來劍法', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '仙法・寒病鬼差', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Heal', 'Summon'], healRatio: 1.0, description: '召喚寒病鬼差，持續治療當前場上角色。' },
    ult: { name: '仙法・救苦度厄', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Heal', 'AoE', 'Damage'], healRatio: 2.0, description: '標記敵人，攻擊標記目標時回復生命。' }
  },
  'yaoyao': {
    basic: { name: '顛撲連環槍', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '雲台團團降蘆菔', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.2, tags: ['Heal', 'Damage', 'Summon'], healRatio: 0.8, description: '召喚機關「月桂」，投擲白玉蘿蔔進行攻擊或治療。' },
    ult: { name: '玉顆珊珊月中落', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.0, tags: ['Heal', 'AoE', 'Summon'], healRatio: 1.5, description: '進入「桂子仙機」狀態，召喚多個月桂並提升移動速度。' }
  },

  // ==============================
  // BATCH 4: GENSHIN (INAZUMA)
  // ==============================
  'raiden': {
    basic: { name: '源流', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '神變・惡曜開眼', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 0, tags: ['Buff_Atk', 'FollowUp'], buffValue: 0.3, description: '全隊獲得雷罰惡曜之眼，攻擊時進行協同攻擊。' },
    ult: { name: '奧義・夢想真說', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 4.0, tags: ['Damage', 'AoE', 'No_Energy'], description: '斬出無想的一刀，之後進入夢想一心狀態，普攻視為終結技傷害。', hitSplit: [1.0] }
  },
  'yaemiko': {
    basic: { name: '狐靈', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '野干役咒・殺生櫻', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.5, tags: ['Damage', 'Summon'], description: '召喚殺生櫻，持續對隨機敵人降下落雷。' },
    ult: { name: '大密法・天狐顯真', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE', 'DoT_Detonate'], description: '解放所有殺生櫻，降下天狐霆雷並引爆。', hitSplit: [0.25, 0.25, 0.25, 0.25] }
  },
  'ayaka': {
    basic: { name: '神里流・傾', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '神里流・冰華', type: 'Skill', element: 'Ice', spCost: 1, ratio: 2.0, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '擊飛周圍敵人並造成冰傷，獲得冰元素附魔。' },
    ult: { name: '神里流・霜滅', type: 'Ult', element: 'Ice', spCost: 0, ratio: 4.5, tags: ['Damage', 'AoE'], description: '釋放持續前進的霜見雪關扉，造成極高頻率的冰傷。', hitSplit: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.3] }
  },
  'yoimiya': {
    basic: { name: '煙火打擊', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [0.5, 0.5] },
    skill: { name: '焰硝庭火舞', type: 'Skill', element: 'Fire', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.5, description: '將普通攻擊轉化為熾熱箭矢，傷害大幅提升。' },
    ult: { name: '琉金雲間草', type: 'Ult', element: 'Fire', spCost: 0, ratio: 2.5, tags: ['Damage', 'Blast', 'FollowUp'], description: '造成範圍火傷並標記敵人，隊友攻擊可引爆火光。' }
  },
  'kokomi': {
    basic: { name: '水之誓', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '海月之誓', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.2, tags: ['Heal', 'Summon', 'Damage'], healRatio: 1.0, description: '召喚化海月，持續治療隊友並攻擊敵人。' },
    ult: { name: '海人化羽', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Buff_Atk', 'Heal'], buffValue: 0.4, description: '進入儀來羽衣狀態，普攻與重擊基於生命值提升傷害並治療全隊。' }
  },
  'kukishinobu': {
    basic: { name: '忍流', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '越祓雷草之輪', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.0, tags: ['Heal', 'Hp_Cost', 'Damage', 'Summon'], healRatio: 0.8, description: '消耗生命值，展開持續治療與攻擊的雷草之輪。' },
    ult: { name: '御詠鳴神刈山祭', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '在前方創造結界，持續造成雷元素傷害。' }
  },
  'kirara': {
    basic: { name: '箱紙切削', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '嗚喵町飛足', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Shield', 'Damage'], description: '展開安全運輸護盾，並對敵人進行貓爪攻擊。' },
    ult: { name: '秘法・驚喜特派', type: 'Ult', element: 'Wind', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE', 'Summon'], description: '投擲特派快遞箱，分裂成許多貓草豆蔻詭雷。' }
  },
  'chiori': {
    basic: { name: '心織', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '羽袖一觸', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 1.8, tags: ['Damage', 'Summon'], description: '召喚「袖」進行協同攻擊，並進行上挑攻擊。' },
    ult: { name: '二刀之形・比翼', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE'], description: '雙刀流奧義，對範圍內敵人造成岩元素傷害。' }
  },
  'sayu': {
    basic: { name: '忍刀・終末番', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '嗚呼流・風隱急進', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Damage', 'AoE'], description: '蜷縮成風風輪高速滾動，撞擊敵人。' },
    ult: { name: '嗚呼流・影貉繚亂', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.0, tags: ['Heal', 'Summon', 'Damage'], healRatio: 1.2, description: '召喚「不倒貉不倒」，攻擊敵人或治療生命值最低的隊友。' }
  },
  'kujousara': {
    basic: { name: '天狗弓術', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '鴉羽天狗霆雷召咒', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.2, tags: ['Buff_Atk', 'Damage'], buffValue: 0.4, description: '後撤並留下烏羽，引發雷暴並提升攻擊力。' },
    ult: { name: '煌煌千道鎮式', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '降下天狗咒雷，造成雷傷並擴散攻擊力加成。' }
  },

  // ==============================
  // BATCH 4: GENSHIN (FONTAINE)
  // ==============================
  'furina': {
    basic: { name: '獨舞', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '孤心沙龍', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.5, tags: ['Summon', 'Hp_Cost', 'Damage'], description: '召喚沙龍成員攻擊敵人並消耗全隊生命，或召喚歌者治療。' },
    ult: { name: '萬民歡騰', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.6, description: '根據全隊生命值變動大幅提升造成的傷害與受治療加成。' }
  },
  'navia': {
    basic: { name: '禮儀', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '典儀・晶火', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 3.0, tags: ['Damage', 'Blast'], description: '消耗「裂晶彈片」，展開銃柄傘打出多枚玫瑰晶彈。' },
    ult: { name: '如霰澄天的鳴禮', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'Summon'], description: '召喚金花禮炮，持續轟擊前方敵人並積累彈片。' }
  },
  'clorinde': {
    basic: { name: '誓言', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '狩夜之巡', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.5, description: '進入夜巡狀態，結合銃槍射擊與劍術突進進行攻擊。' },
    ult: { name: '殘光將終', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 3.2, tags: ['Damage', 'AoE', 'Heal'], description: '化身雷光閃爍，對範圍內敵人造成多段傷害並賦予生命之契。' }
  },
  'arlecchino': {
    basic: { name: '斬首', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '萬相化灰', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.8, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '對周圍敵人造成火傷並施加血償勒令。' },
    ult: { name: '厄月將升', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE', 'Heal'], description: '吸收並清除血償勒令，造成範圍火傷並重置戰技冷卻。' }
  },
  'sigewinne': {
    basic: { name: '標靶治療', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '彈跳水療法', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.2, tags: ['Heal', 'Blast', 'Damage'], healRatio: 1.2, description: '發射激流球，在隊友與敵人可見彈跳，治療隊友並攻擊敵人。' },
    ult: { name: '過飽和心意注射', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.8, tags: ['Damage', 'AoE'], description: '取出巨大針筒衝擊前方，造成持續水元素傷害。' }
  },
  'chevreuse': {
    basic: { name: '線列槍擊', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '近身阻截射擊', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.5, tags: ['Damage', 'Heal'], healRatio: 0.8, description: '射擊敵人，若持有超載彈頭則造成更大範圍傷害並治療。' },
    ult: { name: '圓陣擲彈爆轟術', type: 'Ult', element: 'Fire', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '投擲爆轟榴彈，分裂成二重毀傷彈。' }
  },
  'lyney': {
    basic: { name: '迫牌魔術', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '眩惑光戲法', type: 'Skill', element: 'Fire', spCost: 1, ratio: 2.0, tags: ['Damage', 'AoE', 'Heal'], description: '引爆怪笑貓貓帽，造成火傷並回復生命。' },
    ult: { name: '大魔術・靈蹟巡遊', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE', 'Summon'], description: '化身怪笑貓貓帽高速移動，引爆煙花造成火傷。' }
  },
  'lynette': {
    basic: { name: '刺擊', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '謎影障身法', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Damage', 'Self_Heal'], description: '突刺敵人並回復自身生命值。' },
    ult: { name: '魔術・運變驚奇', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.2, tags: ['Damage', 'AoE', 'Summon'], description: '召喚驚奇貓貓盒，嘲諷敵人並造成週期性傷害。' }
  },
  'charlotte': {
    basic: { name: '冷色攝影', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '取景・冰點構圖', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.5, tags: ['Damage', 'Debuff_Def'], description: '使用「溫亨廷先生」拍照，標記敵人並造成持續冰傷。' },
    ult: { name: '定格・全方位確證', type: 'Ult', element: 'Ice', spCost: 0, ratio: 1.5, tags: ['Heal', 'AoE', 'Damage'], healRatio: 1.5, description: '建立「臨事場」，持續治療領域內友方並攻擊敵人。' }
  },
  'emilie': {
    basic: { name: '糾正射擊', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '擷萃調香', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Summon', 'Damage'], description: '創造「柔燈之匣」，持續對燃燒狀態下的敵人造成草元素傷害。' },
    ult: { name: '香氛演繹', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '升級柔燈之匣，降下香氛雨造成範圍傷害。' }
  },

  // ==============================
  // BATCH 5: GENSHIN (NATLAN)
  // ==============================
  'mavuika': {
    basic: { name: '戰火', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '焚天之怒', type: 'Skill', element: 'Fire', spCost: 1, ratio: 2.0, tags: ['Damage', 'AoE', 'DoT_Burn'], description: '釋放火焰領域，持續灼燒敵人並提升全隊攻擊力。' },
    ult: { name: '戰爭之神的榮光', type: 'Ult', element: 'Fire', spCost: 0, ratio: 4.5, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '化身烈焰戰神，對全場造成毀滅性打擊並復活倒下的隊友。' }
  },
  'xilonen': {
    basic: { name: '鍛打', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '黑曜石工藝', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 1.5, tags: ['Debuff_Def', 'Heal'], description: '召喚採樣器，降低敵人對應元素抗性並治療隊友。' },
    ult: { name: '大匠之音', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 2.5, tags: ['Heal', 'AoE', 'Damage'], healRatio: 1.5, description: '隨節奏治療隊友並造成岩元素範圍傷害。' }
  },
  'mualani': {
    basic: { name: '踏浪', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '衝浪鯊鯊', type: 'Skill', element: 'Ice', spCost: 1, ratio: 2.0, tags: ['Damage', 'Buff_Atk'], description: '進入夜魂加持狀態，騎乘鯊魚衝撞敵人，標記並造成額外傷害。' },
    ult: { name: '爆裂水球', type: 'Ult', element: 'Ice', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE'], description: '發射巨型導彈追蹤敵人，造成水元素範圍傷害。' }
  },
  'chasca': {
    basic: { name: '風矢', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '靈魂韁繩', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.8, tags: ['Damage', 'Blast'], description: '騎乘且飛行，在空中進行多重屬性射擊。' },
    ult: { name: '索魂獵殺', type: 'Ult', element: 'Wind', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE', 'Ignore_Weakness'], description: '發射一發裂魂的重箭，轉化為多種元素傷害。' }
  },
  'kachina': {
    basic: { name: '岩鑽', type: 'Basic', element: 'Imaginary', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '衝天轉轉', type: 'Skill', element: 'Imaginary', spCost: 1, ratio: 1.5, tags: ['Summon', 'Damage', 'AoE'], description: '召喚「衝天轉轉」進行鑽擊，可騎乘並攀爬。' },
    ult: { name: '現在，是小卡的時間！', type: 'Ult', element: 'Imaginary', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'Buff_Atk'], description: '創造領域，強化衝天轉轉的攻擊頻率與傷害。' }
  },
  'citlali': {
    basic: { name: '霜星', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '夜神護佑', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Shield', 'Damage'], description: '召喚黑曜石護盾保護全隊，並對周圍造成冰傷。' },
    ult: { name: '星落', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'Debuff_Def'], description: '召喚冰隕石砸向地面，凍結敵人並降低抗性。' }
  },

  // ==============================
  // BATCH 5: GENSHIN (SUMERU & MONDSTADT)
  // ==============================
  'nahida': {
    basic: { name: '行相', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '所聞遍計', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Debuff_Def', 'Damage', 'Blast'], description: '標記敵人，使其連結並共享傷害(防禦降低)。' },
    ult: { name: '心景幻成', type: 'Ult', element: 'Wind', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.4, description: '展開摩耶之殿，大幅提升隊伍元素反應傷害。' }
  },
  'nilou': {
    basic: { name: '弦月舞', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '七域舞步', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.3, description: '進入翩轉狀態，使全隊觸發特殊的豐穰之核(增傷)。' },
    ult: { name: '浮蓮舞步・遠夢聆泉', type: 'Ult', element: 'Ice', spCost: 0, ratio: 3.0, tags: ['Damage', 'AoE'], description: '綻放水蓮，對周圍造成水元素範圍傷害。', hitSplit: [0.5, 0.5] }
  },
  'dehya': {
    basic: { name: '拂金劍鬥術', type: 'Basic', element: 'Fire', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '熔鐵流獄', type: 'Skill', element: 'Fire', spCost: 1, ratio: 1.2, tags: ['Shield', 'Damage', 'Summon'], description: '創造淨焰劍獄，分攤隊友受到的傷害並進行協同攻擊。' },
    ult: { name: '炎嘯獅子咬', type: 'Ult', element: 'Fire', spCost: 0, ratio: 3.5, tags: ['Damage', 'AoE', 'Self_Heal'], description: '進入熾炎獅子狀態，連續揮舞重拳並回復自身生命。', hitSplit: [0.1, 0.1, 0.1, 0.1, 0.1, 0.5] }
  },
  'faruzan': {
    basic: { name: '迴身射擊', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '非想風天', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.5, tags: ['Damage', 'AoE'], description: '部署多面體，造成風傷並牽引敵人。' },
    ult: { name: '摶風秘道', type: 'Ult', element: 'Wind', spCost: 0, ratio: 0, tags: ['Buff_Atk', 'Debuff_Def'], buffValue: 0.4, description: '釋放赫里奧斯，降低敵人風抗並提升隊友風傷。' }
  },
  'layla': {
    basic: { name: '導光軌跡', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '垂裳端凝之夜', type: 'Skill', element: 'Ice', spCost: 1, ratio: 0, tags: ['Shield'], description: '展開安眠帷幕護盾，並產生飛星攻擊敵人。' },
    ult: { name: '星流搖床之夢', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.0, tags: ['Damage', 'AoE', 'FollowUp'], description: '釋放飾夢天球，持續發射星光彈攻擊敵人。' }
  },
  'collei': {
    basic: { name: '祈頌射藝', type: 'Basic', element: 'Wind', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '拂花偈葉', type: 'Skill', element: 'Wind', spCost: 1, ratio: 1.8, tags: ['Damage', 'Blast'], description: '投擲飛葉輪，對路徑上的敵人造成草元素傷害。' },
    ult: { name: '貓貓秘寶', type: 'Ult', element: 'Wind', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE'], description: '召喚柯里安巴，在領域內持續造成草元素傷害。' }
  },
  'candace': {
    basic: { name: '流耀槍術', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '聖儀・蒼鷺庇衛', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.5, tags: ['Shield', 'Damage'], description: '舉盾格擋攻擊，隨後進行反擊。' },
    ult: { name: '聖儀・灰鴒衒潮', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Buff_Atk'], buffValue: 0.3, description: '賦予隊伍水元素附魔，並提升普通攻擊傷害。' }
  },
  'dori': {
    basic: { name: '妙顯劍舞', type: 'Basic', element: 'Lightning', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '鎮靈之燈・煩惱解決炮', type: 'Skill', element: 'Lightning', spCost: 1, ratio: 1.5, tags: ['Damage', 'Blast'], description: '發射斷除煩惱砲，並產生追蹤彈。' },
    ult: { name: '卡薩扎萊宮的無微不至', type: 'Ult', element: 'Lightning', spCost: 0, ratio: 0, tags: ['Heal', 'Buff_Atk'], healRatio: 1.2, description: '召喚燈中幽精，連結隊友回復生命與能量。' }
  },
  'rosaria': {
    basic: { name: '教會槍術', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '噬罪的告解', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.8, tags: ['Damage', 'Buff_Atk'], description: '移動至敵人身後進行刺擊，提升暴擊率。' },
    ult: { name: '終命的聖禮', type: 'Ult', element: 'Ice', spCost: 0, ratio: 2.5, tags: ['Damage', 'AoE', 'DoT_Ice'], description: '降下冰槍，持續造成冰元素範圍傷害。' }
  },
  'diona': {
    basic: { name: '獵人射術', type: 'Basic', element: 'Ice', spCost: 0, ratio: 1.0, tags: ['Damage'], hitSplit: [1.0] },
    skill: { name: '貓爪凍凍', type: 'Skill', element: 'Ice', spCost: 1, ratio: 1.2, tags: ['Shield', 'Damage'], description: '發射凍凍貓爪，造成冰傷並生成護盾。' },
    ult: { name: '最烈特調', type: 'Ult', element: 'Ice', spCost: 0, ratio: 0, tags: ['Heal', 'AoE', 'Debuff_Def'], healRatio: 1.5, description: '拋出特調酒霧，回復領域內角色生命並降低敵人攻擊。' }
  }
};
