import { useState } from 'react';
import TopBar from './TopBar.jsx';
import Dock, { APPS } from './Dock.jsx';
import Window from './Window.jsx';

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
};

export default function Desktop() {
  const [openApps, setOpenApps] = useState([]); // { id, zIndex, minimized }
  const [activeZIndex, setActiveZIndex] = useState(1);

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

  const [wallpaper, setWallpaper] = useState(localStorage.getItem('nandini-wallpaper') || null);

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

  return (
    <div className="desktop-environment" style={wallpaper ? { backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
      {!wallpaper && <div className="wallpaper-particles" />}
      
      {/* Hidden input for wallpaper upload */}
      <input 
        type="file" 
        id="wallpaper-upload" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleWallpaperChange} 
      />
      
      <TopBar />
      
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
    </div>
  );
}
