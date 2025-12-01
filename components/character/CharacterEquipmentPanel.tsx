
import React from 'react';
import { Character, InventoryItem } from '../../types';

interface Props {
    character: Character;
    inventory: InventoryItem[];
    onUnequipItem: (charId: string, slot: 'weapon' | 'armor' | 'accessory') => void;
    onOpenEquipModal: (slot: 'weapon' | 'armor' | 'accessory') => void;
    onQuickEquip: () => void;
}

const CharacterEquipmentPanel: React.FC<Props> = ({
    character, inventory, onUnequipItem, onOpenEquipModal, onQuickEquip
}) => {
    return (
        <div className="space-y-6 animate-fade-in-right">
            <div className="flex justify-end">
                <button onClick={onQuickEquip} className="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/10 transition-colors flex items-center gap-2">
                    <span>⚡</span> 快速裝備
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {['weapon', 'armor', 'accessory'].map(slot => {
                    const id = character.equipment?.[slot === 'weapon' ? 'weaponId' : slot === 'armor' ? 'armorId' : 'accessoryId'];
                    const item = id ? inventory.find(i => i.id === id) : null;
                    const slotType = slot as 'weapon' | 'armor' | 'accessory';

                    return (
                        <div key={slot} className="relative bg-gray-800/60 border border-gray-700 rounded-xl p-4 flex items-center gap-4 group hover:border-gray-500 transition-colors">
                            <div className="w-16 h-16 bg-black/40 rounded-lg flex items-center justify-center text-3xl border border-white/5 shadow-inner">
                                {item ? item.icon : (slot === 'weapon' ? '🗡️' : slot === 'armor' ? '🛡️' : '💍')}
                            </div>
                            <div className="flex-1">
                                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                                    {slot === 'weapon' ? '武器 (WEAPON)' : slot === 'armor' ? '防具 (ARMOR)' : '飾品 (ACCESSORY)'}
                                </div>
                                {item ? (
                                    <>
                                        <h4 className="font-bold text-white">{item.name}</h4>
                                        <span className={`text-[10px] px-1.5 rounded ${item.rarity === 'SSR' ? 'bg-yellow-900/50 text-yellow-200' : 'bg-purple-900/50 text-purple-200'}`}>{item.rarity}</span>
                                    </>
                                ) : (
                                    <div className="text-sm text-gray-600 italic">未裝備</div>
                                )}
                            </div>
                            {item ? (
                                <button onClick={() => onUnequipItem(character.id, slotType)} className="text-xs text-red-400 hover:text-red-300 border border-red-900/50 px-3 py-1 rounded hover:bg-red-900/20">卸下</button>
                            ) : (
                                <button onClick={() => onOpenEquipModal(slotType)} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded shadow-lg">選擇</button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CharacterEquipmentPanel;
