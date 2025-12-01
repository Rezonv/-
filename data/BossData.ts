

export interface BossTacticsInfo {
    name: string;
    title: string;
    threatLevel: 'EXTREME' | 'HIGH' | 'MEDIUM';
    description: string;
    keyMechanics: string[];
}

export const BossInfoRegistry: Record<string, BossTacticsInfo> = {
    // --- HSR BOSS ---
    'doomsday_beast': {
        name: '末日獸',
        title: '反物質軍團 • 星球毀滅者',
        threatLevel: 'EXTREME',
        description: '由反物質軍團利用古老巨獸遺骸改造而成的戰爭兵器。擁有多個核心，能夠釋放毀滅性的量子波動。',
        keyMechanics: [
            '【毀滅前兆】：血量低於 50% 時開始蓄力，務必在下一回合前擊破弱點或開啟護盾。',
            '【多重核心】：具備群體攻擊能力，建議攜帶群補角色（如靈砂、娜塔莎）。'
        ]
    },
    'cocolia': {
        name: '可可利亞',
        title: '大守護者 • 虛妄之母',
        threatLevel: 'HIGH',
        description: '被星核蠱惑的貝洛伯格守護者，能夠操控絕對零度的冰霜與無盡的風雪。',
        keyMechanics: [
            '【絕對零度】：高機率凍結我方單位，需要解控角色（如靈砂、布洛妮婭）。',
            '【冰槍召喚】：會召喚冰鋒協助攻擊，建議使用擴散或群體技能清理。'
        ]
    },
    'abundance_deer': {
        name: '豐饒玄鹿',
        title: '仙舟羅浮 • 建木之靈',
        threatLevel: 'HIGH',
        description: '建木生機所化的靈獸，擁有極強的自我修復能力，能夠召喚植物進行攻擊與防禦。',
        keyMechanics: [
            '【生生不息】：血量過低時會大量回復生命，必須集中火力輸出。',
            '【斑龍觸角】：召喚的樹枝具有多種妨害效果，優先擊破樹枝。'
        ]
    },
    'something_unto_death': {
        name: '何物朝向死亡',
        title: '匹諾康尼 • 憶域迷因',
        threatLevel: 'EXTREME',
        description: '潛伏在夢境深處的死亡陰影，能夠奪取角色的靈魂並將其囚禁。',
        keyMechanics: [
            '【靈魂囚禁】：會標記並囚禁我方角色，需要高頻攻擊或DoT來解救隊友。',
            '【即死威脅】：極高的單體爆發傷害，請保護好低血量角色。'
        ]
    },
    'titan_of_time': {
        name: '時間泰坦',
        title: '翁法羅斯 • 永恆之主',
        threatLevel: 'EXTREME',
        description: '掌控時間流動的古老巨神，能夠操控戰場的時間軸，使我方行動遲滯。',
        keyMechanics: [
            '【時間延遲】：會大幅推後我方行動條，需要加速角色（如艾絲妲、布洛妮婭）應對。',
            '【時光倒流】：可能回復至上一回合的狀態，戰鬥變數極大。'
        ]
    },

    // --- GENSHIN BOSS ---
    'dvalin': {
        name: '風魔龍',
        title: '蒙德 • 東風之龍',
        threatLevel: 'HIGH',
        description: '曾是四風守護之一，被毒血侵蝕而發狂。能夠釋放強烈的風元素吐息與終天閉幕曲。',
        keyMechanics: [
            '【終天閉幕曲】：使平台崩塌造成持續傷害，注意護盾覆蓋。',
            '【風蝕】：會施加持續傷害的風蝕狀態，建議速戰速決。'
        ]
    },
    'azhdaha': {
        name: '若陀龍王',
        title: '璃月 • 撼地之龍',
        threatLevel: 'EXTREME',
        description: '被磨損侵蝕的古老岩龍，能夠汲取地脈中的元素之力進行屬性轉換。',
        keyMechanics: [
            '【元素汲取】：會切換火、冰、雷、水等屬性，請準備多種屬性對策。',
            '【地震波】：造成全屏震盪傷害，護盾角色（如符玄、三月七、諾艾爾）至關重要。'
        ]
    },
    'raiden_shogun_boss': {
        name: '禍津御建鳴神命',
        title: '雷電將軍 • 永恆的守護者',
        threatLevel: 'EXTREME',
        description: '代行雷電將軍權能的人偶，在永恆的淨土中對抗一切「磨損」。擁有斬斷空間的武藝。',
        keyMechanics: [
            '【無想之一刀】：血量低於 60% 時釋放必殺，造成極高傷害並削減我方能量。',
            '【雷元素抗性】：極高的雷屬性抗性，建議使用火、冰或量子屬性攻略。'
        ]
    },
    'jadeplume_terrorshroom': {
        name: '翠翎恐蕈',
        title: '須彌 • 幽邃之主',
        threatLevel: 'HIGH',
        description: '經過漫長歲月演化的巨大蕈獸，具有高度的領地意識與攻擊性。',
        keyMechanics: [
            '【活性化】：受到雷元素攻擊會累積活性，進入狂暴狀態，攻擊頻率大幅提升。',
            '【燃燒】：受到火元素攻擊會燃燒，雖然會造成傷害但會召喚小蕈獸。'
        ]
    },
    'narwhal': {
        name: '吞星之鯨',
        title: '楓丹 • 來自群星之客',
        threatLevel: 'EXTREME',
        description: '遊弋於星海之間的巨獸，能夠吞噬一切物質與能量。',
        keyMechanics: [
            '【原始胎海】：會召喚大範圍的水元素攻擊，持續造成傷害。',
            '【巨鯨吞噬】：有概率吞噬我方角色，需要在體內造成足夠傷害才能逃脫。'
        ]
    },
    'capitano_shadow': {
        name: '隊長的幻影',
        title: '納塔 • 愚人眾執行官',
        threatLevel: 'EXTREME',
        description: '愚人眾執行官第一席「隊長」的力量投影，擁有凡人無法企及的武藝。',
        keyMechanics: [
            '【榮譽決鬥】：會鎖定單一目標進行連續猛攻，必須使用嘲諷或護盾保護該目標。',
            '【絕對力量】：攻擊力極高，不建議打持久戰。'
        ]
    },

    // --- ELITES (HSR) ---
    'void_ranger_distorter': { name: '反物質軍團・篡改者', title: 'Elite', threatLevel: 'MEDIUM', description: '能夠篡改空間座標的虛卒，會擾亂戰場。', keyMechanics: ['空間篡改', '遠程狙擊'] },
    'void_ranger_eliminator': { name: '反物質軍團・抹消者', title: 'Elite', threatLevel: 'MEDIUM', description: '手持能量雙刃的虛卒，攻擊頻率極快。', keyMechanics: ['連續斬擊', '殘血狂暴'] },
    'blaze_out_of_space': { name: '外宇宙之炎', title: 'Elite', threatLevel: 'HIGH', description: '來自外宇宙的燃燒生命體，能夠汲取熱量進行強化。', keyMechanics: ['汲取火焰', '群體灼燒'] },
    'void_ranger_trampler': { name: '踐踏者', title: 'Elite', threatLevel: 'MEDIUM', description: '反物質軍團的重型單位，四肢被重甲包裹。', keyMechanics: ['鎖定虛弱目標', '蓄力踐踏'] },
    'automaton_direwolf': { name: '自動機兵・齒狼', title: 'Elite', threatLevel: 'HIGH', description: '裝備了電鋸與鎖定系統的機械狼，擅長施加裂傷。', keyMechanics: ['鎖定目標', '高額裂傷'] },
    'guardian_shadow': { name: '守護者之影', title: 'Elite', threatLevel: 'HIGH', description: '裂界中誕生的守護者意志投影，能夠制定戰鬥規則。', keyMechanics: ['寧靜禁令：禁止普攻', '風暴懲罰'] },
    'frigid_prowler': { name: '興風者', title: 'Elite', threatLevel: 'MEDIUM', description: '遊蕩在裂界深處的飛行怪物，伴隨著極寒風暴。', keyMechanics: ['召喚冰造物', '吞噬強化'] },
    'automaton_grizzly': { name: '自動機兵・灰熊', title: 'Elite', threatLevel: 'MEDIUM', description: '重型工程機械，會召喚自爆蜘蛛。', keyMechanics: ['召喚蜘蛛', '群體嘲諷'] },
    'aurumaton_spectral_envoy': { name: '金人・勾魂使', title: 'Elite', threatLevel: 'HIGH', description: '仙舟禁地的巡邏者，能施加【震盪】狀態。', keyMechanics: ['震盪(眩暈)', '生命汲取'] },
    'shape_shifter': { name: '藥王秘傳・煉形者', title: 'Elite', threatLevel: 'HIGH', description: '服用了建木果實的墮落丹士，擁有極強的再生能力。', keyMechanics: ['召喚魔陰身', '擊中回復生命'] },
    'malefic_ape': { name: '豐饒靈獸・長右', title: 'Elite', threatLevel: 'HIGH', description: '被豐饒之力侵蝕的巨猿，性格暴躁。', keyMechanics: ['鎖定技能釋放者', '強力重擊'] },
    'aurumaton_gatekeeper': { name: '金人司閽', title: 'Elite', threatLevel: 'HIGH', description: '仙舟的高級防禦機兵，進入懲戒模式後極具威脅。', keyMechanics: ['懲戒模式', '召喚金魚', '虛數抗性'] },
    'sweet_gorilla': { name: '驚夢劇團・甜猿泰山', title: 'Elite', threatLevel: 'HIGH', description: '巨大的猩猩玩偶，會投擲汽水瓶。', keyMechanics: ['汽水護盾', '震盪波'] },
    'shell_of_faded_rage': { name: '往日之影的雷殼', title: 'Elite', threatLevel: 'HIGH', description: '憶域中的守護者殘影，手持雷電長槍。', keyMechanics: ['守備度疊加', '弱點保護'] },
    'beyond_overcooked': { name: '驚夢劇團・過分烹調', title: 'Elite', threatLevel: 'MEDIUM', description: '暴走的廚房機械，會不斷「烹飪」敵人。', keyMechanics: ['點火加熱', '高溫噴射'] },
    'chrono_sniper': { name: '恆時狙擊手', title: 'Elite', threatLevel: 'MEDIUM', description: '能夠在時間縫隙中射擊的遠程單位。', keyMechanics: ['時間鎖定', '蓄力射擊'] },
    'chrono_golem': { name: '恆時巨像', title: 'Elite', threatLevel: 'HIGH', description: '翁法羅斯的古代防禦設施，堅不可摧。', keyMechanics: ['物理抗性', '震盪波'] },

    // --- ELITES (Genshin) ---
    'wooden_shield_mitachurl': { name: '木盾暴徒', title: 'Elite', threatLevel: 'MEDIUM', description: '手持巨型木盾的強壯丘丘人，防禦力極高。', keyMechanics: ['格擋傷害', '衝撞'] },
    'abyss_mage_pyro': { name: '火深淵法師', title: 'Elite', threatLevel: 'MEDIUM', description: '利用火元素護盾保護自己的深淵魔物。', keyMechanics: ['元素護盾', '火球連發'] },
    'eye_of_the_storm': { name: '狂風之核', title: 'Elite', threatLevel: 'MEDIUM', description: '純粹風元素構成的實體，免疫風元素傷害。', keyMechanics: ['風元素免疫', '高空墜落'] },
    'cryo_regisvine': { name: '急凍樹', title: 'Elite', threatLevel: 'HIGH', description: '吸收了地脈寒氣的巨大藤蔓植物。', keyMechanics: ['核心弱點', '極寒射線'] },
    'ruin_guard': { name: '遺跡守衛', title: 'Elite', threatLevel: 'MEDIUM', description: '古老文明的戰爭機械，擁有極高的物理抗性。', keyMechanics: ['飛彈追蹤', '旋轉攻擊'] },
    'fatui_pyro_agent': { name: '愚人眾・債務處理人', title: 'Elite', threatLevel: 'MEDIUM', description: '善於隱身的刺客，爆發極高。', keyMechanics: ['隱身', '獵殺祭刀'] },
    'ruin_hunter': { name: '遺跡獵者', title: 'Elite', threatLevel: 'HIGH', description: '可以在空中飛行的古代戰鬥機械。', keyMechanics: ['空中轟炸', '弱點暴露'] },
    'stonehide_lawachurl': { name: '丘丘岩盔王', title: 'Elite', threatLevel: 'HIGH', description: '體型巨大的丘丘人首領，擁有堅硬的岩石護盾。', keyMechanics: ['岩元素護盾', '重碾攻擊'] },
    'pyro_regisvine': { name: '爆炎樹', title: 'Elite', threatLevel: 'HIGH', description: '吸收了地脈熱能的巨大藤蔓植物。', keyMechanics: ['核心弱點', '烈焰橫掃'] },
    'geovishap': { name: '岩龍蜥', title: 'Elite', threatLevel: 'MEDIUM', description: '成年的岩龍蜥，表皮堅硬，能切換元素。', keyMechanics: ['元素吐息', '翻滾衝撞'] },
    'kairagi_fire': { name: '海亂鬼・炎威', title: 'Elite', threatLevel: 'HIGH', description: '附著火元素的流浪武士，刀法凌厲。', keyMechanics: ['居合斬', '格擋'] },
    'kairagi_thunder': { name: '海亂鬼・雷騰', title: 'Elite', threatLevel: 'HIGH', description: '附著雷元素的流浪武士，刀法凌厲。', keyMechanics: ['突刺', '格擋'] },
    'maguu_kenki_mini': { name: '魔偶劍鬼', title: 'Elite', threatLevel: 'HIGH', description: '來自異國的人形機關，劍術高超。', keyMechanics: ['幻影斬擊', '格擋遠程攻擊'] },
    'thunder_manifestation_mini': { name: '雷音權現', title: 'Elite', threatLevel: 'HIGH', description: '雷元素的具象化，行動敏捷，難以鎖定。', keyMechanics: ['雷針鎖定', '瞬移'] },
    'mirror_maiden': { name: '藏鏡仕女', title: 'Elite', threatLevel: 'MEDIUM', description: '愚人眾的特務人員，操控水鏡進行戰鬥。', keyMechanics: ['水鏡束縛', '瞬移'] },
    'ruin_grader': { name: '遺跡重機', title: 'Elite', threatLevel: 'HIGH', description: '更為巨大的遺跡機械，擁有毀滅性的衝撞力。', keyMechanics: ['衝撞', '雷射眼'] },
    'ruin_drake': { name: '遺跡龍獸', title: 'Elite', threatLevel: 'HIGH', description: '模仿龍類生物製造的戰爭機械，能吸收元素能量。', keyMechanics: ['能量洪流', '弱點暴露'] },
    'electro_regisvine': { name: '掣電樹', title: 'Elite', threatLevel: 'HIGH', description: '吸收了地脈雷電的巨大植物。', keyMechanics: ['核心轉移', '雷電激光'] },
    'eremite_vanguard': { name: '魔岩役使', title: 'Elite', threatLevel: 'MEDIUM', description: '鍍金旅團的精英戰士，能召喚厄靈協助戰鬥。', keyMechanics: ['召喚厄靈', '狂暴狀態'] },
    'construction_mek': { name: '建造特化型機關', title: 'Elite', threatLevel: 'MEDIUM', description: '楓丹的工程機械，動作遲緩但破壞力驚人。', keyMechanics: ['重臂揮擊', '冰元素攻擊'] },
    'breacher_primus': { name: '隙境原體', title: 'Elite', threatLevel: 'HIGH', description: '來自深淵的異界生物，能開啟護盾。', keyMechanics: ['激化護盾', '侵蝕攻擊'] },
    'tainted_hydro_phantasm': { name: '濁水幻靈・噴吐', title: 'Elite', threatLevel: 'HIGH', description: '受污染的水元素生命，攻擊帶有腐蝕性。', keyMechanics: ['持續噴射', '狂暴'] },
    'phantasm_water': { name: '濁水幻靈', title: 'Elite', threatLevel: 'MEDIUM', description: '元素生命體的異變形態，免疫凍結。', keyMechanics: ['高壓水流', '免疫凍結'] },
    'tribal_warrior_champion': { name: '部族勇士・冠軍', title: 'Elite', threatLevel: 'HIGH', description: '納塔最強的戰士，使用黑曜石大劍。', keyMechanics: ['大劍重擊', '戰吼'] },
    'koholasaurus_elite': { name: '流泉龍蜥・波濤', title: 'Elite', threatLevel: 'HIGH', description: '納塔特有的龍蜥亞種，擅長水中戰鬥。', keyMechanics: ['水流衝擊', '翻滾'] },
    'wayob_manifestation': { name: '華夜之形', title: 'Elite', threatLevel: 'HIGH', description: '夜神之國的守門人，擁有虛實轉換的能力。', keyMechanics: ['護盾吸收', '能量反饋'] },
    'fatui_electrohammer': { name: '愚人眾・雷錘', title: 'Elite', threatLevel: 'MEDIUM', description: '手持巨大雷錘的前鋒軍，開啟護盾後傷害極高。', keyMechanics: ['雷元素護盾', '蓄力重錘'] },
    'frost_operative': { name: '愚人眾・霜役人', title: 'Elite', threatLevel: 'HIGH', description: '執行祕密任務的精英特工，擅長使用冰元素刺殺。', keyMechanics: ['生命之契', '連續刺擊'] },
    'tsaritsa_guard': { name: '女皇親衛', title: 'Elite', threatLevel: 'HIGH', description: '至冬國的最強士兵，裝備了最先進的元素裝甲。', keyMechanics: ['絕對防禦', '防禦反擊'] },
};

export const getBossInfo = (enemyId: string): BossTacticsInfo => {
    return BossInfoRegistry[enemyId] || {
        name: '未知敵對單位',
        title: 'Hostile Entity',
        threatLevel: 'MEDIUM',
        description: '具備一定威脅等級的敵對單位，情報不明。',
        keyMechanics: ['優先集火清理', '注意觀察敵人動作']
    };
};
