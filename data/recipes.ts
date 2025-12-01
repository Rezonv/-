
import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'craft_exp_blue',
    name: '冒險記錄合成',
    description: '將零散的以太塵埃壓縮成經驗紀錄。',
    type: 'CONSUMABLE',
    resultItemId: 'exp_book_blue',
    resultCount: 1,
    materials: [{ itemId: 'aether_dust', count: 5 }],
    costCredits: 100,
    unlockLevel: 1
  },
  {
    id: 'craft_exp_purple',
    name: '漫遊指南精煉',
    description: '利用夢境凝液的高純度能量，製作最高級的經驗書。',
    type: 'CONSUMABLE',
    resultItemId: 'exp_book_purple',
    resultCount: 1,
    materials: [
        { itemId: 'exp_book_blue', count: 3 }, 
        { itemId: 'dream_fluid', count: 2 }
    ],
    costCredits: 500,
    unlockLevel: 5
  },
  {
    id: 'craft_survival_kit',
    name: '急救包組裝',
    description: '探險必備的生存物資。',
    type: 'EQUIPMENT',
    resultItemId: 'survival_kit',
    resultCount: 1,
    materials: [
        { itemId: 'wind_aster', count: 10 }, 
        { itemId: 'ice_crystal', count: 5 }
    ],
    costCredits: 1000,
    unlockLevel: 10
  },
  {
    id: 'craft_iron_sword',
    name: '量產型鐵鋒劍',
    description: '使用堅硬的岩石與雷電之力鍛造的基礎武器。',
    type: 'EQUIPMENT',
    resultItemId: 'wp_iron_sword',
    resultCount: 1,
    materials: [
        { itemId: 'geo_statue', count: 5 },
        { itemId: 'electro_sigil', count: 2 }
    ],
    costCredits: 800,
    unlockLevel: 1
  },
  {
    id: 'craft_treasure_map',
    name: '藏寶圖復原',
    description: '拼湊收集到的地理資訊。',
    type: 'EQUIPMENT',
    resultItemId: 'treasure_map',
    resultCount: 1,
    materials: [
        { itemId: 'geo_statue', count: 15 },
        { itemId: 'dendro_sigil', count: 10 }
    ],
    costCredits: 2000,
    unlockLevel: 15
  },
  {
    id: 'craft_chocolate',
    name: '手工巧克力',
    description: '用愛與甜蜜素材製作的禮物。',
    type: 'CONSUMABLE',
    resultItemId: 'chocolate_box',
    resultCount: 1,
    materials: [
        { itemId: 'dream_fluid', count: 5 },
        { itemId: 'wind_aster', count: 5 }
    ],
    costCredits: 300,
    unlockLevel: 1
  }
];
