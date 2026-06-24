import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium, Clock } from 'lucide-react';

export default function Widgets() {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState({ level: 1, charging: false, supported: true });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let batObj = null;
    
    if ('getBattery' in navigator) {
      navigator.getBattery().then(bat => {
        batObj = bat;
        const updateBattery = () => {
          setBattery({
            level: bat.level,
            charging: bat.charging,
            supported: true
          });
        };
        updateBattery();
        bat.addEventListener('levelchange', updateBattery);
        bat.addEventListener('chargingchange', updateBattery);
      });
    } else {
      setBattery(prev => ({ ...prev, supported: false }));
    }

    return () => {
      if (batObj) {
        batObj.removeEventListener('levelchange', () => {});
        batObj.removeEventListener('chargingchange', () => {});
      }
    };
  }, []);

  const getBatteryIcon = () => {
    if (battery.charging) return <BatteryCharging size={32} color="#22c55e" />;
    if (battery.level > 0.8) return <BatteryFull size={32} color="white" />;
    if (battery.level > 0.4) return <BatteryMedium size={32} color="white" />;
    if (battery.level > 0.15) return <BatteryLow size={32} color="#eab308" />;
    return <Battery size={32} color="#ef4444" />;
  };

  return (
    <div style={{ position: 'absolute', top: '48px', right: '16px', display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 5 }}>
      
      {/* Clock Widget */}
      <motion.div 
        drag 
        dragMomentum={false}
        className="glass-panel"
        style={{ width: '160px', height: '160px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}
      >
        <Clock size={32} color="var(--accent-cyan)" style={{ marginBottom: '8px' }} />
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '-2px' }}>
          {time.getHours().toString().padStart(2, '0')}:{time.getMinutes().toString().padStart(2, '0')}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'gray', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </motion.div>

      {/* Battery Widget */}
      {battery.supported && (
        <motion.div 
          drag 
          dragMomentum={false}
          className="glass-panel"
          style={{ width: '160px', height: '160px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'grab', background: 'rgba(24, 24, 27, 0.6)' }}
        >
          {getBatteryIcon()}
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '12px' }}>
            {Math.round(battery.level * 100)}%
          </div>
          <div style={{ fontSize: '0.8rem', color: battery.charging ? '#22c55e' : 'gray', marginTop: '4px' }}>
            {battery.charging ? 'Charging' : 'Battery'}
          </div>
        </motion.div>
      )}

    </div>
  );
}
