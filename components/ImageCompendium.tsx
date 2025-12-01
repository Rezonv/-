
import React, { useState, useRef, useEffect } from 'react';
import { Character, InventoryItem, Enemy, RaidMap, DailyStage, RaidRegion } from '../types';
import { RAID_MAPS, RAID_REGIONS } from '../data/raids';
import { DAILY_STAGES } from '../data/farming';
import { ENEMIES } from '../data/enemies';
import { SHOP_ITEMS } from '../data/items';
import { CHARACTERS } from '../data/characters';
import { saveRegionImageToDB, getAllRegionImagesFromDB } from '../services/dbService';
import { ELEMENT_COLORS, ELEMENT_ICONS, getCharData, PATH_MAP_CN, ELEMENT_MAP_CN } from '../data/combatData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customCharacters?: Character[]; 
  mapImages: { [id: string]: string };
  onUploadMapImage: (id: string, file: File) => void;
  enemyImages: { [id: string]: string };
  onUploadEnemyImage: (id: string, file: File) => void;
  itemImages: { [id: string]: string };
  onUploadItemImage: (id: string, file: File) => void;
  characterAvatars: { [id: string]: string };
  onUploadCharacterImage: (id: string, file: File) => void;
  ultImages: { [id: string]: string };
  onUploadUltImage: (id: string, file: File) => void;
}

type Tab = 'ENEMIES' | 'CHARACTERS' | 'WORLD' | 'ITEMS';
type SubFilter = string; 

const CompendiumDetailModal: React.FC<{ 
    item: any, 
    type: 'ENEMY' | 'CHARACTER' | 'ITEM' | 'MAP' | 'REGION',
    image: string,
    onUpload?: () => void,
    onClose: () => void
}> = ({ item, type, image, onUpload, onClose }) => {
    const combatData = type === 'CHARACTER' ? getCharData(item.id, item.name) : null;
    const isGenshin = item.game === 'Genshin Impact';

    // Localization Logic
    const roleLabel = isGenshin ? '屬性' : '命途';
    const roleValue = combatData ? (isGenshin ? ELEMENT_MAP_CN[combatData.element] : PATH_MAP_CN[combatData.path]) : item.defaultRole;

    return (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-up-bounce" onClick={onClose}>
            <div className="bg-gray-900 w-full max-w-4xl h-[85vh] rounded-3xl border border-gray-700 shadow-2xl flex flex-col md:flex-row overflow-hidden relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-white z-50 bg-black/50 p-2 rounded-full hover:bg-white/20 transition-colors">✕</button>
                
                {/* Visual Side */}
                <div className="md:w-1/2 bg-black relative flex items-center justify-center group overflow-hidden bg-grid-pattern">
                    <img src={image} className="w-full h-full object-contain p-4" />
                    {onUpload && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={onUpload}>
                            <div className="border border-white text-white px-4 py-2 rounded-full font-bold hover:bg-white hover:text-black transition-colors">更換圖片</div>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded text-xs text-gray-400 font-mono border border-gray-700">
                        ID: {item.id}
                    </div>
                </div>

                {/* Info Side */}
                <div className="md:w-1/2 p-8 overflow-y-auto custom-scrollbar flex flex-col bg-gray-900">
                    <div className="mb-6 border-b border-gray-700 pb-4">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">{type} ARCHIVE</div>
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-black text-white mb-2">{item.name}</h2>
                            {type === 'CHARACTER' && (
                                <div className="text-yellow-400 text-xl tracking-tighter">
                                    {Array(item.rarity).fill('★').join('')}
                                </div>
                            )}
                        </div>
                        {type === 'ENEMY' && item.level && <div className="text-sm text-red-400 font-bold">威脅等級 Lv.{item.level}</div>}
                    </div>

                    <div className="space-y-6">
                        {item.description && (
                            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                <h3 className="text-xs text-gray-400 font-bold uppercase mb-2">描述</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        )}

                        {item.lore && (
                            <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                <h3 className="text-xs text-gray-400 font-bold uppercase mb-2">背景故事 (Lore)</h3>
                                <p className="text-gray-300 text-sm leading-relaxed italic">"{item.lore}"</p>
                            </div>
                        )}

                        {type === 'ENEMY' && (
                            <>
                                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                    <h3 className="text-xs text-gray-400 font-bold uppercase mb-2">弱點與抗性</h3>
                                    <div className="flex gap-2">
                                        {item.weaknesses?.map((w: string) => (
                                            <div key={w} className={`px-3 py-1 rounded bg-black border border-gray-600 text-xs font-bold ${ELEMENT_COLORS[w]}`}>
                                                {ELEMENT_ICONS[w]} {w}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {item.skillLore && (
                                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                        <h3 className="text-xs text-gray-400 font-bold uppercase mb-2">戰鬥技能</h3>
                                        <p className="text-gray-300 text-sm">{item.skillLore}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {type === 'CHARACTER' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                        <div className="text-xs text-gray-500 uppercase">{roleLabel}</div>
                                        <div className="text-white font-bold">{roleValue}</div>
                                    </div>
                                    <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                        <div className="text-xs text-gray-500 uppercase">所屬區域</div>
                                        <div className="text-white font-bold">{item.region || item.game}</div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                                    <div className="text-xs text-gray-500 uppercase">身分頭銜</div>
                                    <div className="text-white font-bold">{item.defaultRole}</div>
                                </div>

                                {combatData && (
                                    <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                                        <h3 className="text-xs text-gray-400 font-bold uppercase mb-3 tracking-wider">戰鬥技能</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] bg-gray-700 px-1.5 py-0.5 rounded text-gray-300 border border-gray-600">普攻</span>
                                                    <span className="text-sm font-bold text-white">{combatData.basicName}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 pl-1 border-l-2 border-gray-600">對敵方單體造成傷害。</p> 
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] bg-blue-900/40 px-1.5 py-0.5 rounded text-blue-300 border border-blue-500/30">戰技</span>
                                                    <span className="text-sm font-bold text-white">{combatData.skillName}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 pl-1 border-l-2 border-blue-500/30">{combatData.skillDesc}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[10px] bg-yellow-900/40 px-1.5 py-0.5 rounded text-yellow-300 border border-yellow-500/30">終結技</span>
                                                    <span className="text-sm font-bold text-white">{combatData.ultName}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 pl-1 border-l-2 border-yellow-500/30">{combatData.ultDesc}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ImageCompendium: React.FC<Props> = ({
  isOpen, onClose,
  customCharacters = [],
  mapImages, onUploadMapImage,
  enemyImages, onUploadEnemyImage,
  itemImages, onUploadItemImage,
  characterAvatars, onUploadCharacterImage,
  ultImages, onUploadUltImage
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('ENEMIES');
  const [activeFilter, setActiveFilter] = useState<SubFilter>('ALL');
  const [selectedDetail, setSelectedDetail] = useState<{item: any, type: any, image: string, onUpload: () => void} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadHandler, setUploadHandler] = useState<((file: File) => void) | null>(null);
  const [regionImages, setRegionImages] = useState<{[key:string]: string}>({});

  useEffect(() => {
      if(isOpen) getAllRegionImagesFromDB().then(setRegionImages);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGlobalUpload = (handler: (file: File) => void) => {
      setUploadHandler(() => handler);
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && uploadHandler) {
          uploadHandler(file);
      }
      if(fileInputRef.current) fileInputRef.current.value = '';
      setUploadHandler(null);
  };

  const getRarityStyle = (rarity: number) => {
      if (rarity === 5) return 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]';
      if (rarity === 4) return 'border-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.4)]';
      return 'border-blue-500';
  };

  // --- TAB CONTENT RENDERERS ---

  const renderEnemies = () => {
      const regions = RAID_REGIONS;
      const getRegionName = (id: string) => regions.find(r => r.id === id)?.name || '未知區域';
      
      let displayEnemies = ENEMIES;
      if (activeFilter !== 'ALL') {
          displayEnemies = ENEMIES.filter(e => e.regionId === activeFilter);
      }

      return (
          <div className="h-full flex flex-col">
              <div className="flex gap-2 overflow-x-auto pb-4 shrink-0 custom-scrollbar-hide mb-2">
                  <button onClick={() => setActiveFilter('ALL')} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${activeFilter === 'ALL' ? 'bg-white text-black border-white' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'}`}>全部</button>
                  {regions.map(r => (
                      <button key={r.id} onClick={() => setActiveFilter(r.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${activeFilter === r.id ? 'bg-red-600 text-white border-red-500' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                          {r.name}
                      </button>
                  ))}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pb-20 custom-scrollbar pr-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {displayEnemies.map(e => {
                          const img = enemyImages[e.id];
                          return (
                              <div 
                                key={e.id} 
                                onClick={() => setSelectedDetail({
                                    item: e, 
                                    type: 'ENEMY', 
                                    image: img, 
                                    onUpload: () => handleGlobalUpload((f) => onUploadEnemyImage(e.id, f))
                                })}
                                className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-red-500 transition-all cursor-pointer group relative aspect-[3/4]"
                              >
                                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                                      {img ? <img src={img} className="w-full h-full object-cover" /> : <div className="text-4xl opacity-20">👾</div>}
                                  </div>
                                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6">
                                      <div className="text-[10px] text-gray-400 uppercase truncate">{getRegionName(e.regionId || '')}</div>
                                      <div className="font-bold text-sm text-white truncate">{e.name}</div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      );
  };

  const renderCharacters = () => {
      const allChars = [...customCharacters, ...CHARACTERS];
      const uniqueChars = Array.from(new Map(allChars.map(c => [c.id, c])).values());
      const games = ['Honkai: Star Rail', 'Genshin Impact', 'Original'];

      let displayChars = uniqueChars;
      if (activeFilter !== 'ALL') displayChars = uniqueChars.filter(c => c.game === activeFilter);

      return (
          <div className="h-full flex flex-col">
              <div className="flex gap-2 mb-4 shrink-0">
                  <button onClick={() => setActiveFilter('ALL')} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${activeFilter === 'ALL' ? 'bg-white text-black border-white' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>全部</button>
                  {games.map(g => (
                      <button key={g} onClick={() => setActiveFilter(g)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${activeFilter === g ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                          {g}
                      </button>
                  ))}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pb-20 custom-scrollbar pr-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {displayChars.map(c => {
                          const img = characterAvatars[c.id] || c.avatarUrl;
                          const combatData = getCharData(c.id, c.name);
                          const isGenshin = c.game === 'Genshin Impact';
                          const roleText = isGenshin ? ELEMENT_MAP_CN[combatData.element] : PATH_MAP_CN[combatData.path];
                          const rarityColorClass = getRarityStyle(c.rarity);

                          return (
                              <div 
                                key={c.id} 
                                onClick={() => setSelectedDetail({
                                    item: c, 
                                    type: 'CHARACTER', 
                                    image: ultImages[c.id] || img, 
                                    onUpload: () => handleGlobalUpload((f) => onUploadUltImage(c.id, f))
                                })}
                                className={`bg-gray-800 border-2 rounded-xl overflow-hidden transition-all cursor-pointer group aspect-[2/3] relative ${rarityColorClass}`}
                              >
                                  <div className="absolute inset-0">
                                      <img src={img} className="w-full h-full object-cover" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                      
                                      {/* Rarity Stars Top Right */}
                                      <div className="absolute top-2 right-2 text-[10px] text-yellow-400 tracking-tighter drop-shadow-md">
                                          {Array(c.rarity).fill('★').join('')}
                                      </div>

                                      <div className="absolute bottom-3 left-3 right-3">
                                          <div className="font-bold text-white text-sm truncate">{c.name}</div>
                                          <div className="flex justify-between items-end">
                                              <div className="text-[10px] text-gray-400 truncate max-w-[50%]">{c.defaultRole}</div>
                                              <div className="flex gap-1">
                                                  {c.region && <div className="text-[9px] text-pink-300 bg-pink-900/30 px-1 rounded truncate max-w-[60px]">{c.region}</div>}
                                                  {roleText && <div className="text-[9px] text-blue-300 bg-blue-900/30 px-1 rounded">{roleText}</div>}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      );
  };

  const renderWorld = () => {
      // Maps and Regions
      const maps = [...RAID_MAPS, ...DAILY_STAGES.map(d => ({...d, description: '每日輪替關卡', regionId: 'DAILY'}))];
      return (
          <div className="h-full flex flex-col overflow-y-auto custom-scrollbar pb-20 pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 shrink-0">
                  {RAID_REGIONS.map(r => (
                      <div 
                        key={r.id} 
                        onClick={() => setSelectedDetail({
                            item: r, type: 'REGION', image: regionImages[r.id] || r.imageUrl, 
                            onUpload: () => handleGlobalUpload(async (f) => {
                                const reader = new FileReader();
                                reader.onload = async (e) => {
                                    if(e.target?.result) {
                                        const url = e.target.result as string;
                                        setRegionImages(prev => ({...prev, [r.id]: url}));
                                        await saveRegionImageToDB(r.id, url);
                                    }
                                };
                                reader.readAsDataURL(f);
                            })
                        })}
                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 relative h-40 cursor-pointer hover:border-blue-500 group w-full"
                      >
                          <img src={regionImages[r.id] || r.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute bottom-0 w-full bg-black/70 p-4 backdrop-blur-sm">
                              <h3 className="font-bold text-white text-lg">{r.name}</h3>
                              <p className="text-xs text-gray-400">{r.description}</p>
                          </div>
                      </div>
                  ))}
              </div>
              <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-yellow-500 shrink-0">戰鬥關卡</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {maps.map(m => (
                      <div 
                        key={m.id}
                        onClick={() => setSelectedDetail({
                            item: m, type: 'MAP', image: mapImages[m.id] || (m as any).imageUrl,
                            onUpload: () => handleGlobalUpload((f) => onUploadMapImage(m.id, f))
                        })}
                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 cursor-pointer hover:border-yellow-500 h-40 relative group w-full"
                      >
                          <img src={mapImages[m.id] || (m as any).imageUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100" />
                          <div className="absolute bottom-0 w-full bg-black/80 p-2 truncate text-xs text-center text-white">{m.name}</div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  const renderItems = () => {
      const types = ['material', 'consumable', 'equipment', 'gift', 'currency'];
      let displayItems = SHOP_ITEMS;
      if (activeFilter !== 'ALL') displayItems = SHOP_ITEMS.filter(i => i.type === activeFilter);

      return (
          <div className="h-full flex flex-col">
              <div className="flex gap-2 mb-4 overflow-x-auto custom-scrollbar-hide shrink-0">
                  <button onClick={() => setActiveFilter('ALL')} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${activeFilter === 'ALL' ? 'bg-white text-black border-white' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>全部</button>
                  {types.map(t => (
                      <button key={t} onClick={() => setActiveFilter(t)} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap uppercase ${activeFilter === t ? 'bg-purple-600 text-white border-purple-500' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                          {t}
                      </button>
                  ))}
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pb-20 custom-scrollbar pr-2">
                  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-3">
                      {displayItems.map(item => {
                          let borderColor = 'border-gray-700';
                          if (item.rarity === 'SSR') borderColor = 'border-yellow-500';
                          if (item.rarity === 'SR') borderColor = 'border-purple-500';
                          if (item.rarity === 'R') borderColor = 'border-blue-500';

                          return (
                              <div 
                                key={item.id}
                                onClick={() => setSelectedDetail({
                                    item, type: 'ITEM', image: itemImages[item.id], 
                                    onUpload: () => handleGlobalUpload((f) => onUploadItemImage(item.id, f))
                                })}
                                className={`bg-gray-800 p-2 rounded-xl border-2 flex flex-col items-center cursor-pointer hover:bg-gray-700 transition-colors aspect-square ${borderColor}`}
                              >
                                  <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                                      {itemImages[item.id] ? <img src={itemImages[item.id]} className="w-full h-full object-contain"/> : <span className="text-3xl">{item.icon}</span>}
                                  </div>
                                  <div className="text-[10px] text-center text-gray-300 truncate w-full px-1 mt-1 bg-black/20 rounded">{item.name}</div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900 text-white flex animate-fade-in overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-20 md:w-64 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-gray-800 flex items-center gap-3">
              <button onClick={onClose} className="text-gray-400 hover:text-white md:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
              <h1 className="text-xl font-black text-white tracking-widest hidden md:block">ARCHIVE</h1>
          </div>
          <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {[
                  { id: 'ENEMIES', icon: '👾', label: '生物圖鑑' },
                  { id: 'CHARACTERS', icon: '👥', label: '角色檔案' },
                  { id: 'WORLD', icon: '🌍', label: '世界地理' },
                  { id: 'ITEMS', icon: '📦', label: '物資清單' }
              ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as Tab); setActiveFilter('ALL'); }}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-gray-800 text-white border-r-4 border-pink-500' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}
                  >
                      <span className="text-2xl">{tab.icon}</span>
                      <span className="hidden md:block">{tab.label}</span>
                  </button>
              ))}
          </nav>
          <div className="p-6 border-t border-gray-800 hidden md:block">
              <button onClick={onClose} className="w-full py-3 border border-gray-600 rounded-xl text-gray-400 hover:text-white hover:border-gray-400 transition-colors font-bold">返回首頁</button>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900 p-4 md:p-8 overflow-hidden relative">
          <div className="absolute top-4 right-4 md:hidden z-10">
              <button onClick={onClose} className="text-gray-400 p-2 bg-black/50 rounded-full">✕</button>
          </div>
          
          <div className="flex-1 min-h-0 h-full">
              {activeTab === 'ENEMIES' && renderEnemies()}
              {activeTab === 'CHARACTERS' && renderCharacters()}
              {activeTab === 'WORLD' && renderWorld()}
              {activeTab === 'ITEMS' && renderItems()}
          </div>
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
          <CompendiumDetailModal 
              item={selectedDetail.item} 
              type={selectedDetail.type} 
              image={selectedDetail.image} 
              onUpload={selectedDetail.onUpload}
              onClose={() => setSelectedDetail(null)} 
          />
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default ImageCompendium;
