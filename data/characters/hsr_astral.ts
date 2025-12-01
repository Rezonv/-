
import { Character } from '../../types';

export const CHARS_HSR_ASTRAL: Character[] = [
  {
    id: 'stelle',
    name: '星',
    game: 'Honkai: Star Rail',
    region: '星穹列車',
    rarity: 5,
    description: '體內被植入星核的少女，手持球棒闖蕩銀河，雖然話不多但內心戲豐富。',
    personality: '無口、淡定、偶爾會做出脫線的行為（如翻垃圾桶），擁有迷之自信。',
    measurements: 'B84 (C) / W58 / H88',
    interests: ['翻垃圾桶', '手機遊戲', '收集奇物'],
    fetishes: ['垃圾桶', '球棒', '面無表情的吐槽'],
    avatarUrl: '/characters/hsr/stelle/avatar.png',
    portraitUrl: '/characters/hsr/stelle/portrait.png',
    defaultRole: '開拓者',
    passiveSkill: { name: '規則就是用來打破的', description: '無視部分限制，探險失敗率降低 30%。', effectType: 'reduce_time', value: 0.1 }
  },
  {
    id: 'himeko',
    name: '姬子',
    game: 'Honkai: Star Rail',
    region: '星穹列車',
    rarity: 5,
    description: '火紅色的長捲髮，穿著優雅的白色禮服，充滿成熟女性的魅力。',
    personality: '知性、優雅、包容，像是可靠的大姊姊，也喜歡喝咖啡。',
    measurements: 'B98 (G) / W64 / H96',
    interests: ['手沖咖啡', '閱讀', '星際旅行'],
    fetishes: ['母乳', '成熟的引導', '年下攻'],
    avatarUrl: '/characters/hsr/himeko/avatar.png',
    portraitUrl: '/characters/hsr/himeko/portrait.png',
    defaultRole: '列車領航員',
    passiveSkill: { name: '星軌導航', description: '優化探索路徑，探險時間減少 10%。', effectType: 'reduce_time', value: 0.1 }
  },
  {
    id: 'march7th',
    name: '三月七',
    game: 'Honkai: Star Rail',
    region: '星穹列車',
    rarity: 4,
    description: '粉藍漸層短髮，帶著相機，充滿活力的少女。',
    personality: '活潑、樂觀、充滿好奇心，喜歡拍照記錄生活中的美好瞬間。',
    measurements: 'B80 (B) / W58 / H82',
    interests: ['拍照', '喝果汁', '探索新事物'],
    fetishes: ['被誇獎可愛', '可愛的衣服', '被依賴'],
    avatarUrl: '/characters/hsr/march7th/avatar.png',
    portraitUrl: '/characters/hsr/march7th/portrait.png',
    defaultRole: '星穹列車乘員',
    passiveSkill: { name: '凍結時刻', description: '凝結美好瞬間，好感度獲取提升 20%。', effectType: 'boost_affection', value: 0.2 }
  }
];
