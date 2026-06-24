import { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Wind, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeatherApp() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(to bottom, #1e3a8a, #3b82f6)', color: 'white', overflow: 'hidden', position: 'relative' }}>
      
      {/* Animated Clouds Background */}
      <motion.div 
        animate={{ x: [0, -100, 0] }} 
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ position: 'absolute', top: '10%', left: '20%', opacity: 0.6 }}
      >
        <Cloud size={100} color="white" />
      </motion.div>
      <motion.div 
        animate={{ x: [0, 150, 0] }} 
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        style={{ position: 'absolute', top: '30%', right: '10%', opacity: 0.4 }}
      >
        <Cloud size={80} color="white" />
      </motion.div>
      
      <div style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 300, margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>San Francisco</h2>
        <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.9 }}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '32px', gap: '24px' }}>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <CloudRain size={80} color="white" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' }} />
          </motion.div>
          <div style={{ fontSize: '5rem', fontWeight: 200, letterSpacing: '-4px', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
            16°
          </div>
        </div>
        <p style={{ fontSize: '1.5rem', fontWeight: 500, margin: '8px 0 32px 0' }}>Light Rain</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', maxWidth: '400px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Wind size={24} color="white" />
            <div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>WIND</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>14 km/h</div>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Droplets size={24} color="white" />
            <div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>HUMIDITY</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>87%</div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div style={{ marginTop: 'auto', width: '100%', display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '24px', backdropFilter: 'blur(10px)' }}>
          {[
            { day: 'Mon', temp: '17°', icon: <Sun size={24} color="#fde047" /> },
            { day: 'Tue', temp: '15°', icon: <CloudRain size={24} color="white" /> },
            { day: 'Wed', temp: '18°', icon: <Sun size={24} color="#fde047" /> },
            { day: 'Thu', temp: '16°', icon: <Cloud size={24} color="white" /> },
            { day: 'Fri', temp: '19°', icon: <Sun size={24} color="#fde047" /> },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{f.day}</span>
              {f.icon}
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{f.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
