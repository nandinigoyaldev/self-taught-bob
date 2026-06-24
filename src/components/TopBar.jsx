import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, BatteryFull, BatteryMedium, BatteryLow, Search, Bell } from 'lucide-react';

export default function TopBar({ onSearchClick, openApp, closeAllApps }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionQuality, setConnectionQuality] = useState('good');
  const [batteryLevel, setBatteryLevel] = useState(null);

  useEffect(() => {
    // Time
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Network
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.connection) {
      const updateConnection = () => {
        if (navigator.connection.downlink > 5) setConnectionQuality('good');
        else if (navigator.connection.downlink > 1) setConnectionQuality('fair');
        else setConnectionQuality('poor');
      };
      updateConnection();
      navigator.connection.addEventListener('change', updateConnection);
    }

    // Battery API (works in Chromium based browsers)
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level);
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(battery.level);
        });
      });
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNotificationClick = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification('NandiniOS', { body: 'Notifications are working perfectly!' });
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification('NandiniOS', { body: 'Thanks for enabling notifications!' });
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('Copied from NandiniOS!');
      alert('Copied sample text to your real clipboard!');
    } catch (err) {
      alert('Failed to copy: ' + err);
    }
  };

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const renderBattery = () => {
    if (batteryLevel === null) return <Battery size={16} />;
    if (batteryLevel > 0.8) return <BatteryFull size={16} />;
    if (batteryLevel > 0.3) return <BatteryMedium size={16} />;
    return <BatteryLow size={16} color="red" />;
  };

  const renderWifi = () => {
    if (!isOnline) return <WifiOff size={16} color="red" />;
    if (connectionQuality === 'poor') return <Wifi size={16} opacity={0.4} />;
    if (connectionQuality === 'fair') return <Wifi size={16} opacity={0.7} />;
    return <Wifi size={16} />;
  };

  return (
    <div className="top-bar glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} onClick={() => activeMenu && setActiveMenu(null)}>
      <div className="top-bar-left" style={{ position: 'relative' }}>
        <div className="top-bar-item text-gradient" style={{ fontWeight: 700 }}>
          NandiniOS
        </div>
        
        <div className="top-bar-item" onClick={(e) => { e.stopPropagation(); toggleMenu('file'); }}>File</div>
        <div className="top-bar-item" onClick={(e) => { e.stopPropagation(); toggleMenu('edit'); }}>Edit</div>
        <div className="top-bar-item" onClick={(e) => { e.stopPropagation(); document.getElementById('wallpaper-upload')?.click(); }}>View</div>
        <div className="top-bar-item" onClick={(e) => { e.stopPropagation(); toggleMenu('go'); }}>Go</div>
        <div className="top-bar-item" onClick={(e) => { e.stopPropagation(); toggleMenu('help'); }}>Help</div>

        {/* Dropdowns */}
        {activeMenu === 'file' && (
          <div className="menu-dropdown" style={{ left: '80px' }}>
            <div className="menu-item" onClick={() => window.open(window.location.href, '_blank')}>New Window</div>
            <div className="menu-divider" />
            <div className="menu-item" onClick={() => document.getElementById('wallpaper-upload')?.click()}>Change Wallpaper</div>
            <div className="menu-divider" />
            <div className="menu-item" style={{ color: '#ef4444' }} onClick={closeAllApps}>Close All Apps</div>
          </div>
        )}

        {activeMenu === 'edit' && (
          <div className="menu-dropdown" style={{ left: '120px' }}>
            <div className="menu-item" onClick={handleCopy}>Copy (to real clipboard)</div>
            <div className="menu-item" onClick={() => alert('Cut action mocked')}>Cut</div>
            <div className="menu-item" onClick={async () => {
              try {
                const text = await navigator.clipboard.readText();
                alert(`Pasted from real clipboard: "${text}"`);
              } catch (e) {
                alert('Paste requires clipboard permissions');
              }
            }}>Paste</div>
          </div>
        )}

        {activeMenu === 'go' && (
          <div className="menu-dropdown" style={{ left: '200px' }}>
            <div className="menu-item" onClick={() => window.history.back()}>Back</div>
            <div className="menu-item" onClick={() => window.history.forward()}>Forward</div>
            <div className="menu-divider" />
            <div className="menu-item" onClick={() => window.location.reload()}>Reload OS</div>
          </div>
        )}

        {activeMenu === 'help' && (
          <div className="menu-dropdown" style={{ left: '240px' }}>
            <div className="menu-item" onClick={() => openApp('about')}>About NandiniOS</div>
          </div>
        )}

      </div>
      
      <div className="top-bar-right">
        <div className="top-bar-item" onClick={onSearchClick}><Search size={16} /></div>
        <div className="top-bar-item" title={isOnline ? `Online (${connectionQuality})` : 'Offline'}>
          {renderWifi()}
        </div>
        <div className="top-bar-item" title={batteryLevel ? `${Math.round(batteryLevel * 100)}%` : 'Battery status unavailable'}>
          {renderBattery()}
        </div>
        <div className="top-bar-item" onClick={handleNotificationClick} title="Test Notifications"><Bell size={16} /></div>
        <div className="top-bar-item">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}&nbsp;
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
