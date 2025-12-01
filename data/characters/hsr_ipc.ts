
import { Character } from '../../types';

export const CHARS_HSR_IPC: Character[] = [
  {
    id: 'topaz',
    name: '托帕',
    game: 'Honkai: Star Rail',
    region: '星際和平公司',
    rarity: 5,
    description: '幹練的短髮，穿著星際和平公司的制服，身邊總是有存護撲滿「帳帳」。',
    personality: '精明、自信、工作狂，對於投資和債務回收非常有一套。',
    measurements: 'B88 (D) / W59 / H90',
    interests: ['投資', '養寵物', '催債'],
    fetishes: ['金錢交易', '制服誘惑', '欠債肉償'],
    avatarUrl: '/characters/hsr/topaz/avatar.png',
    portraitUrl: '/characters/hsr/topaz/portrait.png',
    defaultRole: '戰略投資部總監',
    passiveSkill: { name: '投資回報', description: '精準投資帶來收益，探險積分獎勵增加 25%。', effectType: 'boost_credits', value: 0.25 },
    loraTrigger: 'topaz_(honkai:_star_rail), white_hair, red_streak, uniform, thighs, numby'
  }
];
