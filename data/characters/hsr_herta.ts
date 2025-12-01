
import { Character } from '../../types';

export const CHARS_HSR_HERTA: Character[] = [
  {
    id: 'ruanmei',
    name: '阮•梅',
    game: 'Honkai: Star Rail',
    region: '黑塔太空站',
    rarity: 5,
    description: '溫婉典雅的學者，氣質如梅花般清冷，穿著帶有傳統韻味的服飾。',
    personality: '專注、淡漠、對生命科學有著狂熱的執著，不善交際。',
    measurements: 'B92 (E) / W60 / H92',
    interests: ['培育生命', '刺繡', '吃點心'],
    fetishes: ['人體實驗', '觸手(培育生物)', '冷淡下的熱情'],
    avatarUrl: '/characters/hsr/ruanmei/avatar.png',
    portraitUrl: '/characters/hsr/ruanmei/portrait.png',
    defaultRole: '天才俱樂部會員',
    passiveSkill: { name: '生命培育', description: '加速生態循環，探險時間減少 10%。', effectType: 'reduce_time', value: 0.1 },
    loraTrigger: 'ruan_mei_(honkai:_star_rail), brown_hair, chinese_clothes, gloves, green_eyes'
  },
  {
    id: 'the_herta',
    name: '大黑塔',
    game: 'Honkai: Star Rail',
    region: '黑塔太空站',
    rarity: 5,
    description: '黑塔女士的真實形態（或更高階人偶），展現出成熟女性的絕美姿態。',
    personality: '傲慢、冷豔、智商碾壓。比起小人偶的毒舌，大黑塔多了一份成熟的威壓與慵懶。',
    measurements: 'B92 (E) / W59 / H91',
    interests: ['模擬宇宙', '星神研究', '使喚人'],
    fetishes: ['高跟鞋', '絕對支配', '天才'],
    avatarUrl: '/characters/hsr/the_herta/avatar.png',
    portraitUrl: '/characters/hsr/the_herta/portrait.png',
    defaultRole: '天才俱樂部#83',
    passiveSkill: { name: '智識之光', description: '天才的效率，探險時間減少 20%。', effectType: 'reduce_time', value: 0.2 },
    loraTrigger: 'herta_(honkai:_star_rail), mature_female, puppet_joints, purple_dress, hat'
  },
  {
    id: 'herta',
    name: '黑塔',
    game: 'Honkai: Star Rail',
    region: '黑塔太空站',
    rarity: 4,
    description: '黑塔女士的遠端操縱人偶，精緻得像個洋娃娃。',
    personality: '傲嬌、毒舌、沒耐心。對感興趣的事物會投入，不感興趣的轉頭就走。',
    measurements: 'B76 (A) / W54 / H78',
    interests: ['轉圈圈', '研究', '收集奇物'],
    fetishes: ['人偶關節', '被保養', '傲慢'],
    avatarUrl: '/characters/hsr/herta/avatar.png',
    portraitUrl: '/characters/hsr/herta/portrait.png',
    defaultRole: '太空站主人',
    passiveSkill: { name: '轉圈圈', description: '高效運轉，探險時間減少 10%。', effectType: 'reduce_time', value: 0.1 },
    loraTrigger: 'herta_(honkai:_star_rail), doll_joints, hat, purple_dress, twintails'
  },
  {
    id: 'asta',
    name: '艾絲妲',
    game: 'Honkai: Star Rail',
    region: '黑塔太空站',
    rarity: 4,
    description: '黑塔太空站的代理站長，出身名門的大小姐。',
    personality: '開朗、大方、有點天然呆，但在天文領域非常專業。',
    measurements: 'B86 (C) / W58 / H86',
    interests: ['觀星', '購物', '照顧佩佩'],
    fetishes: ['白絲', '千金小姐', '天文望遠鏡'],
    avatarUrl: '/characters/hsr/asta/avatar.png',
    portraitUrl: '/characters/hsr/asta/portrait.png',
    defaultRole: '代理站長',
    passiveSkill: { name: '鈔能力', description: '經費充足，探險積分獎勵增加 15%。', effectType: 'boost_credits', value: 0.15 },
    loraTrigger: 'asta_(honkai:_star_rail), pink_hair, white_shirt, telescope, blue_eyes'
  }
];
