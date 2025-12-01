import React from 'react';
import { UserState } from '../../types';

interface TopBarProps {
    userState: UserState;
    credits: number;
    onOpenSettings: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ userState, credits, onOpenSettings }) => {
    const sanityPercent = (userState.stamina / userState.maxStamina) * 100;

    return (
        <div className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-6 pointer-events-none">
            {/* Left: Logo & PRTS */}
            <div className="flex items-center gap-4 pointer-events-auto">
                <div className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--ak-accent-cyan)] to-white drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] select-none">
                    PRTS
                </div>
                <div className="h-8 w-[2px] bg-[var(--ak-text-sub)] opacity-50"></div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-[var(--ak-text-sub)] tracking-widest">DREAM COMPANION</span>
                    <span className="text-[10px] text-[var(--ak-text-sub)] opacity-70">SYSTEM ONLINE</span>
                </div>
            </div>

            {/* Right: Resources & Sanity */}
            <div className="flex items-center gap-6 pointer-events-auto bg-[var(--ak-bg-panel)] px-6 py-2 rounded-bl-xl border-b border-l border-[var(--ak-border-color)] clip-path-polygon(20px 0, 100% 0, 100% 100%, 0 100%)">

                {/* Credits */}
                <div className="flex items-center gap-2">
                    <span className="text-xl">🪙</span>
                    <span className="font-mono font-bold text-[var(--ak-accent-yellow)] text-lg">{credits.toLocaleString()}</span>
                </div>

                {/* Sanity Bar (Stamina) */}
                <div className="flex flex-col w-48 group">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[var(--ak-text-sub)]">SANITY</span>
                        <span className="text-[var(--ak-text-main)] font-mono">{userState.stamina} / {userState.maxStamina}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 relative overflow-hidden">
                        <div
                            className="h-full bg-[var(--ak-accent-yellow)] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                            style={{ width: `${sanityPercent}%` }}
                        ></div>
                        {/* Striped overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.5)_25%,rgba(0,0,0,0.5)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.5)_75%,rgba(0,0,0,0.5))] bg-[length:4px_4px] opacity-30"></div>
                    </div>
                    <div className="text-[10px] text-[var(--ak-text-sub)] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-right">
                        RECOVERING...
                    </div>
                </div>

                {/* Settings Button */}
                <button
                    onClick={onOpenSettings}
                    className="ml-4 p-2 hover:text-[var(--ak-accent-cyan)] transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TopBar;
