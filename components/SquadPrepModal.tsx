
import React from 'react';
import { Character, RaidMap, DailyStage } from '../types';
import { getBossInfo } from '../data/BossData';
import { ELEMENT_ICONS, ELEMENT_COLORS } from '../data/combatData';

interface Props {
  activeMode: 'RAID' | 'DAILY';
  map: RaidMap | null;
  daily: DailyStage | null;
  difficulty: number;
  characters: Character[];
  customAvatars: { [key: string]: string };
  enemyImages: { [key: string]: string };
  squadIds: string[];
  setSquadIds: (ids: string[]) => void;
  onStart: () => void;
  onSweep: () => void;
  onClose: () => void;
  isCleared: boolean;
}

const SquadPrepModal: React.FC<Props> = ({
  activeMode, map, daily, difficulty, characters, customAvatars, enemyImages,
  squadIds, setSquadIds, onStart, onSweep, onClose, isCleared
}) => {
  if (!map && !daily) return null;

  const getAvatar = (id: string) => customAvatars[id] || characters.find(c => c.id === id)?.avatarUrl || '';
  const uniqueCharacters = Array.from(new Map<string, Character>(characters.map(c => [c.id, c])).values());

  let bossData: any = null;
  let bossImg = '';
  let threatColor = 'text-yellow-400';
  let desc = '';
  let cost = 0;

  if (activeMode === 'RAID' && map) {
      let boss = map.possibleEnemies.find(e => e.name.includes('BOSS'));
      if (!boss) boss = map.possibleEnemies.find(e => e.name.includes('Elite'));
      if (!boss) boss = map.possibleEnemies[map.possibleEnemies.length - 1];
      
      const info = getBossInfo(boss.id);
      bossData = { ...info, enemyId: boss.id, weaknesses: boss.weaknesses || [] };
      bossImg = enemyImages[bossData.enemyId] || map.imageUrl;
      threatColor = bossData.threatLevel === 'EXTREME' ? 'text-red-500' : bossData.threatLevel === 'HIGH' ? 'text-orange-500' : 'text-yellow-400';
      desc = bossData.description;
      cost = map.staminaCost;
  } else if (daily) {
      const diff = daily.difficulties[difficulty];
      desc = `難度倍率: Lv.${diff.level}0`;
      cost = diff.staminaCost;
  }

  const handleToggleChar = (id: string) => {
      if (squadIds.includes(id)) {
          setSquadIds(squadIds.filter(x => x !== id));
      } else {
          if (squadIds.length < 4) setSquadIds([...squadIds, id]);
      }
  };

  return (
    <div className="animate-fade-in-up bg-gray-900/95 border-t-4 border-red-600 rounded-xl p-6 shadow-2xl relative overflow-hidden mb-20 backdrop-blur-xl max-w-6xl mx-auto w-full max-h-[85vh] overflow-y-auto custom-scrollbar flex flex-col">
        {activeMode === 'RAID' && map && bossData ? (
            <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                <div className="lg:w-1/3 flex flex-col">
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-red-900/50 bg-black mb-2 shadow-inner shrink-0">
                        <img src={bossImg} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 border-2 border-red-500/20 m-2"></div>
                    </div>
                    <div className="text-center font-bold text-lg text-white">{bossData.name}</div>
                    <div className={`text-center text-xs font-mono ${threatColor}`}>{bossData.title}</div>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto max-h-96 lg:max-h-none pr-2 custom-scrollbar">
                    <div className="flex justify-between items-center border-b border-red-900/50 pb-2">
                        <h3 className="text-xl font-black text-red-500 uppercase">戰術簡報</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{desc}</p>
                    
                    {isCleared && (
                        <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg flex justify-between items-center">
                            <div className="text-sm text-blue-300 font-bold">★ 該區域已壓制 (可執行快速掃蕩)</div>
                            <button 
                                onClick={onSweep} 
                                className="px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded shadow-lg"
                            >
                                掃蕩 (SWEEP)
                            </button>
                        </div>
                    )}

                    <div className="bg-black/40 p-4 rounded border border-gray-700">
                        <div className="text-xs text-gray-500 uppercase font-bold mb-2">弱點掃描</div>
                        <div className="flex gap-2">
                            {bossData.weaknesses.length > 0 ? bossData.weaknesses.map((w: string) => (
                                <div key={w} className={`px-3 py-1 rounded bg-gray-800 border border-gray-600 text-sm font-bold ${ELEMENT_COLORS[w]}`}>
                                    {ELEMENT_ICONS[w]} {w}
                                </div>
                            )) : <div className="text-gray-500 text-sm">未偵測到</div>}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase font-bold mb-2">出擊隊伍 ({squadIds.length}/4)</div>
                        <div className="flex gap-3 flex-wrap pb-2">
                            {uniqueCharacters.map(c => { 
                                const isSelected = squadIds.includes(c.id); 
                                return (
                                    <button key={c.id} onClick={() => handleToggleChar(c.id)} className={`relative w-14 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${isSelected ? 'border-red-500 shadow-[0_0_10px_red] scale-110' : 'border-gray-700 opacity-50 hover:opacity-100'}`}>
                                        <img src={getAvatar(c.id)} className="w-full h-full object-cover"/>
                                        {isSelected && <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>}
                                    </button>
                                ); 
                            })}
                        </div>
                    </div>
                </div>
                <div className="lg:w-48 flex flex-col gap-4 justify-end shrink-0">
                    <div className="bg-black/40 p-3 rounded border border-gray-700 text-center"><div className="text-[10px] text-gray-500 uppercase">消耗</div><div className="text-xl font-mono font-bold text-yellow-400">-{cost} ⚡</div></div>
                    <button onClick={onStart} className="w-full py-6 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-sm shadow-lg transition-all hover:scale-105 active:scale-95">開始討伐</button>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center text-center relative">
                <button onClick={onClose} className="absolute top-0 right-0 text-gray-400 hover:text-white text-xl">✕</button>
                <h3 className="text-2xl font-bold text-white mb-4">特訓準備確認</h3>
                <div className="text-gray-400 mb-6">{desc}</div>
                <div className="flex gap-4 mb-8 justify-center flex-wrap">
                    {uniqueCharacters.map(c => (
                        <div key={c.id} onClick={() => handleToggleChar(c.id)} className={`w-16 h-16 rounded-full border-4 cursor-pointer overflow-hidden transition-all ${squadIds.includes(c.id) ? 'border-red-500 scale-110 shadow-lg' : 'border-gray-600 opacity-50'}`}>
                            <img src={getAvatar(c.id)} className="w-full h-full object-cover"/>
                        </div>
                    ))}
                </div>
                <button onClick={() => { if(squadIds.length > 0) onStart(); else alert("請選擇隊員"); }} className="px-12 py-4 bg-blue-600 text-white font-black rounded-full text-xl hover:scale-105 transition-transform shadow-xl">
                    開始特訓 (-{cost} ⚡)
                </button>
            </div>
        )}
    </div>
  );
};

export default SquadPrepModal;
