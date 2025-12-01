
import React, { useState } from 'react';
import { InventoryItem, Character } from '../types';

interface Props {
  inventory: InventoryItem[];
  characters: Character[];
  onBack: () => void;
  onEquip: (charId: string, itemId: string, slot: 'weapon' | 'armor' | 'accessory') => void;
  itemImages?: { [id: string]: string };
}

const InventorySystem: React.FC<Props> = ({ inventory, characters, onBack, onEquip, itemImages = {} }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'EQUIPMENT' | 'MATERIAL' | 'GIFT'>('ALL');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [equipTargetId, setEquipTargetId] = useState<string>('');

  const filteredItems = inventory.filter(i => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'EQUIPMENT') return i.type === 'equipment';
    if (activeTab === 'MATERIAL') return i.type === 'material' || i.type === 'consumable';
    if (activeTab === 'GIFT') return i.type === 'gift';
    return true;
  });

  const handleEquip = () => {
     if (!selectedItem || !selectedItem.equipType || !equipTargetId) return;
     onEquip(equipTargetId, selectedItem.id, selectedItem.equipType);
     alert(`已裝備 ${selectedItem.name} 於 ${characters.find(c=>c.id===equipTargetId)?.name}`);
     setEquipTargetId('');
  };

  const handleSalvage = () => {
      if (!selectedItem) return;
      if (selectedItem.type !== 'equipment') return alert("只能分解裝備");
      
      const confirmSalvage = window.confirm(`確定要分解 ${selectedItem.name} 嗎？\n將獲得 強化粉塵 與 少量信用點。`);
      if (confirmSalvage) {
          alert(`已分解 ${selectedItem.name}！\n獲得：強化粉塵 x5, 信用點 x500`);
      }
  };

  const getRarityStyle = (rarity?: string) => {
      if (rarity === 'SSR') return 'border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)] bg-gradient-to-br from-yellow-900/20 to-gray-800';
      if (rarity === 'SR') return 'border-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.3)] bg-gradient-to-br from-purple-900/20 to-gray-800';
      if (rarity === 'R') return 'border-blue-500 bg-gradient-to-br from-blue-900/20 to-gray-800';
      return 'border-gray-700 bg-gray-800';
  };

  const getRarityBadge = (rarity?: string) => {
      if (rarity === 'SSR') return <span className="text-[10px] font-bold text-yellow-400 bg-black/60 px-1.5 rounded border border-yellow-500/50">5★</span>;
      if (rarity === 'SR') return <span className="text-[10px] font-bold text-purple-400 bg-black/60 px-1.5 rounded border border-purple-500/50">4★</span>;
      if (rarity === 'R') return <span className="text-[10px] font-bold text-blue-400 bg-black/60 px-1.5 rounded border border-blue-500/50">3★</span>;
      return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col animate-fade-in">
       {/* Header */}
       <div className="p-6 border-b border-gray-700 bg-gray-900/90 backdrop-blur flex justify-between items-center">
          <div className="flex items-center gap-4">
             <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-full border border-gray-700"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
             <h1 className="text-2xl font-bold tracking-widest uppercase">背包</h1>
          </div>
          <div className="flex bg-gray-800 rounded-lg p-1">
             {(['ALL', 'EQUIPMENT', 'GIFT', 'MATERIAL'] as const).map(t => (
                <button key={t} onClick={() => { setActiveTab(t); setSelectedItem(null); }} className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${activeTab === t ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                   {t === 'ALL' ? '全部' : t === 'EQUIPMENT' ? '裝備' : t === 'GIFT' ? '禮物' : '素材'}
                </button>
             ))}
          </div>
       </div>

       <div className="flex-1 flex overflow-hidden">
          {/* Grid */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-gray-900">
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {filteredItems.map(item => (
                   <div 
                     key={item.id} 
                     onClick={() => setSelectedItem(item)}
                     className={`aspect-square border-2 rounded-xl flex flex-col items-center justify-center p-2 cursor-pointer transition-all hover:scale-105 relative overflow-hidden ${
                        selectedItem?.id === item.id 
                           ? 'ring-2 ring-white scale-105' 
                           : ''
                     } ${getRarityStyle(item.rarity)}`}
                   >
                      {itemImages[item.id] ? (
                          <img src={itemImages[item.id]} className="w-full h-full object-cover absolute inset-0 opacity-90 hover:opacity-100" />
                      ) : (
                          <div className="text-4xl mb-2 drop-shadow-md">{item.icon}</div>
                      )}
                      
                      {/* Rarity Badge Top Left */}
                      <div className="absolute top-1 left-1 z-10">
                          {getRarityBadge(item.rarity)}
                      </div>

                      <div className="text-center w-full z-10 relative bg-black/60 backdrop-blur-sm rounded p-1 mt-auto border-t border-white/10">
                         <div className="text-xs font-bold truncate px-1 text-white">{item.name}</div>
                         <div className="text-[10px] text-gray-300">x{item.count}</div>
                      </div>
                   </div>
                ))}
             </div>
             {filteredItems.length === 0 && <div className="text-center text-gray-500 mt-20">沒有物品</div>}
          </div>

          {/* Sidebar Detail */}
          <div className="w-80 bg-gray-850 border-l border-gray-700 p-6 flex flex-col shadow-2xl z-10">
             {selectedItem ? (
                <>
                   <div className={`w-24 h-24 mx-auto rounded-xl flex items-center justify-center text-6xl border-2 shadow-inner mb-6 overflow-hidden ${getRarityStyle(selectedItem.rarity)}`}>
                      {itemImages[selectedItem.id] ? <img src={itemImages[selectedItem.id]} className="w-full h-full object-cover"/> : selectedItem.icon}
                   </div>
                   <h2 className="text-xl font-bold text-center mb-1">{selectedItem.name}</h2>
                   <div className="flex justify-center gap-2 mb-4">
                      {selectedItem.rarity && (
                          <span className={`text-[10px] px-2 py-0.5 rounded text-white font-bold ${selectedItem.rarity === 'SSR' ? 'bg-yellow-600' : selectedItem.rarity === 'SR' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                              {selectedItem.rarity === 'SSR' ? '5★ SSR' : selectedItem.rarity === 'SR' ? '4★ SR' : '3★ R'}
                          </span>
                      )}
                      <span className="text-[10px] bg-gray-700 px-2 py-0.5 rounded text-gray-300">{selectedItem.type?.toUpperCase()}</span>
                   </div>
                   
                   <div className="bg-gray-800 p-4 rounded-lg text-sm text-gray-300 leading-relaxed mb-6 border border-gray-700">
                      {selectedItem.description}
                   </div>

                   {selectedItem.type === 'equipment' && (
                      <div className="mt-auto space-y-2">
                         <select 
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 text-sm"
                            value={equipTargetId}
                            onChange={(e) => setEquipTargetId(e.target.value)}
                         >
                            <option value="">選擇角色以裝備</option>
                            {characters.map(c => (
                               <option key={c.id} value={c.id}>
                                   {'★'.repeat(c.rarity)} {c.name}
                               </option>
                            ))}
                         </select>
                         <div className="flex gap-2">
                             <button onClick={handleEquip} disabled={!equipTargetId} className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white py-2 rounded-lg font-bold transition-colors">裝備</button>
                             <button onClick={handleSalvage} className="flex-1 bg-red-900/50 hover:bg-red-700 text-red-200 border border-red-700 py-2 rounded-lg font-bold transition-colors">分解</button>
                         </div>
                      </div>
                   )}

                   {selectedItem.type === 'gift' && (
                       <div className="mt-auto text-center text-xs text-gray-500 bg-gray-800 p-3 rounded border border-gray-700">
                           請在「故事模式」或「家園」中送出禮物
                       </div>
                   )}
                </>
             ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                   選擇一個物品查看詳情
                </div>
             )}
          </div>
       </div>
    </div>
  );
};

export default InventorySystem;
