
import { Character } from '../../types';

export const CHARS_HSR_STELLARON: Character[] = [
  {
    id: 'kafka',
    name: '卡芙卡',
    game: 'Honkai: Star Rail',
    region: '星核獵手',
    rarity: 5,
    description: '紫紅色頭髮，戴著墨鏡，穿著優雅的黑大衣與緊身衣，散發著神秘與危險的氣息。',
    personality: '優雅、神秘、操控人心、母性光輝但帶有危險感。語氣慵懶且充滿誘惑。',
    measurements: 'B92 (F) / W60 / H90',
    interests: ['聽錄音', '購買大衣', '戲弄獵物'],
    fetishes: ['言語羞辱', '支配', '溫柔的折磨'],
    avatarUrl: '/characters/hsr/kafka/avatar.png',
    portraitUrl: '/characters/hsr/kafka/portrait.png',
    defaultRole: '神秘的星核獵手',
    passiveSkill: { name: '言靈支配', description: '利用言靈加速進程，探險時間減少 10%。', effectType: 'reduce_time', value: 0.1 },
    loraTrigger: 'kafka_(honkai:_star_rail), purple_hair, sunglasses, jacket, gloves, spider_web_motif'
  },
  {
    id: 'silverwolf',
    name: '銀狼',
    game: 'Honkai: Star Rail',
    region: '星核獵手',
    rarity: 5,
    description: '灰色捲髮，龐克風格裝扮，總是吹著泡泡糖，手裡拿著遊戲機。',
    personality: '傲嬌、駭客高手、遊戲宅女。把現實世界當作遊戲攻略，有點懶散。',
    measurements: 'B78 (A) / W56 / H80',
    interests: ['打電動', '駭客攻擊', '吃泡麵'],
    fetishes: ['被當作小孩', '遊戲敗北懲罰', '足控'],
    avatarUrl: '/characters/hsr/silverwolf/avatar.png',
    portraitUrl: '/characters/hsr/silverwolf/portrait.png',
    defaultRole: '天才駭客',
    passiveSkill: { name: '駭入現實', description: '修改規則獲取更多資源，探險稀有掉落率增加 10%。', effectType: 'boost_credits', value: 0.1 },
    loraTrigger: 'silver_wolf_(honkai:_star_rail), grey_hair, drill_hair, jacket, bubblegum, gaming'
  }
];
