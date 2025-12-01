import React from 'react';

interface Props {
  onStart: () => void;
  backgroundUrl?: string;
}

const LandingScreen: React.FC<Props> = ({ onStart, backgroundUrl }) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 transition-opacity duration-1000">
         {backgroundUrl && <img src={backgroundUrl} alt="Background" className="w-full h-full object-cover opacity-60 animate-scale-slow" />}
         <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900"></div>
      </div>

      {/* Animated Blobs (Overlaying the image for effect) */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center p-8 animate-fade-in-up max-w-3xl">
        <div className="mb-6">
          <span className="px-4 py-1.5 rounded-full border border-pink-400/30 bg-pink-900/40 text-pink-300 text-xs tracking-[0.2em] uppercase font-semibold backdrop-blur-md shadow-lg">
            AI 互動式小說
          </span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-pink-200 mb-4 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)] tracking-tighter">
          幻夢伴侶
        </h1>
        <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-[0.3em] mb-16 border-t border-b border-gray-600/30 py-4 w-full">
          DREAM COMPANION
        </p>

        <button 
          onClick={onStart}
          className="group relative px-16 py-5 bg-transparent overflow-hidden rounded-full transition-all hover:shadow-[0_0_50px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-purple-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
          <span className="relative z-10 text-white text-xl font-bold tracking-widest flex items-center gap-3">
            進入世界 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
        
        <p className="mt-20 text-gray-500 text-xs tracking-wide font-medium bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
          由 GEMINI 驅動 • 星穹鐵道 • 原神
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;