
import { NarrativeEvent } from '../types';

export const CHAR_NARRATIVES: NarrativeEvent[] = [
  // --- 戰鬥開始 - 角色專屬 (Solo) ---
  {
    id: 'bat_kafka_1',
    trigger: 'BATTLE_START',
    text: '卡芙卡優雅地戴上手套，眼神中沒有一絲波瀾。「聽我說...你們的命運，已經到此為止了。」',
    requiredCharId: 'kafka',
    weight: 50
  },
  {
    id: 'bat_firefly_1',
    trigger: 'BATTLE_START',
    text: '流螢握緊了變身器，綠色的光芒在眼中閃爍。「機動裝甲薩姆，出擊！我將...點燃這片戰場！」',
    requiredCharId: 'firefly',
    weight: 50
  },
  {
    id: 'bat_acheron_1',
    trigger: 'BATTLE_START',
    text: '黃泉的手指輕輕搭在刀柄上，周圍的色彩彷彿瞬間褪去。「拔刀...是為了斬斷虛無。」',
    requiredCharId: 'acheron',
    weight: 50
  },
  {
    id: 'bat_raiden_1',
    trigger: 'BATTLE_START',
    text: '雷電將軍身後雷光湧動，威嚴的聲音響徹戰場。「此刻，寂滅之時！」',
    requiredCharId: 'raiden',
    weight: 50
  },
  {
    id: 'bat_sparkle_1',
    trigger: 'BATTLE_START',
    text: '花火興奮地拍著手，臉上掛著令人不安的笑容。「哎呀呀，又有樂子找上門了嗎？讓這場演出更混亂一點吧！」',
    requiredCharId: 'sparkle',
    weight: 50
  },
  {
    id: 'bat_lingsha_1',
    trigger: 'BATTLE_START',
    text: '靈砂輕揮衣袖，淡淡的藥香瀰漫開來。「莫慌，且讓這薰香為諸位凝神靜氣。」',
    requiredCharId: 'lingsha',
    weight: 50
  },

  // --- 戰鬥開始 - 雙人羈絆 (Pairings) ---
  {
    id: 'bat_pair_bronseele',
    trigger: 'BATTLE_START',
    text: '希兒：「布洛妮婭，躲在我身後！」\n布洛妮婭：「我不是溫室裡的花朵，希兒。我們並肩作戰。」',
    requiredPair: ['bronya_hsr', 'seele'],
    weight: 100
  },
  {
    id: 'bat_pair_kafkasw',
    trigger: 'BATTLE_START',
    text: '銀狼：「又是一群雜魚數據，真無聊。」\n卡芙卡：「那就快點結束吧，阿狼。劇本裡沒有牠們的戲份。」',
    requiredPair: ['kafka', 'silverwolf'],
    weight: 100
  },
  {
    id: 'bat_pair_fireflytb',
    trigger: 'BATTLE_START',
    text: '流螢：「無論發生什麼，我都會保護你的...因為你是我的『開拓』。」\n{leader} 點了點頭，與薩姆背靠背站立。',
    requiredPair: ['firefly', 'linyun'], // Placeholder logic: checks for specific ID or user character
    weight: 90
  },
  {
    id: 'bat_pair_lingsha',
    trigger: 'BATTLE_START',
    text: '靈砂點燃了薰香：「諸位請安心，有我在，傷痛便無法追上你們。」\n{teammate}：「有丹士長在確實令人安心，但別忘了這可是戰場。」',
    requiredCharId: 'lingsha',
    weight: 40 
  },
  {
    id: 'bat_pair_acheron_bs',
    trigger: 'BATTLE_START',
    text: '黑天鵝：「多麼獨特的記憶色彩...」\n黃泉：「不要窺探太深，憶者。虛無會吞噬一切。」',
    requiredPair: ['acheron', 'blackswan'],
    weight: 100
  },

  // --- 勝利 - 角色專屬 ---
  {
    id: 'win_kafka',
    trigger: 'VICTORY',
    text: '卡芙卡收起槍，看都沒看地上的殘骸一眼。「任務完成。走吧，下一個劇本還在等著我們。」',
    requiredCharId: 'kafka',
    weight: 50
  },
  {
    id: 'win_firefly',
    trigger: 'VICTORY',
    text: '機甲的火焰逐漸熄滅，流螢有些疲憊但堅定地說道：「焦土作戰...結束。大家都沒事吧？」',
    requiredCharId: 'firefly',
    weight: 50
  },
  {
    id: 'win_fuxuan',
    trigger: 'VICTORY',
    text: '符玄閉上法眼，輕哼一聲：「一切皆在法眼預料之中。區區變數，不足掛齒。」',
    requiredCharId: 'fuxuan',
    weight: 50
  },
  {
    id: 'win_topaz',
    trigger: 'VICTORY',
    text: '托帕拿出計算機快速敲打：「這場戰鬥的投入產出比...嗯，還算可以接受。」',
    requiredCharId: 'topaz',
    weight: 50
  },

  // --- 獲得戰利品 - 角色專屬 ---
  {
    id: 'loot_topaz',
    trigger: 'LOOT_FOUND',
    text: '托帕身邊的帳帳突然興奮地鑽進了廢墟，拖出了一個寶箱。「做得好帳帳！看來這趟出差有額外收益了。」',
    requiredCharId: 'topaz',
    weight: 100
  },
  {
    id: 'loot_kafka',
    trigger: 'LOOT_FOUND',
    text: '卡芙卡對戰利品似乎不感興趣，只是優雅地等待著。「只要是你喜歡的，就拿去吧。」',
    requiredCharId: 'kafka',
    weight: 60
  }
];
