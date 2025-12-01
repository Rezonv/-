
import React, { useState } from 'react';
import { Recipe, InventoryItem, UserState } from '../types';
import { RECIPES } from '../data/recipes';
import { SHOP_ITEMS } from '../data/items';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  inventory: InventoryItem[];
  credits: number;
  onCraft: (recipe: Recipe, amount: number) => void;
}

const Synthesizer: React.FC<Props> = ({ isOpen, onClose, userState, inventory, credits, onCraft }) => {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [craftAmount, setCraftAmount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const selectedRecipe = RECIPES.find(r => r.id === selectedRecipeId);
  const resultItem = selectedRecipe ? SHOP_ITEMS.find(i => i.id === selectedRecipe.resultItemId) : null;

  const canCraft = (recipe: Recipe, amt: number) => {
      if (userState.level < (recipe.unlockLevel || 1)) return false;
      if (credits < recipe.costCredits * amt) return false;
      for (const mat of recipe.materials) {
          const owned = inventory.find(i => i.id === mat.itemId)?.count || 0;
          if (owned < mat.count * amt) return false;
      }
      return true;
  };

  const handleCraftClick = () => {
      if (!selectedRecipe) return;
      if (!canCraft(selectedRecipe, craftAmount)) return alert("素材或信用點不足");
      
      setIsProcessing(true);
      setTimeout(() => {
          onCraft(selectedRecipe, craftAmount);
          setIsProcessing(false);
          alert(`合成成功！獲得 ${resultItem?.name} x${selectedRecipe.resultCount * craftAmount}`);
          setCraftAmount(1);
      }, 1500); 
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-gray-900 w-full max-w-5xl h-[80vh] rounded-2xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden relative">
            {/* Background FX */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="p-6 border-b border-gray-700 bg-gray-900/80 backdrop-blur flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg text-2xl">
                        ⚗️
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-widest uppercase">萬能合成機</h2>
                        <p className="text-xs text-gray-400 font-mono">OMNI-SYNTHESIZER V2.0</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>

            {/* Main Body */}
            <div className="flex flex-1 overflow-hidden z-10">
                {/* Recipe List */}
                <div className="w-1/3 border-r border-gray-700 bg-gray-800/50 overflow-y-auto custom-scrollbar">
                    {RECIPES.map(recipe => {
                        const res = SHOP_ITEMS.find(i => i.id === recipe.resultItemId);
                        const isLocked = userState.level < (recipe.unlockLevel || 1);
                        if (!res) return null;
                        
                        return (
                            <button 
                                key={recipe.id} 
                                onClick={() => setSelectedRecipeId(recipe.id)}
                                disabled={isLocked}
                                className={`w-full p-4 border-b border-gray-700 flex items-center gap-4 text-left transition-colors ${selectedRecipeId === recipe.id ? 'bg-purple-900/30 border-purple-500/50' : 'hover:bg-gray-700/50'} ${isLocked ? 'opacity-50 grayscale' : ''}`}
                            >
                                <div className="w-12 h-12 bg-black/40 rounded-lg flex items-center justify-center text-2xl border border-gray-600">
                                    {res.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm text-white truncate">{res.name}</div>
                                    <div className="text-xs text-gray-400">{recipe.type}</div>
                                </div>
                                {isLocked && <div className="text-xs text-red-400 font-bold">Lv.{recipe.unlockLevel}</div>}
                            </button>
                        );
                    })}
                </div>

                {/* Detail Panel */}
                <div className="flex-1 bg-gray-900 p-8 flex flex-col items-center relative">
                    {selectedRecipe && resultItem ? (
                        <>
                            <div className="relative mb-8">
                                <div className={`w-32 h-32 bg-gradient-to-br from-gray-800 to-black rounded-2xl border-2 ${resultItem.rarity === 'SSR' ? 'border-yellow-500' : 'border-gray-600'} flex items-center justify-center text-6xl shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 relative`}>
                                    {resultItem.icon}
                                </div>
                                {/* Particle FX Placeholder */}
                                {isProcessing && (
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="w-40 h-40 border-4 border-purple-500 rounded-full animate-ping"></div>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-3xl font-bold text-white mb-2">{resultItem.name}</h3>
                            <p className="text-gray-400 text-center max-w-md mb-8">{selectedRecipe.description}</p>

                            {/* Materials Grid */}
                            <div className="bg-black/40 rounded-xl p-6 border border-gray-700 w-full max-w-lg mb-6">
                                <div className="text-xs text-gray-500 uppercase font-bold mb-4 tracking-widest text-center">所需素材 (MATERIALS)</div>
                                <div className="flex justify-center gap-6">
                                    {selectedRecipe.materials.map((mat, idx) => {
                                        const item = SHOP_ITEMS.find(i => i.id === mat.itemId);
                                        const owned = inventory.find(i => i.id === mat.itemId)?.count || 0;
                                        const required = mat.count * craftAmount;
                                        const isEnough = owned >= required;
                                        
                                        return (
                                            <div key={idx} className="flex flex-col items-center gap-2">
                                                <div className={`w-14 h-14 rounded-lg bg-gray-800 border-2 flex items-center justify-center text-2xl relative ${isEnough ? 'border-gray-600' : 'border-red-500'}`}>
                                                    {item?.icon}
                                                    <div className="absolute -bottom-2 -right-2 bg-black px-1.5 rounded text-[10px] font-mono border border-gray-700">{required}</div>
                                                </div>
                                                <div className={`text-xs font-bold ${isEnough ? 'text-green-400' : 'text-red-400'}`}>
                                                    {owned}/{required}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="w-full max-w-lg bg-gray-800/50 rounded-xl p-4 flex flex-col gap-4">
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-sm text-gray-400">合成數量</span>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => setCraftAmount(Math.max(1, craftAmount - 1))} className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600">-</button>
                                        <span className="text-xl font-bold w-8 text-center">{craftAmount}</span>
                                        <button onClick={() => setCraftAmount(Math.min(99, craftAmount + 1))} className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600">+</button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-sm text-gray-400">消耗信用點</span>
                                    <span className={`font-mono font-bold ${credits < selectedRecipe.costCredits * craftAmount ? 'text-red-500' : 'text-yellow-400'}`}>
                                        🪙 {(selectedRecipe.costCredits * craftAmount).toLocaleString()}
                                    </span>
                                </div>
                                <button 
                                    onClick={handleCraftClick}
                                    disabled={isProcessing || !canCraft(selectedRecipe, craftAmount)}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-black tracking-widest rounded-lg shadow-lg transition-all active:scale-95"
                                >
                                    {isProcessing ? '合成中...' : '開始合成'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                            <div className="text-6xl mb-4 opacity-20">⚡</div>
                            <p>請選擇左側配方</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Synthesizer;
