
import React, { useState, useRef } from 'react';
import { Character } from '../types';
import { generateRandomCharacterProfile } from '../services/geminiService';

interface Props {
   isOpen: boolean;
   onClose: () => void;
   onSelect: (char: Character) => void;
   favorites: string[];
   toggleFavorite: (id: string) => void;
   customAvatars: { [key: string]: string };
   onGenerateAvatar: (char: Character) => void;
   onUploadAvatar: (charId: string, file: File) => void;
   isGeneratingAvatar: boolean;
   onAddCustomCharacter: (char: Character) => void;
   customCharactersList: Character[];

   // Dashboard Girl Props
   dashboardGirlIds: string[];
   onToggleDashboardGirl: (id: string) => void;
   onUploadDashboardImage: (charId: string, file: File) => void;
   dashboardImages: { [key: string]: string };

   availableCharacters: Character[]; // New prop for filtered ownership
   mode?: 'story' | 'assistant';
}

const CharacterSelector: React.FC<Props> = ({
   isOpen,
   onClose,
   onSelect,
   favorites,
   toggleFavorite,
   customAvatars,
   onGenerateAvatar,
   onUploadAvatar,
   isGeneratingAvatar,
   onAddCustomCharacter,
   customCharactersList,
   dashboardGirlIds,
   onToggleDashboardGirl,
   onUploadDashboardImage,
   dashboardImages,
   availableCharacters,
   mode = 'story'
}) => {
   const [filterGame, setFilterGame] = useState<'All' | 'Honkai: Star Rail' | 'Genshin Impact' | 'Custom'>('All');
   const [selectedPreview, setSelectedPreview] = useState<Character | null>(null);

   const previewFileInputRef = useRef<HTMLInputElement>(null);
   const dashboardFileInputRef = useRef<HTMLInputElement>(null);

   // Custom Character Form State
   const [isCreating, setIsCreating] = useState(false);
   const [isAutoGenerating, setIsAutoGenerating] = useState(false);
   const [newChar, setNewChar] = useState<Partial<Character>>({
      name: '', description: '', personality: '', measurements: '', interests: [], fetishes: [], defaultRole: '', game: 'Custom', avatarUrl: ''
   });
   const [interestsInput, setInterestsInput] = useState('');
   const [fetishesInput, setFetishesInput] = useState('');

   if (!isOpen) return null;

   // Use the owned list passed from props
   const allCharacters = availableCharacters;

   const filteredChars = allCharacters.filter(c => {
      if (filterGame === 'All') return true;
      if (filterGame === 'Custom') return c.isCustom;
      return c.game === filterGame;
   }).sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      // Secondary sort by rarity
      return b.rarity - a.rarity;
   });

   const getAvatar = (char: Character) => customAvatars[char.id] || char.portraitUrl || char.avatarUrl;

   const handlePreviewAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file && selectedPreview) onUploadAvatar(selectedPreview.id, file); };
   const handleAutoGenerateProfile = async () => {
      setIsAutoGenerating(true);
      try {
         const profile = await generateRandomCharacterProfile();
         setNewChar(prev => ({ ...prev, ...profile, avatarUrl: prev.avatarUrl || '' }));
         setInterestsInput(profile.interests?.join(', ') || '');
         setFetishesInput(profile.fetishes?.join(', ') || '');
      } catch (e) { alert("生成失敗"); } finally { setIsAutoGenerating(false); }
   };
   const handleSaveCustom = () => {
      if (!newChar.name) return alert("請輸入名字");
      const char: Character = {
         id: 'custom_' + Date.now(),
         name: newChar.name || 'Unnamed',
         game: 'Custom',
         rarity: 5, // Default rarity for custom characters
         description: newChar.description || '',
         personality: newChar.personality || '',
         measurements: newChar.measurements || 'Secret',
         interests: interestsInput.split(/[ ,，、]+/).filter(Boolean),
         fetishes: fetishesInput.split(/[ ,，、]+/).filter(Boolean),
         avatarUrl: newChar.avatarUrl || `https://ui-avatars.com/api/?name=${newChar.name}&background=random&color=fff&size=300`,
         defaultRole: newChar.defaultRole || '神秘人',
         isCustom: true
      };
      onAddCustomCharacter(char); setIsCreating(false); setFilterGame('Custom'); setSelectedPreview(char); setNewChar({ name: '', description: '', personality: '', measurements: '', game: 'Custom', defaultRole: '', avatarUrl: '' }); setInterestsInput(''); setFetishesInput('');
   };

   const previewBg = selectedPreview ? (dashboardImages[selectedPreview.id] || getAvatar(selectedPreview)) : '';

   const getRarityBorder = (rarity: number) => {
      if (rarity === 5) return 'border-yellow-500';
      if (rarity === 4) return 'border-purple-500';
      return 'border-blue-500';
   };

   return (
      <div className="fixed inset-0 z-[100] bg-gray-900 flex flex-col animate-fade-in">

         <div className="flex-1 flex overflow-hidden">
            {/* Left Panel: List */}
            <div className="w-full md:w-96 flex flex-col border-r border-gray-800 bg-gray-900/95 backdrop-blur-md">

               {/* Sidebar Header: Back & Filters */}
               <div className="p-4 border-b border-gray-800 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                     <button onClick={onClose} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                        <div className="bg-gray-800 p-2 rounded-full group-hover:bg-gray-700">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">BACK</span>
                     </button>
                     <button onClick={() => { setIsCreating(!isCreating); setSelectedPreview(null); }} className="text-xs bg-gray-800 hover:bg-gray-700 text-pink-400 px-3 py-1 rounded border border-gray-700">
                        {isCreating ? '取消' : '+ 新增'}
                     </button>
                  </div>

                  {/* Filter Tabs */}
                  {!isCreating && (
                     <div className="flex bg-gray-800/50 rounded-lg p-1 overflow-x-auto no-scrollbar">
                        {(['All', 'Honkai: Star Rail', 'Genshin Impact', 'Custom'] as const).map(game => (
                           <button key={game} onClick={() => setFilterGame(game)} className={`flex-1 px-2 py-1.5 rounded text-[10px] font-bold transition-colors whitespace-nowrap ${filterGame === game ? 'bg-pink-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                              {game === 'All' ? '全部' : game === 'Honkai: Star Rail' ? '星鐵' : game === 'Genshin Impact' ? '原神' : '自訂'}
                           </button>
                        ))}
                     </div>
                  )}

                  <div className="flex justify-between items-end">
                     <h2 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">CHARACTERS ({filteredChars.length})</h2>
                  </div>
               </div>

               {!isCreating ? (
                  <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-2">
                     {filteredChars.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">
                           尚未擁有角色。<br />請前往「躍遷」進行獲取。
                        </div>
                     ) : filteredChars.map(char => (
                        <div key={char.id} onClick={() => setSelectedPreview(char)} className={`cursor-pointer rounded-xl p-3 border-2 transition-all relative flex items-center gap-4 ${selectedPreview?.id === char.id ? 'bg-gradient-to-r from-pink-900/40 to-transparent border-pink-500' : 'bg-transparent border-transparent hover:bg-gray-800'}`}>
                           <div className={`w-12 h-12 rounded-lg bg-gray-800 overflow-hidden shrink-0 border-2 ${getRarityBorder(char.rarity)}`}>
                              <img src={getAvatar(char)} alt={char.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                 <h3 className={`font-bold truncate ${selectedPreview?.id === char.id ? 'text-white' : 'text-gray-400'}`}>{char.name}</h3>
                              </div>
                              <p className="text-[10px] text-gray-500 truncate">{char.defaultRole}</p>
                           </div>
                           {favorites.includes(char.id) && <span className="text-yellow-500 text-lg">★</span>}
                        </div>
                     ))}
                  </div>
               ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">
                     請在右側填寫資料
                  </div>
               )}
            </div>

            {/* Right Panel: Detail or Form */}
            <div className="flex-1 bg-gray-850 overflow-hidden relative flex flex-col">
               {isCreating ? (
                  <div className="p-8 max-w-3xl mx-auto w-full overflow-y-auto custom-scrollbar">
                     <h2 className="text-2xl font-bold text-white mb-6">建立新檔案</h2>
                     <button onClick={handleAutoGenerateProfile} disabled={isAutoGenerating} className="mb-6 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded text-sm transition-colors">{isAutoGenerating ? 'AI 生成中...' : '✨ AI 隨機生成設定'}</button>
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <input className="bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none" placeholder="姓名" value={newChar.name} onChange={e => setNewChar({ ...newChar, name: e.target.value })} />
                           <input className="bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none" placeholder="職位/身分" value={newChar.defaultRole} onChange={e => setNewChar({ ...newChar, defaultRole: e.target.value })} />
                        </div>
                        <textarea className="w-full bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none h-32" placeholder="外貌與背景描述..." value={newChar.description} onChange={e => setNewChar({ ...newChar, description: e.target.value })} />
                        <div className="grid grid-cols-2 gap-4">
                           <textarea className="bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none h-24" placeholder="性格特徵" value={newChar.personality} onChange={e => setNewChar({ ...newChar, personality: e.target.value })} />
                           <textarea className="bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none h-24" placeholder="三圍數據 (例如: B90/W60/H90)" value={newChar.measurements} onChange={e => setNewChar({ ...newChar, measurements: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <input className="bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none" placeholder="興趣 (用逗號分隔)" value={interestsInput} onChange={e => setInterestsInput(e.target.value)} />
                           <input className="bg-gray-800 border border-gray-700 p-3 rounded text-white focus:border-pink-500 outline-none" placeholder="性癖/弱點 (用逗號分隔)" value={fetishesInput} onChange={e => setFetishesInput(e.target.value)} />
                        </div>
                        <div className="flex gap-4">
                           <button onClick={handleSaveCustom} className="flex-1 bg-pink-600 hover:bg-pink-500 py-3 rounded text-white font-bold">儲存檔案</button>
                        </div>
                     </div>
                  </div>
               ) : selectedPreview ? (
                  <>
                     {/* Immersive BG & Standing Art */}
                     <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        {/* Background Image (Blurred) */}
                        <div className="absolute inset-0 bg-gray-900">
                           {previewBg && <img src={previewBg} className="w-full h-full object-cover opacity-20 blur-sm" />}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>

                        {/* Full Standing Art - Positioned Bottom Right */}
                        <div className="absolute bottom-0 right-[-10%] h-[110%] w-[70%] z-20 flex items-end justify-center">
                           <img
                              src={selectedPreview.portraitUrl || selectedPreview.avatarUrl}
                              className="h-full object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] mask-image-gradient-to-b"
                              alt={selectedPreview.name}
                           />
                        </div>
                     </div>

                     <div className="relative z-30 flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar w-full md:w-[60%]">
                        <div className="flex gap-6 mb-8">
                           <div className={`w-32 h-32 rounded-xl overflow-hidden border-4 shadow-2xl shrink-0 group relative ${getRarityBorder(selectedPreview.rarity)}`}>
                              <img src={getAvatar(selectedPreview)} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                                 <button onClick={() => onGenerateAvatar(selectedPreview)} disabled={isGeneratingAvatar} className="text-xs bg-pink-600 text-white px-2 py-1 rounded">AI重繪</button>
                                 <button onClick={() => previewFileInputRef.current?.click()} className="text-xs bg-blue-600 text-white px-2 py-1 rounded">上傳</button>
                                 <input ref={previewFileInputRef} type="file" className="hidden" onChange={handlePreviewAvatarUpload} />
                              </div>
                           </div>
                           <div>
                              <div className="flex items-end gap-3 mb-2">
                                 <h2 className="text-5xl font-black text-white drop-shadow-lg">{selectedPreview.name}</h2>
                                 <span className="text-yellow-400 text-xl tracking-tighter mb-2">
                                    {Array(selectedPreview.rarity).fill('★').join('')}
                                 </span>
                              </div>
                              <div className="flex gap-2 mb-6">
                                 <span className="bg-gray-800/80 backdrop-blur text-gray-300 px-3 py-1 rounded text-xs border border-gray-600">{selectedPreview.game}</span>
                                 <span className="bg-gray-800/80 backdrop-blur text-gray-300 px-3 py-1 rounded text-xs border border-gray-600">{selectedPreview.defaultRole}</span>
                              </div>
                              <div className="flex gap-3">
                                 <button onClick={() => onSelect(selectedPreview)} className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-pink-500/20 transition-all active:scale-95 text-lg">
                                    {mode === 'assistant' ? '設定為助理' : '開始故事'}
                                 </button>
                                 <button onClick={() => toggleFavorite(selectedPreview!.id)} className={`px-4 py-3 rounded-lg border ${favorites.includes(selectedPreview.id) ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-gray-600 text-gray-400 hover:bg-gray-800 bg-gray-900/50 backdrop-blur'}`}>
                                    {favorites.includes(selectedPreview.id) ? '★' : '☆'}
                                 </button>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-6 text-gray-300">
                           <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">描述</h3>
                              <p className="leading-relaxed text-sm">{selectedPreview.description}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                                 <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">性格</h3>
                                 <p className="text-sm">{selectedPreview.personality}</p>
                              </div>
                              <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                                 <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">三圍</h3>
                                 <p className="font-mono text-pink-300 text-sm">{selectedPreview.measurements}</p>
                              </div>
                           </div>
                           <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                              <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">性癖 / 弱點</h3>
                              <div className="flex flex-wrap gap-2">
                                 {selectedPreview.fetishes.map((f, i) => (
                                    <span key={i} className="text-xs bg-pink-900/30 text-pink-300 px-2 py-1 rounded border border-pink-500/30">{f}</span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </>
               ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">
                     選擇左側列表以查看詳情
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default CharacterSelector;
