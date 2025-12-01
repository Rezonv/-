
import React, { useState } from 'react';
import { Quest, UserState, UserStatistics } from '../types';
import { QUESTS } from '../data/quests';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onClaimReward: (quest: Quest) => void;
}

const Handbook: React.FC<Props> = ({ isOpen, onClose, userState, onClaimReward }) => {
  const [activeTab, setActiveTab] = useState<'DAILY' | 'LIFETIME'>('DAILY');

  if (!isOpen) return null;

  const filteredQuests = QUESTS.filter(q => q.type === activeTab);

  const getProgress = (quest: Quest) => {
      const current = userState.statistics[quest.metricKey] || 0;
      if (quest.id === 'daily_login') return 1; 
      return Math.min(current, quest.targetValue); 
  };

  const isClaimed = (id: string) => userState.claimedQuestIds.includes(id);
  
  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-gray-900 w-full max-w-4xl h-[85vh] rounded-3xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden relative">
            {/* Phone Notch Design */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl z-20"></div>

            {/* Header */}
            <div className="h-20 bg-gray-800 flex items-center justify-between px-8 pt-4 border-b border-gray-700">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        📱
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white tracking-wide">冒險手冊</h2>
                        <p className="text-xs text-gray-400">開拓者的行動指南</p>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl transition-colors">✕</button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-gray-850 border-r border-gray-700 flex flex-col py-6 gap-2">
                    <button 
                        onClick={() => setActiveTab('DAILY')} 
                        className={`px-6 py-3 text-left text-sm font-bold flex items-center gap-3 transition-all ${activeTab === 'DAILY' ? 'bg-purple-600 text-white border-r-4 border-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                    >
                        <span>📅</span> 每日委託
                    </button>
                    <button 
                        onClick={() => setActiveTab('LIFETIME')} 
                        className={`px-6 py-3 text-left text-sm font-bold flex items-center gap-3 transition-all ${activeTab === 'LIFETIME' ? 'bg-purple-600 text-white border-r-4 border-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                    >
                        <span>🏆</span> 生涯成就
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 bg-gray-900 custom-scrollbar">
                    <div className="space-y-4">
                        {filteredQuests.map(quest => {
                            const progress = getProgress(quest);
                            const isDone = progress >= quest.targetValue || (quest.id === 'daily_login'); // Login is always done if viewing
                            const claimed = isClaimed(quest.id);
                            const pct = Math.min(100, (progress / quest.targetValue) * 100);

                            return (
                                <div key={quest.id} className={`relative p-6 rounded-2xl border transition-all group ${claimed ? 'bg-gray-800/50 border-gray-700 opacity-60' : 'bg-gray-800 border-gray-600 hover:border-purple-500'}`}>
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="flex gap-4">
                                            <div className="text-4xl bg-black/30 w-16 h-16 rounded-xl flex items-center justify-center border border-gray-700">
                                                {quest.icon}
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-bold ${claimed ? 'text-gray-500' : 'text-white'}`}>{quest.title}</h3>
                                                <p className="text-sm text-gray-400 mt-1">{quest.description}</p>
                                                
                                                {/* Rewards */}
                                                <div className="flex gap-3 mt-3">
                                                    {quest.rewards.starJade && (
                                                        <div className="flex items-center gap-1 text-xs bg-purple-900/40 px-2 py-1 rounded border border-purple-500/30 text-purple-300">
                                                            <span>💎</span> {quest.rewards.starJade}
                                                        </div>
                                                    )}
                                                    {quest.rewards.credits && (
                                                        <div className="flex items-center gap-1 text-xs bg-yellow-900/40 px-2 py-1 rounded border border-yellow-500/30 text-yellow-300">
                                                            <span>🪙</span> {quest.rewards.credits}
                                                        </div>
                                                    )}
                                                    {quest.rewards.exp && (
                                                        <div className="flex items-center gap-1 text-xs bg-blue-900/40 px-2 py-1 rounded border border-blue-500/30 text-blue-300">
                                                            <span>✨</span> {quest.rewards.exp}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-xs font-mono text-gray-500">
                                                {progress} / {quest.targetValue}
                                            </div>
                                            {claimed ? (
                                                <button disabled className="px-6 py-2 rounded-full bg-gray-700 text-gray-500 text-xs font-bold cursor-not-allowed">
                                                    已領取
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => onClaimReward(quest)}
                                                    disabled={!isDone}
                                                    className={`px-6 py-2 rounded-full text-xs font-bold shadow-lg transition-all ${isDone ? 'bg-purple-600 hover:bg-purple-500 text-white animate-pulse' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                                                >
                                                    {isDone ? '領取獎勵' : '進行中'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Progress Bar Background */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-purple-500 transition-all duration-1000 rounded-b-2xl" style={{ width: `${pct}%`, opacity: claimed ? 0 : 1 }}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Handbook;
