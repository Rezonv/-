import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const { imageSettings, setImageSettings, textSettings, setTextSettings } = useGame();
    const [localImageSettings, setLocalImageSettings] = useState(imageSettings);
    const [localTextSettings, setLocalTextSettings] = useState(textSettings);

    useEffect(() => {
        setLocalImageSettings(imageSettings);
        setLocalTextSettings(textSettings);
    }, [imageSettings, textSettings, isOpen]);

    const handleSave = () => {
        setImageSettings(localImageSettings);
        setTextSettings(localTextSettings);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>⚙️</span> 系統設定
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-6">

                    {/* Image Generation Settings */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-pink-400 border-b border-pink-500/30 pb-2">圖像生成設定</h3>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">生成引擎 (Provider)</label>
                            <select
                                value={localImageSettings.provider}
                                onChange={(e) => setLocalImageSettings(prev => ({ ...prev, provider: e.target.value as 'gemini' | 'custom' }))}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                            >
                                <option value="gemini">Google Gemini (預設 - 安全限制)</option>
                                <option value="custom">自定義後端 (Stable Diffusion / WebUI)</option>
                                <option value="novelai">NovelAI (付費訂閱 - 極速/高品質)</option>
                            </select>
                            <p className="text-xs text-gray-500">
                                * Gemini: 免費但有審查。<br />
                                * Custom: 需開啟本地 WebUI。<br />
                                * NovelAI: 需付費訂閱，速度快且無審查 (推薦 Anime V3)。
                            </p>
                        </div>

                        {localImageSettings.provider === 'custom' && (
                            <div className="space-y-4 animate-fade-in-up">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">API 網址 (URL)</label>
                                    <input
                                        type="text"
                                        value={localImageSettings.customUrl}
                                        onChange={(e) => setLocalImageSettings(prev => ({ ...prev, customUrl: e.target.value }))}
                                        placeholder="http://127.0.0.1:7860"
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500">
                                        請輸入 Stable Diffusion WebUI 的 API 地址 (例如 http://127.0.0.1:7860)。<br />
                                        請確保啟動時加上 <code>--api</code> 參數。
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">生成模式 (Generation Mode)</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setLocalImageSettings(prev => ({ ...prev, generationMode: 'quality' }))}
                                            className={`px-4 py-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${localImageSettings.generationMode !== 'speed' // Default to quality if undefined
                                                ? 'bg-pink-900/30 border-pink-500 text-pink-200 shadow-[0_0_10px_rgba(236,72,153,0.2)]'
                                                : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            <span className="font-bold text-sm">✨ 畫質優先</span>
                                            <span className="text-[10px] opacity-70">Steps: 30 | CFG: 8</span>
                                        </button>
                                        <button
                                            onClick={() => setLocalImageSettings(prev => ({ ...prev, generationMode: 'speed' }))}
                                            className={`px-4 py-3 rounded-lg border flex flex-col items-center gap-1 transition-all ${localImageSettings.generationMode === 'speed'
                                                ? 'bg-blue-900/30 border-blue-500 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                                                : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
                                                }`}
                                        >
                                            <span className="font-bold text-sm">⚡ 速度優先</span>
                                            <span className="text-[10px] opacity-70">Steps: 20 | CFG: 7</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {localImageSettings.provider === 'novelai' && (
                            <div className="space-y-4 animate-fade-in-up bg-purple-900/20 p-4 rounded-xl border border-purple-500/30">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">NovelAI API Key (Access Token)</label>
                                    <input
                                        type="password"
                                        value={localImageSettings.novelaiApiKey || ''}
                                        onChange={(e) => setLocalImageSettings(prev => ({ ...prev, novelaiApiKey: e.target.value }))}
                                        placeholder="pst-..."
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500">
                                        請至 <a href="https://novelai.net/stories" target="_blank" className="text-purple-400 underline">NovelAI 官網</a> (User Settings &gt; API &gt; Get Access Token) 取得。<br />
                                        <span className="text-yellow-500">注意：生成圖片需消耗 Anlas (Opus 會員免費額度內無限)。</span>
                                    </p>
                                </div>

                                <div className="space-y-2 pt-2 border-t border-purple-500/30">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-gray-300">參考圖生成 (Img2Img)</label>
                                        <input
                                            type="checkbox"
                                            checked={localImageSettings.novelaiUseReference || false}
                                            onChange={(e) => setLocalImageSettings(prev => ({ ...prev, novelaiUseReference: e.target.checked }))}
                                            className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-800"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        啟用後，將使用角色的「目前立繪」作為構圖參考。<br />
                                        適合想保留角色姿勢或構圖時使用。
                                    </p>

                                    {localImageSettings.novelaiUseReference && (
                                        <div className="space-y-1 animate-fade-in">
                                            <div className="flex justify-between text-xs text-gray-400">
                                                <span>參考強度 (Strength/Noise)</span>
                                                <span>{localImageSettings.novelaiStrength || 0.7}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="0.99"
                                                step="0.01"
                                                value={localImageSettings.novelaiStrength || 0.7}
                                                onChange={(e) => setLocalImageSettings(prev => ({ ...prev, novelaiStrength: parseFloat(e.target.value) }))}
                                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                            />
                                            <p className="text-[10px] text-gray-500 text-right">
                                                數值越小越像原圖，數值越大變化越多 (建議 0.5 - 0.7)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Text Generation Settings */}
                    <div className="space-y-4 pt-6 border-t border-gray-800">
                        <h3 className="text-lg font-bold text-blue-400 border-b border-blue-500/30 pb-2">文本生成設定 (LLM)</h3>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">生成引擎 (Provider)</label>
                            <select
                                value={localTextSettings?.provider || 'gemini'}
                                onChange={(e) => setLocalTextSettings(prev => ({ ...prev, provider: e.target.value as 'gemini' | 'custom' }))}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="gemini">Google Gemini (預設 - 免費但有審查)</option>
                                <option value="custom">自定義 / OpenRouter (無修正)</option>
                            </select>
                        </div>

                        {localTextSettings?.provider === 'custom' && (
                            <div className="space-y-4 animate-fade-in-up bg-blue-900/10 p-4 rounded-xl border border-blue-500/20">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">API Base URL</label>
                                    <input
                                        type="text"
                                        value={localTextSettings.customBaseUrl}
                                        onChange={(e) => setLocalTextSettings(prev => ({ ...prev, customBaseUrl: e.target.value }))}
                                        placeholder="https://openrouter.ai/api/v1"
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500">
                                        OpenRouter: <code>https://openrouter.ai/api/v1</code><br />
                                        LM Studio: <code>http://127.0.0.1:1234/v1</code>
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">API Key (OpenRouter 必填)</label>
                                    <input
                                        type="password"
                                        value={localTextSettings.customApiKey || ''}
                                        onChange={(e) => setLocalTextSettings(prev => ({ ...prev, customApiKey: e.target.value }))}
                                        placeholder="sk-or-..."
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">模型名稱 (Model Name)</label>
                                    <input
                                        type="text"
                                        value={localTextSettings.customModelName}
                                        onChange={(e) => setLocalTextSettings(prev => ({ ...prev, customModelName: e.target.value }))}
                                        placeholder="sophosympatheia/midnight-rose-70b"
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500">
                                        推薦: <code>sophosympatheia/midnight-rose-70b</code> (OpenRouter)<br />
                                        或 <code>local-model</code> (LM Studio)
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 bg-gray-800/50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 transition-colors">取消</button>
                    <button onClick={handleSave} className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-bold shadow-lg shadow-pink-900/20 transition-all active:scale-95">
                        儲存設定
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsModal;
