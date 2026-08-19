import React, { useState } from 'react';
import { useTimer } from '../../store/TimerContext';
import { Timer as TimerIcon, Eye, Settings, History, Download, Globe } from 'lucide-react';
import { HistoryModal } from '../HistoryModal';
import { useTranslation } from 'react-i18next';

export const TopBar = () => {
  const { config, setMode } = useTimer();
  const [showHistory, setShowHistory] = useState(false);
  const { t, i18n } = useTranslation();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "chronostudio_config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <header className="h-16 border-b border-outline flex items-center justify-between px-6 bg-surface shadow-xl z-20 shrink-0 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#06b6d4] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="font-bold text-white text-xs">TS</span>
          </div>
          <span className="font-semibold tracking-tight text-lg text-on-surface">CHRONO<span className="text-primary">STUDIO</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors border border-transparent hover:border-outline"
            title="Toggle Language"
          >
            <Globe size={14} />
            <span className="uppercase">{i18n.language}</span>
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors border border-transparent hover:border-outline"
          >
            <Download size={14} />
            <span>{t('export')}</span>
          </button>

          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors border border-transparent hover:border-outline"
          >
            <History size={14} />
            <span>{t('history')}</span>
          </button>
          
          <div className="flex bg-black/40 rounded-full p-1 border border-outline">
            <button 
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white shadow-inner"
            >
              {t('editor')}
            </button>
            <button 
              onClick={() => setMode('player')}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {t('preview')}
            </button>
          </div>
          <button 
            onClick={() => setMode('player')}
            className="bg-primary hover:bg-[#22d3ee] text-black font-bold py-2 px-6 rounded-lg text-xs transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            {t('saveConfig')}
          </button>
        </div>
      </header>

      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
    </>
  );
};
