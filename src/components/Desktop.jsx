import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar.jsx';
import Dock, { APPS } from './Dock.jsx';
import Window from './Window.jsx';
import SearchOverlay from './SearchOverlay.jsx';

// Import apps
import AboutApp from '../apps/AboutApp.jsx';
import ProjectsApp from '../apps/ProjectsApp.jsx';
import TerminalApp from '../apps/TerminalApp.jsx';
import SettingsApp from '../apps/SettingsApp.jsx';
import CameraApp from '../apps/CameraApp.jsx';
import CalculatorApp from '../apps/CalculatorApp.jsx';
import NotesApp from '../apps/NotesApp.jsx';
import TwitterApp from '../apps/TwitterApp.jsx';
import LinkedInApp from '../apps/LinkedInApp.jsx';
import YouTubeApp from '../apps/YouTubeApp.jsx';
import GitHubApp from '../apps/GitHubApp.jsx';

const DEFAULT_WALLPAPER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";

const appComponents = {
  about: AboutApp,
  projects: ProjectsApp,
  terminal: TerminalApp,
  settings: SettingsApp,
  camera: CameraApp,
  calculator: CalculatorApp,
  notes: NotesApp,
  twitter: TwitterApp,
  linkedin: LinkedInApp,
  youtube: YouTubeApp,
  github: GitHubApp,
};

function InteractiveWallpaper({ customWallpaper }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (customWallpaper) return;
    
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [customWallpaper]);

  if (customWallpaper) {
    return (
      <div 
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${customWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0
        }}
      />
    );
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', backgroundColor: '#09090b' }}>
      <motion.div 
        animate={{ x: mousePos.x * 10 - 200, y: mousePos.y * 10 - 200 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ 
          position: 'absolute', width: '800px', height: '800px', borderRadius: '50%', 
          filter: 'blur(100px)', opacity: 0.4, background: 'rgba(147, 51, 234, 0.3)', top: '10%', left: '10%' 
        }}
      />
      <motion.div 
        animate={{ x: -mousePos.x * 15 - 100, y: -mousePos.y * 15 + 100 }}
        transition={{ type: "spring", stiffness: 40, damping: 25 }}
        style={{ 
          position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', 
          filter: 'blur(120px)', opacity: 0.3, background: 'rgba(6, 182, 212, 0.3)', bottom: '20%', right: '10%' 
        }}
      />
    </div>
  );
}

export default function Desktop() {
  const [openApps, setOpenApps] = useState([]); // { id, zIndex, minimized }
  const [activeZIndex, setActiveZIndex] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Settings state
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('nandini-settings');
    return saved ? JSON.parse(saved) : { dockPosition: 'bottom', dockSize: 60 };
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
      setOpenApps(apps => apps.map(a => 
        a.id === appId ? { ...a, zIndex: newZIndex, minimized: false } : a
      ));
    } else {
      setOpenApps(apps => [...apps, { id: appId, zIndex: newZIndex, minimized: false }]);
    }
  };

  const closeApp = (appId) => setOpenApps(apps => apps.filter(a => a.id !== appId));
  const closeAllApps = () => setOpenApps([]);
  const minimizeApp = (appId) => setOpenApps(apps => apps.map(a => a.id === appId ? { ...a, minimized: true } : a));
  const focusApp = (appId) => {
    const newZIndex = activeZIndex + 1;
    setActiveZIndex(newZIndex);
    setOpenApps(apps => apps.map(a => a.id === appId ? { ...a, zIndex: newZIndex } : a));
  };

  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('nandini-wallpaper') || DEFAULT_WALLPAPER);

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

  const closeContextMenu = () => setContextMenu(null);

  const resetWallpaper = () => {
    setWallpaper(null);
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
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', color: 'white' }}
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      <InteractiveWallpaper customWallpaper={wallpaper} />
      
      <input 
        type="file" 
        id="wallpaper-upload" 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handleWallpaperChange} 
      />
      
      <TopBar 
        onSearchClick={() => setIsSearchOpen(true)} 
        openApp={openApp}
        closeAllApps={closeAllApps}
      />

      {/* Desktop Icons */}
      <div style={{ position: 'absolute', top: '48px', left: '16px', display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 10 }}>
        {APPS.filter(app => ['youtube', 'github', 'twitter', 'linkedin'].includes(app.id)).map(app => {
          const Icon = app.icon;
          return (
            <motion.div 
              key={app.id} 
              onClick={() => openApp(app.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', width: '80px' }}
            >
              <div style={{ 
                padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
              }}>
                <Icon size={32} color={app.color || 'white'} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
              </div>
              <span style={{ 
                fontSize: '0.75rem', textAlign: 'center', fontWeight: 500, background: 'rgba(0,0,0,0.3)', 
                padding: '2px 8px', borderRadius: '9999px', textShadow: '0 1px 2px rgba(0,0,0,0.5)' 
              }}>
                {app.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.1 }}
            className="menu-dropdown"
            style={{ 
              position: 'absolute', zIndex: 9999, display: 'flex', flexDirection: 'column', 
              padding: '6px', borderRadius: '12px', minWidth: '180px', top: contextMenu.y, left: contextMenu.x,
              background: 'rgba(24, 24, 27, 0.85)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255,255,255,0.1)'
            }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="menu-item" onClick={triggerWallpaperChange}>Change Wallpaper</div>
            <div className="menu-item" onClick={resetWallpaper}>Interactive Wallpaper</div>
            <div className="menu-divider" />
            <div className="menu-item" onClick={() => { openApp('settings'); closeContextMenu(); }} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>System Settings</span>
              <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>⌘,</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {openApps.map(app => {
        const appInfo = APPS.find(a => a.id === app.id);
        const AppComponent = appComponents[app.id] || (() => <div style={{ padding: '16px' }}>Coming soon</div>);
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
