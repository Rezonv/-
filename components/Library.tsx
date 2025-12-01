
import React, { useState, useMemo } from 'react';
import { SavedStory } from '../types';

interface Props {
  library: SavedStory[];
  onLoadStory: (story: SavedStory) => void;
  onDeleteStory: (id: string) => void;
  onBack: () => void;
}

const Library: React.FC<Props> = ({ library, onLoadStory, onDeleteStory, onBack }) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'memories' | 'highlights'>('stories');
  const [selectedCharFilter, setSelectedCharFilter] = useState<string>('All');

  // Aggregate all favorited segments from all stories
  const allHighlights = useMemo(() => library.flatMap(story => 
    story.segments
      .filter(seg => seg.isFavorited && !story.title.includes('【回憶】')) // Exclude full memory stories from highlights tab
      .map(seg => ({ ...seg, storyTitle: story.title, storyId: story.id, characterName: story.characterName, storyDate: story.date }))
  ).sort((a, b) => new Date(b.storyDate).getTime() - new Date(a.storyDate).getTime()), [library]);

  // Filter Memory Stories (CGs)
  const memories = useMemo(() => library.filter(s => s.title.includes('【回憶】')), [library]);
  const normalStories = useMemo(() => library.filter(s => !s.title.includes('【回憶】')), [library]);

  // Extract unique characters from memories for filter
  const memoryCharacters = useMemo(() => {
      const chars = new Set(memories.map(m => m.characterName));
      return Array.from(chars);
  }, [memories]);

  // Apply filter
  const filteredMemories = useMemo(() => {
      if (selectedCharFilter === 'All') return memories;
      return memories.filter(m => m.characterName === selectedCharFilter);
  }, [memories, selectedCharFilter]);

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-900 p-6 sm:p-12 custom-scrollbar">
      <div className="max-w-6xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            收藏庫
          </h2>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
          >
            返回首頁
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('stories')}
            className={`pb-3 px-2 font-bold text-lg transition-colors relative whitespace-nowrap ${activeTab === 'stories' ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
          >
            故事存檔 ({normalStories.length})
            {activeTab === 'stories' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"></div>}
          </button>
          <button
            onClick={() => setActiveTab('memories')}
            className={`pb-3 px-2 font-bold text-lg transition-colors relative whitespace-nowrap ${activeTab === 'memories' ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
          >
            回憶相簿 (CG) ({memories.length})
            {activeTab === 'memories' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"></div>}
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`pb-3 px-2 font-bold text-lg transition-colors relative whitespace-nowrap ${activeTab === 'highlights' ? 'text-pink-500' : 'text-gray-400 hover:text-white'}`}
          >
            對話精選 ({allHighlights.length})
            {activeTab === 'highlights' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-500"></div>}
          </button>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
            {activeTab === 'stories' && (
              normalStories.length === 0 ? (
                <div className="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700">
                  <p className="text-gray-500 text-lg mb-4">你的故事存檔是空的。</p>
                  <button onClick={onBack} className="text-pink-500 hover:text-pink-400 font-medium">
                    去開始一段新的旅程吧
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {normalStories.map((story) => (
                    <div key={story.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 group flex flex-col">
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <span className="px-2 py-1 bg-pink-900/30 text-pink-300 text-xs rounded border border-pink-800/50">
                            {story.characterName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(story.date).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-2 truncate">{story.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                          {story.segments[0]?.text.substring(0, 100)}...
                        </p>
                      </div>
                      <div className="bg-gray-900/50 p-4 border-t border-gray-700 flex items-center gap-3">
                        <button 
                          onClick={() => onLoadStory(story)}
                          className="flex-1 bg-pink-600 hover:bg-pink-500 text-white py-2 rounded-lg text-sm font-bold transition-colors"
                        >
                          繼續閱讀
                        </button>
                        <button 
                          onClick={() => onDeleteStory(story.id)}
                          className="px-3 py-2 bg-gray-700 hover:bg-red-900/50 hover:text-red-400 text-gray-400 rounded-lg transition-colors"
                          title="刪除"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'memories' && (
                <div className="space-y-6">
                    {/* Character Filter Dropdown */}
                    {memoryCharacters.length > 0 && (
                        <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <label className="text-gray-400 text-sm font-bold">篩選角色:</label>
                            <select 
                                value={selectedCharFilter} 
                                onChange={(e) => setSelectedCharFilter(e.target.value)}
                                className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-500 cursor-pointer"
                            >
                                <option value="All">全部 ({memories.length})</option>
                                {memoryCharacters.map(char => (
                                    <option key={char} value={char}>
                                        {char} ({memories.filter(m => m.characterName === char).length})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {filteredMemories.length === 0 ? (
                        <div className="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700">
                          <p className="text-gray-500 text-lg mb-4">
                              {memories.length === 0 ? "尚未解鎖任何回憶 CG。" : "此角色暫無回憶。"}
                          </p>
                          {memories.length === 0 && <p className="text-sm text-gray-600">提升角色好感度並解鎖羈絆劇情來收集回憶。</p>}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredMemories.map(story => {
                                const cg = story.segments.find(s => s.imageUrl)?.imageUrl;
                                return (
                                    <div key={story.id} className="relative group rounded-2xl overflow-hidden aspect-video bg-black border border-gray-700 shadow-2xl hover:border-pink-500 transition-all cursor-pointer" onClick={() => onLoadStory(story)}>
                                        {cg ? (
                                            <img src={cg} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-600">無影像</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                        
                                        <div className="absolute bottom-0 left-0 w-full p-6">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs bg-pink-600 text-white px-2 py-0.5 rounded font-bold shadow">回憶</span>
                                                    <span className="text-xs bg-gray-700/80 text-gray-300 px-2 py-0.5 rounded">{story.characterName}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">{new Date(story.date).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-1">{story.title.replace('【回憶】', '')}</h3>
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm text-gray-300 italic opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">點擊重溫...</span>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); onDeleteStory(story.id); }}
                                                    className="text-gray-500 hover:text-red-400 z-10 p-1"
                                                    title="刪除回憶"
                                                >
                                                    🗑
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'highlights' && (
              allHighlights.length === 0 ? (
                <div className="bg-gray-800/50 rounded-2xl p-12 text-center border border-gray-700">
                  <p className="text-gray-500 text-lg mb-4">尚無收藏的精選片段。</p>
                  <p className="text-gray-600 text-sm">在閱讀故事時，點擊對話框旁的愛心按鈕即可收藏該片段。</p>
                </div>
              ) : (
                 <div className="grid grid-cols-1 gap-6">
                   {allHighlights.map((item, idx) => (
                     <div key={`${item.id}-${idx}`} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-6 hover:border-pink-500/30 transition-colors">
                        {item.imageUrl && (
                           <div className="w-full md:w-1/3 shrink-0 rounded-lg overflow-hidden border border-gray-700">
                             <img src={item.imageUrl} alt="Highlight" className="w-full h-full object-cover" />
                           </div>
                        )}
                        <div className="flex-1">
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                 <span className="text-pink-400 font-bold text-sm">{item.characterName}</span>
                                 <span className="text-gray-500 text-xs">•</span>
                                 <span className="text-gray-400 text-xs">{item.storyTitle}</span>
                              </div>
                              <span className="text-gray-600 text-xs">{new Date(item.storyDate).toLocaleDateString()}</span>
                           </div>
                           <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{item.text}</p>
                           
                           <div className="mt-4 pt-4 border-t border-gray-700/50">
                              <button 
                                onClick={() => onLoadStory(library.find(s => s.id === item.storyId)!)}
                                className="text-sm text-pink-500 hover:text-pink-400 flex items-center gap-1"
                              >
                                 前往完整故事
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                 </svg>
                              </button>
                           </div>
                        </div>
                     </div>
                   ))}
                 </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default Library;
