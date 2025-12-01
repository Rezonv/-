

import { AffectionMilestone } from '../../types';

const createMilestones = (charName: string): AffectionMilestone[] => [
    {
        level: 2,
        reqAffection: 100,
        title: '相識：異鄉的相遇',
        description: `在提瓦特大陸的旅途中與${charName}結識。`,
        rewards: [{ type: 'STAT_BONUS', value: 0.02, label: '全屬性 +2%' }],
        sceneContext: { location: '城鎮一角', atmosphere: '熱鬧', plotHook: '偶然的相遇開啟了故事。' }
    },
    {
        level: 3,
        reqAffection: 200,
        title: '友好：共同的冒險',
        description: `一同解決了許多委託，${charName}把你當作值得信賴的夥伴。`,
        rewards: [{ type: 'STAT_BONUS', value: 0.05, label: '全屬性 +5%' }],
        sceneContext: { location: '野外營地', atmosphere: '寧靜', plotHook: '圍著營火分享食物。' }
    },
    {
        level: 4,
        reqAffection: 300,
        title: '傾慕：塵世閒遊',
        description: `不僅僅是夥伴，${charName}開始在意你的一舉一動。`,
        rewards: [{ type: 'STAT_BONUS', value: 0.08, label: '全屬性 +8%' }],
        sceneContext: { location: '櫻花樹下', atmosphere: '浪漫', plotHook: '花瓣飄落，心意相通。' }
    },
    {
        level: 5,
        reqAffection: 400,
        title: '羈絆：永恆的約定',
        description: `無論身在何處，你們的心都緊緊相連。`,
        rewards: [{ type: 'STAT_BONUS', value: 0.12, label: '全屬性 +12%' }],
        sceneContext: { location: '一心淨土', atmosphere: '永恆', plotHook: '許下不變的誓言。' }
    }
];

export const GENSHIN_AFFECTION_MAP: Record<string, AffectionMilestone[]> = {};

const chars = [
    { id: 'raiden', name: '雷電將軍' }, { id: 'yaemiko', name: '八重神子' }, { id: 'furina', name: '芙寧娜' },
    { id: 'beidou', name: '北斗' }, { id: 'keqing', name: '刻晴' }, { id: 'mualani', name: '瑪拉妮' },
    { id: 'hutao', name: '胡桃' }, { id: 'ganyu', name: '甘雨' }, { id: 'shenhe', name: '申鶴' },
    { id: 'yelan', name: '夜蘭' }, { id: 'nahida', name: '納西妲' }, { id: 'nilou', name: '妮露' },
    { id: 'navia', name: '娜維婭' }, { id: 'arlecchino', name: '僕人' },
    { id: 'ayaka', name: '神里綾華' }, { id: 'eula', name: '優菈' }, { id: 'jean', name: '琴' },
    { id: 'kokomi', name: '珊瑚宮心海' }, { id: 'clorinde', name: '克洛琳德' }, { id: 'xianyun', name: '閒雲' },
    { id: 'yoimiya', name: '宵宮' }, { id: 'chiori', name: '千織' },
    { id: 'lisa', name: '麗莎' }, { id: 'mona', name: '莫娜' }, { id: 'ningguang', name: '凝光' },
    { id: 'noelle', name: '諾艾爾' }, { id: 'barbara', name: '芭芭拉' }, { id: 'kukishinobu', name: '久岐忍' },
    { id: 'kirara', name: '綺良良' }, { id: 'dehya', name: '迪希雅' },
    { id: 'rosaria', name: '羅莎莉亞' }, { id: 'yanfei', name: '煙緋' }, { id: 'fischl', name: '菲謝爾' },
    { id: 'sucrose', name: '砂糖' }, { id: 'kujousara', name: '九條裟羅' }, { id: 'yunjin', name: '雲堇' },
    { id: 'faruzan', name: '琺露珊' }, { id: 'layla', name: '萊依拉' }, { id: 'charlotte', name: '夏洛蒂' },
    { id: 'lynette', name: '琳妮特' }, { id: 'chevreuse', name: '夏沃蕾' }, { id: 'sigewinne', name: '希格雯' },
    { id: 'linyun', name: '林允' },
    // New
    { id: 'mavuika', name: '瑪薇卡' }, { id: 'xilonen', name: '希諾寧' }, { id: 'chasca', name: '恰斯卡' },
    { id: 'klee', name: '可莉' }, { id: 'xiangling', name: '香菱' }
];

chars.forEach(c => {
    GENSHIN_AFFECTION_MAP[c.id] = createMilestones(c.name);
});
