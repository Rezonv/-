
import React from 'react';
import { ShowcaseSlot } from '../types';
import { SHOP_ITEMS } from '../data/items';

interface Props {
  showcaseSlots: ShowcaseSlot[];
  activeBuffs: Record<string, number>;
  onSlotClick: (slotId: string, itemId?: string) => void;
}

const DreamHomeShowcase: React.FC<Props> = ({ showcaseSlots, activeBuffs, onSlotClick }) => {
  return (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 min-h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://pollinations.ai/p/museum%20gallery%20interior%20anime%20style%20background')] bg-cover opacity-10"></div>
      <div className="relative z-10">
          <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">🏆 收藏展示室</h2>
                <p className="text-gray-400 text-sm mt-1">展示珍稀藏品以獲得全域加成</p>
            </div>
            <div className="text-right text-xs text-gray-300 bg-black/40 p-3 rounded-lg border border-gray-600">
                <div className="font-bold text-gray-400 mb-1 uppercase">Current Buffs</div>
                {activeBuffs.creditBoost && <div className="text-yellow-400">積分收益 +{Math.round(activeBuffs.creditBoost * 100)}%</div>}
                {activeBuffs.affectionBoost && <div className="text-pink-400">好感收益 +{Math.round(activeBuffs.affectionBoost * 100)}%</div>}
                {activeBuffs.rareDropBoost && <div className="text-purple-400">稀有掉落 +{Math.round(activeBuffs.rareDropBoost * 100)}%</div>}
                {Object.keys(activeBuffs).length === 0 && <div className="text-gray-500">無加成</div>}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {showcaseSlots.map(slot => {
                const item = slot.itemId ? SHOP_ITEMS.find(i => i.id === slot.itemId) : null;
                return (
                  <div 
                    key={slot.id} 
                    className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center relative transition-all ${!slot.unlocked ? 'border-gray-800 bg-black/20' : item ? 'border-yellow-500/50 bg-yellow-900/10 shadow-[0_0_20px_rgba(234,179,8,0.1)]' : 'border-gray-600 bg-gray-800/50 hover:border-gray-400 cursor-pointer border-dashed'}`}
                    onClick={() => { if (slot.unlocked) onSlotClick(slot.id, slot.itemId); }}
                  >
                    {!slot.unlocked ? <span className="text-2xl opacity-20">🔒</span> : item ? <><div className="text-5xl mb-2 drop-shadow-md animate-float">{item.icon}</div><div className="text-xs font-bold text-yellow-200 text-center px-2">{item.name}</div><div className="absolute top-2 right-2 text-red-400 opacity-0 hover:opacity-100 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">✕</div></> : <span className="text-gray-500 text-sm font-bold">點擊展示</span>}
                  </div>
                );
            })}
          </div>
      </div>
    </div>
  );
};

export default DreamHomeShowcase;
