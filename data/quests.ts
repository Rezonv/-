
import { Quest } from '../types';

export const QUESTS: Quest[] = [
    // --- DAILY QUESTS ---
    {
        id: 'daily_login',
        type: 'DAILY',
        title: '每日打卡',
        description: '登入遊戲並簽到。',
        targetValue: 1, // Logic handled via date check, this is dummy
        metricKey: 'totalLogins', // Special handling
        rewards: { starJade: 60, credits: 5000 },
        icon: '📅'
    },
    {
        id: 'daily_battle',
        type: 'DAILY',
        title: '實戰演練',
        description: '完成 3 場戰鬥勝利。',
        targetValue: 3,
        metricKey: 'battlesWon',
        rewards: { starJade: 30, exp: 200 },
        icon: '⚔️'
    },
    {
        id: 'daily_chat',
        type: 'DAILY',
        title: '情感交流',
        description: '與任意角色進行 3 次對話互動。',
        targetValue: 3,
        metricKey: 'chatInteractions',
        rewards: { credits: 10000, exp: 100 },
        icon: '💬'
    },

    // --- LIFETIME ACHIEVEMENTS ---
    {
        id: 'ach_pull_10',
        type: 'LIFETIME',
        title: '初試手氣',
        description: '累計進行 10 次躍遷。',
        targetValue: 10,
        metricKey: 'gachaPulls',
        rewards: { starJade: 160 },
        icon: '🌠'
    },
    {
        id: 'ach_pull_100',
        type: 'LIFETIME',
        title: '命運的召喚',
        description: '累計進行 100 次躍遷。',
        targetValue: 100,
        metricKey: 'gachaPulls',
        rewards: { starJade: 1600 },
        icon: '💫'
    },
    {
        id: 'ach_battle_50',
        type: 'LIFETIME',
        title: '戰場老兵',
        description: '累計獲得 50 場戰鬥勝利。',
        targetValue: 50,
        metricKey: 'battlesWon',
        rewards: { credits: 100000, starJade: 100 },
        icon: '🎖️'
    },
    {
        id: 'ach_spend_1m',
        type: 'LIFETIME',
        title: '揮金如土',
        description: '累計消費 1,000,000 信用點。',
        targetValue: 1000000,
        metricKey: 'creditsSpent',
        rewards: { starJade: 200 },
        icon: '💰'
    },
    {
        id: 'ach_expedition_20',
        type: 'LIFETIME',
        title: '星際拓荒',
        description: '完成 20 次派遣任務。',
        targetValue: 20,
        metricKey: 'expeditionsCompleted',
        rewards: { starJade: 100, items: [] }, 
        icon: '🚀'
    }
];
