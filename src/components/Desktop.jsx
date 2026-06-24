import { useState } from 'react';
import TopBar from './TopBar.jsx';
import Dock, { APPS } from './Dock.jsx';
import Window from './Window.jsx';
import SearchOverlay from './SearchOverlay.jsx';

// Import apps
import AboutApp from '../apps/AboutApp.jsx';
import VideosApp from '../apps/VideosApp.jsx';
import ProjectsApp from '../apps/ProjectsApp.jsx';
import MissionApp from '../apps/MissionApp.jsx';
import JournalApp from '../apps/JournalApp.jsx';
import StatsApp from '../apps/StatsApp.jsx';
import AchievementsApp from '../apps/AchievementsApp.jsx';
import TerminalApp from '../apps/TerminalApp.jsx';
import SettingsApp from '../apps/SettingsApp.jsx';
import CameraApp from '../apps/CameraApp.jsx';
import CalculatorApp from '../apps/CalculatorApp.jsx';
import NotesApp from '../apps/NotesApp.jsx';

const DEFAULT_WALLPAPER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

const appComponents = {
  about: AboutApp,
  videos: VideosApp,
  projects: ProjectsApp,
  mission: MissionApp,
  journal: JournalApp,
  stats: StatsApp,
  achievements: AchievementsApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  camera: CameraApp,
  calculator: CalculatorApp,
  notes: NotesApp,
};

export default function Desktop() {
  const [openApps, setOpenApps] = useState([]); // { id, zIndex, minimized }
  const [activeZIndex, setActiveZIndex] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Settings state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nandini-settings');
    return saved ? JSON.parse(saved) : { dockPosition: 'bottom', dockSize: 50 };
  });

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('nandini-settings', JSON.stringify(updated));
  };

  const openApp = (appId) => {
    const existing = openApps.find(a => a.id === appId);
    const newZIndex = activeZIndex + 1;
    setActiveZIndex(newZIndex);

    if (existing) {
      // Bring to front and unminimize
      setOpenApps(apps => apps.map(a => 
        a.id === appId ? { ...a, zIndex: newZIndex, minimized: false } : a
      ));
    } else {
      // Open new
      setOpenApps(apps => [...apps, { id: appId, zIndex: newZIndex, minimized: false }]);
    }
  };

  const closeApp = (appId) => {
    setOpenApps(apps => apps.filter(a => a.id !== appId));
  };

  const minimizeApp = (appId) => {
    setOpenApps(apps => apps.map(a => 
      a.id === appId ? { ...a, minimized: true } : a
    ));
  };

  const focusApp = (appId) => {
    const newZIndex = activeZIndex + 1;
    setActiveZIndex(newZIndex);
    setOpenApps(apps => apps.map(a => 
      a.id === appId ? { ...a, zIndex: newZIndex } : a
    ));
  };

  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem('nandini-wallpaper') || DEFAULT_WALLPAPER;
  });

  const handleWallpaperChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setWallpaper(dataUrl);
        localStorage.setItem('nandini-wallpaper', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const resetWallpaper = () => {
    setWallpaper(DEFAULT_WALLPAPER);
    localStorage.removeItem('nandini-wallpaper');
    closeContextMenu();
  };

  const triggerWallpaperChange = () => {
    document.getElementById('wallpaper-upload')?.click();
    closeContextMenu();
  };

  return (
    <div 
      className="desktop-environment" 
      style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {!wallpaper && <div className="wallpaper-particles" />}
      
      {/* Hidden input for wallpaper upload */}
      <input 
        type="file" 
        id="wallpaper-upload" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleWallpaperChange} 
      />
      
      <TopBar onSearchClick={() => setIsSearchOpen(true)} />

      {/* Desktop Icons */}
      <div className="desktop-icons" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', position: 'absolute', top: '40px', left: '10px' }}>
        {APPS.filter(app => ['calculator', 'notes', 'projects', 'terminal'].includes(app.id)).map(app => {
          const Icon = app.icon;
          return (
            <div 
              key={app.id} 
              className="desktop-icon" 
              onDoubleClick={() => openApp(app.id)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', width: '80px', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            >
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Icon size={32} color={app.color || 'white'} />
              </div>
              <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>{app.name}</span>
            </div>
          );
        })}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="context-menu glass-panel" 
          style={{ 
            position: 'absolute', 
            top: contextMenu.y, 
            left: contextMenu.x, 
            zIndex: 9999, 
            display: 'flex', 
            flexDirection: 'column',
            padding: '0.5rem',
            borderRadius: '8px',
            minWidth: '150px'
          }}
        >
          <div className="context-menu-item" onClick={triggerWallpaperChange} style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
            Change Wallpaper
          </div>
          <div className="context-menu-item" onClick={resetWallpaper} style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
            Reset Wallpaper
          </div>
        </div>
      )}
      
      {openApps.map(app => {
        const appInfo = APPS.find(a => a.id === app.id);
        const AppComponent = appComponents[app.id] || (() => <div>Coming soon</div>);
        return (
          <Window
            key={app.id}
            id={app.id}
            title={appInfo?.name}
            zIndex={app.zIndex}
            isMinimized={app.minimized}
            onClose={() => closeApp(app.id)}
            onMinimize={() => minimizeApp(app.id)}
            onFocus={() => focusApp(app.id)}
          >
            <AppComponent settings={settings} updateSettings={updateSettings} />
          </Window>
        );
      })}

      <Dock openApp={openApp} openAppsList={openApps} settings={settings} />

      {isSearchOpen && (
        <SearchOverlay 
          onClose={() => setIsSearchOpen(false)} 
          openApp={openApp} 
        />
      )}
    </div>
  );
}
