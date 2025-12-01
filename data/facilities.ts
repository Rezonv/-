

import { FacilityConfig } from '../types';

// Using Pollinations AI static URLs for consistent high-quality anime backgrounds
const getBg = (prompt: string) => `https://pollinations.ai/p/${encodeURIComponent(prompt + " anime style background, masterpiece, detailed, 8k, no humans")}`;

export const FACILITIES: FacilityConfig[] = [
  {
    id: 'lobby',
    name: '迎賓大廳',
    description: '家園的核心區域。等級越高，探險的門票費用越低。需要【黑塔太空站】的技術與【蒙德】的建材。',
    baseCost: 500,
    costMultiplier: 1.5,
    baseCreditRate: 5, // 5 credits / min
    baseAffectionRate: 0.1, 
    icon: '🏰',
    color: 'from-blue-600 to-blue-400',
    unlockPrice: 0, // Free
    imageUrl: getBg('luxury hotel lobby fantasy interior grand hall'),
    upgradeRequirements: [
        { itemId: 'aether_dust', baseAmount: 5 }, // 黑塔
        { itemId: 'wind_aster', baseAmount: 3 }   // 蒙德
    ],
    globalBuffDescription: '探險門票費用 -2% / 等級',
    globalBuff: { type: 'costReduction', valuePerLevel: 0.02 }
  },
  {
    id: 'cafe',
    name: '女僕咖啡廳',
    description: '提供美味甜點。等級越高，探險獲得的積分越多。需要【匹諾康尼】的夢幻原料與【璃月】的精工。',
    baseCost: 1000,
    costMultiplier: 1.6,
    baseCreditRate: 20, 
    baseAffectionRate: 0.2,
    icon: '☕',
    color: 'from-amber-600 to-orange-400',
    unlockPrice: 2000,
    imageUrl: getBg('maid cafe interior cute pastel colors sweets tea shop'),
    upgradeRequirements: [
        { itemId: 'dream_fluid', baseAmount: 3 }, // 匹諾康尼
        { itemId: 'geo_statue', baseAmount: 2 }   // 璃月
    ],
    globalBuffDescription: '探險積分獎勵 +2% / 等級',
    globalBuff: { type: 'creditBoost', valuePerLevel: 0.02 }
  },
  {
    id: 'gym',
    name: '健身訓練室',
    description: '揮灑汗水的地方。等級越高，探險所需的時間越短。需要【仙舟羅浮】的科技與【稻妻】的堅韌素材。',
    baseCost: 1500,
    costMultiplier: 1.7,
    baseCreditRate: 15,
    baseAffectionRate: 0.5,
    icon: '💪',
    color: 'from-red-600 to-red-400',
    unlockPrice: 3500,
    imageUrl: getBg('modern gym fitness center interior treadmills weights anime style'),
    upgradeRequirements: [
        { itemId: 'thunder_prism', baseAmount: 3 }, // 羅浮
        { itemId: 'electro_sigil', baseAmount: 3 }  // 稻妻
    ],
    globalBuffDescription: '探險所需時間 -1% / 等級',
    globalBuff: { type: 'timeReduction', valuePerLevel: 0.01 }
  },
  {
    id: 'library_room',
    name: '靜謐書房',
    description: '充滿書香氣息。等級越高，探險獲得的好感度越多。需要【雅利洛-VI】的永冬結晶來保存書籍。',
    baseCost: 1200,
    costMultiplier: 1.5,
    baseCreditRate: 8,
    baseAffectionRate: 0.8,
    icon: '📚',
    color: 'from-emerald-600 to-emerald-400',
    unlockPrice: 3000,
    imageUrl: getBg('magical library interior bookshelves cozy reading nook'),
    upgradeRequirements: [
        { itemId: 'ice_crystal', baseAmount: 5 }, // 雅利洛
        { itemId: 'aether_dust', baseAmount: 5 }  // 黑塔 (通用)
    ],
    globalBuffDescription: '探險好感獎勵 +2% / 等級',
    globalBuff: { type: 'affectionBoost', valuePerLevel: 0.02 }
  },
  {
    id: 'onsen',
    name: '露天溫泉',
    description: '奢華的放鬆場所。等級越高，探險獲得稀有物品的機率越高。需要融合【稻妻】、【璃月】與【蒙德】的頂級建材。',
    baseCost: 5000,
    costMultiplier: 2.0,
    baseCreditRate: 5,
    baseAffectionRate: 2.0, // High affection
    icon: '♨️',
    color: 'from-pink-600 to-purple-500',
    unlockPrice: 10000,
    imageUrl: getBg('japanese hot spring onsen outdoors cherry blossoms steam night view'),
    upgradeRequirements: [
        { itemId: 'electro_sigil', baseAmount: 5 }, // 稻妻
        { itemId: 'geo_statue', baseAmount: 5 },    // 璃月
        { itemId: 'wind_aster', baseAmount: 5 }     // 蒙德
    ],
    globalBuffDescription: '稀有掉落機率 +0.5% / 等級',
    globalBuff: { type: 'rareDropBoost', valuePerLevel: 0.005 }
  }
];