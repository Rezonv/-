
import { ShopItem } from '../types';

export const SHOP_ITEMS: ShopItem[] = [
  // --- Currencies (System) ---
  {
    id: 'currency_credit',
    name: '信用點',
    description: '【基礎貨幣】全宇宙通用的貨幣。用於購買物品與升級設施。',
    price: 0,
    baseAffection: 0,
    icon: '🪙',
    type: 'currency',
    purchasable: false
  },
  {
    id: 'currency_jade',
    name: '星瓊',
    description: '【珍稀貨幣】凝聚了星辰能量的寶石。用於角色躍遷。',
    price: 0,
    baseAffection: 0,
    icon: '💎',
    type: 'currency',
    purchasable: false
  },
  {
    id: 'starlight',
    name: '流光餘暉',
    description: '【貨幣】躍遷時獲得的珍稀點數。可用於兌換特殊道具。',
    price: 0,
    baseAffection: 0,
    icon: '✨',
    type: 'currency',
    rarity: 'SR',
    purchasable: false
  },
  {
    id: 'enhance_dust',
    name: '強化粉塵',
    description: '【強化素材】分解裝備獲得的粉塵，用於強化其他裝備。',
    price: 0,
    baseAffection: 0,
    icon: '⚗️',
    type: 'material',
    rarity: 'R',
    purchasable: false
  },

  // --- BOSS MATERIALS (High-Level Ascension) ---
  // HSR Bosses
  { id: 'boss_mat_antimatter', name: '毀滅異質', description: '【突破素材】末日獸的核心殘片。用於突破 Lv.60+ 量子/物理角色。', price: 0, baseAffection: 0, icon: '⚛️', type: 'material', rarity: 'SSR', purchasable: false },
  { id: 'boss_mat_permafrost', name: '永冬冰核', description: '【突破素材】可可利亞的寒冰之心。用於突破 Lv.60+ 冰/虛數角色。', price: 0, baseAffection: 0, icon: '❄️', type: 'material', rarity: 'SSR', purchasable: false },
  { id: 'boss_mat_abundant', name: '豐饒種子', description: '【突破素材】玄鹿留下的生命之種。用於突破 Lv.60+ 風/火/雷角色。', price: 0, baseAffection: 0, icon: '🌱', type: 'material', rarity: 'SSR', purchasable: false },
  
  // Genshin Bosses
  { id: 'boss_mat_storm', name: '風龍之息', description: '【突破素材】特瓦林凝聚的風元素。用於突破 Lv.60+ 風/冰角色。', price: 0, baseAffection: 0, icon: '🌪️', type: 'material', rarity: 'SSR', purchasable: false },
  { id: 'boss_mat_rock', name: '龍王之鱗', description: '【突破素材】若陀龍王的堅硬鱗片。用於突破 Lv.60+ 岩/火/物理角色。', price: 0, baseAffection: 0, icon: '🐲', type: 'material', rarity: 'SSR', purchasable: false },
  { id: 'boss_mat_thunder', name: '雷光念珠', description: '【突破素材】雷電將軍的造物。用於突破 Lv.60+ 雷/水/草角色。', price: 0, baseAffection: 0, icon: '⚡', type: 'material', rarity: 'SSR', purchasable: false },

  // --- Home Upgrade Materials (Raid Drops - HSR) ---
  {
    id: 'aether_dust',
    name: '以太塵埃',
    description: '【家園素材】黑塔太空站特產。用於升級基礎設施。',
    price: 0,
    baseAffection: 0,
    icon: '🌌',
    type: 'material',
    purchasable: false
  },
  {
    id: 'ice_crystal',
    name: '永冬冰晶',
    description: '【家園素材】雅利洛-VI特產。用於升級書房、溫泉。',
    price: 0,
    baseAffection: 0,
    icon: '❄️',
    type: 'material',
    purchasable: false
  },
  {
    id: 'thunder_prism',
    name: '雷光棱鏡',
    description: '【家園素材】仙舟羅浮特產。用於升級健身房、動力室。',
    price: 0,
    baseAffection: 0,
    icon: '⚡',
    type: 'material',
    purchasable: false
  },
  {
    id: 'dream_fluid',
    name: '夢境凝液',
    description: '【家園素材】匹諾康尼特產。用於升級咖啡廳、娛樂設施。',
    price: 0,
    baseAffection: 0,
    icon: '🧪',
    type: 'material',
    purchasable: false
  },
  {
    id: 'chronos_sand',
    name: '恆時之沙',
    description: '【家園素材】翁法羅斯特產。流動著時間神力的金沙，用於強化時間相關設施。',
    price: 0,
    baseAffection: 0,
    icon: '⏳',
    type: 'material',
    purchasable: false
  },

  // --- Home Upgrade Materials (Raid Drops - Genshin) ---
  {
    id: 'wind_aster',
    name: '風之花',
    description: '【家園素材】蒙德特產。象徵自由的花朵，用於裝飾與擴建。',
    price: 0,
    baseAffection: 0,
    icon: '🌼',
    type: 'material',
    purchasable: false
  },
  {
    id: 'geo_statue',
    name: '岩尊像',
    description: '【家園素材】璃月特產。堅硬的石像，用於強化建築結構。',
    price: 0,
    baseAffection: 0,
    icon: '🗿',
    type: 'material',
    purchasable: false
  },
  {
    id: 'electro_sigil',
    name: '雷之印',
    description: '【家園素材】稻妻特產。蘊含雷電之力的印記。',
    price: 0,
    baseAffection: 0,
    icon: '🟣',
    type: 'material',
    purchasable: false
  },
  {
    id: 'dendro_sigil',
    name: '草之印',
    description: '【家園素材】須彌特產。蘊含草木智慧的印記。',
    price: 0,
    baseAffection: 0,
    icon: '🍃',
    type: 'material',
    purchasable: false
  },
  {
    id: 'hydro_sigil',
    name: '水之印',
    description: '【家園素材】楓丹特產。蘊含正義與律法的印記。',
    price: 0,
    baseAffection: 0,
    icon: '💧',
    type: 'material',
    purchasable: false
  },
  {
    id: 'pyro_sigil',
    name: '火之印',
    description: '【家園素材】納塔特產。蘊含戰爭與灼熱的印記。',
    price: 0,
    baseAffection: 0,
    icon: '🔥',
    type: 'material',
    purchasable: false
  },
  {
    id: 'cryo_sigil',
    name: '冰之印',
    description: '【家園素材】至冬特產。蘊含極寒與女皇意志的印記。',
    price: 0,
    baseAffection: 0,
    icon: '❄️',
    type: 'material',
    purchasable: false
  },

  // --- Consumables (Character Growth) ---
  {
    id: 'exp_book_purple',
    name: '漫遊指南',
    description: '【角色經驗】紀錄了星際旅行見聞的書籍。可提供 2000 點角色經驗。',
    price: 500,
    baseAffection: 0,
    icon: '📘',
    type: 'consumable',
    rarity: 'SR',
    expValue: 2000,
    purchasable: true
  },
  {
    id: 'exp_book_blue',
    name: '冒險記錄',
    description: '【角色經驗】紀錄了基礎冒險知識。可提供 500 點角色經驗。',
    price: 150,
    baseAffection: 0,
    icon: '📒',
    type: 'consumable',
    rarity: 'R',
    expValue: 500,
    purchasable: true
  },
  {
    id: 'ascension_badge',
    name: '榮譽勳章',
    description: '【突破素材】授予防衛者的勳章，用於角色突破等級上限 (Lv.20-40)。',
    price: 2000,
    baseAffection: 0,
    icon: '🎖️',
    type: 'material',
    rarity: 'SR',
    purchasable: true
  },

  // --- SSR Signature Weapons (Gacha Only) ---
  {
    id: 'wp_kafka_ssr',
    name: '只需等待 (Patience Is All You Need)',
    description: '【SSR 專武】卡芙卡專屬。蜘蛛網紋路的槍械。裝備者速度大幅提升，並使敵人陷入觸電狀態。',
    price: 0,
    baseAffection: 0,
    icon: '🕸️',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SSR',
    targetCharacterId: 'kafka',
    stats: { atk: 580, spd: 15 },
    exclusiveEffect: '卡芙卡裝備時：DoT 傷害提升 30%，速度額外 +5。',
    purchasable: false
  },
  {
    id: 'wp_raiden_ssr',
    name: '薙草之稻光 (Engulfing Lightning)',
    description: '【SSR 專武】雷電將軍專屬。斬斷一切雜念的薙刀。',
    price: 0,
    baseAffection: 0,
    icon: '⚡',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SSR',
    targetCharacterId: 'raiden',
    stats: { atk: 608, hp: 500 },
    exclusiveEffect: '雷電將軍裝備時：元素爆發傷害提升 40%。',
    purchasable: false
  },
  {
    id: 'wp_firefly_ssr',
    name: '夢應歸於何處 (Whereabouts Should Dreams Rest)',
    description: '【SSR 專武】流螢專屬。薩姆的戰鬥武裝核心。',
    price: 0,
    baseAffection: 0,
    icon: '🔥',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SSR',
    targetCharacterId: 'firefly',
    stats: { atk: 620, def: 200 },
    exclusiveEffect: '流螢裝備時：擊破傷害提升 50%。',
    purchasable: false
  },
  {
    id: 'wp_acheron_ssr',
    name: '行於流逝的岸 (Along the Passing Shore)',
    description: '【SSR 專武】黃泉專屬。彷彿能斬斷虛無的長刀。',
    price: 0,
    baseAffection: 0,
    icon: '🗡️',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SSR',
    targetCharacterId: 'acheron',
    stats: { atk: 630, hp: 300 },
    exclusiveEffect: '黃泉裝備時：終結技傷害提升 35%，並無視部分防禦。',
    purchasable: false
  },

  // --- SR Weapons (Gacha / Craft / Shop) ---
  {
    id: 'wp_sword_sr',
    name: '黑劍 (The Black Sword)',
    description: '【SR 武器】一把渴求鮮血的黑色長劍。暴擊率提升。',
    price: 5000,
    baseAffection: 0,
    icon: '⚔️',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SR',
    stats: { atk: 400, hp: 200 },
    purchasable: true
  },
  {
    id: 'wp_pistol_sr',
    name: '晚安與睡顏',
    description: '【SR 武器】印有某人睡臉的槍。對負面狀態敵人傷害提升。',
    price: 5000,
    baseAffection: 0,
    icon: '🔫',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SR',
    stats: { atk: 420, spd: 5 },
    purchasable: true
  },
  {
    id: 'wp_staff_sr',
    name: '流浪者的樂章',
    description: '【SR 武器】記載著無名樂譜的法器。隨機獲得強大增益。',
    price: 5000,
    baseAffection: 0,
    icon: '📖',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'SR',
    stats: { atk: 410, hp: 150 },
    purchasable: true
  },

  // --- R Weapons (Common) ---
  {
    id: 'wp_iron_sword',
    name: '鐵鋒劍',
    description: '【R 武器】普通的鐵劍，隨處可見。',
    price: 500,
    baseAffection: 0,
    icon: '🗡️',
    type: 'equipment',
    equipType: 'weapon',
    rarity: 'R',
    stats: { atk: 150 },
    purchasable: true
  },
  
  // --- Armor (Defense) ---
  {
    id: 'ar_suit_ssr',
    name: '星際和平公司制服',
    description: '【SSR 防具】採用納米纖維編織的高科技戰鬥服。',
    price: 0,
    baseAffection: 0,
    icon: '🧥',
    type: 'equipment',
    equipType: 'armor',
    rarity: 'SSR',
    stats: { def: 300, hp: 1000 },
    purchasable: false
  },
  {
    id: 'ar_dress_sr',
    name: '華麗禮服',
    description: '【SR 防具】兼具防禦力與美觀的戰鬥禮服。',
    price: 4000,
    baseAffection: 0,
    icon: '👗',
    type: 'equipment',
    equipType: 'armor',
    rarity: 'SR',
    stats: { def: 150, hp: 500 },
    purchasable: true
  },
  {
    id: 'ar_school_r',
    name: '制式學院服',
    description: '【R 防具】普通的制服，防禦力一般。',
    price: 800,
    baseAffection: 0,
    icon: '👔',
    type: 'equipment',
    equipType: 'armor',
    rarity: 'R',
    stats: { def: 50, hp: 100 },
    purchasable: true
  },

  // --- Accessories (Effect) ---
  {
    id: 'acc_ring_ssr',
    name: '永恆之誓',
    description: '【SSR 飾品】蘊含永恆誓言的戒指。全屬性小幅提升。',
    price: 0,
    baseAffection: 0,
    icon: '💍',
    type: 'equipment',
    equipType: 'accessory',
    rarity: 'SSR',
    stats: { atk: 50, def: 50, hp: 200, spd: 5 },
    purchasable: false
  },

  // --- Original Items (Gifts & Expedition Tools) ---
  {
    id: 'flower_bouquet',
    name: '紅玫瑰花束',
    description: '象徵熱情的紅玫瑰，適合送給任何女性角色表達愛意。',
    price: 200,
    baseAffection: 5,
    icon: '🌹',
    type: 'gift'
  },
  {
    id: 'chocolate_box',
    name: '高級巧克力',
    description: '包裝精美的松露巧克力，甜蜜的味道能融化她的心。',
    price: 300,
    baseAffection: 8,
    icon: '🍫',
    type: 'gift'
  },
  {
    id: 'perfume_chanel',
    name: '魅惑香水',
    description: '散發著成熟與神秘氣息的高級香水，能增加氛圍的曖昧度。',
    price: 800,
    baseAffection: 15,
    icon: '🧴',
    type: 'gift'
  },
  {
    id: 'sexy_lingerie',
    name: '蕾絲內衣',
    description: '設計大膽的黑色蕾絲內衣，送出這個代表你們的關係已經非比尋常。',
    price: 1500,
    baseAffection: 25,
    icon: '👙',
    type: 'gift'
  },
  {
    id: 'diamond_ring',
    name: '鑽石戒指',
    description: '璀璨奪目的鑽戒，象徵著永恆的承諾，能極大提升好感度。',
    price: 10000,
    baseAffection: 50,
    icon: '💍',
    type: 'gift'
  },
  {
    id: 'survival_kit',
    name: '便攜急救包',
    description: '【探險裝備】包含基礎醫療物資。探險時間減少 20%。',
    price: 500,
    baseAffection: 0,
    icon: '⛑️',
    type: 'equipment',
    equipType: 'accessory', 
    rarity: 'R',
    effectType: 'reduce_time',
    effectValue: 0.2
  },
  {
    id: 'treasure_map',
    name: '藏寶圖殘片',
    description: '【探險裝備】標記了隱藏路徑。積分獎勵增加 25%。',
    price: 800,
    baseAffection: 0,
    icon: '🗺️',
    type: 'equipment',
    equipType: 'accessory',
    rarity: 'SR',
    effectType: 'boost_credits',
    effectValue: 0.25
  },
  // Old legacy mapping
  {
    id: 'geo_sigil',
    name: '岩之印',
    description: '【家園素材】璃月特產。',
    price: 0,
    baseAffection: 0,
    icon: '🗿',
    type: 'material',
    purchasable: false
  },
  {
    id: 'ancient_coin',
    name: '古帝國金幣',
    description: '【珍稀收藏】極具收藏價值的古幣。展示後：全域積分獲取 +5%。',
    price: 5000,
    baseAffection: 50,
    icon: '🪙',
    type: 'gift',
    purchasable: false,
    showcaseBuff: { type: 'credit_boost', value: 0.05 }
  },
  {
    id: 'star_jade',
    name: '星瓊碎片',
    description: '【珍稀收藏】蘊含宇宙能量的碎片。展示後：探險稀有掉落率 +1%。',
    price: 8000,
    baseAffection: 80,
    icon: '💎',
    type: 'gift',
    purchasable: false,
    showcaseBuff: { type: 'rare_drop_boost', value: 0.01 }
  },
  {
    id: 'vision_shell',
    name: '無主的神之眼',
    description: '【珍稀收藏】某位無名英雄的遺物。展示後：全域好感獲取 +5%。',
    price: 6000,
    baseAffection: 60,
    icon: '🔮',
    type: 'gift',
    purchasable: false,
    showcaseBuff: { type: 'affection_boost', value: 0.05 }
  }
];
