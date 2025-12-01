
import React, { useState } from 'react';
import { CombatUnit, CombatStats, InventoryItem } from '../types';
import { getCharData, ELEMENT_ICONS, ELEMENT_COLORS, getRealtimeUnitStats } from '../data/combatData';

interface Props {
    unit: CombatUnit | null;
    onClose: () => void;
    inventory: InventoryItem[];
    enemyImage?: string;
    allUnits: CombatUnit[]; // To find source names
}

const BattleInspection: React.FC<Props> = ({ unit, onClose, inventory, enemyImage, allUnits }) => {
    const [inspectTab, setInspectTab] = useState<'STATS' | 'STATUS' | 'SKILLS'>('STATS');

    if (!unit) return null;

    const cData = getCharData(unit.charId, unit.name);
    const baseStatsList: {label: string, key: keyof CombatStats}[] = [
        {label: '生命 (HP)', key: 'hp'},
        {label: '攻擊 (ATK)', key: 'atk'},
        {label: '防禦 (DEF)', key: 'def'},
        {label: '速度 (SPD)', key: 'spd'},
    ];

    const advancedStatsList: {label: string, key: keyof CombatStats, isPercent?: boolean}[] = [
        {label: '暴擊率', key: 'critRate', isPercent: true},
        {label: '暴擊傷害', key: 'critDmg', isPercent: true},
        {label: '擊破特攻', key: 'breakEffect', isPercent: true},
        {label: '治療加成', key: 'outgoingHealing', isPercent: true},
        {label: '能量恢復', key: 'energyRegen', isPercent: true},
        {label: '效果命中', key: 'effectHitRate', isPercent: true},
        {label: '效果抵抗', key: 'effectRes', isPercent: true},
    ];

    const renderStatRow = (label: string, base: number, current: number, isPercent: boolean = false) => {
        const diff = current - base;
        const fmt = (v: number) => isPercent ? `${(v*100).toFixed(1)}%` : Math.floor(v);
        
        return (
            <div className="flex justify-between items-center text-sm py-1 border-b border-white/5 last:border-0">
                <span className="text-gray-400">{label}</span>
                <div className="font-mono flex items-center gap-1">
                    <span className="text-white">{fmt(base)}</span>
                    {diff > 0.0001 && <span className="text-green-400 text-xs">(+{fmt(diff)})</span>}
                    {diff < -0.0001 && <span className="text-red-400 text-xs">({fmt(diff)})</span>}
                </div>
            </div>
        );
    };

    const getSourceName = (sourceId?: string) => {
        if (!sourceId) return '未知來源';
        if (sourceId === 'event') return '🌍 世界事件';
        if (sourceId === unit.charId) return '👤 自身 (Self)';
        
        // Find source unit in the battlefield
        const sourceUnit = allUnits.find(u => u.charId === sourceId);
        if (sourceUnit) {
            return `${sourceUnit.isEnemy ? '👿' : '🛡️'} ${sourceUnit.name}`;
        }
        return `❓ 未知 (${sourceId})`;
    };

    return (
        <div 
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in pointer-events-auto" 
            onClick={onClose}
            style={{ touchAction: 'none' }}
        >
            <div className="bg-gray-900 rounded-2xl border border-gray-600 p-6 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh] relative animate-scale-up-bounce" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden shadow-lg shrink-0 bg-black">
                            <img src={unit.isEnemy ? (enemyImage || '') : unit.avatarUrl} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{unit.name}</h3>
                            <div className="flex items-center gap-3">
                                <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs border border-gray-600">Lv.{unit.level}</span>
                                <span className={`text-sm font-bold ${ELEMENT_COLORS[cData.element]}`}>{ELEMENT_ICONS[cData.element]} {cData.element}</span>
                                <span className="text-sm text-gray-400">{cData.path}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl self-start p-2 bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition-colors">✕</button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-700 bg-gray-800/50 mb-6 rounded-t-lg overflow-hidden">
                    {(['STATS', 'STATUS', 'SKILLS'] as const).map(t => (
                        <button key={t} onClick={() => setInspectTab(t)} className={`flex-1 py-3 text-sm font-bold tracking-widest transition-colors ${inspectTab === t ? 'text-white border-b-2 border-pink-500 bg-gray-800' : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'}`}>
                            {t === 'STATS' ? '數值詳情' : t === 'STATUS' ? '狀態列表' : '技能裝備'}
                        </button>
                    ))}
                </div>
                
                {/* Content */}
                {inspectTab === 'STATS' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column: Base Stats */}
                        <div className="bg-black/30 p-4 rounded-xl border border-gray-700">
                            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-3 text-xs border-b border-gray-700 pb-2">基礎屬性 (Base Stats)</h4>
                            <div className="space-y-2">
                                {baseStatsList.map(stat => {
                                    const current = getRealtimeUnitStats(unit, stat.key);
                                    const base = unit.stats[stat.key] || 0;
                                    return <div key={stat.key}>{renderStatRow(stat.label, base, current)}</div>;
                                })}
                            </div>
                        </div>

                        {/* Right Column: Advanced Stats */}
                        <div className="bg-black/30 p-4 rounded-xl border border-gray-700">
                            <h4 className="text-blue-400 font-bold uppercase tracking-widest mb-3 text-xs border-b border-gray-700 pb-2">進階屬性 (Advanced Stats)</h4>
                            <div className="space-y-2">
                                {advancedStatsList.map(stat => {
                                    const current = getRealtimeUnitStats(unit, stat.key); 
                                    const val = unit.stats[stat.key] || 0;
                                    let buffAdd = 0;
                                    unit.statuses.forEach(s => {
                                        if (s.type === 'BUFF' && s.stat === stat.key.toUpperCase()) buffAdd += s.value;
                                    });
                                    
                                    return <div key={stat.key}>{renderStatRow(stat.label, val, val + buffAdd, stat.isPercent)}</div>;
                                })}
                            </div>
                        </div>
                    </div>
                )}
                
                {inspectTab === 'STATUS' && (
                    <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                        {unit.statuses.length === 0 && <div className="text-gray-500 italic text-sm text-center py-10 bg-black/20 rounded-xl">無特殊狀態</div>}
                        {unit.statuses.map((s, idx) => (
                            <div key={idx} className={`p-4 rounded-lg border flex items-start gap-4 transition-all hover:bg-opacity-50 ${s.type === 'BUFF' ? 'bg-blue-900/20 border-blue-500/30 hover:bg-blue-900/30' : 'bg-red-900/20 border-red-500/30 hover:bg-red-900/30'}`}>
                                <div className={`text-2xl mt-1 w-12 h-12 flex items-center justify-center rounded-full shrink-0 shadow-lg ${s.type === 'BUFF' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>
                                    {s.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`font-bold text-base ${s.type === 'BUFF' ? 'text-blue-300' : 'text-red-300'}`}>{s.name}</div>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${s.type === 'BUFF' ? 'border-blue-500/50 text-blue-400' : 'border-red-500/50 text-red-400'}`}>
                                                {s.type}
                                            </span>
                                        </div>
                                        <span className="text-xs bg-black/40 px-2 py-1 rounded text-white font-mono border border-gray-600">
                                            剩餘 {s.duration === 99 ? '∞' : s.duration} 回合
                                        </span>
                                    </div>
                                    
                                    <div className="text-sm text-gray-300 leading-snug">{s.description}</div>
                                    
                                    {s.value > 0 && s.stat && (
                                        <div className="text-xs text-green-400 mt-1 font-mono">
                                            效能: {s.stat} +{(s.value * (['HP','ATK','DEF','SPD'].includes(s.stat) ? 100 : 100)).toFixed(0)}%
                                        </div>
                                    )}
                                    {s.dotDamage && (
                                        <div className="text-xs text-red-400 mt-1 font-mono">
                                            傷害: {s.dotDamage} / 回合
                                        </div>
                                    )}

                                    <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-white/10 flex justify-between items-center">
                                        <span>來源 (Source):</span>
                                        <span className="text-gray-300 font-bold">{getSourceName(s.sourceCharId)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {inspectTab === 'SKILLS' && (
                    <div className="space-y-6">
                        {!unit.isEnemy && unit.equipmentRefs && (
                            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                                <h4 className="text-xs text-gray-500 font-bold uppercase mb-3 tracking-wider">裝備 (Equipment)</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {['weapon', 'armor', 'accessory'].map(slot => {
                                        const id = (unit.equipmentRefs as any)[slot === 'weapon' ? 'weaponId' : slot === 'armor' ? 'armorId' : 'accessoryId'];
                                        const item = id ? inventory.find(i => i.id === id) : null;
                                        if (!item) return null;
                                        return (
                                            <div key={slot} className="flex items-center gap-4 bg-black/30 p-3 rounded-lg border border-gray-600/50">
                                                <div className={`text-3xl w-12 h-12 flex items-center justify-center rounded bg-gray-800 ${item.rarity === 'SSR' ? 'border-yellow-500/50 text-yellow-500' : 'border-gray-600 text-gray-400'} border`}>{item.icon}</div>
                                                <div>
                                                    <div className="text-sm font-bold text-white">{item.name}</div>
                                                    <div className="text-xs text-gray-400 mt-0.5">{item.description}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {!Object.values(unit.equipmentRefs).some(Boolean) && <div className="text-sm text-gray-500 italic text-center py-2">無裝備</div>}
                                </div>
                            </div>
                        )}
                        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                            <h4 className="text-xs text-gray-500 font-bold uppercase mb-3 tracking-wider">技能 (Skills)</h4>
                            <div className="space-y-3">
                                <div className="flex gap-4 p-3 bg-black/30 rounded-lg border border-gray-600/30">
                                    <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center text-xl shrink-0 border border-gray-600">⚔️</div>
                                    <div>
                                        <div className="text-sm font-bold text-white flex items-center gap-2">{cData.basicName} <span className="text-[10px] bg-gray-700 px-1.5 rounded text-gray-300">普攻</span></div>
                                        <div className="text-xs text-gray-400 mt-1">恢復 1 戰技點，對敵方單體造成傷害。</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-3 bg-black/30 rounded-lg border border-gray-600/30">
                                    <div className="w-10 h-10 rounded bg-blue-900/50 flex items-center justify-center text-xl shrink-0 border border-blue-500/50 text-blue-300">✨</div>
                                    <div>
                                        <div className="text-sm font-bold text-white flex items-center gap-2">{cData.skillName} <span className="text-[10px] bg-blue-900/50 px-1.5 rounded text-blue-200">戰技</span></div>
                                        <div className="text-xs text-gray-400 mt-1">{cData.skillDesc}</div>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-3 bg-black/30 rounded-lg border border-gray-600/30">
                                    <div className="w-10 h-10 rounded bg-yellow-900/50 flex items-center justify-center text-xl shrink-0 border border-yellow-500/50 text-yellow-300">⚡</div>
                                    <div>
                                        <div className="text-sm font-bold text-white flex items-center gap-2">{cData.ultName} <span className="text-[10px] bg-yellow-900/50 px-1.5 rounded text-yellow-200">終結技</span></div>
                                        <div className="text-xs text-gray-400 mt-1">{cData.ultDesc}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mt-6 text-center">
                    <button onClick={onClose} className="px-12 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold transition-all shadow-lg hover:scale-105 active:scale-95">關閉介面</button>
                </div>
            </div>
        </div>
    );
};

export default BattleInspection;
