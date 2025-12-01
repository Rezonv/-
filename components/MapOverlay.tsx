
import React, { useEffect, useRef } from 'react';
import { MapNode, NodeType } from './MapSystem';

interface Props {
  nodes: MapNode[];
  currentNodeIndex: number;
  onNodeClick: (index: number) => void;
  backgroundImage?: string;
}

const NodeIcon: React.FC<{ type: NodeType, status: 'LOCKED' | 'ACTIVE' | 'CLEARED' }> = ({ type, status }) => {
  let icon = '❓';
  let colorClass = 'bg-gray-700 border-gray-500 text-gray-400';

  switch (type) {
    case 'START': icon = '🚩'; break;
    case 'COMBAT': icon = '⚔️'; break;
    case 'ELITE': icon = '👹'; break;
    case 'EVENT': icon = '❔'; break;
    case 'REST': icon = '☕'; break;
    case 'BOSS': icon = '☠️'; break;
  }

  if (status === 'CLEARED') colorClass = 'bg-green-900/50 border-green-500 text-green-500 grayscale opacity-70';
  if (status === 'ACTIVE') colorClass = 'bg-yellow-600 border-yellow-400 text-white shadow-[0_0_20px_gold] scale-110 z-10 animate-pulse';
  if (status === 'LOCKED') colorClass = 'bg-gray-800 border-gray-700 text-gray-600 opacity-50';

  return (
    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-xl md:text-3xl transition-all duration-300 ${colorClass}`}>
       {icon}
    </div>
  );
};

const MapOverlay: React.FC<Props> = ({ nodes, currentNodeIndex, onNodeClick, backgroundImage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to current node
  useEffect(() => {
      if (scrollRef.current) {
          const nodeWidth = 100; // approx width of node + gap
          const centerOffset = window.innerWidth / 2 - nodeWidth / 2;
          scrollRef.current.scrollTo({
              left: currentNodeIndex * 120 - centerOffset + 50,
              behavior: 'smooth'
          });
      }
  }, [currentNodeIndex]);

  return (
    <div className="absolute inset-0 z-40 bg-gray-900/95 backdrop-blur-md flex flex-col animate-fade-in">
      {/* Background Image Layer */}
      {backgroundImage && (
          <div className="absolute inset-0 z-0 opacity-20">
              <img src={backgroundImage} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
      )}

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center pb-20">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black text-white tracking-widest uppercase border-b-4 border-yellow-500 pb-2 inline-block">
              戰術地圖 (TACTICAL MAP)
            </h2>
            <p className="text-gray-400 mt-3 text-sm font-mono tracking-wider">LOCATION: SECTOR {currentNodeIndex + 1} / {nodes.length}</p>
          </div>

          {/* Map Track */}
          <div ref={scrollRef} className="w-full overflow-x-auto custom-scrollbar px-10 py-10 flex justify-start md:justify-center items-center min-h-[200px]">
             <div className="relative flex items-center gap-8 md:gap-16 mx-auto">
                
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -z-10"></div>
                <div 
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-green-500 to-yellow-500 -z-10 transition-all duration-1000"
                    style={{ width: `${(currentNodeIndex / (nodes.length - 1)) * 100}%` }}
                ></div>

                {nodes.map((node, index) => {
                   let status: 'LOCKED' | 'ACTIVE' | 'CLEARED' = 'LOCKED';
                   if (index < currentNodeIndex) status = 'CLEARED';
                   if (index === currentNodeIndex) status = 'ACTIVE';

                   return (
                     <div 
                        key={node.id} 
                        className={`flex flex-col items-center gap-3 group relative transition-transform ${status === 'ACTIVE' ? 'scale-110' : 'hover:scale-105'}`}
                        onClick={() => status === 'ACTIVE' && onNodeClick(index)}
                        style={{ cursor: status === 'ACTIVE' ? 'pointer' : 'default' }}
                     >
                        {/* Current Marker */}
                        {status === 'ACTIVE' && (
                            <div className="absolute -top-10 text-yellow-500 font-bold text-xs animate-bounce flex flex-col items-center">
                                <span>▼</span>
                            </div>
                        )}

                        <NodeIcon type={node.type} status={status} />
                        
                        <div className={`text-xs font-bold whitespace-nowrap uppercase tracking-wide px-2 py-1 rounded ${status==='ACTIVE'?'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30':'text-gray-500'}`}>
                            {node.name}
                        </div>
                     </div>
                   );
                })}
             </div>
          </div>

          {/* Action Button */}
          <div className="mt-12 h-24 flex items-center justify-center">
              <button 
                onClick={() => onNodeClick(currentNodeIndex)}
                className="group relative px-12 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-2xl rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                <span className="relative z-10 flex items-center gap-3">
                    {nodes[currentNodeIndex].type === 'REST' ? '進入休息區 (REST)' : nodes[currentNodeIndex].type === 'EVENT' ? '調查事件 (INVESTIGATE)' : '開始行動 (ENGAGE)'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                </span>
              </button>
          </div>
      </div>
    </div>
  );
};

export default MapOverlay;
