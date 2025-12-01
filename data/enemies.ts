
import { Enemy } from '../types';

export const ENEMIES: Enemy[] = [
  // --- HSR: Herta Space Station ---
  {
    id: 'void_ranger_reaver',
    name: '反物質軍團・掠奪者',
    regionId: 'herta_station',
    lore: '反物質軍團的基礎作戰單位，沒有自我意識，只有對毀滅的渴望。它們成群結隊地出現在被軍團選中的星球上。',
    skillLore: '快速揮舞虛空之刃進行切割，擅長群體衝鋒。',
    level: 10, hp: 800, maxHp: 800, atk: 120, def: 50, spd: 90,
    element: 'Quantum', weaknesses: ['Physical', 'Ice', 'Quantum'],
    dropTable: [{ itemId: 'aether_dust', chance: 0.8, min: 1, max: 3 }]
  },
  {
    id: 'void_ranger_distorter',
    name: '反物質軍團・篡改者',
    regionId: 'herta_station',
    lore: '軍團中的精英單位，能夠扭曲小範圍的空間座標，將敵人的攻擊轉移或讓盟友瞬間移動。',
    skillLore: '釋放【虛數鎖定】，造成虛數傷害並推遲目標行動。',
    level: 20, hp: 3000, maxHp: 3000, atk: 200, def: 80, spd: 95,
    element: 'Imaginary', weaknesses: ['Wind', 'Physical', 'Imaginary'],
    dropTable: [{ itemId: 'aether_dust', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'void_ranger_eliminator',
    name: '反物質軍團・抹消者',
    regionId: 'herta_station',
    lore: '手持高能粒子雙刃的處刑者，專門負責清理戰場上的倖存者。',
    skillLore: '【連續斬擊】：對單體目標發動多次高頻攻擊。',
    level: 22, hp: 3500, maxHp: 3500, atk: 250, def: 90, spd: 100,
    element: 'Fire', weaknesses: ['Ice', 'Quantum', 'Fire'],
    dropTable: [{ itemId: 'aether_dust', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'blaze_out_of_space',
    name: '外宇宙之炎',
    regionId: 'herta_station',
    lore: '來自深空的無定形燃燒生命體，被反物質軍團捕獲並投放至戰場。',
    skillLore: '【汲取火焰】：強化自身攻擊力；【焚燒殆盡】：全體火屬性傷害。',
    level: 25, hp: 4500, maxHp: 4500, atk: 280, def: 100, spd: 100,
    element: 'Fire', weaknesses: ['Physical', 'Ice', 'Quantum'],
    dropTable: [{ itemId: 'aether_dust', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'void_ranger_trampler',
    name: '踐踏者',
    regionId: 'herta_station',
    lore: '外形如半人馬的重裝單位，其鐵蹄所過之處寸草不生。',
    skillLore: '鎖定被糾纏的目標，發動極高傷害的蓄力踐踏。',
    level: 25, hp: 4000, maxHp: 4000, atk: 300, def: 100, spd: 90,
    element: 'Imaginary', weaknesses: ['Physical', 'Wind', 'Imaginary'],
    dropTable: [{ itemId: 'aether_dust', chance: 1.0, min: 5, max: 10 }]
  },
  {
    id: 'doomsday_beast',
    name: '末日獸 (BOSS)',
    regionId: 'herta_station',
    lore: '反物質軍團的對星兵器，由無數哀嚎的靈魂與虛空物質聚合而成，其存在本身就是災難。',
    skillLore: '【末日臨空】：全場毀滅性打擊；【反物質引擎】：多階段變身與核心機制。',
    level: 50, hp: 20000, maxHp: 20000, atk: 500, def: 200, spd: 100,
    element: 'Quantum', weaknesses: ['Fire', 'Ice', 'Physical', 'Wind'],
    dropTable: [{ itemId: 'aether_dust', chance: 1.0, min: 10, max: 20 }]
  },

  // --- HSR: Jarilo-VI ---
  {
    id: 'automaton_beetle',
    name: '自動機兵・甲蟲',
    regionId: 'jarilo_vi',
    lore: '舊時代遺留的小型防禦單元，外殼堅硬，常被用於巡邏。',
    skillLore: '【防護屏障】：為友軍提供護盾，無效化一次攻擊。',
    level: 15, hp: 1200, maxHp: 1200, atk: 80, def: 150, spd: 80,
    element: 'Lightning', weaknesses: ['Lightning', 'Wind', 'Imaginary'],
    dropTable: [{ itemId: 'ice_crystal', chance: 0.6, min: 1, max: 2 }]
  },
  {
    id: 'automaton_spider',
    name: '自動機兵・蜘蛛',
    regionId: 'jarilo_vi',
    lore: '不穩定的自律炸彈單位，一旦發現入侵者就會啟動自毀程序。',
    skillLore: '【自爆】：對範圍內目標造成巨額火屬性傷害。',
    level: 18, hp: 1000, maxHp: 1000, atk: 300, def: 20, spd: 110,
    element: 'Fire', weaknesses: ['Lightning', 'Wind'],
    dropTable: [{ itemId: 'ice_crystal', chance: 0.6, min: 1, max: 3 }]
  },
  {
    id: 'automaton_direwolf',
    name: '自動機兵・齒狼',
    regionId: 'jarilo_vi',
    lore: '配備了高頻電鋸的獵殺型機兵，速度極快，極具威脅。',
    skillLore: '【鎖定】：標記目標，隨後發動無視防禦的撕裂攻擊。',
    level: 30, hp: 5500, maxHp: 5500, atk: 320, def: 100, spd: 115,
    element: 'Physical', weaknesses: ['Ice', 'Lightning', 'Imaginary'],
    dropTable: [{ itemId: 'ice_crystal', chance: 1.0, min: 4, max: 6 }]
  },
  {
    id: 'guardian_shadow',
    name: '守護者之影',
    regionId: 'jarilo_vi',
    lore: '歷代守護者的悔恨與執念在裂界中凝聚而成的虛影。',
    skillLore: '【寧靜禁令】：禁止使用普通攻擊/戰技，違者將遭雷擊。',
    level: 35, hp: 6500, maxHp: 6500, atk: 250, def: 120, spd: 110,
    element: 'Ice', weaknesses: ['Physical', 'Wind', 'Quantum'],
    dropTable: [{ itemId: 'ice_crystal', chance: 1.0, min: 4, max: 7 }]
  },
  {
    id: 'frigid_prowler',
    name: '興風者',
    regionId: 'jarilo_vi',
    lore: '遊蕩在永冬嶺的怪異機械生物，以寒冰為動力源。',
    skillLore: '【深寒降臨】：降低全場速度，並有概率凍結目標。',
    level: 38, hp: 7000, maxHp: 7000, atk: 300, def: 140, spd: 90,
    element: 'Ice', weaknesses: ['Fire', 'Lightning', 'Quantum'],
    dropTable: [{ itemId: 'ice_crystal', chance: 1.0, min: 4, max: 7 }]
  },
  {
    id: 'automaton_grizzly',
    name: '自動機兵・灰熊',
    regionId: 'jarilo_vi',
    lore: '貝洛伯格重工業的結晶，體型龐大的採礦與防禦機兵。',
    skillLore: '【召喚指令】：召喚多個自爆蜘蛛；【全體嘲諷】：強制攻擊自身。',
    level: 35, hp: 6000, maxHp: 6000, atk: 300, def: 150, spd: 80,
    element: 'Physical', weaknesses: ['Fire', 'Ice', 'Lightning'],
    dropTable: [{ itemId: 'ice_crystal', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'cocolia',
    name: '可可利亞 (BOSS)',
    regionId: 'jarilo_vi',
    lore: '第十八任大守護者，為了拯救貝洛伯格而與星核簽訂了契約，最終被虛妄的願望吞噬。',
    skillLore: '【創世絕響】：引導星核之力，召喚無盡的暴風雪與冰槍，凍結一切反抗者。',
    level: 60, hp: 25000, maxHp: 25000, atk: 600, def: 250, spd: 120,
    element: 'Ice', weaknesses: ['Fire', 'Lightning', 'Quantum'],
    dropTable: [{ itemId: 'ice_crystal', chance: 1.0, min: 10, max: 20 }]
  },

  // --- HSR: Xianzhou Luofu ---
  {
    id: 'mara_struck_soldier',
    name: '魔陰身士卒',
    regionId: 'xianzhou',
    lore: '墮入魔陰身的雲騎軍士兵，雖然失去了理智，但戰鬥本能猶在。',
    skillLore: '【重生】：被擊敗後會復活一次，並回復部分生命。',
    level: 20, hp: 1500, maxHp: 1500, atk: 150, def: 80, spd: 95,
    element: 'Wind', weaknesses: ['Fire', 'Ice', 'Quantum'],
    dropTable: [{ itemId: 'thunder_prism', chance: 0.7, min: 1, max: 3 }]
  },
  {
    id: 'mara_struck_ballistarius',
    name: '魔陰身・器元士',
    regionId: 'xianzhou',
    lore: '身體與兵器融合的魔陰身怪物，能夠在遠處發射致命的氣勁。',
    skillLore: '【連鎖射擊】：對隨機目標造成多次風屬性傷害。',
    level: 35, hp: 5000, maxHp: 5000, atk: 280, def: 100, spd: 100,
    element: 'Wind', weaknesses: ['Ice', 'Physics', 'Wind'],
    dropTable: [{ itemId: 'thunder_prism', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'aurumaton_spectral_envoy',
    name: '金人・勾魂使',
    regionId: 'xianzhou',
    lore: '負責看守幽囚獄的金人，裝備了特殊的震盪裝置，能讓犯人失去反抗能力。',
    skillLore: '【強烈震盪】：使目標陷入眩暈狀態，且無法行動。',
    level: 42, hp: 8500, maxHp: 8500, atk: 380, def: 180, spd: 105,
    element: 'Physical', weaknesses: ['Physical', 'Lightning', 'Imaginary'],
    dropTable: [{ itemId: 'thunder_prism', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'shape_shifter',
    name: '藥王秘傳・煉形者',
    regionId: 'xianzhou',
    lore: '追求豐饒神蹟的狂熱信徒，能夠通過秘法喚醒體內的野獸之力。',
    skillLore: '【擊中回復】：攻擊造成傷害時，回復自身生命值；【召喚魔陰】：召喚士卒助戰。',
    level: 45, hp: 9000, maxHp: 9000, atk: 350, def: 150, spd: 110,
    element: 'Lightning', weaknesses: ['Ice', 'Wind', 'Imaginary'],
    dropTable: [{ itemId: 'thunder_prism', chance: 1.0, min: 5, max: 9 }]
  },
  {
    id: 'malefic_ape',
    name: '豐饒靈獸・長右',
    regionId: 'xianzhou',
    lore: '性情暴躁的巨猿，原本是瑞獸，被豐饒之力過度侵蝕後變得極具攻擊性。',
    skillLore: '【鎖定】：標記最近使用過戰技的角色，下回合對其發動毀滅性重擊。',
    level: 48, hp: 10000, maxHp: 10000, atk: 450, def: 120, spd: 100,
    element: 'Wind', weaknesses: ['Fire', 'Ice', 'Wind'],
    dropTable: [{ itemId: 'thunder_prism', chance: 1.0, min: 5, max: 9 }]
  },
  {
    id: 'aurumaton_gatekeeper',
    name: '金人司閽',
    regionId: 'xianzhou',
    lore: '鎮守金人巷與工造司的巨大金人，進入懲戒模式後無人能擋。',
    skillLore: '【懲戒模式】：積累懲戒值，滿後進入狂暴，召喚金魚並大幅降低受到傷害。',
    level: 40, hp: 8000, maxHp: 8000, atk: 350, def: 200, spd: 100,
    element: 'Imaginary', weaknesses: ['Lightning', 'Wind', 'Quantum'],
    dropTable: [{ itemId: 'thunder_prism', chance: 1.0, min: 4, max: 8 }]
  },
  {
    id: 'abundance_deer',
    name: '豐饒玄鹿 (BOSS)',
    regionId: 'xianzhou',
    lore: '建木殘枝化生的靈獸，擁有近乎無限的生命力，是豐饒孽物的頂點。',
    skillLore: '【斑龍觸角】：召喚四種不同功能的樹枝（回復、反擊、控制、增益）；【生生不息】：巨額群體回復。',
    level: 65, hp: 30000, maxHp: 30000, atk: 550, def: 300, spd: 110,
    element: 'Wind', weaknesses: ['Fire', 'Ice', 'Quantum'],
    dropTable: [{ itemId: 'thunder_prism', chance: 1.0, min: 15, max: 25 }]
  },

  // --- HSR: Penacony ---
  {
    id: 'dream_jolt_troupe',
    name: '驚夢劇團・圓幕先生',
    regionId: 'penacony',
    lore: '夢境中常見的服務機械，有時候會因為故障或被駭入而攻擊客人。',
    skillLore: '【驚嚇箱】：切換為驚嚇模式，造成群體精神傷害。',
    level: 30, hp: 2000, maxHp: 2000, atk: 200, def: 100, spd: 100,
    element: 'Fire', weaknesses: ['Ice', 'Lightning', 'Imaginary'],
    dropTable: [{ itemId: 'dream_fluid', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'dream_jolt_bubble',
    name: '驚夢劇團・氣泡犬',
    regionId: 'penacony',
    lore: '肚子裡裝滿了蘇樂達的機械犬，爆炸時會產生黏糊糊的麻煩。',
    skillLore: '【蘇樂達噴射】：造成物理傷害並降低目標速度。',
    level: 32, hp: 2500, maxHp: 2500, atk: 220, def: 80, spd: 110,
    element: 'Physical', weaknesses: ['Wind', 'Physical', 'Lightning'],
    dropTable: [{ itemId: 'dream_fluid', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'sweet_gorilla',
    name: '驚夢劇團・甜猿泰山',
    regionId: 'penacony',
    lore: '巨大的猩猩玩偶，原本是為了派對助興，現在卻成了危險的保鑣。',
    skillLore: '【汽水護盾】：為自己施加護盾，被擊破後會對攻擊者造成反傷。',
    level: 45, hp: 10000, maxHp: 10000, atk: 450, def: 200, spd: 90,
    element: 'Ice', weaknesses: ['Fire', 'Physical', 'Lightning'],
    dropTable: [{ itemId: 'dream_fluid', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'shell_of_faded_rage',
    name: '往日之影的雷殼',
    regionId: 'penacony',
    lore: '憶域深處的殘影，具象化了過去守護者的憤怒與雷霆之力。',
    skillLore: '【守備度】：每回合增加層數，大幅降低受到的傷害，擊破弱點可清除。',
    level: 50, hp: 12000, maxHp: 12000, atk: 400, def: 250, spd: 95,
    element: 'Lightning', weaknesses: ['Quantum', 'Ice', 'Imaginary'],
    dropTable: [{ itemId: 'dream_fluid', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'beyond_overcooked',
    name: '驚夢劇團・過分烹調',
    regionId: 'penacony',
    lore: '暴走的恐龍廚師機械，對食材（和客人）進行過度的炙烤。',
    skillLore: '【點火】：為武器充能，下一次攻擊將造成大量火屬性持續傷害。',
    level: 48, hp: 11000, maxHp: 11000, atk: 420, def: 180, spd: 120,
    element: 'Fire', weaknesses: ['Fire', 'Lightning', 'Wind'],
    dropTable: [{ itemId: 'dream_fluid', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'something_unto_death',
    name: '何物朝向死亡 (BOSS)',
    regionId: 'penacony',
    lore: '潛伏在憶域最深處的恐怖迷因，象徵著無法逃避的終結。',
    skillLore: '【死線逼近】：標記目標，數回合後強制其陷入「夢死」狀態（無法行動且視為死亡），需打破墓碑解救。',
    level: 70, hp: 35000, maxHp: 35000, atk: 700, def: 300, spd: 130,
    element: 'Quantum', weaknesses: ['Fire', 'Wind', 'Imaginary'],
    dropTable: [{ itemId: 'dream_fluid', chance: 1.0, min: 20, max: 30 }]
  },

  // --- HSR: Amphoreus ---
  {
    id: 'chrono_construct',
    name: '恆時構造體',
    regionId: 'amphoreus',
    lore: '翁法羅斯古文明的遺產，用於維護時間神殿的自動機械。',
    skillLore: '利用時間差進行快速連擊。',
    level: 40, hp: 3000, maxHp: 3000, atk: 250, def: 150, spd: 110,
    element: 'Imaginary', weaknesses: ['Quantum', 'Lightning', 'Physical'],
    dropTable: [{ itemId: 'chronos_sand', chance: 0.9, min: 2, max: 5 }]
  },
  {
    id: 'chrono_sniper',
    name: '恆時狙擊手',
    regionId: 'amphoreus',
    lore: '能夠從時間縫隙中發動攻擊的遠程單位，防不勝防。',
    skillLore: '【時間鎖定】：極高概率禁錮目標。',
    level: 45, hp: 6000, maxHp: 6000, atk: 400, def: 100, spd: 130,
    element: 'Quantum', weaknesses: ['Physical', 'Fire', 'Imaginary'],
    dropTable: [{ itemId: 'chronos_sand', chance: 1.0, min: 4, max: 7 }]
  },
  {
    id: 'chrono_golem',
    name: '恆時巨像',
    regionId: 'amphoreus',
    lore: '巨大的石像守衛，體內流動著時間之沙。',
    skillLore: '【震盪波】：造成全體物理傷害並推條。',
    level: 55, hp: 15000, maxHp: 15000, atk: 500, def: 300, spd: 80,
    element: 'Physical', weaknesses: ['Quantum', 'Fire', 'Imaginary'],
    dropTable: [{ itemId: 'chronos_sand', chance: 1.0, min: 8, max: 12 }]
  },
  {
    id: 'titan_of_time',
    name: '時間泰坦 (BOSS)',
    regionId: 'amphoreus',
    lore: '時間長河的具象化，其實體存在於過去、現在與未來。',
    skillLore: '【時光倒流】：回復自身狀態至上一回合；【時間加速】：使自身立即獲得額外回合。',
    level: 80, hp: 50000, maxHp: 50000, atk: 800, def: 400, spd: 140,
    element: 'Imaginary', weaknesses: ['Quantum', 'Fire', 'Physical'],
    dropTable: [{ itemId: 'chronos_sand', chance: 1.0, min: 30, max: 50 }]
  },

  // --- Genshin: Mondstadt ---
  {
    id: 'hilichurl_fighter',
    name: '丘丘人打手',
    regionId: 'mondstadt',
    lore: '提瓦特大陸常見的魔物，智力低下但數量眾多。',
    skillLore: '揮舞木棒進行攻擊。',
    level: 5, hp: 500, maxHp: 500, atk: 60, def: 20, spd: 100,
    element: 'Physical', weaknesses: ['Fire', 'Wind', 'Physical'],
    dropTable: [{ itemId: 'wind_aster', chance: 0.5, min: 1, max: 2 }]
  },
  {
    id: 'hilichurl_shooter',
    name: '丘丘人射手',
    regionId: 'mondstadt',
    lore: '手持簡易弩機的丘丘人，喜歡在遠處騷擾。',
    skillLore: '射出普通箭矢。',
    level: 10, hp: 400, maxHp: 400, atk: 80, def: 10, spd: 110,
    element: 'Physical', weaknesses: ['Physical', 'Wind'],
    dropTable: [{ itemId: 'wind_aster', chance: 0.5, min: 1, max: 2 }]
  },
  {
    id: 'wooden_shield_mitachurl',
    name: '木盾暴徒',
    regionId: 'mondstadt',
    lore: '體格健壯的丘丘人，手持巨大的木盾，能格擋大部分正面攻擊。',
    skillLore: '【衝撞】：舉盾衝向目標；【防禦姿態】：大幅降低受到的傷害，火元素可燒毀木盾。',
    level: 20, hp: 3000, maxHp: 3000, atk: 150, def: 100, spd: 90,
    element: 'Physical', weaknesses: ['Fire', 'Wind'],
    dropTable: [{ itemId: 'wind_aster', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'abyss_mage_pyro',
    name: '火深淵法師',
    regionId: 'mondstadt',
    lore: '來自深淵教團的魔物，操控火元素，常伴隨著詭異的咒語。',
    skillLore: '【火元素護盾】：免疫大部分傷害，直至護盾被水元素擊破。',
    level: 30, hp: 2500, maxHp: 2500, atk: 200, def: 50, spd: 100,
    element: 'Fire', weaknesses: ['Hydro', 'Electro', 'Ice'],
    dropTable: [{ itemId: 'wind_aster', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'eye_of_the_storm',
    name: '狂風之核',
    regionId: 'mondstadt',
    lore: '高濃度的風元素沉積而成的球體，不知疲倦地掀起風暴。',
    skillLore: '【風壓】：在高空積蓄風力，隨後墜落造成範圍傷害。',
    level: 25, hp: 3500, maxHp: 3500, atk: 180, def: 50, spd: 130,
    element: 'Wind', weaknesses: ['Fire', 'Ice', 'Physical'],
    dropTable: [{ itemId: 'wind_aster', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'cryo_regisvine',
    name: '急凍樹',
    regionId: 'mondstadt',
    lore: '因汲取了地脈中寒冷的冰霧能量而生長成巨型的藤蔓魔物。',
    skillLore: '【極寒射線】：360度旋轉噴射冰凍射線；【核心弱點】：擊破根部核心可使其癱瘓。',
    level: 30, hp: 5000, maxHp: 5000, atk: 250, def: 100, spd: 80,
    element: 'Ice', weaknesses: ['Fire', 'Lightning', 'Physical'],
    dropTable: [{ itemId: 'wind_aster', chance: 1.0, min: 4, max: 7 }]
  },
  {
    id: 'ruin_guard',
    name: '遺跡守衛',
    regionId: 'mondstadt',
    lore: '古老文明遺留的戰爭機械，被當地人稱為「獨眼小寶」。',
    skillLore: '【大風車】：旋轉雙臂進行持續追擊；【飛彈】：發射追蹤飛彈。',
    level: 20, hp: 3000, maxHp: 3000, atk: 200, def: 150, spd: 70,
    element: 'Physical', weaknesses: ['Lightning', 'Ice', 'Hydro'],
    dropTable: [{ itemId: 'wind_aster', chance: 1.0, min: 3, max: 5 }]
  },
  {
    id: 'dvalin',
    name: '風魔龍 (BOSS)',
    regionId: 'mondstadt',
    lore: '東風之龍特瓦林，曾是蒙德的四風守護之一，現被毒血折磨。',
    skillLore: '【終天閉幕曲】：使平台崩塌，造成持續風元素傷害；【風龍吐息】：掃射整個戰場。',
    level: 50, hp: 20000, maxHp: 20000, atk: 500, def: 200, spd: 110,
    element: 'Wind', weaknesses: ['Fire', 'Ice', 'Lightning'],
    dropTable: [{ itemId: 'wind_aster', chance: 1.0, min: 10, max: 20 }]
  },

  // --- Genshin: Liyue ---
  {
    id: 'treasure_hoarder',
    name: '盜寶團・拳術家',
    regionId: 'liyue',
    lore: '活躍在璃月各地的犯罪組織成員，為了財寶不擇手段。',
    skillLore: '基礎格鬥術，有時會撒石灰致盲。',
    level: 15, hp: 1000, maxHp: 1000, atk: 100, def: 50, spd: 105,
    element: 'Physical', weaknesses: ['Physical', 'Fire', 'Ice'],
    dropTable: [{ itemId: 'geo_statue', chance: 0.6, min: 1, max: 3 }]
  },
  {
    id: 'fatui_pyro_agent',
    name: '愚人眾・火之債務處理人',
    regionId: 'liyue',
    lore: '愚人眾的精英特務，負責回收債務與清算異己。',
    skillLore: '【隱身】：進入不可見狀態；【獵殺祭刀】：高爆發的突刺攻擊。',
    level: 30, hp: 4000, maxHp: 4000, atk: 300, def: 80, spd: 130,
    element: 'Fire', weaknesses: ['Ice', 'Hydro', 'Lightning'],
    dropTable: [{ itemId: 'geo_statue', chance: 1.0, min: 3, max: 6 }]
  },
  {
    id: 'ruin_hunter',
    name: '遺跡獵者',
    regionId: 'liyue',
    lore: '比遺跡守衛更危險的浮空戰鬥機械，放棄了防禦換取極致的攻擊。',
    skillLore: '【空中轟炸】：升空並投擲大量炸彈，弱點位於眼睛。',
    level: 40, hp: 6000, maxHp: 6000, atk: 450, def: 120, spd: 120,
    element: 'Physical', weaknesses: ['Lightning', 'Hydro', 'Ice'],
    dropTable: [{ itemId: 'geo_statue', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'stonehide_lawachurl',
    name: '丘丘岩盔王',
    regionId: 'liyue',
    lore: '丘丘人中的王者，身體如岩石般堅硬。',
    skillLore: '【魔化】：生成岩元素護盾，大幅提升攻擊與防禦，直至護盾被破。',
    level: 40, hp: 8000, maxHp: 8000, atk: 400, def: 300, spd: 90,
    element: 'Imaginary', weaknesses: ['Physical', 'Ice', 'Fire'],
    dropTable: [{ itemId: 'geo_statue', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'pyro_regisvine',
    name: '爆炎樹',
    regionId: 'liyue',
    lore: '吸收了地脈中熾熱能量的巨大藤蔓，永不熄滅的火焰。',
    skillLore: '【地獄火】：噴射持續燃燒的火種；【頭槌】：用巨大的花冠砸擊地面。',
    level: 35, hp: 6000, maxHp: 6000, atk: 350, def: 100, spd: 80,
    element: 'Fire', weaknesses: ['Ice', 'Hydro', 'Physical'],
    dropTable: [{ itemId: 'geo_statue', chance: 1.0, min: 4, max: 7 }]
  },
  {
    id: 'geovishap',
    name: '岩龍蜥',
    regionId: 'liyue',
    lore: '成年的岩龍蜥，表皮會隨著環境元素發生變化。',
    skillLore: '【元素吐息】：噴吐當前附著屬性的元素能量；【翻滾】：高速衝撞。',
    level: 35, hp: 6000, maxHp: 6000, atk: 300, def: 200, spd: 90,
    element: 'Imaginary', weaknesses: ['Ice', 'Hydro', 'Physical'],
    dropTable: [{ itemId: 'geo_statue', chance: 1.0, min: 4, max: 7 }]
  },
  {
    id: 'azhdaha',
    name: '若陀龍王 (BOSS)',
    regionId: 'liyue',
    lore: '被摩拉克斯封印的岩龍之王，擁有撼動山嶽的力量。',
    skillLore: '【元素轉換】：隨戰鬥進程切換水/火/冰/雷屬性；【地震波】：全場持續AOE。',
    level: 70, hp: 40000, maxHp: 40000, atk: 800, def: 400, spd: 80,
    element: 'Imaginary', weaknesses: ['Ice', 'Hydro', 'Fire', 'Lightning'],
    dropTable: [{ itemId: 'geo_statue', chance: 1.0, min: 20, max: 30 }]
  },

  // --- Genshin: Inazuma ---
  {
    id: 'nobushi',
    name: '野伏・機巧番',
    regionId: 'inazuma',
    lore: '落草為寇的流浪武士，劍術精湛但唯利是圖。',
    skillLore: '【拔刀斬】：快速居合斬；【煙霧彈】：干擾視線。',
    level: 25, hp: 1800, maxHp: 1800, atk: 180, def: 80, spd: 110,
    element: 'Lightning', weaknesses: ['Physical', 'Fire', 'Wind'],
    dropTable: [{ itemId: 'electro_sigil', chance: 0.7, min: 1, max: 3 }]
  },
  {
    id: 'kairagi_thunder',
    name: '海亂鬼・雷騰',
    regionId: 'inazuma',
    lore: '將雷元素符紙貼在刀上的墮落武士。',
    skillLore: '【雷刃】：附魔攻擊，若夥伴死亡會進入狂暴回復狀態。',
    level: 35, hp: 5000, maxHp: 5000, atk: 350, def: 120, spd: 100,
    element: 'Lightning', weaknesses: ['Fire', 'Ice', 'Wind'],
    dropTable: [{ itemId: 'electro_sigil', chance: 1.0, min: 3, max: 6 }]
  },
  {
    id: 'kairagi_fire',
    name: '海亂鬼・炎威',
    regionId: 'inazuma',
    lore: '將火元素符紙貼在刀上的墮落武士。',
    skillLore: '【炎刃】：附魔攻擊，若夥伴死亡會進入狂暴回復狀態。',
    level: 35, hp: 5000, maxHp: 5000, atk: 350, def: 120, spd: 100,
    element: 'Fire', weaknesses: ['Hydro', 'Ice', 'Lightning'],
    dropTable: [{ itemId: 'electro_sigil', chance: 1.0, min: 3, max: 6 }]
  },
  {
    id: 'maguu_kenki_mini',
    name: '魔偶劍鬼',
    regionId: 'inazuma',
    lore: '來自異國的人形機關，據說其劍術能斬斷風雪。',
    skillLore: '【幻影斬】：召喚風/冰幻影進行協同攻擊；【格擋】：免疫遠程傷害。',
    level: 45, hp: 9000, maxHp: 9000, atk: 450, def: 200, spd: 100,
    element: 'Wind', weaknesses: ['Physical', 'Fire', 'Ice'],
    dropTable: [{ itemId: 'electro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'thunder_manifestation_mini',
    name: '雷音權現',
    regionId: 'inazuma',
    lore: '雷元素憤怒的具象化，只存在於雷暴最猛烈的地方。',
    skillLore: '【雷針鎖定】：標記目標後進行不死不休的追蹤轟炸。',
    level: 42, hp: 8500, maxHp: 8500, atk: 400, def: 150, spd: 130,
    element: 'Lightning', weaknesses: ['Fire', 'Ice', 'Wind'],
    dropTable: [{ itemId: 'electro_sigil', chance: 1.0, min: 5, max: 9 }]
  },
  {
    id: 'mirror_maiden',
    name: '藏鏡仕女',
    regionId: 'inazuma',
    lore: '愚人眾的冬國仕女，操控水鏡進行優雅而致命的戰鬥。',
    skillLore: '【水鏡束縛】：禁錮目標使其無法移動，並增加受到的水元素傷害。',
    level: 40, hp: 7000, maxHp: 7000, atk: 350, def: 150, spd: 100,
    element: 'Ice', weaknesses: ['Lightning', 'Fire', 'Physical'],
    dropTable: [{ itemId: 'electro_sigil', chance: 1.0, min: 4, max: 8 }]
  },
  {
    id: 'raiden_shogun_boss',
    name: '雷電將軍 (BOSS)',
    regionId: 'inazuma',
    lore: '禍津御建鳴神命，雷電將軍的人偶在意識空間中的戰鬥形態。',
    skillLore: '【無想之一刀】：必殺技，斬斷空間，無視防禦，並削減全隊能量。',
    level: 80, hp: 50000, maxHp: 50000, atk: 900, def: 350, spd: 130,
    element: 'Lightning', weaknesses: ['Fire', 'Ice', 'Wind'],
    dropTable: [{ itemId: 'electro_sigil', chance: 1.0, min: 25, max: 40 }]
  },

  // --- Genshin: Sumeru ---
  {
    id: 'fungi_dendro',
    name: '蕈獸・草',
    regionId: 'sumeru',
    lore: '須彌雨林中常見的孢子生物，雖然可愛但會群起攻之。',
    skillLore: '散播孢子雲。',
    level: 30, hp: 2000, maxHp: 2000, atk: 150, def: 60, spd: 100,
    element: 'Wind', weaknesses: ['Fire', 'Lightning', 'Ice'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'eremite_axe',
    name: '鍍金旅團・沙中淨水',
    regionId: 'sumeru',
    lore: '來自沙漠的傭兵，舞動雙刃戰斧如同舞蹈。',
    skillLore: '【水舞】：連續的旋轉攻擊，附帶水元素傷害。',
    level: 32, hp: 2200, maxHp: 2200, atk: 180, def: 70, spd: 105,
    element: 'Physical', weaknesses: ['Physical', 'Ice'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'ruin_grader',
    name: '遺跡重機',
    regionId: 'sumeru',
    lore: '比遺跡守衛更為巨大的工程機械，雙腳的弱點使其容易被癱瘓。',
    skillLore: '【衝撞】：全身發出激光並向前衝鋒；【雷射眼】：眼部發射高能激光。',
    level: 50, hp: 12000, maxHp: 12000, atk: 500, def: 250, spd: 60,
    element: 'Physical', weaknesses: ['Lightning', 'Ice', 'Hydro'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'ruin_drake',
    name: '遺跡龍獸・地巡',
    regionId: 'sumeru',
    lore: '模仿龍類生物製造的古老戰爭兵器，具有極強的適應性。',
    skillLore: '【能量洪流】：根據受到的主要傷害類型，提升對應抗性並釋放洪流。',
    level: 45, hp: 9000, maxHp: 9000, atk: 380, def: 220, spd: 90,
    element: 'Physical', weaknesses: ['Fire', 'Lightning', 'Ice'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'electro_regisvine',
    name: '掣電樹',
    regionId: 'sumeru',
    lore: '深埋地底的雷元素植物，因地脈異常而現身。',
    skillLore: '【電荷轉移】：在根部與花冠之間轉移核心，釋放高壓電流。',
    level: 42, hp: 8000, maxHp: 8000, atk: 350, def: 150, spd: 95,
    element: 'Lightning', weaknesses: ['Fire', 'Ice', 'Wind'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'eremite_vanguard',
    name: '鍍金旅團・魔岩役使',
    regionId: 'sumeru',
    lore: '能夠召喚岩之魔蜥厄靈的精英傭兵，防禦力驚人。',
    skillLore: '【召喚厄靈】：召喚後進入魔化狀態，抗性大幅提升，需擊敗厄靈解除。',
    level: 45, hp: 8500, maxHp: 8500, atk: 400, def: 180, spd: 95,
    element: 'Imaginary', weaknesses: ['Physical', 'Ice', 'Fire'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 1.0, min: 5, max: 9 }]
  },
  {
    id: 'jadeplume_terrorshroom',
    name: '翠翎恐蕈 (BOSS)',
    regionId: 'sumeru',
    lore: '蕈獸之王，經過漫長歲月進化出了類似鳥類的外形。',
    skillLore: '【活性化】：受雷元素激化後進入狂暴，攻擊頻率極高；【燃燒】：受火元素攻擊會召喚小蕈獸。',
    level: 75, hp: 42000, maxHp: 42000, atk: 750, def: 250, spd: 115,
    element: 'Wind', weaknesses: ['Fire', 'Lightning'],
    dropTable: [{ itemId: 'dendro_sigil', chance: 1.0, min: 20, max: 35 }]
  },

  // --- Genshin: Fontaine ---
  {
    id: 'meka_clockwork',
    name: '發條機關',
    regionId: 'fontaine',
    lore: '楓丹科學院研發的警衛機械，雖然笨重但忠實執行命令。',
    skillLore: '物理衝擊。',
    level: 35, hp: 2500, maxHp: 2500, atk: 200, def: 120, spd: 90,
    element: 'Physical', weaknesses: ['Lightning', 'Ice', 'Fire'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'meka_geological',
    name: '機關・地質勘探型',
    regionId: 'fontaine',
    lore: '原本用於挖礦的機械，鑽頭能輕易粉碎岩石（和骨頭）。',
    skillLore: '【岩石粉碎】：強力物理攻擊，對護盾造成額外傷害。',
    level: 38, hp: 2800, maxHp: 2800, atk: 220, def: 130, spd: 85,
    element: 'Physical', weaknesses: ['Ice', 'Fire'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'tainted_hydro_phantasm',
    name: '濁水幻靈・噴吐',
    regionId: 'fontaine',
    lore: '原始胎海之水洩漏後誕生的元素生物，極具侵略性。',
    skillLore: '【高壓水流】：持續噴射水柱，無法被凍結。',
    level: 52, hp: 11000, maxHp: 11000, atk: 450, def: 180, spd: 100,
    element: 'Ice', weaknesses: ['Lightning', 'Fire', 'Wind'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'construction_mek',
    name: '建造特化型機關',
    regionId: 'fontaine',
    lore: '巨型工程機械，裝備了冰元素或火元素的核心。',
    skillLore: '【元素重擊】：附帶元素傷害的重拳。',
    level: 48, hp: 10000, maxHp: 10000, atk: 400, def: 300, spd: 80,
    element: 'Ice', weaknesses: ['Fire', 'Lightning', 'Physical'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'breacher_primus',
    name: '隙境原體',
    regionId: 'fontaine',
    lore: '來自深淵邊界的異界生物，能與元素共鳴生成護盾。',
    skillLore: '【激化護盾】：生成對應元素的護盾，此時十分堅硬，需用荒芒屬性或對應元素反應擊破。',
    level: 50, hp: 11000, maxHp: 11000, atk: 450, def: 100, spd: 110,
    element: 'Wind', weaknesses: ['Quantum', 'Ice', 'Lightning'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'phantasm_water',
    name: '濁水幻靈',
    regionId: 'fontaine',
    lore: '純水精靈的變異體，失去了純淨與理智。',
    skillLore: '【狂暴】：生命值降低後攻擊頻率大幅提升。',
    level: 50, hp: 10000, maxHp: 10000, atk: 500, def: 200, spd: 105,
    element: 'Ice', weaknesses: ['Lightning', 'Fire', 'Wind'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'narwhal',
    name: '吞星之鯨 (BOSS)',
    regionId: 'fontaine',
    lore: '來自群星深處的巨獸，遊弋在原始胎海中，以星球的能量為食。',
    skillLore: '【巨鯨吞噬】：將我方角色吞入腹中，需在內部造成足夠傷害方可逃脫；【胎海降臨】：全屏水流衝擊。',
    level: 85, hp: 60000, maxHp: 60000, atk: 1000, def: 400, spd: 120,
    element: 'Quantum', weaknesses: ['Lightning', 'Wind', 'Imaginary'],
    dropTable: [{ itemId: 'hydro_sigil', chance: 1.0, min: 30, max: 50 }]
  },

  // --- Genshin: Natlan ---
  {
    id: 'saurian_pyro',
    name: '熔岩龍蜥',
    regionId: 'natlan',
    lore: '納塔火山區域特有的龍蜥，能夠在岩漿中游泳。',
    skillLore: '【岩漿噴吐】：噴出高溫熔岩。',
    level: 40, hp: 3500, maxHp: 3500, atk: 300, def: 150, spd: 100,
    element: 'Fire', weaknesses: ['Ice', 'Hydro', 'Lightning'], 
    dropTable: [{ itemId: 'pyro_sigil', chance: 0.8, min: 2, max: 5 }]
  },
  {
    id: 'warrior_natlan',
    name: '納塔戰士',
    regionId: 'natlan',
    lore: '崇尚武力的納塔部族戰士，即使赤手空拳也極具威脅。',
    skillLore: '近身格鬥。',
    level: 40, hp: 3000, maxHp: 3000, atk: 280, def: 100, spd: 110,
    element: 'Physical', weaknesses: ['Ice', 'Wind'],
    dropTable: [{ itemId: 'pyro_sigil', chance: 0.8, min: 2, max: 4 }]
  },
  {
    id: 'tribal_warrior_champion',
    name: '部族勇士・冠軍',
    regionId: 'natlan',
    lore: '在競技場中百戰百勝的勇士，手持黑曜石大劍。',
    skillLore: '【戰吼】：提升自身攻擊力；【裂地擊】：大劍重擊地面造成範圍傷害。',
    level: 55, hp: 13000, maxHp: 13000, atk: 550, def: 200, spd: 120,
    element: 'Fire', weaknesses: ['Ice', 'Hydro'],
    dropTable: [{ itemId: 'pyro_sigil', chance: 1.0, min: 7, max: 11 }]
  },
  {
    id: 'koholasaurus_elite',
    name: '流泉龍蜥・波濤',
    regionId: 'natlan',
    lore: '生活在溫泉區域的龍蜥，動作靈活如水。',
    skillLore: '【衝浪】：快速接近目標並擊飛。',
    level: 50, hp: 12000, maxHp: 12000, atk: 400, def: 200, spd: 110,
    element: 'Ice', weaknesses: ['Lightning', 'Fire', 'Physical'],
    dropTable: [{ itemId: 'pyro_sigil', chance: 1.0, min: 6, max: 10 }]
  },
  {
    id: 'wayob_manifestation',
    name: '華夜之形',
    regionId: 'natlan',
    lore: '夜神之國的守門人，由黑曜石與靈魂之火構成。',
    skillLore: '【能量護盾】：吸收元素傷害並反彈。',
    level: 55, hp: 14000, maxHp: 14000, atk: 500, def: 100, spd: 120,
    element: 'Imaginary', weaknesses: ['Ice', 'Fire', 'Quantum'],
    dropTable: [{ itemId: 'pyro_sigil', chance: 1.0, min: 8, max: 12 }]
  },
  {
    id: 'capitano_shadow',
    name: '隊長的幻影 (BOSS)',
    regionId: 'natlan',
    lore: '愚人眾第一席執行官的力量投影，擁有凡人無法企及的絕對力量。',
    skillLore: '【榮譽決鬥】：鎖定一名目標進行單挑，其他角色無法干涉；【深淵之力】：釋放漆黑的能量波。',
    level: 90, hp: 70000, maxHp: 70000, atk: 1200, def: 500, spd: 150,
    element: 'Ice', weaknesses: ['Fire', 'Physical', 'Lightning'],
    dropTable: [{ itemId: 'pyro_sigil', chance: 1.0, min: 40, max: 60 }]
  },

  // --- Genshin: Snezhnaya ---
  {
    id: 'fatui_skirmisher',
    name: '愚人眾・先遣隊',
    regionId: 'snezhnaya',
    lore: '裝備了至冬國先進元素武器的士兵。',
    skillLore: '【元素增幅】：開啟元素護盾，大幅提升攻防。',
    level: 45, hp: 4000, maxHp: 4000, atk: 350, def: 200, spd: 95,
    element: 'Ice', weaknesses: ['Fire', 'Lightning', 'Physical'],
    dropTable: [{ itemId: 'cryo_sigil', chance: 0.9, min: 3, max: 6 }]
  },
  {
    id: 'fatui_electrohammer',
    name: '愚人眾・雷錘',
    regionId: 'snezhnaya',
    lore: '愚人眾的重裝先鋒，手持巨大的雷元素戰錘。',
    skillLore: '【雷錘充能】：開啟雷盾後極具攻擊性，需用冰元素破盾。',
    level: 50, hp: 9000, maxHp: 9000, atk: 400, def: 250, spd: 90,
    element: 'Lightning', weaknesses: ['Ice', 'Fire'],
    dropTable: [{ itemId: 'cryo_sigil', chance: 1.0, min: 5, max: 8 }]
  },
  {
    id: 'frost_operative',
    name: '愚人眾・霜役人',
    regionId: 'snezhnaya',
    lore: '處理髒活的特務，擅長使用冰元素進行刺殺。',
    skillLore: '【生命之契】：攻擊會施加生命之契，使目標無法接受治療並持續流血。',
    level: 55, hp: 13000, maxHp: 13000, atk: 500, def: 150, spd: 130,
    element: 'Ice', weaknesses: ['Fire', 'Physical', 'Quantum'],
    dropTable: [{ itemId: 'cryo_sigil', chance: 1.0, min: 8, max: 12 }]
  },
  {
    id: 'tsaritsa_guard',
    name: '女皇親衛',
    regionId: 'snezhnaya',
    lore: '直接效忠於冰之女皇的皇家衛隊，裝備了最頂尖的冰元素裝甲。',
    skillLore: '【絕對零度】：製造極寒領域，使我不斷損失生命值；【防禦反擊】：格擋一切正面攻擊。',
    level: 60, hp: 15000, maxHp: 15000, atk: 600, def: 300, spd: 110,
    element: 'Ice', weaknesses: ['Fire', 'Quantum', 'Lightning'],
    dropTable: [{ itemId: 'cryo_sigil', chance: 1.0, min: 8, max: 15 }]
  }
];