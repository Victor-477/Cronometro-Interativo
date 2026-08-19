export type ComponentType = 'clock' | 'play_pause' | 'start' | 'stop' | 'reset' | 'label' | 'skip' | 'image';

export interface CanvasComponent {
  id: string;
  type: ComponentType;
  props?: any;
}

export interface SoundConfig {
  name: string;
  url: string; // base64 or predefined URL
}

export interface TimerConfig {
  timerType: 'countdown' | 'countup';
  duration: number; // in seconds
  accentColor: string; // valid color string (e.g. #00bd85 or a class)
  cornerRadius: 'square' | 'rounded' | 'pill';
  displaySize: number; // 1-100
  components: CanvasComponent[];
  theme: 'light' | 'dark';
  fontFamily: 'mono' | 'sans' | 'serif';
  soundStart: SoundConfig | null;
  soundEnd: SoundConfig | null;
  showCircularProgress?: boolean;
}

export interface HistoryEntry {
  id: string;
  date: string;
  duration: number; // in seconds, the target or actual duration
  type: 'countdown' | 'countup';
  themeName: string;
}

export type AppMode = 'player' | 'studio';
