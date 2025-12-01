
import React, { useState } from 'react';
import { CombatUnit, InventoryItem, Character } from '../types';
import { CombatMetrics } from './BattleEngine';
import { MvpResult } from '../utils/combatLogic';
import { getCharData } from '../data/combatData';

interface Props {
    resultType: 'VICTORY' | 'DEFEAT' | 'SWEEP';
    mvpData: MvpResult | null;
    allies: CombatUnit[]; 
    metrics: Record<string, CombatMetrics>;
    rewards: { credits: number, exp: number, items: InventoryItem[] };
    characters: Character[]; 
    customAvatars: { [key: string]: string };
    ultImages: { [key: string]: string };
    onContinue: () => void;
}

const BattleSettlement: React.FC<Props> = ({ 
    resultType, mvpData, allies, metrics, rewards, characters, customAvatars, ultImages, onContinue 
}) => {
    const [tab, setTab] = useState<'DAMAGE' | 'HEAL' | 'SHIELD' | 'TAKEN'>('DAMAGE');

    // MVP Display Data
    let mvpChar: Character | undefined;
    let quote = "任務完成。";
    let bgImg = "";

    if (mvpData) {
        const charId = mvpData.uid.replace('ally_', '');
        // Handle potential suffix in UID or complex IDs
        const cleanId = characters.find(c => mvpData.uid.includes(c.id))?.id || charId;
        mvpChar = characters.find(c => c.id === cleanId);
        
        if (mvpChar) {
            const cData = getCharData(mvpChar.id, mvpChar.name);
            quote = cData.victoryVoice;
            bgImg = ultImages[mvpChar.id] || customAvatars[mvpChar.id] || mvpChar.avatarUrl;
        }
    }

    const renderChart = () => {
        if (resultType === 'SWEEP') return <div className="text-center text-gray-500 py-12 flex flex-col items-center gap-2"><span className="text-4xl">🧹</span><span>快速掃蕩模式無戰鬥數據</span></div>;
        
        const validUnits = allies.filter(u => !u.isSummon);
        let maxVal = 1;

        // Find max value for bar scaling
        validUnits.forEach(u => {
            const m = metrics[u.uid];
            if (!m) return;
            let val = 0;
            if (tab === 'DAMAGE') val = m.damageDealt;
            if (tab === 'HEAL') val = m.healingDone;
            if (tab === 'SHIELD') val = m.shieldProvided;
            if (tab === 'TAKEN') val = m.damageTaken;
            if (val > maxVal) maxVal = val;
        });

        return (
            <div className="space-y-4">
                {validUnits.map(u => {
                    const m = metrics[u.uid] || { damageDealt: 0, healingDone: 0, shieldProvided: 0, damageTaken: 0 };
                    let val = 0;
                    let colorClass = '';
                    
                    if (tab === 'DAMAGE') { val = m.damageDealt; colorClass = 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'; }
                    else if (tab === 'HEAL') { val = m.healingDone; colorClass = 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'; }
                    else if (tab === 'SHIELD') { val = m.shieldProvided || 0; colorClass = 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'; }
                    else if (tab === 'TAKEN') { val = m.damageTaken || 0; colorClass = 'bg-orange-500'; }

                    const width = Math.max(1, (val / maxVal) * 100);

                    return (
                        <div key={u.uid} className="flex items-center gap-3 animate-fade-in-right">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600 shrink-0 bg-black">
                                <img src={u.avatarUrl} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-xs text-gray-300 mb-1">
                                    <span>{u.name}</span>
                                    <span className="font-mono font-bold">{val.toLocaleString()}</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${colorClass} transition-all duration-1000`} style={{ width: `${width}%` }}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="absolute inset-0 z-[180] bg-gray-900 flex flex-col animate-fade-in overflow-hidden" onClick={onContinue}>
            <div className="relative w-full h-full flex flex-col md:flex-row">
                
                {/* MVP Left Panel (Only for Victory) */}
                {mvpChar && resultType === 'VICTORY' && (
                    <div className="absolute inset-0 md:relative md:w-[45%] h-full bg-black/90 overflow-hidden">
                        {bgImg && (
                            <>
                                <img src={bgImg} className="w-full h-full object-cover object-center opacity-60 md:opacity-100 mask-image-gradient md:mask-none animate-scale-slow" />
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/90 via-transparent to-transparent pointer-events-none"></div>
                            </>
                        )}
                        <div className="absolute bottom-10 left-6 md:left-10 z-10">
                            <div className="text-yellow-500 font-black text-6xl md:text-8xl italic tracking-tighter drop-shadow-2xl mb-2 animate-slide-up">MVP</div>
                            <div className="text-white font-bold text-3xl md:text-4xl mb-4 drop-shadow-md animate-slide-up" style={{animationDelay: '0.1s'}}>{mvpChar.name}</div>
                            <div className="bg-white/10 backdrop-blur-md border-l-4 border-yellow-500 p-4 rounded-r-xl italic text-gray-200 text-lg max-w-md animate-slide-up" style={{animationDelay: '0.2s'}}>
                                "{quote}"
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats & Loot Right Panel */}
                <div className={`relative z-10 flex-1 flex flex-col bg-gray-900/95 backdrop-blur-xl p-6 md:p-10 border-l border-white/10 h-full overflow-y-auto custom-scrollbar ${(!mvpChar || resultType === 'SWEEP') ? 'w-full' : ''}`}>
                    
                    {/* Title Header */}
                    <div className="mb-8 flex justify-between items-end border-b border-gray-700 pb-4">
                        <div>
                            <div className={`text-4xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${resultType === 'DEFEAT' ? 'from-red-500 to-red-800' : 'from-yellow-400 to-orange-500'}`}>
                                {resultType === 'VICTORY' ? 'VICTORY' : resultType === 'SWEEP' ? 'SWEEP COMPLETE' : 'DEFEAT'}
                            </div>
                            <div className="text-sm text-gray-400 font-mono tracking-[0.3em] mt-1">
                                {resultType === 'DEFEAT' ? 'MISSION FAILED' : 'MISSION ACCOMPLISHED'}
                            </div>
                        </div>
                        
                        {/* Chart Tabs */}
                        {resultType !== 'SWEEP' && (
                            <div className="flex bg-black/40 rounded-lg p-1 gap-1">
                                {[
                                    {id: 'DAMAGE', label: '傷害', color: 'text-red-400'},
                                    {id: 'HEAL', label: '治療', color: 'text-green-400'},
                                    {id: 'SHIELD', label: '護盾', color: 'text-blue-400'},
                                    {id: 'TAKEN', label: '承傷', color: 'text-orange-400'}
                                ].map(t => (
                                    <button 
                                        key={t.id} 
                                        onClick={(e) => { e.stopPropagation(); setTab(t.id as any); }}
                                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${tab === t.id ? 'bg-white/10 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        <span className={tab === t.id ? t.color : ''}>{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* The Chart */}
                    <div className="flex-1 min-h-[200px] mb-8">
                        {renderChart()}
                    </div>

                    {/* Loot Section - Improved Animation */}
                    <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-300 uppercase tracking-widest">
                            <span className="text-yellow-500 text-xl">📦</span> 
                            戰利品清單 {resultType === 'DEFEAT' && '(部分丟失)'}
                        </div>
                        
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 p-4 bg-black/40 rounded-xl border border-gray-700/50 overflow-y-auto max-h-48 custom-scrollbar">
                            {rewards.exp > 0 && (
                                <div className="flex flex-col items-center justify-center p-2 bg-gray-800 rounded-lg border border-gray-700 animate-pop-in">
                                    <span className="text-2xl mb-1 drop-shadow-md">✨</span>
                                    <span className="text-[10px] text-gray-400">EXP</span>
                                    <span className="text-xs font-bold text-white">+{rewards.exp}</span>
                                </div>
                            )}
                            {rewards.credits > 0 && (
                                <div className="flex flex-col items-center justify-center p-2 bg-gray-800 rounded-lg border border-gray-700 animate-pop-in" style={{animationDelay: '0.05s'}}>
                                    <span className="text-2xl mb-1 drop-shadow-md">🪙</span>
                                    <span className="text-[10px] text-gray-400">信用點</span>
                                    <span className="text-xs font-bold text-yellow-400">+{rewards.credits}</span>
                                </div>
                            )}
                            {rewards.items.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="relative group flex flex-col items-center justify-center p-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors cursor-help animate-scale-up-bounce" 
                                    style={{animationDelay: `${(idx + 2) * 0.08}s`}}
                                >
                                    <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                                    <div className="text-2xl mb-1 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <div className="text-[10px] text-gray-400 truncate w-full text-center">{item.name}</div>
                                    <div className="text-xs font-bold text-white bg-black/50 px-2 rounded-full mt-1">x{item.count}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <span className="text-xs text-gray-500 animate-pulse bg-black/50 px-4 py-2 rounded-full">點擊任意處繼續...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BattleSettlement;