import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { TimerConfig, AppMode, HistoryEntry } from '../types';

interface TimerContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  config: TimerConfig;
  setConfig: React.Dispatch<React.SetStateAction<TimerConfig>>;
  time: number;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  resetTimer: () => void;
  skipTimer: () => void;
  history: HistoryEntry[];
  clearHistory: () => void;
  deleteHistoryEntry: (id: string) => void;
}

const defaultComponents = [
  { id: '1', type: 'label' as const, props: { text: 'Focus Block' } },
  { id: '2', type: 'clock' as const },
  { id: '3', type: 'play_pause' as const },
  { id: '4', type: 'reset' as const },
  { id: '5', type: 'skip' as const },
];

const defaultConfig: TimerConfig = {
  timerType: 'countdown',
  duration: 15 * 60, // 15 mins
  accentColor: 'emerald',
  cornerRadius: 'rounded',
  displaySize: 80,
  theme: 'dark',
  components: defaultComponents,
  fontFamily: 'mono',
  soundStart: { name: 'Pop', url: 'https://cdn.freesound.org/previews/245/245155_4486188-lq.mp3' },
  soundEnd: { name: 'Chime', url: 'https://cdn.freesound.org/previews/411/411088_5121236-lq.mp3' },
  showCircularProgress: false,
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppMode>('player');
  const [config, setConfig] = useState<TimerConfig>(() => {
    const saved = localStorage.getItem('timerConfig');
    return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
  });
  
  const [time, setTime] = useState(config.timerType === 'countdown' ? config.duration : 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('timerHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const audioStartRef = useRef<HTMLAudioElement | null>(null);
  const audioEndRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio Objects
  useEffect(() => {
    if (config.soundStart?.url) {
      audioStartRef.current = new Audio(config.soundStart.url);
    }
    if (config.soundEnd?.url) {
      audioEndRef.current = new Audio(config.soundEnd.url);
    }
  }, [config.soundStart, config.soundEnd]);

  // Save config and history
  useEffect(() => {
    localStorage.setItem('timerConfig', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('timerHistory', JSON.stringify(history));
  }, [history]);

  const addHistoryEntry = () => {
    const labelComp = config.components.find(c => c.type === 'label');
    const sessionName = labelComp?.props?.text || 'Timer Session';
    
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: config.duration,
      type: config.timerType,
      themeName: sessionName
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setTime((t) => {
          if (config.timerType === 'countdown') {
            if (t <= 1) { // Will reach 0
              setIsPlaying(false);
              if (audioEndRef.current) {
                audioEndRef.current.play().catch(() => {});
              }
              addHistoryEntry();
              return 0;
            }
            return t - 1;
          } else {
            if (t >= config.duration - 1) { // Will reach duration
              setIsPlaying(false);
              if (audioEndRef.current) {
                audioEndRef.current.play().catch(() => {});
              }
              addHistoryEntry();
              return config.duration;
            }
            return t + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, config]);

  // Hook to handle play sound on start
  useEffect(() => {
    if (isPlaying && audioStartRef.current) {
      audioStartRef.current.currentTime = 0;
      audioStartRef.current.play().catch(() => {});
    }
  }, [isPlaying]);

  // Reset time if duration or timer type changes
  useEffect(() => {
    setTime(config.timerType === 'countdown' ? config.duration : 0);
    setIsPlaying(false);
  }, [config.duration, config.timerType]);

  // Apply theme to document
  useEffect(() => {
    if (config.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config.theme]);

  const resetTimer = () => {
    setTime(config.timerType === 'countdown' ? config.duration : 0);
    setIsPlaying(false);
  };

  const skipTimer = () => {
    setTime(config.timerType === 'countdown' ? 0 : config.duration);
    setIsPlaying(false);
    if (audioEndRef.current) {
      audioEndRef.current.currentTime = 0;
      audioEndRef.current.play().catch(() => {});
    }
    addHistoryEntry();
  };

  const clearHistory = () => setHistory([]);
  const deleteHistoryEntry = (id: string) => setHistory(prev => prev.filter(e => e.id !== id));

  return (
    <TimerContext.Provider
      value={{
        mode,
        setMode,
        config,
        setConfig,
        time,
        isPlaying,
        setIsPlaying,
        resetTimer,
        skipTimer,
        history,
        clearHistory,
        deleteHistoryEntry,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
