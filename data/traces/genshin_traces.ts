

import { TraceNode } from '../../types';
import { generateHsrTraces } from './hsr_traces'; // Reuse factory logic

export const GENSHIN_TRACE_MAP: Record<string, TraceNode[]> = {};

const genshinIds = [
    'raiden', 'yaemiko', 'furina', 'beidou', 'keqing', 'mualani', 'hutao', 'ganyu', 'shenhe', 'yelan', 'nahida', 'nilou', 'navia', 'arlecchino',
    'ayaka', 'eula', 'jean', 'kokomi', 'clorinde', 'xianyun', 'yoimiya', 'chiori',
    'lisa', 'mona', 'ningguang', 'noelle', 'barbara', 'kukishinobu', 'kirara', 'dehya',
    'rosaria', 'yanfei', 'fischl', 'sucrose', 'kujousara', 'yunjin', 'faruzan', 'layla', 'charlotte', 'lynette', 'chevreuse', 'sigewinne',
    'mavuika', 'xilonen', 'chasca', 'klee', 'xiangling'
];
const originalIds = ['linyun'];

[...genshinIds, ...originalIds].forEach(id => {
    // Reuse the factory logic for consistent data structure
    const nodes = generateHsrTraces(id);
    
    // Rename core for Genshin flavor
    const core = nodes.find(n => n.type === 'CORE');
    if(core) {
        core.name = id === 'linyun' ? '地雷系本能' : '命之座 • 覺醒';
        core.description = '解鎖角色的基礎能力盤';
    }
    
    GENSHIN_TRACE_MAP[id] = nodes;
});
