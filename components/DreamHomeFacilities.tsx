
import React from 'react';
import { Character, FacilityState, InventoryItem } from '../types';
import { FACILITIES } from '../data/facilities';
import { SHOP_ITEMS } from '../data/items';

interface Props {
  facilitiesState: FacilityState[];
  characters: Character[];
  inventory: InventoryItem[];
  credits: number;
  customAvatars: { [key: string]: string };
  activeCharId: string | null;
  onUnlock: (id: string) => void;
  onUpgrade: (id: string) => void;
  onSelectFacility: (id: string) => void;
  onSelectCharForChat: (facId: string, charId: string) => void;
}

const DreamHomeFacilities: React.FC<Props> = ({
  facilitiesState,
  characters,
  inventory,
  credits,
  customAvatars,
  activeCharId,
  onUnlock,
  onUpgrade,
  onSelectFacility,
  onSelectCharForChat
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {FACILITIES.map(config => {
        const state = facilitiesState.find(f => f.id === config.id);
        const isLocked = !state;
        const assignedChar = state?.assignedCharId ? characters.find(c => c.id === state.assignedCharId) : null;
        const upgradeCost = state ? Math.floor(config.baseCost * Math.pow(config.costMultiplier, state.level)) : 0;
        
        let upgradeRequirements = config.upgradeRequirements || [];
        if (upgradeRequirements.length === 0 && config.upgradeMaterialId && config.baseMaterialCost) {
            upgradeRequirements = [{ itemId: config.upgradeMaterialId, baseAmount: config.baseMaterialCost }];
        }

        const isSelected = assignedChar && assignedChar.id === activeCharId;

        return (
          <div 
            key={config.id} 
            className={`relative h-96 rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group shadow-xl ${
              isLocked ? 'border-gray-700 grayscale' 
              : isSelected 
                ? 'border-pink-500 ring-2 ring-pink-500/50 scale-[1.01]'
                : 'border-gray-700 hover:border-gray-500 hover:scale-[1.01]'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-900">
                {config.imageUrl && !isLocked && (
                  <img src={config.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                )}
                <div className={`absolute inset-0 bg-gradient-to-t ${isLocked ? 'from-gray-900 to-gray-800' : 'from-gray-900 via-gray-900/50 to-transparent'}`}></div>
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col h-full p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <span className="text-xl">{config.icon}</span>
                      <h3 className="font-bold text-white text-sm">{config.name}</h3>
                      {state && <span className="text-xs text-yellow-400 font-mono ml-1">Lv.{state.level}</span>}
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center relative">
                  {isLocked ? (
                    <div className="text-center">
                        <span className="text-4xl opacity-30 block mb-2">🔒</span>
                        <button onClick={() => onUnlock(config.id)} className="px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                          解鎖 ({config.unlockPrice})
                        </button>
                    </div>
                  ) : assignedChar ? (
                      <div className="flex flex-col items-center cursor-pointer group/sprite relative" onClick={() => onSelectCharForChat(config.id, assignedChar.id)}>
                        <div className={`w-20 h-20 rounded-2xl border-4 ${isSelected ? 'border-pink-400' : 'border-white'} overflow-hidden bg-gray-800 animate-bounce-slow shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                            <img src={customAvatars[assignedChar.id] || assignedChar.avatarUrl} className="w-full h-full object-cover" />
                        </div>
                      </div>
                  ) : (
                      <button onClick={() => onSelectFacility(config.id)} className="w-16 h-16 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center text-gray-400 hover:text-white text-2xl">+</button>
                  )}
                </div>

                {!isLocked && (
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="text-[10px] text-blue-300 bg-blue-900/60 backdrop-blur px-2 py-1 rounded border border-blue-500/30 text-center shadow-sm">
                        Buff: {config.globalBuffDescription}
                    </div>

                    {state && (
                      <div className="flex flex-col gap-2 bg-black/60 p-2 rounded-lg backdrop-blur-md border border-white/5">
                          <div className="flex flex-wrap gap-1 justify-center">
                              {upgradeRequirements.map((req, idx) => {
                                  const itemInfo = SHOP_ITEMS.find(i => i.id === req.itemId);
                                  const reqAmount = Math.floor(req.baseAmount * Math.pow(1.3, state.level - 1));
                                  const owned = inventory.find(i => i.id === req.itemId)?.count || 0;
                                  const hasEnough = owned >= reqAmount;
                                  return (
                                      <div key={idx} className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border ${hasEnough ? 'border-gray-600 text-gray-300' : 'border-red-500/50 text-red-300 bg-red-900/20'}`} title={itemInfo?.name}>
                                          <span>{itemInfo?.icon}</span>
                                          <span>{owned}/{reqAmount}</span>
                                      </div>
                                  );
                              })}
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); onUpgrade(config.id); }} className="w-full bg-blue-600/80 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-1 transition-all">
                            <span>⚡ 升級</span>
                            <span className="text-yellow-200 font-mono">({upgradeCost})</span>
                          </button>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DreamHomeFacilities;
