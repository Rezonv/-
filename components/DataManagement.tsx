
import React, { useState, useRef, useEffect } from 'react';
import { getAllAvatarsFromDB, getAllGameData, bulkRestore } from '../services/dbService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

type ViewPhase = 'MENU' | 'EXPORTING' | 'IMPORT_SELECT' | 'IMPORT_CONFIRM' | 'IMPORT_EXECUTING' | 'SUCCESS' | 'ERROR';

const DataManagement: React.FC<Props> = ({ isOpen, onClose, onImportComplete }) => {
  const [phase, setPhase] = useState<ViewPhase>('MENU');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPhase('MENU');
      setLogs([]);
      setProgress(0);
      setSelectedFile(null);
    }
  }, [isOpen]);

  // Auto scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  // --- EXPORT LOGIC ---
  const handleExport = async () => {
    setPhase('EXPORTING');
    setLogs(['初始化備份程序...']);
    setProgress(10);

    try {
      addLog('正在讀取遊戲存檔 (IndexedDB)...');
      const gameData = await getAllGameData();
      setProgress(40);
      
      addLog(`已讀取 ${Object.keys(gameData).length} 筆核心資料。`);
      addLog('正在打包圖片資源 (這可能需要幾秒鐘)...');
      
      const avatars = await getAllAvatarsFromDB();
      const avatarCount = Object.keys(avatars).length;
      addLog(`已打包 ${avatarCount} 張圖片資源。`);
      setProgress(80);

      const backup = {
        version: 2,
        timestamp: Date.now(),
        date: new Date().toISOString(),
        gameData: gameData,
        avatars: avatars
      };

      addLog('正在生成 JSON 檔案...');
      const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `幻夢伴侶_Backup_${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setProgress(100);
      addLog('下載已開始。');
      setTimeout(() => setPhase('MENU'), 2000);

    } catch (e: any) {
      console.error(e);
      addLog(`錯誤: ${e.message}`);
      alert("備份失敗");
      setPhase('MENU');
    }
  };

  // --- IMPORT LOGIC ---
  
  // Step 1: Trigger File Picker
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset to allow re-selecting same file
        fileInputRef.current.click();
    }
  };

  // Step 2: Handle Selection
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedFile(file);
        setPhase('IMPORT_CONFIRM');
    }
  };

  // Step 3: Execute
  const executeImport = () => {
    if (!selectedFile) return;
    setPhase('IMPORT_EXECUTING');
    setLogs(['初始化還原引擎...', `目標檔案: ${selectedFile.name}`]);
    setProgress(5);

    const reader = new FileReader();
    
    reader.onprogress = (ev) => {
        if (ev.lengthComputable) {
            const pct = Math.round((ev.loaded / ev.total) * 40); // Reading is first 40%
            setProgress(pct);
        }
    };

    reader.onload = async (e) => {
        try {
            addLog('檔案讀取完成 (100%)');
            setProgress(40);
            
            // Short delay to render
            await new Promise(r => setTimeout(r, 100));
            
            addLog('正在解析 JSON 結構...');
            const content = e.target?.result as string;
            const backup = JSON.parse(content);
            
            if (!backup.gameData && !backup.localStorage) {
                throw new Error("無效的備份檔案格式 (缺少 gameData)");
            }

            setProgress(50);
            const dataCount = Object.keys(backup.gameData || {}).length;
            const imgCount = Object.keys(backup.avatars || {}).length;
            addLog(`解析成功: ${dataCount} 筆資料, ${imgCount} 張圖片。`);
            addLog('正在執行原子寫入 (Atomic Write)...');

            // Prepare data
            const finalData = backup.gameData || {};
            // Legacy support
            if (backup.localStorage) {
                addLog('偵測到舊版資料，正在轉換格式...');
                Object.entries(backup.localStorage).forEach(([k, v]) => {
                    try { finalData[k] = JSON.parse(v as string); } catch { finalData[k] = v; }
                });
            }

            // Execute DB Restore
            await bulkRestore(finalData, backup.avatars || {});
            
            setProgress(100);
            addLog('資料庫寫入完成！');
            addLog('清除 LocalStorage 快取...');
            localStorage.clear();
            
            setPhase('SUCCESS');

        } catch (err: any) {
            console.error(err);
            addLog(`嚴重錯誤: ${err.message}`);
            alert(`還原失敗: ${err.message}`);
            setPhase('ERROR');
        }
    };

    reader.readAsText(selectedFile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-xl">
      <div className="w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <h2 className="font-mono font-bold text-white tracking-widest text-lg">系統資料控制台 (SYSTEM CONSOLE)</h2>
           </div>
           {phase !== 'IMPORT_EXECUTING' && (
              <button onClick={onClose} className="text-gray-500 hover:text-white font-bold text-xl px-2">✕</button>
           )}
        </div>

        {/* Body */}
        <div className="p-8 flex-1 overflow-y-auto flex flex-col">
           
           {/* MENU PHASE */}
           {phase === 'MENU' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                 <button 
                    onClick={handleExport}
                    className="group relative overflow-hidden bg-blue-900/20 border border-blue-800 hover:bg-blue-900/40 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all hover:scale-[1.02]"
                 >
                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">⬇️</div>
                    <div className="text-center">
                       <h3 className="text-2xl font-bold text-white mb-2">資料備份 (匯出)</h3>
                       <p className="text-gray-400 text-sm">下載完整存檔包含圖片資源 (.json)</p>
                    </div>
                 </button>

                 <button 
                    onClick={triggerFileSelect}
                    className="group relative overflow-hidden bg-red-900/20 border border-red-800 hover:bg-red-900/40 hover:border-red-500 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all hover:scale-[1.02]"
                 >
                    <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">⬆️</div>
                    <div className="text-center">
                       <h3 className="text-2xl font-bold text-white mb-2">資料還原 (匯入)</h3>
                       <p className="text-gray-400 text-sm">讀取備份檔並覆蓋當前進度</p>
                    </div>
                 </button>
                 {/* Hidden Input */}
                 <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept=".json,application/json" 
                    className="hidden" 
                    onChange={onFileSelected} 
                 />
              </div>
           )}

           {/* CONFIRM PHASE */}
           {phase === 'IMPORT_CONFIRM' && selectedFile && (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                 <div className="bg-yellow-900/20 border border-yellow-600 p-6 rounded-xl max-w-lg w-full text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h3 className="text-2xl font-bold text-yellow-500 mb-2">準備覆蓋資料</h3>
                    <p className="text-gray-300 mb-6">您即將使用以下檔案還原系統，此操作<span className="text-red-400 font-bold">不可逆</span>，當前所有進度將被刪除。</p>
                    
                    <div className="bg-black/40 p-4 rounded-lg font-mono text-left mb-6 border border-gray-700">
                       <div className="text-gray-400 text-xs mb-1">已選檔案 (SELECTED FILE):</div>
                       <div className="text-white font-bold break-all">{selectedFile.name}</div>
                       <div className="text-blue-400 text-sm mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>

                    <div className="flex gap-4">
                       <button onClick={() => setPhase('MENU')} className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-800 font-bold">取消</button>
                       <button onClick={executeImport} className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg animate-pulse">
                          確認並開始還原
                       </button>
                    </div>
                 </div>
              </div>
           )}

           {/* EXECUTING / EXPORTING PHASE (TERMINAL) */}
           {(phase === 'IMPORT_EXECUTING' || phase === 'EXPORTING' || phase === 'SUCCESS' || phase === 'ERROR') && (
              <div className="flex flex-col h-full">
                 {/* Progress Bar */}
                 <div className="mb-4">
                    <div className={`flex justify-between text-xs font-mono mb-1 ${phase === 'ERROR' ? 'text-red-500' : 'text-green-500'}`}>
                       <span>狀態 (STATUS): {phase === 'SUCCESS' ? '完成 (COMPLETED)' : phase === 'ERROR' ? '失敗 (FAILED)' : '處理中 (PROCESSING)'}</span>
                       <span>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                       <div className={`h-full transition-all duration-300 ${phase === 'ERROR' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${progress}%` }}></div>
                    </div>
                 </div>

                 {/* Terminal Window */}
                 <div 
                    ref={logContainerRef}
                    className="flex-1 bg-black border border-gray-700 rounded-lg p-4 font-mono text-xs text-green-400 overflow-y-auto shadow-inner"
                 >
                    {logs.map((log, i) => (
                       <div key={i} className="mb-1 border-b border-gray-900 pb-1 last:border-0">{log}</div>
                    ))}
                    {phase !== 'SUCCESS' && phase !== 'ERROR' && (
                       <div className="animate-pulse">_</div>
                    )}
                 </div>

                 {phase === 'SUCCESS' && (
                    <div className="mt-6 text-center animate-fade-in-up">
                       <h3 className="text-2xl font-bold text-white mb-2">✨ 還原成功</h3>
                       <p className="text-gray-400 mb-6">系統資料已更新，請重新啟動應用程式。</p>
                       <button 
                          onClick={onImportComplete} 
                          className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
                       >
                          立即重啟 (RELOAD)
                       </button>
                    </div>
                 )}
                 
                 {phase === 'ERROR' && (
                    <div className="mt-4 text-center">
                        <button onClick={() => setPhase('MENU')} className="px-6 py-2 bg-gray-700 text-white rounded">返回選單</button>
                    </div>
                 )}
              </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default DataManagement;
