import React, { useState } from 'react';
import { useTimer } from '../store/TimerContext';
import { CanvasComponent } from '../types';
import { Play, Pause, RotateCcw, SkipForward, Edit2, Timer as TimerIcon, Image as ImageIcon, History, Download, Globe } from 'lucide-react';
import { HistoryModal } from './HistoryModal';
import { useTranslation } from 'react-i18next';

export const Player = () => {
  const { config, setMode, time, isPlaying, setIsPlaying, resetTimer, skipTimer } = useTimer();
  const [showHistory, setShowHistory] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getAccentClass = () => {
    switch (config.accentColor) {
      case 'emerald': return 'bg-[#38bdf8] text-black shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)]';
      case 'indigo': return 'bg-primary text-black shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]';
      case 'rose': return 'bg-error text-black shadow-[0_0_30px_rgba(244,63,94,0.4)] hover:shadow-[0_0_40px_rgba(244,63,94,0.6)]';
      default: return 'bg-primary text-black shadow-[0_0_30px_rgba(6,182,212,0.4)]';
    }
  };

  const getAccentTextClass = () => {
    switch (config.accentColor) {
      case 'emerald': return 'text-[#38bdf8]';
      case 'indigo': return 'text-primary';
      case 'rose': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getFontFamilyClass = () => {
    switch (config.fontFamily) {
      case 'serif': return 'font-serif';
      case 'sans': return 'font-sans';
      case 'mono': return 'font-mono';
      default: return 'font-sans';
    }
  };

  const getCornerRadiusClass = () => {
    switch (config.cornerRadius) {
      case 'square': return 'rounded-none';
      case 'rounded': return 'rounded-lg';
      case 'pill': return 'rounded-full';
      default: return 'rounded-full';
    }
  };

  const progressPercent = config.timerType === 'countdown' 
    ? ((config.duration - time) / config.duration) * 100
    : (time / config.duration) * 100;

  const renderComponent = (comp: CanvasComponent) => {
    switch (comp.type) {
      case 'label':
        return (
          <div key={comp.id} className={`bg-surface-container-high/50 text-on-surface px-6 py-2 ${getCornerRadiusClass()} font-bold uppercase tracking-widest border border-outline-variant backdrop-blur-sm mb-4`}>
            {comp.props?.text || 'Label'}
          </div>
        );
      case 'clock': {
        const sizeRem = Math.max(3, config.displaySize / 10);
        const clockContent = (
          <div 
            className={`font-bold leading-none tracking-tight tabular-nums timer-glow ${isPlaying ? 'pulse-emerald' : ''} ${getAccentTextClass()}`}
            style={{ fontSize: `${sizeRem}rem` }}
          >
            {formatTime(time)}
          </div>
        );

        if (config.showCircularProgress) {
          const dash = 301.59;
          const offset = dash - (progressPercent / 100) * dash;
          return (
            <div key={comp.id} className="relative flex items-center justify-center p-12 md:p-16 my-8">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90 overflow-visible opacity-80">
                 <circle cx="50" cy="50" r="48" strokeWidth="2" stroke="currentColor" fill="none" className="text-white/10" />
                 <circle cx="50" cy="50" r="48" strokeWidth="2" stroke="currentColor" fill="none" 
                    className={`${getAccentTextClass()} transition-all duration-1000 ease-linear`}
                    strokeLinecap="round"
                    strokeDasharray={dash}
                    strokeDashoffset={offset}
                 />
              </svg>
              {clockContent}
            </div>
          );
        }

        return <div key={comp.id}>{clockContent}</div>;
      }
      case 'play_pause':
        return (
          <button 
            key={comp.id} 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-20 h-20 flex items-center justify-center transition-all duration-200 hover:scale-105 ${getAccentClass()} ${getCornerRadiusClass()}`}
          >
            {isPlaying ? <Pause fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} />}
          </button>
        );
      case 'reset':
        return (
          <button 
            key={comp.id} 
            onClick={resetTimer}
            className={`w-14 h-14 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors group ${getCornerRadiusClass()}`}
          >
            <RotateCcw className="group-hover:-rotate-45 transition-transform" />
          </button>
        );
      case 'skip':
        return (
          <button 
            key={comp.id} 
            onClick={skipTimer}
            className={`w-14 h-14 border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors group ${getCornerRadiusClass()}`}
          >
            <SkipForward className="group-hover:translate-x-1 transition-transform" />
          </button>
        );
      case 'image':
        return (
          <div key={comp.id} className={`w-24 h-24 bg-surface-container-high border border-outline flex items-center justify-center text-xs text-outline-variant ${getCornerRadiusClass()}`}>
            <ImageIcon />
          </div>
        );
      default:
        return null;
    }
  };

  // Group buttons together
  const renderCanvas = () => {
    const result = [];
    let buttonGroup = [];

    config.components.forEach((comp, idx) => {
      const isButton = ['play_pause', 'reset', 'skip', 'start', 'stop'].includes(comp.type);
      
      if (isButton) {
        buttonGroup.push(comp);
      } else {
        if (buttonGroup.length > 0) {
          result.push(
            <div key={`group-${idx}`} className="flex items-center justify-center gap-6 mt-12 bg-surface-container-lowest/80 dark:bg-surface-container-low/80 p-4 rounded-2xl border border-outline-variant shadow-lg backdrop-blur-md">
              {buttonGroup.map(c => renderComponent(c))}
            </div>
          );
          buttonGroup = [];
        }
        result.push(renderComponent(comp));
      }
    });

    if (buttonGroup.length > 0) {
      result.push(
        <div key="group-end" className="flex items-center justify-center gap-6 mt-12 bg-surface-container-lowest/80 dark:bg-surface-container-low/80 p-4 rounded-2xl border border-outline-variant shadow-lg backdrop-blur-md">
          {buttonGroup.map(c => renderComponent(c))}
        </div>
      );
    }

    return result;
  };

  return (
    <div className={`bg-[radial-gradient(circle_at_center,_#1a1a24_0%,_#0a0a0c_100%)] text-on-surface h-screen w-screen overflow-hidden flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container relative ${getFontFamilyClass()}`}>
      
      {/* Background grids */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-surface-container-high z-50">
        <div 
          className="h-full transition-all duration-1000 ease-linear" 
          style={{ width: `${progressPercent}%`, backgroundColor: config.theme === 'dark' ? 'var(--color-secondary)' : 'var(--color-secondary-container)' }}
        ></div>
      </div>

      {/* Header Controls */}
      <div className="absolute top-0 left-0 w-full p-4 z-40 flex justify-between items-center">
        <div className="font-bold text-lg tracking-tight text-on-surface opacity-70 hover:opacity-100 transition-opacity flex items-center gap-3 cursor-pointer">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#06b6d4] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="font-bold text-white text-xs">TS</span>
          </div>
          <span>CHRONO<span className="text-primary">STUDIO</span></span>
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
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "chronostudio_config.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          }}
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
            onClick={() => setMode('studio')}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors"
          >
            {t('editor')}
          </button>
          <button 
            className="px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white shadow-inner"
          >
            {t('preview')}
          </button>
        </div>
        <button 
          onClick={() => setMode('studio')}
          className="bg-primary hover:bg-[#22d3ee] text-black font-bold py-2 px-6 rounded-lg text-xs transition-colors shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2"
        >
          <Edit2 size={16} />
          <span>{t('editConfig')}</span>
        </button>
      </div>
      </div>

      {/* Main Canvas */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center w-full max-w-3xl">
          {renderCanvas()}
        </div>
      </main>
      
      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  );
};
