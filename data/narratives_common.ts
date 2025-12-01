
import { NarrativeEvent } from '../types';

export const COMMON_NARRATIVES: NarrativeEvent[] = [
  // --- 探索 - 通用 (Generic) ---
  {
    id: 'exp_gen_1',
    trigger: 'EXPLORATION',
    text: '{leader} 環顧四周，確認周圍暫時安全。「我們繼續前進吧，大家跟上。」',
    regionId: 'all',
    weight: 10
  },
  {
    id: 'exp_gen_2',
    trigger: 'EXPLORATION',
    text: '隊伍在廢墟中穿行，{teammate} 似乎發現了一些古代文明的痕跡，但現在不是研究的時候。',
    regionId: 'all',
    weight: 10
  },
  {
    id: 'exp_gen_3',
    trigger: 'EXPLORATION',
    text: '空氣中瀰漫著危險的氣息。{leader} 壓低了聲音：「保持警惕，我有種不好的預感。」',
    regionId: 'all',
    weight: 10
  },
  {
    id: 'exp_gen_4',
    trigger: 'EXPLORATION',
    text: '{support} 正在調整裝備：「這裡的環境干擾很大，數據讀數一直在跳動。」',
    regionId: 'all',
    weight: 10
  },

  // --- 探索 - 地區專屬 (Herta Station) ---
  {
    id: 'exp_herta_1',
    trigger: 'EXPLORATION',
    text: '太空站的廣播系統發出滋滋的雜音。{leader} 皺了皺眉：「反物質軍團對這裡的破壞比想像中更嚴重。」',
    regionId: 'herta_station',
    weight: 20
  },
  {
    id: 'exp_herta_2',
    trigger: 'EXPLORATION',
    text: '{teammate} 踢開了一堆損壞的嗚嗚伯。「這裡到處都是黑塔女士的收藏品，小心別碰壞了。」',
    regionId: 'herta_station',
    weight: 20
  },

  // --- 探索 - 地區專屬 (Jarilo-VI) ---
  {
    id: 'exp_jarilo_1',
    trigger: 'EXPLORATION',
    text: '寒風刺骨，{leader} 拉緊了衣領。「這種溫度...如果沒有開拓之力的保護，常人根本無法生存。」',
    regionId: 'jarilo_vi',
    weight: 20
  },
  {
    id: 'exp_jarilo_2',
    trigger: 'EXPLORATION',
    text: '雪地裡埋著舊時代的機械殘骸。{teammate} 呼出一口白氣：「被冰封的歷史...真令人唏噓。」',
    regionId: 'jarilo_vi',
    weight: 20
  },

  // --- 探索 - 地區專屬 (Xianzhou Luofu) ---
  {
    id: 'exp_xianzhou_1',
    trigger: 'EXPLORATION',
    text: '四周迴盪著機巧鳥的運轉聲。{leader} 看著遠處的洞天：「仙舟的景色，無論看幾次都覺得壯觀。」',
    regionId: 'xianzhou',
    weight: 20
  },

  // --- 探索 - 地區專屬 (Penacony) ---
  {
    id: 'exp_penacony_1',
    trigger: 'EXPLORATION',
    text: '霓虹燈光在夢境中閃爍。{teammate} 感覺有點頭暈：「這裡的空氣...甜得讓人發膩。」',
    regionId: 'penacony',
    weight: 20
  },

  // --- 戰鬥開始 - 通用 ---
  {
    id: 'bat_gen_1',
    trigger: 'BATTLE_START',
    text: '敵方單位進入視野！{tank} 擋在隊伍最前方：「別怕，躲在我身後！」',
    regionId: 'all',
    weight: 10
  },
  {
    id: 'bat_gen_2',
    trigger: 'BATTLE_START',
    text: '「被包圍了？」{dps} 冷笑一聲，握緊了武器，「正好拿你們來試試新招式。」',
    regionId: 'all',
    weight: 10
  },
  
  // --- 菁英/BOSS 戰前 ---
  {
    id: 'elite_gen_1',
    trigger: 'ELITE_BATTLE',
    text: '前方的能量讀數急劇上升。一個巨大的身影擋住了去路，發出震耳欲聾的咆哮！',
    regionId: 'all',
    weight: 10
  },
  {
    id: 'elite_herta',
    trigger: 'ELITE_BATTLE',
    text: '警報聲大作。「偵測到末日獸級別的能量反應！」{leader} 握緊武器，「這傢伙不好對付，全力以赴！」',
    regionId: 'herta_station',
    weight: 20
  },

  // --- 獲得戰利品 ---
  {
    id: 'loot_gen_1',
    trigger: 'LOOT_FOUND',
    text: '戰鬥結束後，{teammate} 在角落發現了一個並未上鎖的物資箱。「運氣不錯，看看裡面有什麼？」',
    regionId: 'all',
    weight: 10
  }
];
