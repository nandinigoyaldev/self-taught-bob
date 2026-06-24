import { useState, useEffect } from 'react';
import { Apple, Search, Wifi, Battery, BatteryCharging, BatteryFull, BatteryLow, Volume2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar({ onSearchClick, openApp, closeAllApps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState({ level: 1, charging: false });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [actionCenterOpen, setActionCenterOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(batt => {
        setBattery({ level: batt.level, charging: batt.charging });
        batt.addEventListener('levelchange', () => setBattery(b => ({ ...b, level: batt.level })));
        batt.addEventListener('chargingchange', () => setBattery(b => ({ ...b, charging: batt.charging })));
      });
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (date) => date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  const BatteryIcon = () => {
    if (battery.charging) return <BatteryCharging size={16} />;
    if (battery.level > 0.8) return <BatteryFull size={16} />;
    if (battery.level < 0.2) return <BatteryLow size={16} color="#ef4444" />;
    return <Battery size={16} />;
  };

  return (
    <>
      <div className="top-bar" style={{ background: 'rgba(0,0,0,0.4)', color: '#fff' }}>
        <div className="top-bar-left" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div 
            className="top-bar-item"
            style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Apple size={16} />
            <span style={{ marginLeft: '4px' }}>NandiniOS</span>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="menu-dropdown"
                style={{
                  top: '32px', left: '8px', width: '220px', background: 'rgba(30,30,30,0.8)', 
                  backdropFilter: 'blur(20px)', borderRadius: '8px', padding: '4px', border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div className="menu-item" onClick={() => { openApp('about'); setMenuOpen(false); }}>
                  About This Mac
                </div>
                <div className="menu-divider" />
                <div className="menu-item" onClick={() => { openApp('settings'); setMenuOpen(false); }}>
                  System Settings...
                </div>
                <div className="menu-divider" />
                <div className="menu-item" onClick={() => { closeAllApps(); setMenuOpen(false); }}>
                  Close All Windows
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="top-bar-item" style={{ fontWeight: 600, display: 'flex' }} onClick={() => openApp('projects')}>File</div>
          <div className="top-bar-item" style={{ fontWeight: 600, display: 'flex' }} onClick={() => openApp('notes')}>Edit</div>
          <div className="top-bar-item" style={{ fontWeight: 600, display: 'flex' }} onClick={() => openApp('terminal')}>View</div>
        </div>

        <div className="top-bar-right" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="top-bar-item" onClick={onSearchClick} style={{ cursor: 'pointer' }}>
            <Search size={16} />
          </div>
          
          <div 
            className="top-bar-item"
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
            onClick={() => setActionCenterOpen(!actionCenterOpen)}
          >
            {isOnline ? <Wifi size={16} /> : <Wifi size={16} opacity={0.3} />}
            <BatteryIcon />
            <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{formatDate(time)} {formatTime(time)}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {actionCenterOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: 'absolute', top: '40px', right: '8px', width: '320px', 
              background: 'rgba(30,30,30,0.8)', backdropFilter: 'blur(30px)', 
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', 
              padding: '16px', zIndex: 99, color: 'white'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <div style={{ background: '#3b82f6', padding: '8px', borderRadius: '50%' }}><Wifi size={16} color="white" /></div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Wi-Fi</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Home_Network</div>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '50%' }}><ChevronRight size={16} color="white" /></div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Bluetooth</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>On</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Volume2 size={16} color="rgba(255,255,255,0.7)" />
                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Sound</div>
              </div>
              <div style={{ height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '60%', background: 'rgba(255,255,255,0.8)', borderRadius: '12px' }}></div>
              </div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BatteryIcon />
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Battery</div>
              </div>
              <div style={{ fontSize: '0.75rem' }}>{Math.round(battery.level * 100)}%</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
