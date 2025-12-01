
import { AffectionMilestone } from '../../types';

// Helper factory for generic milestones
const createMilestones = (charName: string): AffectionMilestone[] => [
    {
        level: 2,
        reqAffection: 100,
        title: '初識：相遇的軌跡',
        description: `與${charName}更加熟悉，解鎖基礎語音與屬性加成。`,
        rewards: [
            { type: 'STAT_BONUS', value: 0.02, label: '全屬性 +2%' },
            { type: 'VOICE_UNLOCK', value: 'chat_1', label: '閒聊語音 I' }
        ],
        sceneContext: { location: '列車休息車廂', atmosphere: '輕鬆', plotHook: `${charName}似乎有話想對你說...` }
    },
    {
        level: 3,
        reqAffection: 200,
        title: '信賴：並肩作戰',
        description: `在多次戰鬥中建立了信任，${charName}願意分享更多心事。`,
        rewards: [
            { type: 'STAT_BONUS', value: 0.05, label: '全屬性 +5%' },
            { type: 'STORY_UNLOCK', value: 'story_date', label: '邀約劇情' }
        ],
        sceneContext: { location: '安靜的觀景台', atmosphere: '溫馨', plotHook: '星空下，你們談論著彼此的過去。' }
    },
    {
        level: 4,
        reqAffection: 300,
        title: '曖昧：心動時刻',
        description: `彼此的距離縮短了，空氣中瀰漫著不一樣的氣息。`,
        rewards: [
            { type: 'STAT_BONUS', value: 0.08, label: '全屬性 +8%' },
            { type: 'VOICE_UNLOCK', value: 'chat_intimate', label: '曖昧語音' }
        ],
        sceneContext: { location: '私人房間', atmosphere: '曖昧', plotHook: '深夜的獨處，眼神交會的瞬間。' }
    },
    {
        level: 5,
        reqAffection: 400,
        title: '誓約：星海共鑑',
        description: `與${charName}締結了超越夥伴的深刻羈絆。`,
        rewards: [
            { type: 'STAT_BONUS', value: 0.12, label: '全屬性 +12%' },
            { type: 'ITEM', value: 'ring_ssr', label: '誓約之戒' }
        ],
        sceneContext: { location: '星海深處', atmosphere: '神聖', plotHook: '這是一個關於承諾的時刻。' }
    }
];

export const HSR_AFFECTION_MAP: Record<string, AffectionMilestone[]> = {};

// All HSR IDs
const hsrChars = [
    { id: 'aglaea', name: '阿格萊雅' }, { id: 'castorice', name: '遐蝶' }, { id: 'tribbie', name: '緹寶' },
    { id: 'haiseyin', name: '海瑟音' }, { id: 'sapphire', name: '賽飛兒' }, { id: 'kelyudela', name: '刻律德菈' }, { id: 'xilian', name: '昔漣' }, { id: 'fengjin', name: '風堇' },
    { id: 'kafka', name: '卡芙卡' }, { id: 'firefly', name: '流螢' }, { id: 'acheron', name: '黃泉' },
    { id: 'blackswan', name: '黑天鵝' }, { id: 'feixiao', name: '飛霄' }, { id: 'lingsha', name: '靈砂' },
    { id: 'himeko', name: '姬子' }, { id: 'silverwolf', name: '銀狼' }, { id: 'ruanmei', name: '阮•梅' },
    { id: 'topaz', name: '托帕' }, { id: 'fuxuan', name: '符玄' }, { id: 'sparkle', name: '花火' },
    { id: 'jingliu', name: '鏡流' }, { id: 'tingyun', name: '停雲' }, { id: 'bronya_hsr', name: '布洛妮婭' },
    { id: 'seele', name: '希兒' }, { id: 'march7th', name: '三月七' }, { id: 'serval', name: '希露瓦' },
    { id: 'natasha', name: '娜塔莎' }, { id: 'jade', name: '翡翠' }, { id: 'robin', name: '知更鳥' },
    { id: 'hanya', name: '寒鴉' }, { id: 'xueyi', name: '雪衣' }, { id: 'yukong', name: '馭空' },
    { id: 'guinaifen', name: '桂乃芬' }, { id: 'qingque', name: '青雀' }, { id: 'clara', name: '克拉拉' },
    { id: 'yunli', name: '雲璃' }, { id: 'march7th_hunt', name: '三月七•巡獵' },
    { id: 'pela', name: '佩拉' }, { id: 'asta', name: '艾絲妲' }, { id: 'herta', name: '黑塔' },
    { id: 'bailu', name: '白露' }, { id: 'sushang', name: '素裳' }, { id: 'lynx', name: '玲可' },
    { id: 'huohuo', name: '藿藿' }, { id: 'rappa', name: '亂破' }, { id: 'fugue', name: '忘歸人' }, { id: 'the_herta', name: '大黑塔' }
];

hsrChars.forEach(c => {
    HSR_AFFECTION_MAP[c.id] = createMilestones(c.name);
});

// Custom overrides
const ff = HSR_AFFECTION_MAP['firefly'];
if(ff) {
    ff[0].title = '初識：格拉默的餘燼';
    ff[1].title = '信賴：橡木蛋糕捲';
    ff[3].title = '誓約：點燃大海';
}
