
import { WorldEvent } from '../types';

export const WORLD_EVENTS: Record<string, WorldEvent[]> = {
  'herta_station': [
    {
      id: 'herta_curio_error',
      regionId: 'herta_station',
      title: '奇物誤差',
      description: '你在走廊轉角發現一個閃爍的奇物，科員們似乎都不在附近。它正發出奇怪的嗡嗡聲。',
      imagePrompt: 'sci-fi glowing artifact floating in corridor space station',
      choices: [
        { 
            label: '觸碰它 (獲得 ATK 增益)', 
            effect: 'BUFF', 
            // Value contains full CombatStatus object for injection
            value: { name: '奇物共鳴', type: 'BUFF', stat: 'ATK', value: 0.3, duration: 3, icon: '🔮', description: '奇物能量使攻擊力大幅提升' }, 
            chance: 0.7 
        },
        { label: '無視離開', effect: 'NOTHING' },
        { label: '踢它一腳 (觸發戰鬥)', effect: 'BATTLE' }
      ]
    },
    {
      id: 'herta_coffee',
      regionId: 'herta_station',
      title: '姬子的咖啡',
      description: '姬子剛好在休息室手沖咖啡，香氣四溢（雖然顏色有點可疑）。她微笑著遞給你一杯。',
      imagePrompt: 'elegant woman red hair holding coffee cup space station lounge',
      choices: [
        { label: '一飲而盡 (生命全滿)', effect: 'HEAL', value: 1.0 },
        { 
            label: '禮貌品嚐 (獲得 SPD 增益)', 
            effect: 'BUFF',
            value: { name: '咖啡因過載', type: 'BUFF', stat: 'SPD', value: 0.2, duration: 99, icon: '☕', description: '姬子的咖啡讓你精神百倍(速度提升)' } 
        }
      ]
    }
  ],
  'jarilo_vi': [
    {
      id: 'jarilo_trash',
      regionId: 'jarilo_vi',
      title: '發光的垃圾桶',
      description: '這是一個金色的垃圾桶。它在呼喚你。這是一種宿命。',
      imagePrompt: 'golden trash can glowing in snow city alley',
      choices: [
        { label: '翻找垃圾 (獲得稀有物)', effect: 'ITEM', value: 'ancient_coin' },
        { 
            label: '讚嘆它的美 (獲得 DEF 增益)', 
            effect: 'BUFF', 
            value: { name: '垃圾之王', type: 'BUFF', stat: 'DEF', value: 0.5, duration: 99, icon: '🗑️', description: '垃圾桶的加護使防禦力提升' } 
        }
      ]
    },
    {
      id: 'jarilo_freeze',
      regionId: 'jarilo_vi',
      title: '驟降的寒流',
      description: '暴風雪突然加劇，能見度極低，寒冷正在侵蝕護甲。',
      imagePrompt: 'blizzard storm ice snow whiteout',
      choices: [
        { 
            label: '強行突破 (遭遇 Debuff)', 
            effect: 'BUFF', // Handled as negative buff
            value: { name: '低溫凍傷', type: 'DEBUFF', stat: 'SPD', value: 0.3, duration: 2, icon: '❄️', description: '極寒導致行動遲緩' }
        },
        { label: '尋找掩體 (戰鬥)', effect: 'BATTLE' }
      ]
    }
  ],
  'xianzhou': [
    {
      id: 'xianzhou_sword',
      regionId: 'xianzhou',
      title: '古舊的飛劍',
      description: '一把無主的飛劍插在地面，劍身流轉著奇異的光芒。',
      imagePrompt: 'chinese flying sword glowing ground mystical',
      choices: [
        { 
            label: '拔出飛劍 (獲得暴擊增益)', 
            effect: 'BUFF', 
            value: { name: '劍意', type: 'BUFF', stat: 'CRITRATE', value: 0.2, duration: 99, icon: '⚔️', description: '劍意加身，暴擊率提升' }
        },
        { label: '謹慎離開', effect: 'NOTHING' }
      ]
    }
  ],
  'penacony': [
    {
      id: 'penacony_drink',
      regionId: 'penacony',
      title: '蘇樂達噴泉',
      description: '巨大的蘇樂達噴泉正在噴湧，甜美的氣味讓人心情愉悅。',
      imagePrompt: 'soda fountain neon lights cyberpunk party',
      choices: [
        { 
            label: '暢飲 (攻擊提升)', 
            effect: 'BUFF',
            value: { name: '糖分激增', type: 'BUFF', stat: 'ATK', value: 0.25, duration: 3, icon: '🥤', description: '糖分使攻擊力提升' }
        },
        { label: '裝一瓶帶走', effect: 'ITEM', value: 'dream_fluid' }
      ]
    }
  ]
};

export const GENERIC_EVENTS: WorldEvent[] = [
    {
        id: 'generic_rest',
        regionId: 'all',
        title: '臨時營地',
        description: '發現了一個安全的角落，適合稍作休息。',
        imagePrompt: 'campfire safe zone dungeon rpg',
        choices: [
            { label: '包紮傷口 (回復 50% HP)', effect: 'HEAL', value: 0.5 },
            { 
                label: '整備武器 (提升攻擊)', 
                effect: 'BUFF', 
                value: { name: '銳利化', type: 'BUFF', stat: 'ATK', value: 0.15, duration: 99, icon: '🔪', description: '武器經過保養' } 
            }
        ]
    },
    {
        id: 'generic_ambush',
        regionId: 'all',
        title: '危險的信號',
        description: '雷達顯示前方有高能反應，但那裡似乎也有寶藏的氣息。',
        imagePrompt: 'red warning light sci-fi corridor danger',
        choices: [
            { label: '迎難而上 (戰鬥)', effect: 'BATTLE' },
            { 
                label: '繞道而行 (防禦下降)', 
                effect: 'BUFF', 
                value: { name: '疲憊', type: 'DEBUFF', stat: 'DEF', value: 0.2, duration: 2, icon: '😓', description: '繞路導致體力下降' }
            }
        ]
    },
    {
        id: 'generic_chest',
        regionId: 'all',
        title: '被遺忘的物資箱',
        description: '角落裡堆放著一些沒被帶走的補給品。',
        imagePrompt: 'sci-fi crate loot box glowing',
        choices: [
            { label: '打開', effect: 'ITEM', value: 'random' }
        ]
    }
];
