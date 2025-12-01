
import React, { useState, useEffect } from 'react';
import { Character, ExpeditionMap, ActiveExpedition, InventoryItem, ShopItem, HomeState, GlobalBuffs, TextGenerationSettings } from '../types';
import { EXPEDITION_MAPS } from '../data/expeditions';
import { SHOP_ITEMS } from '../data/items';
import { generateExpeditionLog } from '../services/geminiService';

interface Props {
   characters: Character[];
   activeExpeditions: ActiveExpedition[];
   customAvatars: { [key: string]: string };
   inventory: InventoryItem[];
   credits: number;
   homeState: HomeState;
   onStartExpedition: (mapId: string, charIds: [string, string], equipmentId?: string) => void;
   onClaimExpedition: (expeditionId: string, log: string, creditReward: number, affectionReward: number, materials: InventoryItem[], rareItem?: ShopItem) => void;
   onBack: () => void;
   textSettings?: TextGenerationSettings;
}

const BuffRow = ({ label, value, color }: { label: string, value: string, color: string }) => (
   <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className={color}>{value}</span>
   </div>
);

const ExpeditionCenter: React.FC<Props> = ({
   characters,
   activeExpeditions,
   customAvatars,
   inventory,
   credits,
   homeState,
   onStartExpedition,
   onClaimExpedition,
   onBack,
   textSettings
}) => {
   const [activeTab, setActiveTab] = useState<'maps' | 'active'>('maps');
   const [selectedMap, setSelectedMap] = useState<ExpeditionMap | null>(null);
   const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
   const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | undefined>(undefined);

   // Claim State
   const [claimingId, setClaimingId] = useState<string | null>(null);
   const [claimResult, setClaimResult] = useState<{ log: string, credits: number, affection: number, materials: InventoryItem[], rareItem?: ShopItem } | null>(null);

   // Filter equipment from inventory
   const availableEquipment = inventory.filter(i => i.type === 'equipment');

   // Helper to get char
   const getChar = (id: string) => characters.find(c => c.id === id);

   // --- Global Buff Calculation (Facility + Showcase) ---
   const calculateGlobalBuffs = (): GlobalBuffs => {
      const buffs: GlobalBuffs = { costReduction: 0, creditBoost: 0, timeReduction: 0, affectionBoost: 0, rareDropBoost: 0 };

      // 1. Facility Buffs
      homeState.facilities.forEach(fac => {
         if (fac.id === 'lobby') buffs.costReduction += fac.level * 0.02;
         if (fac.id === 'cafe') buffs.creditBoost += fac.level * 0.02;
         if (fac.id === 'gym') buffs.timeReduction += fac.level * 0.01;
         if (fac.id === 'library_room') buffs.affectionBoost += fac.level * 0.02;
         if (fac.id === 'onsen') buffs.rareDropBoost += fac.level * 0.005;
      });

      // 2. Showcase Buffs
      homeState.showcase.forEach(slot => {
         if (slot.itemId) {
            const item = SHOP_ITEMS.find(i => i.id === slot.itemId);
            if (item?.showcaseBuff) {
               const { type, value } = item.showcaseBuff;
               if (type === 'credit_boost') buffs.creditBoost += value;
               if (type === 'affection_boost') buffs.affectionBoost += value;
               if (type === 'rare_drop_boost') buffs.rareDropBoost += value;
            }
         }
      });

      return buffs;
   };

   const globalBuffs = calculateGlobalBuffs();

   // Helper to check map requirements
   const checkRequirements = (map: ExpeditionMap) => {
      if (!map.requiredFacilityId) return { allowed: true };
      const fac = homeState.facilities.find(f => f.id === map.requiredFacilityId);
      if (!fac || fac.level < (map.requiredFacilityLevel || 1)) {
         return {
            allowed: false,
            reason: `需${map.requiredFacilityId === 'gym' ? '訓練室' : '書房'} Lv.${map.requiredFacilityLevel}`
         };
      }
      return { allowed: true };
   };

   // Handle Team Selection
   const toggleTeamChar = (id: string) => {
      if (selectedTeam.includes(id)) {
         setSelectedTeam(prev => prev.filter(c => c !== id));
      } else {
         if (selectedTeam.length < 2) {
            setSelectedTeam(prev => [...prev, id]);
         }
      }
   };

   const handleStart = () => {
      if (!selectedMap) return;
      if (selectedTeam.length !== 2) return alert("請選擇 2 位角色");

      // Apply Home Buff to Ticket Cost
      const finalTicketCost = Math.floor(selectedMap.ticketCost * Math.max(0.1, 1 - globalBuffs.costReduction));

      if (credits < finalTicketCost) return alert("積分不足以支付門票");

      // Faction Requirement Check
      if (selectedMap.requiredFaction) {
         const teamChars = selectedTeam.map(id => getChar(id));
         const hasRequired = teamChars.some(c => c?.game === selectedMap.requiredFaction);
         if (!hasRequired) return alert(`此區域需要至少一名 ${selectedMap.requiredFaction === 'Honkai: Star Rail' ? '星穹鐵道' : '原神'} 角色作為嚮導`);
      }

      onStartExpedition(selectedMap.id, [selectedTeam[0], selectedTeam[1]], selectedEquipmentId);
      setSelectedMap(null);
      setSelectedTeam([]);
      setSelectedEquipmentId(undefined);
      setActiveTab('active');
   };

   const handleClaim = async (expedition: ActiveExpedition) => {
      setClaimingId(expedition.id);
      const map = EXPEDITION_MAPS.find(m => m.id === expedition.mapId)!;
      const team = expedition.characterIds.map(id => getChar(id)).filter(Boolean) as Character[];

      try {
         const log = await generateExpeditionLog(team, map, textSettings);

         // Calculate final rewards using locked-in multipliers
         const creditReward = Math.floor(map.baseCreditReward * expedition.bonusCreditMult);
         const affectionReward = Math.floor(map.baseAffectionReward * expedition.bonusAffectionMult);

         // Material Drops Logic
         const droppedMaterials: InventoryItem[] = [];
         if (map.materialDrops) {
            map.materialDrops.forEach(drop => {
               if (Math.random() <= drop.chance) {
                  const qty = Math.floor(Math.random() * (drop.max - drop.min + 1)) + drop.min;
                  const item = SHOP_ITEMS.find(i => i.id === drop.itemId);
                  if (item && qty > 0) {
                     droppedMaterials.push({ ...item, count: qty });
                  }
               }
            });
         }

         // Rare Drop Chance (Base + Buffs)
         const rareChance = 0.05 + globalBuffs.rareDropBoost;

         let rareItem: ShopItem | undefined;
         if (map.rareRewards && map.rareRewards.length > 0) {
            if (Math.random() < rareChance) {
               rareItem = map.rareRewards[Math.floor(Math.random() * map.rareRewards.length)];
            }
         }

         setClaimResult({
            log,
            credits: creditReward,
            affection: affectionReward,
            materials: droppedMaterials,
            rareItem
         });
      } catch (e) {
         console.error(e);
         setClaimingId(null);
      }
   };

   const confirmClaim = () => {
      if (claimingId && claimResult) {
         onClaimExpedition(claimingId, claimResult.log, claimResult.credits, claimResult.affection, claimResult.materials, claimResult.rareItem);
         setClaimingId(null);
         setClaimResult(null);
      }
   };

   // Calculation Helpers for Preview
   const getCalculatedStats = () => {
      if (!selectedMap) return { time: 0, creditBonus: 0, affectionBonus: 0, finalCost: 0, originalTime: 0 };

      let timeReduc = globalBuffs.timeReduction;
      let creditBoost = globalBuffs.creditBoost;
      let affBoost = globalBuffs.affectionBoost;

      // Character Skills
      selectedTeam.forEach(id => {
         const char = getChar(id);
         if (char?.passiveSkill) {
            if (char.passiveSkill.effectType === 'reduce_time') timeReduc += char.passiveSkill.value;
            if (char.passiveSkill.effectType === 'boost_credits') creditBoost += char.passiveSkill.value;
            if (char.passiveSkill.effectType === 'boost_affection') affBoost += char.passiveSkill.value;
         }
      });

      // Equipment
      if (selectedEquipmentId) {
         const equip = inventory.find(i => i.id === selectedEquipmentId);
         if (equip) {
            if (equip.effectType === 'reduce_time') timeReduc += (equip.effectValue || 0);
            if (equip.effectType === 'boost_credits') creditBoost += (equip.effectValue || 0);
            if (equip.effectType === 'boost_affection') affBoost += (equip.effectValue || 0);
         }
      }

      timeReduc = Math.min(0.75, timeReduc); // Cap at 75% reduction

      const finalTime = Math.floor(selectedMap.durationMinutes * (1 - timeReduc));
      const finalCost = Math.floor(selectedMap.ticketCost * Math.max(0.1, 1 - globalBuffs.costReduction));

      return {
         time: finalTime,
         creditBonus: Math.round(creditBoost * 100),
         affectionBonus: Math.round(affBoost * 100),
         originalTime: selectedMap.durationMinutes,
         finalCost
      };
   };

   const stats = getCalculatedStats();
   const [now, setNow] = useState(Date.now());
   useEffect(() => {
      const interval = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(interval);
   }, []);

   const getMaterialInfo = (itemId: string) => SHOP_ITEMS.find(i => i.id === itemId);

   const getEquipBuffText = (equip: InventoryItem) => {
      const val = Math.round((equip.effectValue || 0) * 100);
      if (equip.effectType === 'reduce_time') return { label: '探索時間', value: `-${val}%`, color: 'text-blue-400' };
      if (equip.effectType === 'boost_credits') return { label: '積分獎勵', value: `+${val}%`, color: 'text-yellow-400' };
      if (equip.effectType === 'boost_affection') return { label: '好感獎勵', value: `+${val}%`, color: 'text-pink-400' };
      return { label: '未知效果', value: '', color: 'text-gray-400' };
   };

   return (
      <div className="min-h-screen bg-gray-900 text-white p-6 overflow-hidden flex flex-col">
         {/* Header */}
         <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
               <button onClick={onBack} className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
               </button>
               <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                     星域探險中心
                  </h1>
                  <span className="text-xs text-gray-400 font-mono uppercase tracking-widest">Logistics Department</span>
               </div>
            </div>

            <div className="flex bg-gray-800 rounded-lg p-1">
               <button onClick={() => setActiveTab('maps')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'maps' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>調度任務</button>
               <button onClick={() => setActiveTab('active')} className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>進行中 ({activeExpeditions.length})</button>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeTab === 'maps' && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
                  {EXPEDITION_MAPS.map(map => {
                     const req = checkRequirements(map);
                     return (
                        <div
                           key={map.id}
                           className={`group relative rounded-2xl overflow-hidden border transition-all shadow-xl flex flex-col md:flex-row bg-gray-800 ${!req.allowed ? 'opacity-60 cursor-not-allowed border-gray-700' : 'cursor-pointer hover:border-blue-500'
                              }`}
                           onClick={() => req.allowed && setSelectedMap(map)}
                        >
                           <div className="relative h-48 md:h-auto md:w-2/5 overflow-hidden">
                              <div className="absolute inset-0 bg-gray-900">
                                 <img src={map.imageUrl} className={`w-full h-full object-cover ${!req.allowed && 'grayscale'}`} />
                                 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                              </div>
                              {!req.allowed && (
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                    <div className="bg-red-900/80 px-4 py-2 rounded-lg border border-red-500 text-red-200 text-xs font-bold flex items-center gap-2">
                                       <span>🔒</span> {req.reason}
                                    </div>
                                 </div>
                              )}
                              <div className="absolute top-3 left-3 flex flex-col gap-2">
                                 <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${map.difficulty === 'Easy' ? 'bg-green-600' : map.difficulty === 'Normal' ? 'bg-yellow-600' : 'bg-red-600'} text-white`}>{map.difficulty}</span>
                              </div>
                           </div>

                           <div className="p-5 flex-1 flex flex-col">
                              <div className="mb-4">
                                 <h3 className="text-2xl font-bold text-white mb-1">{map.name}</h3>
                                 <p className="text-gray-400 text-sm line-clamp-2">{map.description}</p>
                              </div>

                              {/* Yield Preview */}
                              <div className="mb-3 flex gap-4 items-center text-xs bg-gray-700/30 p-2 rounded border border-gray-700">
                                 <div className="flex items-center gap-1"><span className="text-lg">🪙</span> <span className="text-yellow-400 font-mono">{map.baseCreditReward}</span></div>
                                 <div className="flex items-center gap-1"><span className="text-lg">❤</span> <span className="text-pink-400 font-mono">{map.baseAffectionReward}</span></div>
                              </div>

                              {/* Drops Preview */}
                              <div className="mb-3 flex gap-2 items-center text-xs flex-wrap">
                                 <span className="text-gray-500 font-bold uppercase tracking-wide">物資:</span>
                                 {map.materialDrops?.map(drop => {
                                    const item = getMaterialInfo(drop.itemId);
                                    return item ? (
                                       <div key={drop.itemId} className="flex items-center gap-1 bg-gray-700/50 px-2 py-1 rounded border border-gray-600 text-gray-300" title={item.name}>
                                          <span>{item.icon}</span><span>{item.name}</span>
                                       </div>
                                    ) : null;
                                 })}
                              </div>
                              <div className="mt-auto flex items-center justify-between text-sm font-mono text-blue-300 pt-3 border-t border-gray-700/50">
                                 <div className="flex gap-4 items-center">
                                    <span>⏱ {(map.durationMinutes / 60).toFixed(1)}h</span>
                                    <span className={credits < map.ticketCost ? "text-red-500" : "text-yellow-400"}>🎫 {map.ticketCost}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}

            {activeTab === 'active' && (
               <div className="space-y-4 pb-10">
                  {activeExpeditions.length === 0 && <p className="text-gray-500 text-center py-10">目前沒有進行中的探險。</p>}
                  {activeExpeditions.map(exp => {
                     const map = EXPEDITION_MAPS.find(m => m.id === exp.mapId) || EXPEDITION_MAPS[0];
                     const totalDuration = exp.endTime - exp.startTime;
                     const timeLeft = Math.max(0, exp.endTime - now);
                     const progress = 100 - (timeLeft / totalDuration) * 100;
                     const isDone = timeLeft <= 0;
                     return (
                        <div key={exp.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center gap-6 relative overflow-hidden shadow-lg">
                           <div className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                           <div className="flex items-center gap-4 z-10">
                              <div className="flex -space-x-3">
                                 {exp.characterIds.map(cid => (
                                    <div key={cid} className="w-10 h-10 rounded-full border-2 border-gray-800 overflow-hidden bg-gray-700"><img src={customAvatars[cid] || getChar(cid)?.avatarUrl} className="w-full h-full object-cover" /></div>
                                 ))}
                              </div>
                              <div>
                                 <h3 className="font-bold text-white text-lg">{map.name}</h3>
                                 <div className="text-xs text-gray-400">收益加成: +{Math.round((exp.bonusCreditMult - 1) * 100)}%</div>
                              </div>
                           </div>
                           <div className="flex-1"></div>
                           <div className="text-right z-10">
                              {isDone ? (
                                 <button onClick={() => handleClaim(exp)} className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded shadow-lg animate-pulse">領取物資</button>
                              ) : (
                                 <span className="text-blue-400 font-mono font-bold">{Math.floor(timeLeft / (1000 * 60))}m</span>
                              )}
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>

         {/* Team Selection & Prep Modal */}
         {selectedMap && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
               <div className="bg-gray-800 w-full max-w-6xl h-[90vh] rounded-2xl border border-gray-700 flex flex-col overflow-hidden shadow-2xl">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-600">
                           <img src={selectedMap.imageUrl} className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-white">後勤調度準備</h2>
                           <p className="text-gray-400 text-sm">{selectedMap.name}</p>
                        </div>
                     </div>
                     <button onClick={() => { setSelectedMap(null); setSelectedTeam([]); setSelectedEquipmentId(undefined); }} className="text-gray-400 hover:text-white p-2">✕</button>
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                     {/* Left: Team Selection */}
                     <div className="flex-1 border-r border-gray-700 overflow-y-auto p-6 bg-gray-850">
                        <h3 className="text-lg font-bold text-white mb-4 flex justify-between">
                           <span>指派人員</span>
                           <span className={`text-sm ${selectedTeam.length === 2 ? 'text-green-400' : 'text-yellow-500'}`}>{selectedTeam.length}/2</span>
                        </h3>

                        {selectedMap.requiredFaction && (
                           <div className="mb-4 bg-blue-900/20 border border-blue-800 p-3 rounded-lg text-xs text-blue-300 flex items-center gap-2">
                              <span className="text-xl">⚠️</span> 此區域需要至少一名 <strong>{selectedMap.requiredFaction}</strong> 角色
                           </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                           {characters.map(char => {
                              const isSelected = selectedTeam.includes(char.id);
                              const hasBonus = char.passiveSkill && ['boost_credits', 'boost_affection'].includes(char.passiveSkill.effectType);
                              return (
                                 <button
                                    key={char.id}
                                    onClick={() => toggleTeamChar(char.id)}
                                    className={`relative p-2 rounded-xl border flex flex-col items-center gap-2 transition-all ${isSelected
                                       ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                       : 'bg-gray-700/30 border-gray-700 hover:bg-gray-700'
                                       }`}
                                 >
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 relative">
                                       <img src={customAvatars[char.id] || char.avatarUrl} className="w-full h-full object-cover" />
                                       {isSelected && <div className="absolute inset-0 bg-blue-500/20"></div>}
                                    </div>
                                    <div className="text-center w-full">
                                       <div className="text-sm font-bold text-gray-200 truncate w-full">{char.name}</div>
                                       {hasBonus && <div className="text-[9px] text-green-400 mt-1 bg-green-900/30 px-1 rounded border border-green-500/30">後勤專家</div>}
                                    </div>
                                    {isSelected && (
                                       <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-bold">✓</div>
                                    )}
                                 </button>
                              );
                           })}
                        </div>
                     </div>

                     {/* Right: Detailed Preview */}
                     <div className="w-full md:w-96 bg-gray-900 p-6 flex flex-col overflow-y-auto border-l border-gray-700 shadow-xl z-10">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                           <span>📊</span> 預期收益分析
                        </h3>

                        {/* Equipment Selector */}
                        <div className="mb-6">
                           <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-wider">搭載輔助裝備</label>
                           {availableEquipment.length > 0 ? (
                              <div className="grid grid-cols-5 gap-2">
                                 {availableEquipment.map(equip => (
                                    <button
                                       key={equip.id}
                                       onClick={() => setSelectedEquipmentId(selectedEquipmentId === equip.id ? undefined : equip.id)}
                                       className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-1 transition-all relative group ${selectedEquipmentId === equip.id
                                          ? 'bg-blue-600 border-blue-400 text-white shadow-lg scale-105'
                                          : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:bg-gray-750'
                                          }`}
                                       title={equip.description}
                                    >
                                       <div className="text-xl">{equip.icon}</div>
                                       {selectedEquipmentId === equip.id && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-gray-900"></div>}
                                    </button>
                                 ))}
                              </div>
                           ) : (
                              <div className="text-xs text-gray-600 italic bg-black/20 p-2 rounded">背包無可用裝備</div>
                           )}
                        </div>

                        <div className="space-y-4 mb-6 flex-1 overflow-y-auto pr-1 custom-scrollbar">

                           {/* 1. Global Buffs */}
                           <div className="bg-black/20 rounded-lg p-3 border border-gray-800">
                              <h4 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-700 pb-1 mb-2 flex justify-between">
                                 <span>家園設施 & 收藏</span>
                                 <span>Lv.{homeState.facilities.reduce((a, b) => a + b.level, 0)}</span>
                              </h4>
                              <div className="space-y-1 text-xs">
                                 {globalBuffs.costReduction > 0 && <BuffRow label="門票優惠" value={`-${Math.round(globalBuffs.costReduction * 100)}%`} color="text-green-400" />}
                                 {globalBuffs.creditBoost > 0 && <BuffRow label="積分加成" value={`+${Math.round(globalBuffs.creditBoost * 100)}%`} color="text-yellow-400" />}
                                 {globalBuffs.timeReduction > 0 && <BuffRow label="時間縮短" value={`-${Math.round(globalBuffs.timeReduction * 100)}%`} color="text-blue-400" />}
                                 {globalBuffs.affectionBoost > 0 && <BuffRow label="好感加成" value={`+${Math.round(globalBuffs.affectionBoost * 100)}%`} color="text-pink-400" />}
                                 {Object.values(globalBuffs).every(v => v === 0) && <span className="text-gray-600 italic">無加成</span>}
                              </div>
                           </div>

                           {/* 2. Team Buffs */}
                           <div className="bg-black/20 rounded-lg p-3 border border-gray-800">
                              <h4 className="text-xs font-bold text-gray-500 uppercase border-b border-gray-700 pb-1 mb-2">隊伍天賦</h4>
                              <div className="space-y-1 text-xs">
                                 {selectedTeam.length === 0 && <span className="text-gray-600 italic">尚未選擇隊員</span>}
                                 {selectedTeam.map(id => {
                                    const char = getChar(id);
                                    if (!char || !char.passiveSkill) return null;
                                    const skill = char.passiveSkill;
                                    let valStr = '';
                                    let color = 'text-gray-400';
                                    if (skill.effectType === 'reduce_time') { valStr = `時間 -${Math.round(skill.value * 100)}%`; color = 'text-blue-400'; }
                                    if (skill.effectType === 'boost_credits') { valStr = `積分 +${Math.round(skill.value * 100)}%`; color = 'text-yellow-400'; }
                                    if (skill.effectType === 'boost_affection') { valStr = `好感 +${Math.round(skill.value * 100)}%`; color = 'text-pink-400'; }
                                    return (
                                       <div key={id} className="flex justify-between items-center" title={skill.description}>
                                          <span className="text-gray-300">{char.name}</span>
                                          <span className={color}>{valStr}</span>
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>

                        {/* Footer Summary */}
                        <div className="mt-auto bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-inner">
                           <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                              <div className="bg-black/30 p-2 rounded">
                                 <span className="block text-gray-500 mb-0.5">預估時間</span>
                                 <span className="text-white font-bold text-sm">{(stats.time / 60).toFixed(1)}h <span className="text-gray-500 font-normal line-through text-[10px]">{(stats.originalTime / 60).toFixed(1)}h</span></span>
                              </div>
                              <div className="bg-black/30 p-2 rounded">
                                 <span className="block text-gray-500 mb-0.5">總收益加成</span>
                                 <span className="text-yellow-400 font-bold text-sm">+{stats.creditBonus}%</span>
                              </div>
                           </div>

                           <div className="flex justify-between items-center mb-3 pt-2 border-t border-gray-700/50">
                              <span className="text-sm font-bold text-gray-300">門票費用</span>
                              <span className={`text-lg font-mono font-bold ${credits < stats.finalCost ? "text-red-500" : "text-yellow-400"}`}>
                                 🪙 {stats.finalCost}
                              </span>
                           </div>

                           <button
                              onClick={handleStart}
                              disabled={selectedTeam.length !== 2 || credits < stats.finalCost}
                              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-bold rounded-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                           >
                              <span>🚀</span> 支付並出發
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Reward Claim Modal */}
         {claimResult && (
            <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4">
               <div className="bg-gray-800 max-w-2xl w-full rounded-2xl border border-yellow-500/30 p-8">
                  <h2 className="text-3xl font-black text-yellow-400 mb-6 text-center">任務完成 (MISSION COMPLETE)</h2>
                  <div className="bg-black/30 p-6 rounded-xl mb-6 text-gray-200 italic">"{claimResult.log}"</div>
                  <div className="flex justify-center gap-8 mb-8">
                     <div className="text-center"><div className="text-2xl font-bold text-yellow-300">+{claimResult.credits}</div><div className="text-xs uppercase">積分</div></div>
                     <div className="text-center"><div className="text-2xl font-bold text-pink-400">+{claimResult.affection}</div><div className="text-xs uppercase">好感</div></div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                     {claimResult.materials.map((m, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                           <div className="text-2xl">{m.icon}</div>
                           <div className="text-xs text-gray-200">{m.name}</div>
                           <div className="text-[10px] text-gray-400">x{m.count}</div>
                        </div>
                     ))}
                  </div>
                  <button onClick={confirmClaim} className="w-full py-4 bg-yellow-500 text-black font-black rounded-xl">收下物資</button>
               </div>
            </div>
         )}
      </div>
   );
};

export default ExpeditionCenter;
