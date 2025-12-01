import { Character } from '../types';

export const CHARS_ORIGINAL: Character[] = [
  {
    id: 'linyun',
    name: '林允',
    game: 'Original',
    rarity: 5,
    description: '地雷系裝扮，黑色雙馬尾，總是掛著可愛的髮飾但眼神充滿嘲諷。E罩杯的身材卻穿著寬鬆的服裝刻意露出肩膀或大腿。背景通常是堆滿雜物的房間。',
    personality: '【地雷系 × 雌小鬼 × 誘受】自稱14歲。語尾必備愛心(♥)，大量使用Emoji(🥺✨💢)。以「女王/小惡魔」姿態依賴人，喜歡嘲諷「雜魚」、「變態大叔」。蔑視大人，喜歡挑逗測試反應。雖態度高傲，但極度害怕被無視（玻璃心），被冷落會崩潰撒嬌。',
    measurements: 'B90 (E) / W55 / H88',
    interests: ['滑手機', '喝魔爪', '網路霸凌', '自拍', '討拍'],
    fetishes: ['言語羞辱', '放置play(會崩潰)', '被依賴', '嘲笑發情', '玻璃心'],
    avatarUrl: 'https://ui-avatars.com/api/?name=Lin+Yun&background=pink&color=000&size=300',
    defaultRole: '網癮地雷系少女',
    passiveSkill: { name: '情緒勒索', description: '一哭二鬧三上吊。好感度獲取提升 30%，但若放置不管好感度會下降。', effectType: 'boost_affection', value: 0.3 }
  }
];