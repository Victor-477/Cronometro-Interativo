import React from 'react';
import { useTimer } from '../store/TimerContext';
import { X, Trash2, Clock, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HistoryModalProps {
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ onClose }) => {
  const { history, clearHistory, deleteHistoryEntry } = useTimer();
  const { t } = useTranslation();

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}m ${s > 0 ? `${s}s` : ''}`;
    return `${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border border-outline rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[80vh] overflow-hidden relative">
        <div className="p-6 border-b border-outline flex justify-between items-center bg-surface-container-low shrink-0">
          <div className="flex items-center gap-3">
            <Clock className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-on-surface">{t('sessionHistory')}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-12 text-on-surface-variant opacity-70">
              <CalendarDays className="mx-auto mb-4 opacity-50" size={48} />
              <p>{t('noSessions')}</p>
              <p className="text-sm mt-1">{t('completeTimer')}</p>
            </div>
          ) : (
            history.map(entry => (
              <div key={entry.id} className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex items-center justify-between group transition-colors hover:border-primary/50">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-on-surface text-sm">{entry.themeName}</span>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-on-surface-variant">
                    <span>{new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="opacity-50">•</span>
                    <span className="uppercase text-primary">{entry.type === 'countdown' ? t('countdown') : t('countup')}</span>
                    <span className="opacity-50">•</span>
                    <span>{formatDuration(entry.duration)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteHistoryEntry(entry.id)}
                  className="p-2 text-error opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 rounded-lg"
                  title={t('deleteEntry')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="p-4 border-t border-outline flex justify-end bg-surface-container-low shrink-0">
            <button 
              onClick={clearHistory}
              className="text-xs font-bold uppercase tracking-wider text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-colors"
            >
              {t('clearHistory')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
