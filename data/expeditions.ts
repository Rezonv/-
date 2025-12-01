
import { ExpeditionMap, ShopItem } from '../types';
import { SHOP_ITEMS } from './items';

const getBg = (prompt: string) => `https://pollinations.ai/p/${encodeURIComponent(prompt + " scenery landscape wallpaper masterpiece 8k no humans")}`;

// Retrieve items by ID helper
const getItem = (id: string) => SHOP_ITEMS.find(i => i.id === id);

export const EXPEDITION_MAPS: ExpeditionMap[] = [
  {
    id: 'jarilo_logistics',
    name: '雅利洛物資轉運',
    description: '【後勤任務】協助貝洛伯格進行物資調度。產出大量角色經驗書。需至少一名「雅利洛-VI」或「星穹鐵道」角色。',
    durationMinutes: 240, // 4 hours
    recommendedGame: 'Honkai: Star Rail',
    baseCreditReward: 8000, // Increased credits
    baseAffectionReward: 80,
    imageUrl: getBg('snowy city logistics cargo transport sci-fi'),
    difficulty: 'Easy',
    enemyTypes: ['裂界造物'],
    enemyElements: ['火', '物理'],
    ticketCost: 200, // Lower cost
    requiredFaction: 'Honkai: Star Rail',
    materialDrops: [
      { itemId: 'exp_book_blue', chance: 1.0, min: 5, max: 10 },
      { itemId: 'exp_book_purple', chance: 0.3, min: 1, max: 2 }
    ]
  },
  {
    id: 'liyue_commerce',
    name: '璃月港商業委託',
    description: '【後勤任務】協助總務司處理賬目與物流。產出巨額信用點。需至少一名「原神」角色。',
    durationMinutes: 240, 
    recommendedGame: 'Genshin Impact',
    baseCreditReward: 15000, // Massive credits
    baseAffectionReward: 60,
    imageUrl: getBg('chinese harbor commerce busy market shipping'),
    difficulty: 'Normal',
    enemyTypes: ['盜寶團'],
    enemyElements: ['物理'],
    ticketCost: 300,
    requiredFaction: 'Genshin Impact',
    materialDrops: [
      { itemId: 'geo_statue', chance: 0.5, min: 1, max: 2 }, // Small home mat trickle
      { itemId: 'currency_credit', chance: 1.0, min: 1000, max: 3000 } // Bonus credits as items
    ]
  },
  {
    id: 'penacony_dream_delivery',
    name: '匹諾康尼夢境配送',
    description: '【後勤任務】在夢境中傳遞情緒。產出角色好感度與家園素材。需「書房 Lv.2」。',
    durationMinutes: 480, // 8 hours
    recommendedGame: 'Honkai: Star Rail',
    baseCreditReward: 10000,
    baseAffectionReward: 150, // High affection
    imageUrl: getBg('cyberpunk dream delivery service neon flying cars'),
    difficulty: 'Normal',
    enemyTypes: ['驚夢劇團'],
    enemyElements: ['雷', '虛數'],
    ticketCost: 500,
    requiredFaction: 'Honkai: Star Rail',
    requiredFacilityId: 'library_room',
    requiredFacilityLevel: 2,
    materialDrops: [
      { itemId: 'dream_fluid', chance: 0.8, min: 5, max: 8 },
      { itemId: 'exp_book_purple', chance: 0.5, min: 2, max: 4 }
    ]
  },
  {
    id: 'inazuma_security',
    name: '稻妻治安巡邏',
    description: '【後勤任務】維護離島的治安。產出多樣化基礎資源。需「訓練室 Lv.2」。',
    durationMinutes: 480,
    recommendedGame: 'Genshin Impact',
    baseCreditReward: 12000,
    baseAffectionReward: 120,
    imageUrl: getBg('japanese street patrol night samurai lantern'),
    difficulty: 'Normal',
    enemyTypes: ['野伏眾'],
    enemyElements: ['雷', '物理'],
    ticketCost: 500,
    requiredFaction: 'Genshin Impact',
    requiredFacilityId: 'gym',
    requiredFacilityLevel: 2,
    materialDrops: [
      { itemId: 'electro_sigil', chance: 0.8, min: 5, max: 8 },
      { itemId: 'enhance_dust', chance: 0.6, min: 5, max: 10 }
    ]
  },
  {
    id: 'herta_research',
    name: '空間站科研協助',
    description: '【新手後勤】協助科員整理實驗數據。產出基礎素材。',
    durationMinutes: 120, // 2 hours
    recommendedGame: 'Honkai: Star Rail',
    baseCreditReward: 5000,
    baseAffectionReward: 40,
    imageUrl: getBg('sci-fi lab research data sorting'),
    difficulty: 'Easy',
    enemyTypes: ['反物質軍團'],
    enemyElements: ['量子'],
    ticketCost: 100,
    materialDrops: [
      { itemId: 'aether_dust', chance: 1.0, min: 10, max: 20 }
    ]
  }
];
