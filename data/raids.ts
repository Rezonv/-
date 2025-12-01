
import { RaidMap, RaidRegion, RaidNode, MaterialDrop, Enemy } from '../types';
import { ENEMIES } from './enemies';
import { SHOP_ITEMS } from './items';

const getMapBg = (p: string) => `https://pollinations.ai/p/${encodeURIComponent(p + " environment concept art wide shot 8k anime background masterpiece lighting")}`;

export const RAID_REGIONS: RaidRegion[] = [
  // --- HSR Universe ---
  { id: 'herta_station', name: '黑塔太空站', description: '湛藍星上空的奇蹟，「天才俱樂部」#83 黑塔的私人領地。', imageUrl: getMapBg('futuristic space station blue interior sci-fi clean white'), color: 'text-blue-400', dropMaterialId: 'aether_dust' },
  { id: 'jarilo_vi', name: '雅利洛-VI', description: '被寒潮吞沒的星球，僅存的人類文明在「存護」的光輝下苟延殘喘。', imageUrl: getMapBg('snow city steampunk winter night lights heating tower'), color: 'text-cyan-400', dropMaterialId: 'ice_crystal' },
  { id: 'xianzhou', name: '仙舟「羅浮」', description: '行駛於星海中的巨大艦船，追隨「巡獵」星神，擁有獨特的東方賽博風格。', imageUrl: getMapBg('chinese sci-fi floating city clouds red and gold traditional architecture'), color: 'text-yellow-400', dropMaterialId: 'thunder_prism' },
  { id: 'penacony', name: '匹諾康尼', description: '盛會之星，夢境與現實交織的享樂主義聖地。', imageUrl: getMapBg('cyberpunk jazz neon city hotel night dreamscape surreal'), color: 'text-purple-400', dropMaterialId: 'dream_fluid' },
  { id: 'amphoreus', name: '翁法羅斯 (Amphoreus)', description: '永恆的聖城，時間在這裡停滯，神聖而莊嚴的未知領域。', imageUrl: getMapBg('ancient greek fantasy city white marble gold floating time magic hourglass'), color: 'text-yellow-200', dropMaterialId: 'chronos_sand' },

  // --- Teyvat Universe ---
  { id: 'mondstadt', name: '蒙德 (Mondstadt)', description: '位於提瓦特大陸東北部的自由城邦。風神巴巴托斯的護佑之地。', imageUrl: getMapBg('fantasy medieval city windmills green fields blue sky european'), color: 'text-green-400', dropMaterialId: 'wind_aster' },
  { id: 'liyue', name: '璃月 (Liyue)', description: '契約與商業的國度，繁華的港口見證了無數財富的流通。', imageUrl: getMapBg('chinese harbor fantasy mountains sunset orange lanterns stone buildings'), color: 'text-orange-400', dropMaterialId: 'geo_statue' },
  { id: 'inazuma', name: '稻妻 (Inazuma)', description: '位於遠海的封閉群島，雷電將軍追求「永恆」的寂靜國度。', imageUrl: getMapBg('japanese shrine island cherry blossoms lightning storm purple torii gate'), color: 'text-indigo-400', dropMaterialId: 'electro_sigil' },
  { id: 'sumeru', name: '須彌 (Sumeru)', description: '智慧的國度，雨林與沙漠並存，草神納西妲的淨土。', imageUrl: getMapBg('fantasy rainforest giant glowing mushrooms tree houses green'), color: 'text-emerald-400', dropMaterialId: 'dendro_sigil' },
  { id: 'fontaine', name: '楓丹 (Fontaine)', description: '正義的國度，充滿了蒸汽與發條機關的地上之海。', imageUrl: getMapBg('steampunk venice waterfalls white buildings blue water elegant'), color: 'text-blue-500', dropMaterialId: 'hydro_sigil' },
  { id: 'natlan', name: '納塔 (Natlan)', description: '戰爭的國度，龍與火的故鄉，充滿野性與戰鬥。', imageUrl: getMapBg('volcano canyon tribal fire dragon fantasy landscape red rocks'), color: 'text-red-500', dropMaterialId: 'pyro_sigil' },
  { id: 'snezhnaya', name: '至冬 (Snezhnaya)', description: '冰之女皇的國度，終年飄雪，愚人眾的總部。', imageUrl: getMapBg('russian winter palace ice snow aurora borealis dark majestic'), color: 'text-cyan-200', dropMaterialId: 'cryo_sigil' }
];

// Lore & Structure configuration
const REGION_ZONE_DATA: Record<string, {name: string, desc: string, visual: string, bossId: string}[]> = {
    'herta_station': [
        { name: '基座艙段', desc: '太空站的中樞神經，監控著所有區域的異常波動。', visual: 'sci-fi reception hall space station', bossId: 'void_ranger_reaver' }, 
        { name: '收容艙段', desc: '存放奇物的危險區域，錯綜複雜的走廊。', visual: 'sci-fi containment vault glass cases', bossId: 'void_ranger_distorter' },
        { name: '支援艙段', desc: '提供電力與維生系統的後勤區域。', visual: 'space station train platform logistics', bossId: 'void_ranger_eliminator' },
        { name: '禁閉艙段', desc: '曾經是阮•梅的實驗室，現在充斥著培養皿。', visual: 'creepy biological lab sci-fi plants', bossId: 'blaze_out_of_space' }, // Elite
        { name: '黑塔辦公室', desc: '人偶與天才的私人領域，模擬宇宙入口。', visual: 'digital virtual reality portal blue matrix', bossId: 'void_ranger_trampler' }, // Elite
        { name: '星核收容區', desc: '存放毀滅星核的最高戒備區域。', visual: 'glowing yellow energy core containment field', bossId: 'void_ranger_trampler' },
        { name: '末日獸戰場', desc: '巨型反物質生物曾在此肆虐。', visual: 'destroyed space station platform debris galaxy background', bossId: 'doomsday_beast' } // BOSS
    ],
    'jarilo_vi': [
        { name: '城郊雪原', desc: '貝洛伯格城外的冰雪荒原，寒風凜冽。', visual: 'snow tundra blizzard white landscape', bossId: 'automaton_beetle' },
        { name: '邊緣通路', desc: '連接著上層區與封鎖區的通道。', visual: 'winter street alley heating lamps snow', bossId: 'automaton_spider' },
        { name: '鉚釘鎮', desc: '下層區的廢棄城鎮，孤兒院的舊址。', visual: 'abandoned mining town underground steampunk gloomy', bossId: 'automaton_direwolf' }, // Elite
        { name: '機械聚落', desc: '史瓦羅大佬與流浪機器人的聚集地。', visual: 'junkyard robots scrap metal snow', bossId: 'guardian_shadow' }, // Elite
        { name: '殘響迴廊', desc: '裂界侵蝕嚴重的區域，過去的幻影在此徘徊。', visual: 'frozen city distorted dimensions purple magic', bossId: 'frigid_prowler' }, // Elite
        { name: '永冬嶺', desc: '造物引擎的所在地，也是星核封印之地。', visual: 'top of snowy mountain giant robot hand ice', bossId: 'automaton_grizzly' }, // Elite
        { name: '歷戰餘響', desc: '可可利亞意志殘留的戰場。', visual: 'epic ice battlefield explosion aftermath', bossId: 'cocolia' } // BOSS
    ],
    'xianzhou': [
        { name: '流雲渡', desc: '星槎進出的港口，貨物堆積如山。', visual: 'chinese sci-fi shipping containers flying ships', bossId: 'mara_struck_soldier' },
        { name: '迴星港', desc: '更加繁忙的交通樞紐，建木的枝蔓蔓延。', visual: 'complex sci-fi port machinery giant tree roots', bossId: 'mara_struck_ballistarius' },
        { name: '長樂天', desc: '羅浮的休閒中心，繁華的街道。', visual: 'bustling chinese street market lanterns red', bossId: 'shape_shifter' }, // Elite
        { name: '金人巷', desc: '著名的美食與商業街。', visual: 'night market food stalls glowing lights', bossId: 'aurumaton_gatekeeper' }, // Elite
        { name: '丹鼎司', desc: '持明族與丹士煉藥之地。', visual: 'medical alchemy lab ancient chinese fantasy ocean view', bossId: 'aurumaton_spectral_envoy' }, // Elite
        { name: '鱗淵境', desc: '持明龍尊的封印地，巨大的蓮花。', visual: 'underwater palace giant lotus dragon fantasy', bossId: 'malefic_ape' },
        { name: '建木玄根', desc: '豐饒神蹟的根源，不死孽物叢生。', visual: 'giant glowing tree roots mystical dark atmosphere', bossId: 'abundance_deer' } // BOSS
    ],
    'penacony': [
        { name: '入夢池', desc: '現實與夢境的交界。', visual: 'luxury hotel lobby bathtub dream fluid', bossId: 'dream_jolt_troupe' },
        { name: '黃金時刻', desc: '永遠繁華的都市夢境。', visual: 'golden city night skyscrapers neon jazz', bossId: 'dream_jolt_bubble' },
        { name: '築夢邊境', desc: '未完成的夢境邊緣。', visual: 'surreal construction site floating buildings sky', bossId: 'beyond_overcooked' }, // Elite
        { name: '稚子之夢', desc: '充滿童趣與摺紙鳥的房間。', visual: 'giant toy room distorted perspective clock', bossId: 'shell_of_faded_rage' }, // Elite
        { name: '朝露公館', desc: '家族高層議事之地。', visual: 'mansion interior grand hall maquette', bossId: 'shell_of_faded_rage' },
        { name: '克勞克影視樂園', desc: '經典卡通風格的主題樂園。', visual: 'theme park cartoon style film reels cinema', bossId: 'sweet_gorilla' }, // Elite
        { name: '大劇院', desc: '諧樂大典的舉辦地。', visual: 'grand opera house stage spotlight dramatic', bossId: 'something_unto_death' } // BOSS
    ],
    'amphoreus': [
        { name: '時間神殿', desc: '供奉著時間之神的神殿。', visual: 'greek temple giant hourglass white marble gold', bossId: 'chrono_construct' },
        { name: '永恆廣場', desc: '時間在這裡凝固。', visual: 'frozen city plaza statues sunlight rays', bossId: 'chrono_sniper' },
        { name: '命運迴廊', desc: '無數條時間線在這裡交錯。', visual: 'mirrors corridor reflection galaxy time travel', bossId: 'chrono_golem' }, // Elite
        { name: '鐘樓頂端', desc: '巨大的齒輪在腳下轉動。', visual: 'clock tower gears steampunk mechanics sky view', bossId: 'chrono_golem' },
        { name: '遺忘花園', desc: '被時間遺忘的角落。', visual: 'crystal garden glowing flowers mystical night', bossId: 'chrono_golem' },
        { name: '審判之庭', desc: '決定凡人命運的地方。', visual: 'courtroom fantasy scales golden light', bossId: 'chrono_golem' },
        { name: '時之盡頭', desc: '一切時間的終點。', visual: 'void white space floating rocks surreal', bossId: 'titan_of_time' } // BOSS
    ],
    'mondstadt': [
        { name: '低語森林', desc: '蒙德城外的森林。', visual: 'fantasy forest green trees path sunlight', bossId: 'hilichurl_fighter' },
        { name: '風起地', desc: '巨大的橡樹下。', visual: 'giant oak tree green meadow blue sky', bossId: 'hilichurl_shooter' },
        { name: '清泉鎮', desc: '獵人與泉水精靈的故鄉。', visual: 'village houses windmill stream flowers', bossId: 'wooden_shield_mitachurl' }, // Elite
        { name: '奔狼領', desc: '北風之狼的領地。', visual: 'dark misty forest wolf statues blue glow', bossId: 'eye_of_the_storm' },
        { name: '龍脊雪山', desc: '終年積雪的高山。', visual: 'snowy mountain peak ice crystals ancient ruins', bossId: 'cryo_regisvine' }, // Elite
        { name: '風龍廢墟', desc: '舊蒙德的遺址，高塔被風牆環繞。', visual: 'ancient stone tower ruins wind barrier storm', bossId: 'abyss_mage_pyro' }, // Elite
        { name: '摘星崖', desc: '蒙德最高的懸崖。', visual: 'cliff edge ocean view starry night flowers', bossId: 'dvalin' } // BOSS
    ],
    'liyue': [
        { name: '荻花洲', desc: '水網交織的濕地，蘆葦蕩漾。', visual: 'wetlands reeds chinese inn water reflection', bossId: 'treasure_hoarder' },
        { name: '輕策莊', desc: '依山而建的養老村莊。', visual: 'rice terraces village bamboo forest rain', bossId: 'treasure_hoarder' },
        { name: '奧藏山', desc: '留雲借風真君的洞府。', visual: 'mountain peak lake dining table crane clouds', bossId: 'fatui_pyro_agent' }, // Elite
        { name: '絕雲間', desc: '群山聳立雲端，仙人隱居之地。', visual: 'floating mountains clouds chinese fantasy landscape', bossId: 'pyro_regisvine' }, // Elite
        { name: '層岩巨淵', desc: '深不見底的礦坑。', visual: 'deep underground mine purple glowing crystals cavern', bossId: 'stonehide_lawachurl' }, // Elite
        { name: '黃金屋', desc: '全提瓦特的鑄幣廠。', visual: 'vault full of gold coins treasure hall', bossId: 'ruin_hunter' }, // Elite
        { name: '雲來海', desc: '孤雲閣所在的海域。', visual: 'stone forest ocean giant spears in water', bossId: 'azhdaha' } // BOSS
    ],
    'inazuma': [
        { name: '離鄉之島', desc: '外國人抵達稻妻的第一站。', visual: 'autumn village maple trees dock japanese', bossId: 'nobushi' },
        { name: '鎮守之森', desc: '妖狸出沒的森林。', visual: 'dark forest blue glowing flowers japanese statues', bossId: 'kairagi_thunder' }, // Elite
        { name: '影向山', desc: '鳴神大社所在地。', visual: 'giant sakura tree fox shrine pink petals mountain', bossId: 'kairagi_fire' }, // Elite
        { name: '無想刃狹間', desc: '被雷電將軍一刀劈開的峽谷。', visual: 'canyon lightning electricity purple glow destroyed ship', bossId: 'maguu_kenki_mini' }, // Elite
        { name: '海祇島', desc: '反抗軍的大本營。', visual: 'fantasy island pink corals bubbles waterfalls', bossId: 'maguu_kenki_mini' },
        { name: '清籟島', desc: '雷暴肆虐的廢墟島嶼。', visual: 'storm island floating rocks purple lightning dark', bossId: 'thunder_manifestation_mini' }, // Elite
        { name: '天守閣', desc: '雷電將軍的居所。', visual: 'japanese castle majestic lightning throne room', bossId: 'raiden_shogun_boss' } // BOSS
    ],
    'sumeru': [
        { name: '道成林', desc: '鬱鬱蔥蔥的雨林。', visual: 'jungle massive trees green vines sunlight', bossId: 'fungi_dendro' },
        { name: '須彌城', desc: '智慧的中心，建立在巨樹之上的城市。', visual: 'city on giant tree fantasy library university', bossId: 'eremite_axe' },
        { name: '桓那蘭那', desc: '蘭那羅的夢之國度。', visual: 'dream world glowing plants tiny houses fantasy', bossId: 'electro_regisvine' }, // Elite
        { name: '阿如村', desc: '沙漠中最後的避風港。', visual: 'desert village canyon sandstone buildings', bossId: 'eremite_vanguard' }, // Elite
        { name: '赤王陵', desc: '宏偉的金字塔遺跡。', visual: 'egyptian pyramid sci-fi technology glowing blue lines', bossId: 'ruin_drake' }, // Elite
        { name: '永恆綠洲', desc: '時間靜止的沙漠中心。', visual: 'lake in desert frozen time water island', bossId: 'ruin_grader' },
        { name: '淨善宮', desc: '小吉祥草王的居所。', visual: 'bird cage palace stained glass green light', bossId: 'jadeplume_terrorshroom' } // BOSS
    ],
    'fontaine': [
        { name: '海露港', desc: '通往楓丹的宏偉港口。', visual: 'steampunk harbor giant waterfall elevator', bossId: 'meka_clockwork' },
        { name: '楓丹廷', desc: '充滿歐式風情的城市。', visual: 'european city canals steampunk white marble', bossId: 'meka_geological' },
        { name: '歐庇克萊歌劇院', desc: '審判與表演的舞台。', visual: 'opera house interior blue lights scales of justice', bossId: 'construction_mek' }, // Elite
        { name: '梅洛彼得堡', desc: '位於水下的巨大監獄工廠。', visual: 'underwater factory steampunk prison pipes gears', bossId: 'construction_mek' },
        { name: '伊利耶林區', desc: '幽靜的森林與湖泊。', visual: 'misty forest blue flowers willow trees', bossId: 'phantasm_water' }, // Elite
        { name: '自體自身之塔', desc: '封印著原始胎海之水的神秘高塔。', visual: 'tower in sea ruins mysterious magic', bossId: 'tainted_hydro_phantasm' }, // Elite
        { name: '原始胎海', desc: '生命的起源與毀滅之地。', visual: 'purple ocean space giant whale galaxy', bossId: 'narwhal' } // BOSS
    ],
    'natlan': [
        { name: '回聲之子聚落', desc: '擅長採礦與舞蹈的部落。', visual: 'canyon tribal village drums graffiti rocks', bossId: 'saurian_pyro' },
        { name: '流泉之眾聚落', desc: '與水龍蜥共生的部落。', visual: 'beach tropical tribal huts surfboards', bossId: 'warrior_natlan' },
        { name: '懸木人聚落', desc: '居住在巨樹之上的部落。', visual: 'treehouse village zip lines jungle mountains', bossId: 'koholasaurus_elite' }, // Elite
        { name: '聖火競技場', desc: '納塔人揮灑熱血的舞台。', visual: 'colosseum fire crowd flags tribal sport', bossId: 'tribal_warrior_champion' },
        { name: '夜神之國', desc: '只有靈魂與強者才能踏足的領域。', visual: 'dark realm obsidian blue fire spirits', bossId: 'wayob_manifestation' }, // Elite
        { name: '燼寂海', desc: '傳說中無風的死寂之地。', visual: 'grey ash wasteland silent spooky', bossId: 'wayob_manifestation' },
        { name: '火山之心', desc: '納塔地脈的核心，岩漿翻滾。', visual: 'volcano interior lava magma intense heat', bossId: 'capitano_shadow' } // BOSS
    ],
    'snezhnaya': [
        { name: '冰原雪松', desc: '無邊無際的雪原。', visual: 'endless snow forest pine trees blizzard', bossId: 'fatui_skirmisher' },
        { name: '至冬宮', desc: '冰之女皇的宮殿。', visual: 'ice palace crystalline throne room blue cold', bossId: 'fatui_electrohammer' },
        { name: '愚人眾訓練營', desc: '培養最強士兵的場所。', visual: 'military camp snow bunkers weapons', bossId: 'frost_operative' }, // Elite
        { name: '壁爐之家', desc: '「僕人」管理的孤兒院。', visual: 'orphanage interior fireplace cozy but strict', bossId: 'frost_operative' },
        { name: '極地港', desc: '終年不凍的軍港。', visual: 'icy harbor warships steel grey sky', bossId: 'tsaritsa_guard' }, // Elite
        { name: '博士實驗室', desc: '進行著人體改造與禁忌研究的場所。', visual: 'creepy lab specimens tubes green liquid', bossId: 'tsaritsa_guard' },
        { name: '寒天之釘墜落處', desc: '古老的災難中心。', visual: 'giant pillar ice crater storm magical', bossId: 'tsaritsa_guard' } 
    ]
};

// Boss Material Mapping
const REGION_BOSS_DROPS: Record<string, string> = {
    'herta_station': 'boss_mat_antimatter',
    'jarilo_vi': 'boss_mat_permafrost',
    'xianzhou': 'boss_mat_abundant',
    'penacony': 'boss_mat_antimatter', 
    'amphoreus': 'chronos_sand',
    'mondstadt': 'boss_mat_storm',
    'liyue': 'boss_mat_rock',
    'inazuma': 'boss_mat_thunder',
    'sumeru': 'dendro_sigil', 
    'fontaine': 'hydro_sigil', 
    'natlan': 'pyro_sigil', 
    'snezhnaya': 'cryo_sigil' 
};

const generateMaps = (): RaidMap[] => {
    const maps: RaidMap[] = [];
    
    RAID_REGIONS.forEach((region) => {
        const zones = REGION_ZONE_DATA[region.id];
        if (!zones) return;
        
        zones.forEach((zone, i) => {
            const difficulty = Math.min(5, Math.floor(i / 1.5) + 1); // 1, 1, 2, 2, 3, 4, 5
            const isFinalZone = i === 6; // Zone 7 (index 6) is the Boss map
            
            // Define Nodes
            const nodes: RaidNode[] = [];
            const nodeCount = 3 + i; // 3 to 9 nodes
            for(let n=0; n<nodeCount; n++) {
                let type: any = 'BATTLE';
                if (n === nodeCount - 1) {
                    if (isFinalZone) type = 'BOSS';
                    else if (i >= 2) type = 'ELITE_BATTLE'; // Zone 3+ are Elites
                    else type = 'BATTLE';
                }
                else if (n === Math.floor(nodeCount/2)) type = 'EVENT';
                else if (Math.random() > 0.7) type = 'LOOT';
                
                nodes.push({ id: `n_${region.id}_${i}_${n}`, type, x:0, y:0, cleared: false });
            }

            // Construct Enemy Pool - STRICT REGION ENFORCEMENT
            const mainEnemyId = zone.bossId;
            const mainEnemy = ENEMIES.find(e => e.id === mainEnemyId);
            
            let possibleEnemies: Enemy[] = [];
            
            if (mainEnemy) {
                possibleEnemies.push(mainEnemy);
            }

            // Filter mobs strictly by current region ID
            const regionMobs = ENEMIES.filter(e => 
                e.regionId === region.id && 
                !e.name.includes('Elite') && 
                !e.name.includes('BOSS')
            );
            
            // Pick 2 distinct fodder types from this region if available
            if (regionMobs.length > 0) {
                const shuffledFodder = regionMobs.sort(() => 0.5 - Math.random());
                possibleEnemies.push(...shuffledFodder.slice(0, 2));
            }
            
            // Ensure at least some enemies are present (fallback to first region mob if shuffle failed to give 2)
            if (possibleEnemies.length < 2 && regionMobs.length > 0) {
                 // If we only added mainEnemy and found no mobs via shuffle slice (unlikely), force add one
                 if(!possibleEnemies.some(e => e.id === regionMobs[0].id)) possibleEnemies.push(regionMobs[0]);
            }

            // Drop Logic
            const dropTable: MaterialDrop[] = [];
            dropTable.push({ itemId: region.dropMaterialId, chance: 1.0, min: i + 1, max: (i + 1) * 2 });
            
            if (isFinalZone) {
                const bossMat = REGION_BOSS_DROPS[region.id];
                if (bossMat) dropTable.push({ itemId: bossMat, chance: 1.0, min: 1, max: 2 });
            }

            if (difficulty >= 3) {
                 dropTable.push({ itemId: 'enhance_dust', chance: 0.5 + (i*0.05), min: 2, max: 5 });
            }

            const map: RaidMap = {
                id: `${region.id}_zone_${i+1}`,
                regionId: region.id,
                name: zone.name,
                description: zone.desc,
                difficulty: isFinalZone ? 5 : difficulty,
                staminaCost: 10 + (i * 5),
                maxSquadSize: 4,
                imageUrl: getMapBg(`${zone.visual} ${region.name}`), 
                staticImageUrl: undefined, 
                possibleEnemies: possibleEnemies,
                nodes: nodes,
                firstClearReward: (i+1) * 30,
                dropTable: dropTable
            };
            maps.push(map);
        });
    });
    return maps;
};

export const RAID_MAPS: RaidMap[] = generateMaps();
