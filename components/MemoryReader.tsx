
import React, { useState } from 'react';
import { Character, StorySegment } from '../types';

interface Props {
  character: Character;
  segment: StorySegment | undefined;
  isGenerating: boolean;
  onBack: () => void;
}

const MemoryReader: React.FC<Props> = ({ character, segment, isGenerating, onBack }) => {
  const [showUI, setShowUI] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. Full Screen Background Layer (The Memory) */}
        <div className="absolute inset-0 transition-opacity duration-1000">
            {segment?.imageUrl ? (
                <img 
                    src={segment.imageUrl} 
                    alt="Memory CG" 
                    className="w-full h-full object-cover animate-scale-slow" 
                />
            ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    {isGenerating && (
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                            <p className="text-pink-300 animate-pulse tracking-widest">正在重構回憶片段...</p>
                        </div>
                    )}
                </div>
            )}
            {/* Vignette & Gradient Overlay for readability - Only show when UI is visible */}
            {showUI && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent h-32 pointer-events-none"></div>
                </>
            )}
        </div>

        {/* 2. Restore UI Layer (Invisible, high Z-index, only active when UI is hidden) */}
        {!showUI && (
            <div 
                className="fixed inset-0 z-[100] cursor-pointer"
                onClick={() => setShowUI(true)}
                title="點擊任意處顯示介面"
            ></div>
        )}

        {/* 3. Top Controls */}
        {showUI && (
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 animate-fade-in-down">
                <div className="flex items-center gap-3">
                    <button onClick={onBack} className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full border border-white/10 backdrop-blur-md transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <div>
                        <h2 className="text-white font-bold text-lg drop-shadow-md tracking-widest">珍貴回憶</h2>
                        <p className="text-gray-400 text-xs">{character.name}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    {/* Hide UI Button */}
                    <button 
                        onClick={() => setShowUI(false)}
                        className="bg-black/40 hover:bg-black/60 text-white p-3 rounded-full border border-white/10 backdrop-blur-md transition-all"
                        title="隱藏對話與介面 (點擊畫面任一處恢復)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    </button>

                    {!isGenerating && (
                        <div className="bg-pink-900/80 text-pink-200 px-3 py-1 rounded-full text-xs border border-pink-500/50 flex items-center gap-1 backdrop-blur-md h-12">
                            <span>❤</span> 已收藏至圖鑑
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* 4. Bottom Text Area (Visual Novel Style) */}
        {showUI && !isGenerating && segment && (
            <div className="absolute bottom-0 w-full p-6 md:p-12 z-20 animate-fade-in-up">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-black/70 backdrop-blur-md border-l-4 border-pink-500 p-6 md:p-8 rounded-r-xl shadow-2xl">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-pink-400 font-bold text-lg">{character.name}</span>
                        </div>
                        <p className="text-gray-100 text-lg md:text-xl leading-relaxed font-light tracking-wide whitespace-pre-wrap">
                            {segment.text}
                        </p>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                        <button 
                            onClick={onBack}
                            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3 rounded-full backdrop-blur-md transition-all font-bold tracking-widest uppercase hover:scale-105"
                        >
                            保存並離開
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* 5. Loading Indicator (if generic) */}
        {isGenerating && (
            <div className="absolute bottom-10 text-gray-500 text-xs animate-pulse z-10">
                Memory Generating...
            </div>
        )}

    </div>
  );
};

export default MemoryReader;
