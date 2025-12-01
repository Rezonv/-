
import React, { useState, useEffect, useRef } from 'react';
import { CombatUnit } from '../types';
import { ELEMENT_ICONS, ELEMENT_COLORS } from '../data/combatData';

const GhostBar = ({ current, max, colorClass, heightClass = "h-2", showValue = false }: { current: number, max: number, colorClass: string, heightClass?: string, showValue?: boolean }) => {
    const [width, setWidth] = useState(100);
    const [ghostWidth, setGhostWidth] = useState(100);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const pct = Math.max(0, Math.min(100, (current / max) * 100));
        setWidth(pct);
        
        // Debounce ghost update to prevent jitter on multi-hit
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        // If healing (current > prev), snap ghost immediately to avoid weird visual
        if (pct > width) {
            setGhostWidth(pct);
        } else {
            timeoutRef.current = window.setTimeout(() => setGhostWidth(pct), 500);
        }
        
        return () => { if(timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, [current, max]);

    return (
        <div className={`w-full ${heightClass} bg-gray-900/90 rounded-full overflow-hidden relative shadow-sm border border-gray-600`}>
            <div className="absolute top-0 left-0 h-full bg-white/50 transition-all duration-1000 ease-out" style={{ width: `${ghostWidth}%` }} />
            <div className={`absolute top-0 left-0 h-full transition-all duration-200 ease-out ${colorClass} shadow-[0_0_5px_currentColor]`} style={{ width: `${width}%` }} />
            {showValue && (
                <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] z-10">
                    {Math.floor(current)}/{max}
                </div>
            )}
        </div>
    );
};

// Acheron's Energy (Slashed Dream) Visualization for Acheron herself
const AcheronEnergy = ({ current }: { current: number }) => {
    return (
        <div className="flex gap-0.5 justify-center mt-1">
            {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className={`text-[8px] transition-all duration-300 ${i < current ? 'text-red-500 opacity-100 scale-125 drop-shadow-[0_0_2px_red]' : 'text-gray-700 opacity-30'}`}>
                    ♦
                </span>
            ))}
        </div>
    );
};

// Crimson Knot Visualization for Enemies
const CrimsonKnotBadge = ({ count }: { count: number }) => {
    if (count <= 0) return null;
    return (
        <div className="absolute -top-3 -right-2 z-20 flex items-center justify-center animate-bounce-small">
            <div className="bg-red-900/90 border border-red-500 text-red-100 text-[10px] font-bold px-1.5 rounded-full shadow-[0_0_5px_red]">
                <span className="text-red-400 mr-0.5">✿</span> {count}
            </div>
        </div>
    );
};

interface Props {
    unit: CombatUnit;
    isActor: boolean;
    isTargeting: boolean;
    isValidTarget: boolean;
    skillIntent?: 'DAMAGE' | 'SUPPORT';
    enemyImage?: string;
    onInteractStart: (u: CombatUnit) => void;
    onInteractEnd: (u: CombatUnit) => void;
    onInteractCancel: () => void;
    onContextMenu: (u: CombatUnit) => void;
    triggerUlt?: () => void;
}

const BattleUnit: React.FC<Props> = ({ unit, isActor, isTargeting, isValidTarget, skillIntent, enemyImage, onInteractStart, onInteractEnd, onInteractCancel, onContextMenu, triggerUlt }) => {
    const buffs = unit.statuses.filter(s => s.type === 'BUFF');
    const debuffs = unit.statuses.filter(s => s.type === 'DEBUFF');
    const isBoss = unit.name.includes('BOSS');
    const isAcheron = unit.charId === 'acheron';
    
    // Count Crimson Knots (集真赤) on this unit
    const crimsonKnots = unit.statuses.filter(s => s.name === '集真赤').length;

    const getReticle = () => {
        if (!isTargeting || !isValidTarget) return null;
        return (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-pulse-fast">
                <div className={`text-6xl font-bold drop-shadow-lg ${skillIntent === 'SUPPORT' ? 'text-green-400' : 'text-red-500'}`}>
                    {skillIntent === 'SUPPORT' ? '✚' : '◎'}
                </div>
            </div>
        );
    };

    const targetStyle = isTargeting 
        ? (isValidTarget ? 'opacity-100 cursor-pointer brightness-110 drop-shadow-[0_0_10px_white]' : 'opacity-40 grayscale cursor-not-allowed') 
        : 'opacity-100';

    // ENEMY RENDER
    if (unit.isEnemy) {
        return (
            <div 
                className={`relative flex-shrink-0 flex flex-col items-center transition-all duration-300 pointer-events-auto min-w-[110px] select-none ${unit.isDead ? 'opacity-0 scale-0 w-0 overflow-hidden' : ''} ${unit.animState === 'hit' ? 'animate-shake filter brightness-150' : ''} ${unit.animState === 'attack' ? 'translate-y-10 z-20 scale-110' : ''} ${targetStyle}`}
                style={{ touchAction: 'none' }}
                onMouseDown={() => onInteractStart(unit)} 
                onMouseUp={() => onInteractEnd(unit)}
                onMouseLeave={onInteractCancel}
                onTouchStart={() => onInteractStart(unit)} 
                onTouchEnd={() => onInteractEnd(unit)}
                onTouchCancel={onInteractCancel}
                onContextMenu={(e) => { e.preventDefault(); onContextMenu(unit); }}
            >
                {getReticle()}
                <CrimsonKnotBadge count={crimsonKnots} />
                
                {/* Info Block (Weakness + HP) */}
                <div className={`w-full px-1 mb-1 flex flex-col gap-1 items-center z-10`}>
                    <div className="flex gap-1 justify-center">
                        {unit.weaknesses?.map(el => <div key={el} className={`w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center text-[8px] border border-white/20 shadow-md ${ELEMENT_COLORS[el]}`}>{ELEMENT_ICONS[el]}</div>)}
                    </div>
                    <div className="w-full max-w-[120px]">
                        <GhostBar current={unit.currentToughness} max={unit.maxToughness} colorClass="bg-white" heightClass="h-1 mb-0.5" />
                        <GhostBar current={unit.currentHp} max={unit.maxHp} colorClass="bg-red-600" heightClass="h-3" showValue={true} />
                    </div>
                </div>

                {/* Sprite */}
                <div className={`relative transition-transform duration-300 ${isActor ? 'scale-110 drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]' : ''}`}>
                    <div className={`w-24 h-24 md:w-32 md:h-32 ${isBoss ? 'w-40 h-40 md:w-56 md:h-56' : ''} flex items-center justify-center`}>
                        {enemyImage ? <img src={enemyImage} className="w-full h-full object-contain drop-shadow-xl" draggable={false} /> : <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-full border-2 border-white/10"><span className="text-6xl">👾</span></div>}
                    </div>
                    {isBoss && <div className="absolute -right-2 top-0 bg-red-800 text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-500 shadow-lg">BOSS</div>}
                </div>

                {/* Status & Name Footer */}
                <div className="mt-1 flex flex-col gap-1 w-full items-center">
                    <div className="flex flex-wrap justify-center gap-0.5 min-h-[16px]">
                        {buffs.map((s, i) => (
                            <div key={i} className="w-4 h-4 bg-blue-900 rounded border border-blue-400 flex items-center justify-center text-[8px] text-white cursor-help" title={`[增益] ${s.name}\n剩餘: ${s.duration} 回合\n來源: ${s.sourceCharId === unit.charId ? '自身' : s.sourceCharId || '未知'}`}>{s.icon}</div>
                        ))}
                        {debuffs.filter(s => s.name !== '集真赤').map((s, i) => (
                            <div key={i} className="w-4 h-4 bg-red-900 rounded border border-red-400 flex items-center justify-center text-[8px] text-white cursor-help" title={`[減益] ${s.name}\n剩餘: ${s.duration} 回合\n來源: ${s.sourceCharId || '未知'}`}>{s.icon}</div>
                        ))}
                    </div>
                    <div className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-red-200 font-bold border border-red-900/50 shadow-lg backdrop-blur-sm truncate max-w-full">
                        Lv.{unit.level} {unit.name}
                    </div>
                </div>
            </div>
        );
    }

    // ALLY RENDER
    return (
        <div 
            className={`relative flex-shrink-0 flex flex-col items-center justify-end transition-all duration-300 pointer-events-auto min-w-[90px] md:min-w-[110px] select-none group
                ${unit.isDead ? 'opacity-50 grayscale blur-[1px]' : ''} 
                ${unit.animState === 'attack' ? '-translate-y-48 z-30 scale-125' : ''} 
                ${unit.animState === 'hit' ? 'animate-shake filter brightness-150' : ''} 
                ${isActor ? '-translate-y-10 scale-110 z-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'translate-y-0 opacity-90'} 
                ${targetStyle}`}
            style={{ touchAction: 'none' }}
            onMouseDown={() => onInteractStart(unit)} 
            onMouseUp={() => onInteractEnd(unit)}
            onMouseLeave={onInteractCancel}
            onTouchStart={() => onInteractStart(unit)} 
            onTouchEnd={() => onInteractEnd(unit)}
            onTouchCancel={onInteractCancel}
            onContextMenu={(e) => { e.preventDefault(); onContextMenu(unit); }}
        >
            {getReticle()}

            {/* Status Icons */}
            <div className={`flex flex-wrap justify-center gap-0.5 mb-1 w-full min-h-[16px] px-1 transition-opacity ${isActor ? 'opacity-100' : 'opacity-60'}`}>
                {buffs.slice(0, 4).map((s, i) => (
                    <div key={i} className="w-3 h-3 bg-blue-900 rounded text-[8px] flex items-center justify-center text-white border border-blue-500 cursor-help" title={`[增益] ${s.name}\n剩餘: ${s.duration} 回合\n來源: ${s.sourceCharId === unit.charId ? '自身' : s.sourceCharId || '未知'}`}>{s.icon}</div>
                ))}
                {debuffs.slice(0, 4).map((s, i) => (
                    <div key={i} className="w-3 h-3 bg-red-900 rounded text-[8px] flex items-center justify-center text-white border border-red-500 cursor-help" title={`[減益] ${s.name}\n剩餘: ${s.duration} 回合\n來源: ${s.sourceCharId || '未知'}`}>{s.icon}</div>
                ))}
            </div>

            {/* Avatar Container */}
            <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto rounded-t-xl border-x-2 border-t-2 ${isActor ? 'border-yellow-400 bg-gray-700' : 'border-gray-600 bg-gray-800'} overflow-hidden relative shadow-xl transition-colors duration-300 z-10`}>
                <img src={unit.avatarUrl} className={`w-full h-full object-cover object-top transition-opacity ${unit.isDead ? 'grayscale opacity-50' : ''}`} draggable={false} />
                
                {!unit.isDead && !unit.isSummon && triggerUlt && unit.currentEnergy >= unit.maxEnergy && (
                    <button onClick={(e) => { e.stopPropagation(); triggerUlt(); }} className="absolute inset-0 bg-yellow-500/30 animate-pulse flex items-center justify-center cursor-pointer group-hover:bg-yellow-500/50 transition-colors">
                        <span className="text-2xl font-black text-white drop-shadow-md animate-bounce">⚡</span>
                    </button>
                )}

                {unit.shield > 0 && <div className="absolute inset-0 border-2 border-blue-400/50 rounded-t-lg animate-pulse pointer-events-none"></div>}
                {unit.isDead && <div className="absolute inset-0 flex items-center justify-center bg-black/50 font-black text-red-500 text-xl rotate-[-15deg]">DEAD</div>}
            </div>
            
            {/* HP & Energy Bars */}
            <div className={`w-full max-w-[80px] -mt-1 z-10 bg-gray-900 p-1.5 rounded-b-lg border-x-2 border-b-2 ${isActor ? 'border-yellow-400' : 'border-gray-600'} shadow-md`}>
                <GhostBar current={unit.currentHp} max={unit.maxHp} colorClass="bg-green-500" heightClass="h-2" showValue={true} />
                {!unit.isSummon && (
                    isAcheron ? (
                        <AcheronEnergy current={unit.currentEnergy} />
                    ) : (
                        <div className="h-1 bg-gray-700 rounded-full overflow-hidden mt-1">
                            <div className="h-full bg-white transition-all" style={{width: `${(unit.currentEnergy/unit.maxEnergy)*100}%`}}></div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default BattleUnit;
