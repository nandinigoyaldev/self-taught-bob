import { Video, Folder, Target, Book, BarChart, Trophy, Terminal, User, Settings as SettingsIcon, Camera } from 'lucide-react';

export const APPS = [
  { id: 'videos', name: 'Videos', icon: Video, color: '#ef4444' },
  { id: 'projects', name: 'Projects', icon: Folder, color: '#3b82f6' },
  { id: 'mission', name: 'Mission', icon: Target, color: '#f59e0b' },
  { id: 'journal', name: 'Journal', icon: Book, color: '#10b981' },
  { id: 'stats', name: 'Stats', icon: BarChart, color: '#8b5cf6' },
  { id: 'achievements', name: 'Achievements', icon: Trophy, color: '#eab308' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#06b6d4' },
  { id: 'camera', name: 'Camera', icon: Camera, color: '#ec4899' },
  { id: 'about', name: 'About', icon: User, color: '#6366f1' },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, color: '#94a3b8' },
];

export default function Dock({ openApp, openAppsList, settings }) {
  const position = settings?.dockPosition || 'bottom';
  const size = settings?.dockSize || 50;

  const getContainerStyle = () => {
    const base = {};
    if (position === 'bottom') {
      base.bottom = '10px';
      base.left = '50%';
      base.transform = 'translateX(-50%)';
      base.flexDirection = 'row';
      base.alignItems = 'flex-end';
    } else if (position === 'left') {
      base.left = '10px';
      base.top = '50%';
      base.transform = 'translateY(-50%)';
      base.flexDirection = 'column';
      base.alignItems = 'flex-start';
    } else if (position === 'right') {
      base.right = '10px';
      base.top = '50%';
      base.transform = 'translateY(-50%)';
      base.flexDirection = 'column';
      base.alignItems = 'flex-end';
    }
    return base;
  };

  return (
    <div className="dock-container glass-panel" style={getContainerStyle()}>
      {APPS.map((app) => {
        const Icon = app.icon;
        const isActive = openAppsList.some(a => a.id === app.id);
        return (
          <div 
            key={app.id} 
            className={`dock-icon ${isActive ? 'active' : ''}`}
            onClick={() => openApp(app.id)}
            title={app.name}
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            <Icon color={app.color} size={size * 0.5} />
          </div>
        );
      })}
    </div>
  );
}
