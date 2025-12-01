import React, { useState } from 'react';
import { CombatStats } from '../../types';
import { CharacterCombatData, ELEMENT_ICONS, ELEMENT_COLORS, ELEMENT_MAP_CN, PATH_MAP_CN } from '../../data/combatData';

interface Props {
    combatData: CharacterCombatData;
    level: number;
    maxLevel: number;
    viewStats: CombatStats;
    baseStats: CombatStats;
}

const StatRow = ({ label, icon, value, base, isPercent = false }: { label: string, icon: string, value: number, base: number, isPercent?: boolean }) => {
    const diff = value - base;
    const fmt = (v: number) => isPercent ? `${(v * 100).toFixed(1)}%` : Math.floor(v);

    return (
        <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3 text-gray-300">
                <span className="text-xl w-6 text-center">{icon}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <div className="text-right">
                <div className="text-white font-mono font-bold text-lg">{fmt(value)}</div>
                {diff > 0.001 && (
                    <div className="text-[10px] text-gray-500 font-mono">
                        {fmt(base)} <span className="text-green-400">+{fmt(diff)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const CharacterStatsPanel: React.FC<Props> = ({ combatData, level, maxLevel, viewStats, baseStats }) => {
    const [showAdvancedStats, setShowAdvancedStats] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in-right">
            <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold border bg-black/40 ${ELEMENT_COLORS[combatData.element]}`}>
                        {ELEMENT_ICONS[combatData.element]} {ELEMENT_MAP_CN[combatData.element]}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-bold border border-gray-600 bg-black/40 text-gray-300">
                        {PATH_MAP_CN[combatData.path]}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-black italic mr-1">{level}</span>
                    <span className="text-gray-500 text-xs">/ {maxLevel}</span>
                </div>
            </div>

            {/* Base Stats */}
            <div className="space-y-2">
                <StatRow label="生命值 (HP)" icon="❤️" value={viewStats.hp} base={baseStats.hp} />
                <StatRow label="攻擊力 (ATK)" icon="⚔️" value={viewStats.atk} base={baseStats.atk} />
                <StatRow label="防禦力 (DEF)" icon="🛡️" value={viewStats.def} base={baseStats.def} />
                <StatRow label="速度 (SPD)" icon="👟" value={viewStats.spd} base={baseStats.spd} />
            </div>

            {/* Advanced Toggle */}
            <button
                onClick={() => setShowAdvancedStats(!showAdvancedStats)}
                className="w-full py-2 text-xs text-gray-500 hover:text-white border-t border-b border-white/5 flex items-center justify-center gap-2"
            >
                <span>{showAdvancedStats ? '收起進階屬性' : '查看進階屬性'}</span>
                <span className={`transform transition-transform ${showAdvancedStats ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {showAdvancedStats && (
                <div className="grid grid-cols-2 gap-3 bg-black/20 p-3 rounded-lg text-xs animate-slide-down">
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>暴擊率</span><span className="font-mono text-yellow-300">{(viewStats.critRate! * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>暴擊傷害</span><span className="font-mono text-yellow-300">{(viewStats.critDmg! * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>擊破特攻</span><span className="font-mono text-white">{(viewStats.breakEffect! * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>治療加成</span><span className="font-mono text-green-300">{(viewStats.outgoingHealing! * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>能量恢復</span><span className="font-mono text-blue-300">{((1 + viewStats.energyRegen!) * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>效果命中</span><span className="font-mono text-white">{(viewStats.effectHitRate! * 100).toFixed(1)}%</span></div>
                    <div className="flex justify-between p-2 bg-white/5 rounded"><span>效果抵抗</span><span className="font-mono text-white">{(viewStats.effectRes! * 100).toFixed(1)}%</span></div>
                </div>
            )}

            {/* Skills */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">戰鬥技能</h3>
                <div className="space-y-3">
                    {[
                        { type: '普攻', name: combatData.basicName, icon: '⚔️', desc: '對敵方單體造成傷害' },
                        { type: '戰技', name: combatData.skillName, icon: '✨', desc: combatData.skillDesc },
                        { type: '終結技', name: combatData.ultName, icon: '⚡', desc: combatData.ultDesc },
                    ].map((skill, idx) => (
                        <div key={idx} className="group bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors relative overflow-hidden cursor-help">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl shadow-inner border border-white/10">
                                    {skill.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-sm text-white">{skill.name}</h4>
                                        <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded text-gray-400">{skill.type}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1 group-hover:line-clamp-none transition-all">{skill.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CharacterStatsPanel;
