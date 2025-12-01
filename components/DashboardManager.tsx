
import React, { useRef } from 'react';
import { Character } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  characters: Character[];
  dashboardImages: { [id: string]: string };
  rotationIds: string[];
  onToggleRotation: (id: string) => void;
  onUploadDashboardImage: (id: string, file: File) => void;
}

const DashboardManager: React.FC<Props> = ({ isOpen, onClose, characters, dashboardImages, rotationIds, onToggleRotation, onUploadDashboardImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleUploadClick = (id: string) => {
    setUploadTargetId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetId) {
      onUploadDashboardImage(uploadTargetId, file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
    setUploadTargetId(null);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gray-900 text-white flex flex-col animate-fade-in">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900 shadow-md z-10">
        <div className="flex items-center gap-4">
           <button onClick={onClose} className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
           <div>
               <h1 className="text-xl font-bold text-white">看板娘管理</h1>
               <p className="text-xs text-gray-500">設定首頁輪播的角色與背景圖</p>
           </div>
        </div>
        <div className="text-sm text-gray-400">已選: {rotationIds.length} 人</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map(char => {
               const isSelected = rotationIds.includes(char.id);
               const bgUrl = dashboardImages[char.id] || char.avatarUrl;
               
               return (
                 <div key={char.id} className={`relative rounded-xl overflow-hidden border-2 transition-all group ${isSelected ? 'border-pink-500' : 'border-gray-700 opacity-80 hover:opacity-100'}`}>
                    {/* Background Preview */}
                    <div className="aspect-video bg-black relative">
                       <img src={bgUrl} className="w-full h-full object-cover opacity-60" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                       
                       {/* Controls Overlay */}
                       <div className="absolute bottom-0 w-full p-4 flex justify-between items-end">
                          <div>
                             <h3 className="font-bold text-lg text-white drop-shadow-md">{char.name}</h3>
                             <button onClick={() => handleUploadClick(char.id)} className="text-xs bg-black/50 hover:bg-black/80 px-2 py-1 rounded border border-gray-600 mt-1 text-gray-300">
                                📷 更換橫向背景
                             </button>
                          </div>
                          
                          <button 
                            onClick={() => onToggleRotation(char.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl border shadow-lg transition-all ${isSelected ? 'bg-pink-600 border-pink-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-500 hover:bg-gray-700'}`}
                          >
                             {isSelected ? '❤' : '♡'}
                          </button>
                       </div>
                    </div>
                 </div>
               );
            })}
         </div>
      </div>
      
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default DashboardManager;
