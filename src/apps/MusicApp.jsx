import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Disc } from 'lucide-react';
import { motion } from 'framer-motion';

const SONGS = [
  {
    title: "Lofi Study Beats",
    artist: "ChillHop",
    albumArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf58d.mp3?filename=lofi-study-112191.mp3"
  },
  {
    title: "Late Night Coding",
    artist: "Synthwave",
    albumArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000&auto=format&fit=crop",
    audioSrc: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_249265f0cb.mp3?filename=cyberpunk-2099-10701.mp3"
  }
];

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentSong = SONGS[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    setIsPlaying(true);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #1e1e24, #121214)', color: 'white', overflow: 'hidden' }}>
      <audio 
        ref={audioRef} 
        src={currentSong.audioSrc} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />
      
      {/* Header */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Disc size={24} color="var(--accent-purple)" /> Music
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        
        {/* Album Art with Vinyl Spin */}
        <div style={{ position: 'relative', width: '250px', height: '250px', marginBottom: '32px' }}>
          {/* Vinyl Record */}
          <motion.div 
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ 
              position: 'absolute', top: 0, left: isPlaying ? '30px' : '0px', width: '100%', height: '100%', 
              borderRadius: '50%', background: '#111', border: '1px solid #333',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'left 0.5s ease-in-out', zIndex: 0
            }}
          >
            {/* Vinyl grooves */}
            <div style={{ width: '90%', height: '90%', borderRadius: '50%', border: '1px solid #222' }} />
            <div style={{ position: 'absolute', width: '80%', height: '80%', borderRadius: '50%', border: '1px solid #222' }} />
            <div style={{ position: 'absolute', width: '70%', height: '70%', borderRadius: '50%', border: '1px solid #222' }} />
            {/* Center label */}
            <div style={{ position: 'absolute', width: '30%', height: '30%', borderRadius: '50%', background: 'var(--accent-purple)' }} />
            {/* Center hole */}
            <div style={{ position: 'absolute', width: '5%', height: '5%', borderRadius: '50%', background: '#111' }} />
          </motion.div>

          {/* Album Cover */}
          <motion.div 
            style={{ 
              position: 'relative', width: '100%', height: '100%', borderRadius: '12px', 
              backgroundImage: `url(${currentSong.albumArt})`, backgroundSize: 'cover', backgroundPosition: 'center',
              boxShadow: '-10px 10px 30px rgba(0,0,0,0.5)', zIndex: 1
            }}
          />
        </div>

        {/* Track Info */}
        <div style={{ textAlign: 'center', marginBottom: '24px', width: '100%' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', fontWeight: 700 }}>{currentSong.title}</h2>
          <p style={{ margin: 0, fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)' }}>{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', maxWidth: '400px', marginBottom: '32px' }}>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-purple)', borderRadius: '3px', transition: 'width 0.1s linear' }} />
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Shuffle size={20} color="rgba(255,255,255,0.4)" style={{ cursor: 'pointer' }} />
          <SkipBack size={32} color="white" onClick={prevSong} style={{ cursor: 'pointer' }} />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              width: '64px', height: '64px', borderRadius: '50%', background: 'white', color: 'black',
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
            }}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
          </motion.button>
          <SkipForward size={32} color="white" onClick={nextSong} style={{ cursor: 'pointer' }} />
          <Repeat size={20} color="rgba(255,255,255,0.4)" style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </div>
  );
}
