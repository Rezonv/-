
import React, { useState } from 'react';
import { ShopItem } from '../types';
import { SHOP_ITEMS } from '../data/items';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
  onBuy: (item: ShopItem) => void;
}

const ShopSystem: React.FC<Props> = ({ isOpen, onClose, credits, onBuy }) => {
  const [filter, setFilter] = useState<'ALL' | 'GIFT' | 'EQUIPMENT' | 'MATERIAL'>('ALL');
  const [gameFilter, setGameFilter] = useState<'ALL' | 'HSR' | 'GENSHIN'>('ALL');

  if (!isOpen) return null;

  const filteredItems = SHOP_ITEMS.filter(item => {
    if (item.purchasable === false) return false;

    if (filter !== 'ALL') {
        if (filter === 'GIFT' && item.type !== 'gift') return false;
        if (filter === 'EQUIPMENT' && item.type !== 'equipment') return false;
        if (filter === 'MATERIAL' && item.type !== 'material') return false;
    }

    if (gameFilter !== 'ALL') {
        if (!item.targetCharacterId) return false;
        if (gameFilter === 'HSR' && item.targetCharacterId && !['kafka', 'firefly', 'silverwolf', 'blackswan', 'himeko', 'qingque', 'acheron'].includes(item.targetCharacterId)) return false;
        if (gameFilter === 'GENSHIN' && item.targetCharacterId && !['raiden', 'yaemiko', 'furina', 'beidou', 'keqing', 'mualani'].includes(item.targetCharacterId)) return false;
    }
    
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 text-white flex flex-col overflow-hidden animate-fade-in">
        <div className="absolute inset-0 z-0 bg-[url('https://pollinations.ai/p/cyberpunk%20market%20stall%20vendor%20future%20neon%20lights%20anime%20background')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent"></div>

        <div className="relative z-10 p-4 md:p-6 flex justify-between items-center border-b border-gray-700/50 bg-gray-900/60 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-4">
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors border border-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <div>
                    <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 uppercase">
                        物資補給站
                    </h1>
                    <p className="text-xs text-gray-400 tracking-widest uppercase">獲取資源與禮物</p>
                </div>
            </div>
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                <span className="text-xl">🪙</span>
                <span className="font-mono text-xl md:text-2xl font-bold text-yellow-400">{credits}</span>
            </div>
        </div>

        <div className="relative z-10 px-4 md:px-6 py-4 flex gap-4 items-center bg-gray-800/30 border-b border-gray-700/30 backdrop-blur-sm overflow-x-auto shrink-0 custom-scrollbar-hide">
            <div className="flex bg-gray-900/80 rounded-lg p-1 border border-gray-700 shrink-0">
                {[
                    { key: 'ALL', label: '全部' },
                    { key: 'GIFT', label: '禮物' },
                    { key: 'EQUIPMENT', label: '裝備' }
                ].map(f => (
                    <button key={f.key} onClick={() => setFilter(f.key as any)} className={`px-4 md:px-6 py-2 rounded-md text-xs font-bold transition-all whitespace-nowrap ${filter === f.key ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                        {f.label}
                    </button>
                ))}
            </div>
            <div className="w-px h-8 bg-gray-700 mx-2 shrink-0"></div>
            <div className="flex gap-2 shrink-0">
                 {[
                     { key: 'ALL', label: '全宇宙' },
                     { key: 'HSR', label: '星穹' },
                     { key: 'GENSHIN', label: '原神' }
                 ].map(g => (
                    <button key={g.key} onClick={() => setGameFilter(g.key as any)} className={`px-3 py-1 rounded-full border text-xs font-bold transition-colors whitespace-nowrap ${gameFilter === g.key ? 'bg-blue-900/50 border-blue-400 text-blue-300' : 'border-gray-700 text-gray-500 hover:border-gray-500'}`}>
                        {g.label}
                    </button>
                 ))}
            </div>
        </div>

        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto p-4 md:p-6 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-32">
                {filteredItems.map(item => (
                    <div key={item.id} className="group bg-gray-800/80 backdrop-blur border border-gray-700 rounded-xl overflow-hidden hover:border-pink-500/50 transition-all hover:bg-gray-800 shadow-lg flex flex-col h-full min-h-[160px]">
                        <div className="p-4 flex gap-4 items-start flex-1">
                            <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-4xl shadow-inner shrink-0 ${item.rarity === 'SSR' ? 'bg-gradient-to-br from-yellow-900 to-black border border-yellow-700' : 'bg-gray-900 border border-gray-700'}`}>
                                {item.icon}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    {item.rarity && <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${item.rarity==='SSR'?'bg-yellow-500 text-black':item.rarity==='SR'?'bg-purple-600 text-white':'bg-blue-600 text-white'}`}>{item.rarity}</span>}
                                    <h3 className="font-bold text-gray-100 truncate w-full">{item.name}</h3>
                                </div>
                                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                        
                        <div className="mt-auto p-3 bg-black/20 border-t border-gray-700/50 flex justify-between items-center group-hover:bg-pink-900/10 transition-colors">
                            <div className="flex flex-col">
                               <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">價格</span>
                               <span className="text-yellow-400 font-mono font-bold">🪙 {item.price}</span>
                            </div>
                            <button 
                               onClick={() => onBuy(item)} 
                               disabled={credits < item.price}
                               className="bg-gray-700 hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-gray-700 disabled:hover:text-white text-white px-6 py-2 rounded-lg font-bold text-xs transition-all active:scale-95"
                            >
                               購買
                            </button>
                        </div>
                    </div>
                ))}
                {filteredItems.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        沒有符合條件的商品
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ShopSystem;
