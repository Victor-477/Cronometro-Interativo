import React from 'react';
import { useTimer } from '../../store/TimerContext';
import { Reorder } from 'motion/react';
import { CanvasComponent } from '../../types';
import { Trash2, GripHorizontal } from 'lucide-react';

export const Canvas = () => {
  const { config, setConfig } = useTimer();

  const handleReorder = (newComponents: CanvasComponent[]) => {
    setConfig(prev => ({ ...prev, components: newComponents }));
  };

  const removeComponent = (id: string) => {
    setConfig(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id)
    }));
  };

  const updateComponentProps = (id: string, newProps: any) => {
    setConfig(prev => ({
      ...prev,
      components: prev.components.map(c => 
        c.id === id ? { ...c, props: { ...c.props, ...newProps } } : c
      )
    }));
  };

  const getCornerRadiusClass = () => {
    switch (config.cornerRadius) {
      case 'square': return 'rounded-none';
      case 'rounded': return 'rounded-lg';
      case 'pill': return 'rounded-full';
      default: return 'rounded-full';
    }
  };

  const getAccentClass = () => {
    switch (config.accentColor) {
      case 'emerald': return 'bg-secondary text-on-secondary';
      case 'indigo': return 'bg-primary text-on-primary';
      case 'rose': return 'bg-tertiary-container text-on-tertiary-container';
      default: return 'bg-secondary text-on-secondary';
    }
  };

  const renderEditComponent = (comp: CanvasComponent) => {
    switch (comp.type) {
      case 'label':
        return (
          <input 
            type="text" 
            value={comp.props?.text || ''}
            onChange={(e) => updateComponentProps(comp.id, { text: e.target.value })}
            className="bg-transparent text-center border-b border-dashed border-outline-variant focus:border-primary outline-none font-label-caps uppercase tracking-widest px-2 py-1"
          />
        );
      case 'clock':
        return <div className="font-mono text-4xl font-bold">14:59</div>;
      case 'play_pause':
        return <div className={`px-6 py-2 ${getAccentClass()} ${getCornerRadiusClass()} font-bold text-xs uppercase tracking-wider`}>Play / Pause</div>;
      case 'reset':
        return <div className={`px-6 py-2 border border-outline-variant ${getCornerRadiusClass()} text-xs uppercase tracking-wider`}>Reset</div>;
      case 'skip':
        return <div className={`px-6 py-2 border border-outline-variant ${getCornerRadiusClass()} text-xs uppercase tracking-wider`}>Skip</div>;
      case 'image':
        return <div className={`w-24 h-24 bg-surface-container-high border border-dashed border-outline flex items-center justify-center text-xs text-outline-variant ${getCornerRadiusClass()}`}>Image Placeholder</div>;
      default:
        return <div>{comp.type}</div>;
    }
  };

  return (
    <main className="flex-1 bg-[radial-gradient(circle_at_center,_#1a1a24_0%,_#0a0a0c_100%)] flex flex-col items-center p-8 overflow-auto relative">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
      ></div>

      <div className="relative w-full max-w-2xl min-h-[600px] border border-outline rounded-3xl bg-transparent flex flex-col items-center p-8 group transition-all hover:border-primary/50">
        <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider text-outline-variant group-hover:text-primary transition-colors">
          Main Container
        </div>

        <div className="w-full h-full flex flex-col items-center mt-12 gap-4">
          <Reorder.Group 
            axis="y" 
            values={config.components} 
            onReorder={handleReorder}
            className="w-full flex flex-col items-center gap-4"
          >
            {config.components.map(comp => (
              <Reorder.Item 
                key={comp.id} 
                value={comp}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-sm w-full max-w-md flex flex-col items-center gap-4 relative group/item hover:border-primary transition-colors cursor-move"
              >
                <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <GripHorizontal size={16} className="text-outline-variant" />
                </div>
                
                <button 
                  onClick={() => removeComponent(comp.id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity p-1 text-error hover:bg-error/10 rounded"
                >
                  <Trash2 size={16} />
                </button>

                {renderEditComponent(comp)}
              </Reorder.Item>
            ))}
          </Reorder.Group>
          
          {config.components.length === 0 && (
            <div className="w-full max-w-md h-24 border border-dashed border-outline-variant rounded-lg flex items-center justify-center text-outline-variant bg-surface-container-lowest/50">
              <span className="text-sm">Add components from the left sidebar</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
