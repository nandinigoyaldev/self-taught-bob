import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRealData } from '../hooks/useRealData';

export default function LockScreen({ onUnlock }) {
  const profile = useRealData('nandinigoyaldev');
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <AnimatePresence>
      {!isUnlocking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100vw', height: '100vh',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop) no-repeat center center fixed',
            backgroundSize: 'cover',
            zIndex: 99999,
            color: 'white'
          }}
          onClick={handleUnlock}
        >
          {/* Mac-style lock screen overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(5px)' }} />
          
          <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-10vh' }}>
            
            {/* Avatar */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                width: '120px', height: '120px', borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.3)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                overflow: 'hidden', marginBottom: '24px',
                background: 'rgba(255,255,255,0.1)'
              }}
            >
              {profile.avatar && <img src={profile.avatar} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </motion.div>

            {/* Name */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ fontSize: '2rem', fontWeight: 600, margin: '0 0 8px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
            >
              {profile.name === 'Loading...' ? 'Nandini Goyal' : profile.name}
            </motion.h1>

            {/* Password simulation */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center',
                gap: '8px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ fontSize: '0.9rem', letterSpacing: '2px', opacity: 0.8 }}>••••••••</span>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '16px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                Click or press Enter to unlock
              </div>
            </motion.div>
            
          </div>

          {/* Clock */}
          <div style={{ position: 'absolute', top: '10vh', left: '0', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
            <div style={{ fontSize: '5rem', fontWeight: 200, letterSpacing: '-2px', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
              {formattedTime}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 400, opacity: 0.9, textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}>
              {formattedDate}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
