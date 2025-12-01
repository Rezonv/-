
import React from 'react';
import { RaidMap, DailyStage, InventoryItem, Character } from '../types';
import { RAID_REGIONS, RAID_MAPS } from '../data/raids';
import { DAILY_STAGES } from '../data/farming';
import { SHOP_ITEMS } from '../data/items';
import { getBossInfo } from '../data/BossData';
import { ELEMENT_ICONS, ELEMENT_COLORS } from '../data/combatData';

interface Props {
  activeMode: 'RAID' | 'DAILY';
  selectedUniverse: 'HSR' | 'GENSHIN';
  selectedRegionId: string | null;
  selectedMapId: string | null;
  selectedDailyStageId: string | null;
  clearedStageIds: string[];
  enemyImages: { [key: string]: string };
  regionImages: { [key: string]: string };
  onSetMode: (mode: 'RAID' | 'DAILY') => void;
  onSetUniverse: (u: 'HSR' | 'GENSHIN') => void;
  onSelectRegion: (id: string) => void;
  onSelectMap: (id: string) => void;
  onSelectDaily: (id: string) => void;
}

const RaidSelector: React.FC<Props> = ({
  activeMode, selectedUniverse, selectedRegionId, selectedMapId, selectedDailyStageId,
  clearedStageIds, enemyImages, regionImages,
  onSetMode, onSetUniverse, onSelectRegion, onSelectMap, onSelectDaily
}) => {

  const getFilteredRegions = () => {
      const hsrIds = ['herta_station', 'jarilo_vi', 'xianzhou', 'penacony', 'amphoreus'];
      const genshinIds = ['mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'snezhnaya'];
      return RAID_REGIONS.filter(r => {
          if (selectedUniverse === 'HSR') return hsrIds.includes(r.id);
          if (selectedUniverse === 'GENSHIN') return genshinIds.includes(r.id);
          return false;
      });
  };

  const resolveMapBossData = (map: RaidMap) => {
      let boss = map.possibleEnemies.find(e => e.name.includes('BOSS'));
      if (!boss) boss = map.possibleEnemies.find(e => e.name.includes('Elite'));
      if (!boss) boss = map.possibleEnemies[map.possibleEnemies.length - 1];
      const info = getBossInfo(boss.id);
      return { ...info, enemyId: boss.id, weaknesses: boss.weaknesses || [] };
  };

  return (
    <div className="flex-1 flex overflow-hidden relative animate-fade-in min-h-0 h-full">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.8),rgba(20,0,0,0.8))] pointer-events-none z-0"></div>
        
        {/* Left Panel: Region/Daily Selection */}
        <div className="w-80 bg-gray-900/80 backdrop-blur-md border-r border-gray-700 flex flex-col min-h-0 z-10">
            {activeMode === 'RAID' ? (
                <>
                    <div className="flex border-b border-gray-700 shrink-0">
                        <button onClick={() => onSetUniverse('HSR')} className={`flex-1 py-4 text-sm font-bold transition-colors ${selectedUniverse === 'HSR' ? 'bg-blue-900/50 text-white border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'}`}>星穹鐵道</button>
                        <button onClick={() => onSetUniverse('GENSHIN')} className={`flex-1 py-4 text-sm font-bold transition-colors ${selectedUniverse === 'GENSHIN' ? 'bg-purple-900/50 text-white border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>原神</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar pb-32 min-h-0">
                        {getFilteredRegions().map(region => (
                            <button 
                                key={region.id} 
                                onClick={() => onSelectRegion(region.id)}
                                className={`w-full text-left p-4 rounded-xl transition-all border ${selectedRegionId === region.id ? `bg-gray-800 ${region.color} border-l-4 border-white shadow-lg` : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}
                            >
                                <div className="font-bold text-lg mb-1">{region.name}</div>
                                <div className="text-xs opacity-70 line-clamp-2">{region.description}</div>
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar pb-32 min-h-0">
                    <div className="p-4 text-xs font-bold text-gray-500 uppercase tracking-widest">每日輪替</div>
                    {DAILY_STAGES.map(stage => (
                        <button 
                            key={stage.id} 
                            onClick={() => onSelectDaily(stage.id)}
                            className={`w-full text-left p-4 rounded-xl transition-all border relative overflow-hidden ${selectedDailyStageId === stage.id ? 'border-blue-500 bg-blue-900/20 border-l-4' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}
                        >
                            <div className="font-bold text-white relative z-10">{stage.name}</div>
                            <div className="text-xs text-blue-300 relative z-10 mt-1">{stage.type}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Right Panel: Map Grid */}
        <div className="flex-1 bg-gray-900/50 p-8 overflow-y-auto custom-scrollbar z-10 min-h-0">
            {activeMode === 'RAID' && selectedRegionId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-32">
                    {RAID_MAPS.filter(m => m.regionId === selectedRegionId).map(map => {
                        const isCleared = clearedStageIds.includes(map.id);
                        const bossData = resolveMapBossData(map);
                        const bossImg = enemyImages[bossData.enemyId];

                        return (
                            <div 
                                key={map.id} 
                                onClick={() => onSelectMap(map.id)}
                                className={`relative group h-64 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-[1.02] ${isCleared ? 'border-green-500/50' : 'border-gray-600 hover:border-white'}`}
                            >
                                <div className="absolute inset-0">
                                    <img src={map.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                                </div>
                                
                                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className={`px-3 py-1 rounded-full text-xs font-black backdrop-blur-md bg-black/50 border ${map.difficulty >= 5 ? 'border-red-500 text-red-500' : 'border-white/30 text-white'}`}>
                                            Lv.{map.difficulty * 10}
                                        </span>
                                        {isCleared && <span className="text-green-400 text-xl drop-shadow-md">★</span>}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">{map.name}</h3>
                                        <div className="flex items-center gap-2 mb-2">
                                            {bossImg ? (
                                                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30"><img src={bossImg} className="w-full h-full object-cover"/></div>
                                            ) : (
                                                <span className="text-xl">☠️</span>
                                            )}
                                            <span className="text-xs text-gray-300">{bossData.name}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {bossData.weaknesses.map((w: string) => (
                                                <div key={w} className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-black/60 border border-white/20 ${ELEMENT_COLORS[w]}`}>
                                                    {ELEMENT_ICONS[w]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="text-6xl mb-4 opacity-20">⚔️</div>
                    <p>請選擇區域以檢視關卡</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default RaidSelector;
