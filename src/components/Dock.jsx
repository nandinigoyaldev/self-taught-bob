import { Video, Folder, Target, Book, BarChart, Trophy, Terminal, User } from 'lucide-react';

export const APPS = [
  { id: 'videos', name: 'Videos', icon: Video, color: '#ef4444' },
  { id: 'projects', name: 'Projects', icon: Folder, color: '#3b82f6' },
  { id: 'mission', name: 'Mission', icon: Target, color: '#f59e0b' },
  { id: 'journal', name: 'Journal', icon: Book, color: '#10b981' },
  { id: 'stats', name: 'Stats', icon: BarChart, color: '#8b5cf6' },
  { id: 'achievements', name: 'Achievements', icon: Trophy, color: '#eab308' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: '#06b6d4' },
  { id: 'about', name: 'About', icon: User, color: '#6366f1' },
];

export default function Dock({ openApp, openAppsList }) {
  return (
    <div className="dock-container glass-panel">
      {APPS.map((app) => {
        const Icon = app.icon;
        const isActive = openAppsList.some(a => a.id === app.id);
        return (
          <div 
            key={app.id} 
            className={`dock-icon ${isActive ? 'active' : ''}`}
            onClick={() => openApp(app.id)}
            title={app.name}
          >
            <Icon color={app.color} />
          </div>
        );
      })}
    </div>
  );
}
