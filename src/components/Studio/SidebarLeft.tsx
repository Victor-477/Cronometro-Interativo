import React from 'react';
import { useTimer } from '../../store/TimerContext';
import { ComponentType } from '../../types';
import { Clock, PlayCircle, StopCircle, RotateCcw, Type, Image as ImageIcon, GripVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SidebarLeft = () => {
  const { config, setConfig } = useTimer();
  const { t } = useTranslation();

  const handleAddComponent = (type: ComponentType) => {
    const newComp = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      props: type === 'label' ? { text: 'New Label' } : {}
    };
    setConfig(prev => ({
      ...prev,
      components: [...prev.components, newComp]
    }));
  };

  const applyTemplate = (templateId: string) => {
    let updates: Partial<any> = {};
    
    switch (templateId) {
      case 'pomodoro':
        updates = {
          timerType: 'countdown',
          duration: 25 * 60,
          fontFamily: 'mono',
          accentColor: 'rose',
          cornerRadius: 'pill',
          showCircularProgress: true,
          components: [
            { id: '1', type: 'label', props: { text: t('pomodoro') } },
            { id: '2', type: 'clock' },
            { id: '3', type: 'play_pause' },
            { id: '4', type: 'reset' }
          ]
        };
        break;
      case 'minimalist':
        updates = {
          timerType: 'countdown',
          duration: 10 * 60,
          fontFamily: 'sans',
          accentColor: 'emerald',
          cornerRadius: 'rounded',
          showCircularProgress: false,
          components: [
            { id: '1', type: 'clock' },
            { id: '2', type: 'play_pause' }
          ]
        };
        break;
      case 'gamer':
        updates = {
          timerType: 'countdown',
          duration: 60 * 60,
          fontFamily: 'mono',
          accentColor: 'indigo',
          cornerRadius: 'square',
          showCircularProgress: false,
          components: [
            { id: '1', type: 'label', props: { text: t('gamerNeon') } },
            { id: '2', type: 'clock' },
            { id: '3', type: 'play_pause' },
            { id: '4', type: 'skip' }
          ]
        };
        break;
      case 'professional':
        updates = {
          timerType: 'countup',
          duration: 60 * 60,
          fontFamily: 'serif',
          accentColor: 'emerald',
          cornerRadius: 'rounded',
          showCircularProgress: false,
          components: [
            { id: '1', type: 'label', props: { text: t('professional') } },
            { id: '2', type: 'clock' },
            { id: '3', type: 'play_pause' },
            { id: '4', type: 'reset' }
          ]
        };
        break;
      case 'workout':
        updates = {
          timerType: 'countdown',
          duration: 60,
          fontFamily: 'sans',
          accentColor: 'rose',
          cornerRadius: 'pill',
          showCircularProgress: true,
          components: [
            { id: '1', type: 'label', props: { text: t('workout') } },
            { id: '2', type: 'clock' },
            { id: '3', type: 'play_pause' },
            { id: '4', type: 'skip' }
          ]
        };
        break;
      case 'cooking':
        updates = {
          timerType: 'countdown',
          duration: 15 * 60,
          fontFamily: 'serif',
          accentColor: 'emerald',
          cornerRadius: 'rounded',
          showCircularProgress: true,
          components: [
            { id: '1', type: 'label', props: { text: t('cooking') } },
            { id: '2', type: 'clock' },
            { id: '3', type: 'play_pause' },
            { id: '4', type: 'reset' }
          ]
        };
        break;
    }
    
    setConfig(prev => ({
      ...prev,
      ...updates
    }));
  };

  const availableComponents: { type: ComponentType, label: string, icon: any }[] = [
    { type: 'clock', label: t('numbersClock'), icon: Clock },
    { type: 'play_pause', label: t('playPauseBtn'), icon: PlayCircle },
    { type: 'reset', label: t('resetBtn'), icon: RotateCcw },
    { type: 'skip', label: t('skipBtn'), icon: StopCircle },
    { type: 'label', label: t('labelText'), icon: Type },
    { type: 'image', label: t('imageIcon'), icon: ImageIcon },
  ];

  return (
    <aside className="bg-surface border-r border-outline flex flex-col h-full w-64 py-4 px-2 shrink-0 overflow-y-auto z-10">
      <div className="mb-6 px-2">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-4">{t('studioTools')}</h2>
      </div>

      <nav className="flex-1 space-y-4">
        {/* Templates */}
        <div className="px-2 mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-4">{t('templates')}</h3>
          <div className="grid grid-cols-2 gap-2">
            <div onClick={() => applyTemplate('pomodoro')} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary/50 group">
              <div className="w-8 h-4 rounded-full border-2 border-dashed border-error group-hover:border-error/50 flex items-center justify-center text-[8px] font-mono text-error">25</div>
              <span className="text-[10px] text-center">{t('pomodoro')}</span>
            </div>
            
            <div onClick={() => applyTemplate('minimalist')} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary/50 group">
              <div className="w-8 h-4 rounded border-2 border-white/20 group-hover:border-primary/50 flex items-center justify-center text-[8px] font-sans text-white/50">10</div>
              <span className="text-[10px] text-center">{t('minimalist')}</span>
            </div>

            <div onClick={() => applyTemplate('gamer')} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary/50 group">
              <div className="w-8 h-4 border-2 border-primary/40 group-hover:border-primary flex items-center justify-center text-[8px] font-mono text-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]">60</div>
              <span className="text-[10px] text-center">{t('gamerNeon')}</span>
            </div>

            <div onClick={() => applyTemplate('professional')} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary/50 group">
              <div className="w-8 h-4 rounded border-2 border-white/20 group-hover:border-white/50 flex items-center justify-center text-[8px] font-serif text-white/80">00</div>
              <span className="text-[10px] text-center">{t('professional')}</span>
            </div>

            <div onClick={() => applyTemplate('workout')} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary/50 group">
              <div className="w-8 h-8 rounded-full border-2 border-error/50 group-hover:border-error flex items-center justify-center text-[8px] font-sans text-error shadow-[0_0_8px_rgba(244,63,94,0.3)]">1m</div>
              <span className="text-[10px] text-center">{t('workout')}</span>
            </div>

            <div onClick={() => applyTemplate('cooking')} className="aspect-square rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:border-primary/50 group">
              <div className="w-8 h-8 rounded-full border-2 border-primary/40 group-hover:border-primary flex items-center justify-center text-[8px] font-serif text-primary">15</div>
              <span className="text-[10px] text-center">{t('cooking')}</span>
            </div>
          </div>
        </div>

        {/* Components */}
        <div className="px-2 mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold mb-4">{t('componentLibrary')}</h3>
          <div className="space-y-2">
            {availableComponents.map((comp) => {
              const Icon = comp.icon;
              return (
                <div 
                  key={comp.type}
                  onClick={() => handleAddComponent(comp.type)}
                  className="p-3 bg-white/5 rounded-lg border border-white/5 text-[11px] flex items-center gap-3 cursor-pointer hover:bg-white/10 group"
                >
                  <GripVertical size={14} className="text-white/20 group-hover:text-primary" />
                  <Icon size={16} className="text-white/40" />
                  <span className="text-white">{comp.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
};
