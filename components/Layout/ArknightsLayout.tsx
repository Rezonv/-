import React from 'react';
import TopBar from './TopBar';
import { UserState } from '../../types';
import ThreeBackground from './ThreeBackground';

interface ArknightsLayoutProps {
    children: React.ReactNode;
    userState: UserState;
    credits: number;
    bgImage?: string;
    onOpenSettings: () => void;
    showTopBar?: boolean;
}

const ArknightsLayout: React.FC<ArknightsLayoutProps> = ({ children, userState, credits, bgImage, onOpenSettings, showTopBar = true }) => {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[var(--ak-bg-dark)] text-[var(--ak-text-main)] font-sans selection:bg-[var(--ak-accent-cyan)] selection:text-black">
            {/* Background Layer */}
            <ThreeBackground />

            {/* Top Bar */}
            {showTopBar && <TopBar userState={userState} credits={credits} onOpenSettings={onOpenSettings} />}

            {/* Main Content Area */}
            <div className="relative z-10 w-full h-full pt-16">
                {children}
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-4 left-4 text-[10px] text-[var(--ak-text-sub)] opacity-30 pointer-events-none">
                <div>RHODES ISLAND NEURAL NETWORK</div>
                <div>CONNECTION STABLE</div>
                <div>PING: 12ms</div>
            </div>
        </div>
    );
};

export default ArknightsLayout;
