import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, BatteryFull, BatteryMedium, BatteryLow, Search, Bell } from 'lucide-react';

export default function TopBar({ onSearchClick }) {
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
    <div className="top-bar glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
      <div className="top-bar-left">
        <div className="top-bar-item text-gradient" style={{ fontWeight: 700 }}>
          NandiniOS
        </div>
        <div className="top-bar-item">File</div>
        <div className="top-bar-item">Edit</div>
        <div 
          className="top-bar-item" 
          onClick={() => document.getElementById('wallpaper-upload')?.click()}
          title="Change Wallpaper"
        >
          View
        </div>
        <div className="top-bar-item">Go</div>
        <div className="top-bar-item">Help</div>
      </div>
      
      <div className="top-bar-right">
        <div className="top-bar-item" onClick={onSearchClick}><Search size={16} /></div>
        <div className="top-bar-item" title={isOnline ? `Online (${connectionQuality})` : 'Offline'}>
          {renderWifi()}
        </div>
        <div className="top-bar-item" title={batteryLevel ? `${Math.round(batteryLevel * 100)}%` : 'Battery status unavailable'}>
          {renderBattery()}
        </div>
        <div className="top-bar-item"><Bell size={16} /></div>
        <div className="top-bar-item">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}&nbsp;
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
