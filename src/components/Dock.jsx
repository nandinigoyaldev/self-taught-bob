import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Video, Folder, Target, Book, BarChart, Trophy, Terminal, User, Settings as SettingsIcon, Camera, Calculator, FileText } from 'lucide-react';

export const APPS = [
  { id: 'calculator', name: 'Calculator', icon: Calculator, color: '#f97316' },
  { id: 'notes', name: 'Notes', icon: FileText, color: '#fde047' },
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

function DockIcon({ app, isActive, openApp, mouseX, baseSize }) {
  const ref = useRef(null);
  
  // Distance from mouse to center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate scaling based on distance. If distance is small, scale goes up to ~1.5x
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.6, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const widthSync = useTransform(distance, [-150, 0, 150], [baseSize, baseSize * 1.6, baseSize]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={`dock-icon ${isActive ? 'active' : ''}`}
      onClick={() => openApp(app.id)}
      title={app.name}
      whileTap={{ scale: 0.8 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div style={{ scale, transformOrigin: 'bottom' }}>
        <app.icon color={app.color} size={baseSize * 0.5} />
      </motion.div>
    </motion.div>
  );
}

export default function Dock({ openApp, openAppsList, settings }) {
  const position = settings?.dockPosition || 'bottom';
  const size = settings?.dockSize || 50;
  
  const mouseX = useMotionValue(Infinity);

  const getContainerStyle = () => {
    const base = {};
    if (position === 'bottom') {
      base.bottom = '15px';
      base.left = '50%';
      base.flexDirection = 'row';
      base.alignItems = 'flex-end';
    } else if (position === 'left') {
      base.left = '15px';
      base.top = '50%';
      base.flexDirection = 'column';
      base.alignItems = 'flex-start';
    } else if (position === 'right') {
      base.right = '15px';
      base.top = '50%';
      base.flexDirection = 'column';
      base.alignItems = 'flex-end';
    }
    return base;
  };

  return (
    <motion.div 
      className="dock-container" 
      style={getContainerStyle()}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ 
        y: position === 'bottom' ? 100 : '-50%', 
        x: position === 'bottom' ? '-50%' : (position === 'left' ? -100 : 100) 
      }}
      animate={{ 
        y: position === 'bottom' ? 0 : '-50%', 
        x: position === 'bottom' ? '-50%' : 0 
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
    >
      {APPS.map((app) => (
        <DockIcon
          key={app.id}
          app={app}
          isActive={openAppsList.some(a => a.id === app.id)}
          openApp={openApp}
          mouseX={position === 'bottom' ? mouseX : useMotionValue(Infinity)} // Disable magnification for left/right for now to keep math simple
          baseSize={size}
        />
      ))}
    </motion.div>
  );
}
