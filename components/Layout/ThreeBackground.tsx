import React from 'react';

const ThreeBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 bg-black overflow-hidden">
            {/* Static Background Image with Adjustments */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url(/backgrounds/generated_4k_bg.png?t=${Date.now()})`,
                    filter: 'brightness(0.9)', // Minimal brightness adjustment
                    // Optional: Add a mask if "partial removal" implies fading out
                    // maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' 
                }}
            ></div>

            {/* Overlay to darken slightly for text readability */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 ak-scanline opacity-5 pointer-events-none"></div>

            {/* Vignette for Cinematic Feel */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
            }}></div>
        </div>
    );
};

export default ThreeBackground;
