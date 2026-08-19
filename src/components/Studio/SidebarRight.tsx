import React, { useRef } from 'react';
import { useTimer } from '../../store/TimerContext';
import { Settings2, Plus, Square, SquareMenu, Circle, Volume2, Upload, Music } from 'lucide-react';
import clsx from 'clsx';
import { SoundConfig } from '../../types';
import { useTranslation } from 'react-i18next';

const presetSounds: SoundConfig[] = [
  { name: 'Pop', url: 'https://cdn.freesound.org/previews/245/245155_4486188-lq.mp3' },
  { name: 'Chime', url: 'https://cdn.freesound.org/previews/411/411088_5121236-lq.mp3' },
  { name: 'Digital', url: 'https://cdn.freesound.org/previews/171/171671_2437358-lq.mp3' },
  { name: 'Bell', url: 'https://cdn.freesound.org/previews/339/339809_5121236-lq.mp3' },
  { name: 'None', url: '' },
];

export const SidebarRight = () => {
  const { config, setConfig } = useTimer();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputTargetRef = useRef<'start' | 'end'>('end');
  const { t } = useTranslation();

  const handleTimerType = (type: 'countdown' | 'countup') => {
    setConfig(prev => ({ ...prev, timerType: type }));
  };

  const handleDisplaySize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, displaySize: Number(e.target.value) }));
  };

  const handleAccentColor = (color: string) => {
    setConfig(prev => ({ ...prev, accentColor: color }));
  };

  const handleCornerRadius = (radius: 'square' | 'rounded' | 'pill') => {
    setConfig(prev => ({ ...prev, cornerRadius: radius }));
  };

  const handleSoundSelect = (type: 'start' | 'end', soundName: string) => {
    const sound = presetSounds.find(s => s.name === soundName);
    if (!sound) return;
    
    setConfig(prev => ({
      ...prev,
      [type === 'start' ? 'soundStart' : 'soundEnd']: sound.url === '' ? null : sound
    }));

    if (sound.url !== '') {
      new Audio(sound.url).play().catch(() => {});
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      const customSound: SoundConfig = { name: file.name.substring(0, 15), url: base64Url };
      
      setConfig(prev => ({
        ...prev,
        [fileInputTargetRef.current === 'start' ? 'soundStart' : 'soundEnd']: customSound
      }));
      
      new Audio(base64Url).play().catch(() => {});
    };
    reader.readAsDataURL(file);
    
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerUpload = (target: 'start' | 'end') => {
    fileInputTargetRef.current = target;
    fileInputRef.current?.click();
  };

  return (
    <aside className="bg-surface border-l border-outline w-80 h-full flex flex-col shrink-0 overflow-y-auto z-10">
      <div className="p-5 border-b border-outline flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]"></div>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface">{t('styleConfig')}</h3>
      </div>

      <div className="p-5 space-y-6">
        {/* Timer Type */}
        <div>
          <label className="text-[10px] text-on-surface-variant block mb-3 uppercase font-semibold">{t('timerType')}</label>
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => handleTimerType('countdown')}
              className={clsx(
                "flex-1 py-1.5 px-3 rounded-md text-[10px] uppercase font-bold text-center transition-colors",
                config.timerType === 'countdown' ? "bg-white/10 shadow-sm text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {t('countdown')}
            </button>
            <button 
              onClick={() => handleTimerType('countup')}
              className={clsx(
                "flex-1 py-1.5 px-3 rounded-md text-[10px] uppercase font-bold text-center transition-colors",
                config.timerType === 'countup' ? "bg-white/10 shadow-sm text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {t('countup')}
            </button>
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="text-[10px] text-on-surface-variant block mb-3 uppercase font-semibold">{t('primaryFont')}</label>
          <select 
            value={config.fontFamily}
            onChange={(e) => setConfig(prev => ({ ...prev, fontFamily: e.target.value as any }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-primary outline-none"
          >
            <option value="mono" className="bg-surface">JetBrains Mono</option>
            <option value="sans" className="bg-surface">Inter Display</option>
            <option value="serif" className="bg-surface">System Serif</option>
          </select>
        </div>

        {/* Display Size */}
        <div>
          <div className="flex justify-between mb-3">
            <label className="text-[10px] text-on-surface-variant uppercase font-semibold">{t('displaySize')}</label>
            <span className="text-[10px] text-primary">{config.displaySize}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="150" 
            value={config.displaySize}
            onChange={handleDisplaySize}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary" 
          />
        </div>

        {/* Accent Color */}
        <div>
          <label className="text-[10px] text-on-surface-variant block mb-3 uppercase font-semibold">{t('colorTheme')}</label>
          <div className="flex gap-2">
            <button onClick={() => handleAccentColor('emerald')} className={clsx("w-8 h-8 rounded-full bg-[#38bdf8] transition-all", config.accentColor === 'emerald' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121217]' : 'border border-white/10 hover:scale-110')}></button>
            <button onClick={() => handleAccentColor('indigo')} className={clsx("w-8 h-8 rounded-full bg-[#06b6d4] transition-all", config.accentColor === 'indigo' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121217]' : 'border border-white/10 hover:scale-110')}></button>
            <button onClick={() => handleAccentColor('rose')} className={clsx("w-8 h-8 rounded-full bg-[#f43f5e] transition-all", config.accentColor === 'rose' ? 'ring-2 ring-white ring-offset-2 ring-offset-[#121217]' : 'border border-white/10 hover:scale-110')}></button>
          </div>
        </div>

        {/* Corner Radius */}
        <div>
          <label className="text-[10px] text-on-surface-variant block mb-3 uppercase font-semibold">{t('cornerRadius')}</label>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => handleCornerRadius('square')} className={clsx("py-2 border bg-white/5 flex items-center justify-center transition-colors rounded-none", config.cornerRadius === 'square' ? 'border-primary text-primary' : 'border-white/10 text-white/40 hover:bg-white/10')}>
              <Square size={20} />
            </button>
            <button onClick={() => handleCornerRadius('rounded')} className={clsx("py-2 border bg-white/5 flex items-center justify-center transition-colors rounded-lg", config.cornerRadius === 'rounded' ? 'border-primary text-primary' : 'border-white/10 text-white/40 hover:bg-white/10')}>
              <SquareMenu size={20} />
            </button>
            <button onClick={() => handleCornerRadius('pill')} className={clsx("py-2 border bg-white/5 flex items-center justify-center transition-colors rounded-full", config.cornerRadius === 'pill' ? 'border-primary text-primary' : 'border-white/10 text-white/40 hover:bg-white/10')}>
              <Circle size={20} />
            </button>
          </div>
        </div>

        {/* Circular Progress Overlay */}
        <div>
          <label className="flex items-center justify-between cursor-pointer group bg-white/5 border border-white/10 rounded-lg p-3 hover:border-primary/50 transition-colors">
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold group-hover:text-white transition-colors">Circular Progress</span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={config.showCircularProgress || false}
                onChange={(e) => setConfig(prev => ({ ...prev, showCircularProgress: e.target.checked }))}
              />
              <div className={clsx("block w-8 h-5 rounded-full transition-colors", config.showCircularProgress ? 'bg-primary' : 'bg-white/20')}></div>
              <div className={clsx("absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform", config.showCircularProgress ? 'translate-x-3' : '')}></div>
            </div>
          </label>
        </div>

        {/* Duration for Countdown */}
        {config.timerType === 'countdown' && (
          <div>
            <label className="text-[10px] text-on-surface-variant block mb-3 uppercase font-semibold">{t('durationMin')}</label>
            <input 
              type="number"
              value={config.duration / 60}
              onChange={(e) => setConfig(prev => ({ ...prev, duration: Math.max(1, Number(e.target.value)) * 60 }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {/* Audio Configuration */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Volume2 size={14} className="text-primary" />
            <label className="text-[10px] text-on-surface-variant uppercase font-semibold">{t('audioAlerts')}</label>
          </div>
          
          <div className="space-y-4 border border-outline bg-white/5 p-4 rounded-xl">
            {/* Start Sound */}
            <div className="flex items-center justify-between gap-2">
              <label className="text-[9px] text-white/60 uppercase w-1/3">{t('start')}</label>
              <div className="flex-1 flex gap-2">
                <select 
                  className="flex-1 bg-surface border border-outline rounded p-1 text-[10px] text-white focus:border-primary outline-none"
                  value={presetSounds.find(s => s.url === config.soundStart?.url)?.name || (config.soundStart ? 'Custom' : 'None')}
                  onChange={(e) => handleSoundSelect('start', e.target.value)}
                >
                  <option value="Custom" disabled hidden>{t('custom')}</option>
                  <option value="None">{t('none')}</option>
                  {presetSounds.filter(s => s.name !== 'None').map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <button 
                  onClick={() => triggerUpload('start')}
                  className="w-6 h-6 border border-outline rounded flex items-center justify-center bg-surface hover:border-primary transition-colors text-white/60 hover:text-white"
                  title="Upload Custom Sound"
                >
                  <Upload size={12} />
                </button>
              </div>
            </div>

            {/* End Sound */}
            <div className="flex items-center justify-between gap-2">
              <label className="text-[9px] text-white/60 uppercase w-1/3">{t('finish')}</label>
              <div className="flex-1 flex gap-2">
                <select 
                  className="flex-1 bg-surface border border-outline rounded p-1 text-[10px] text-white focus:border-primary outline-none"
                  value={presetSounds.find(s => s.url === config.soundEnd?.url)?.name || (config.soundEnd ? 'Custom' : 'None')}
                  onChange={(e) => handleSoundSelect('end', e.target.value)}
                >
                  <option value="Custom" disabled hidden>{t('custom')}</option>
                  <option value="None">{t('none')}</option>
                  {presetSounds.filter(s => s.name !== 'None').map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
                <button 
                  onClick={() => triggerUpload('end')}
                  className="w-6 h-6 border border-outline rounded flex items-center justify-center bg-surface hover:border-primary transition-colors text-white/60 hover:text-white"
                  title="Upload Custom Sound"
                >
                  <Upload size={12} />
                </button>
              </div>
            </div>
          </div>
          <input 
            type="file" 
            accept="audio/*" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </div>

      </div>

      <div className="p-5 mt-auto">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Settings2 className="w-4 h-4 text-primary" />
            <span className="text-[11px] font-bold text-primary uppercase">{t('proTip')}</span>
          </div>
          <p className="text-[10px] text-white/60 leading-relaxed">{t('proTipDesc')}</p>
        </div>
      </div>
    </aside>
  );
};
