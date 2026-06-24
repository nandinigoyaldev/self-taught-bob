import { useEffect, useRef, useState } from 'react';
import { Camera, VideoOff, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CameraApp() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Camera access denied or not available.');
      }
    }
    
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsFlashing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    setPhotos(prev => [dataUrl, ...prev]);
    
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
      audio.play().catch(() => {});
    } catch(e) {}
    
    setTimeout(() => setIsFlashing(false), 150);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'black', color: 'white', position: 'relative', overflow: 'hidden', userSelect: 'none' }}>
      <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', position: 'absolute', top: 0, width: '100%', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Camera size={20} color="#ec4899" />
          <span style={{ fontWeight: 600, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>Camera</span>
        </div>
      </div>
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        {error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#9ca3af' }}>
            <VideoOff size={48} style={{ marginBottom: '16px' }} />
            <p>{error}</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
          />
        )}

        <AnimatePresence>
          {isFlashing && (
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'white', zIndex: 20, pointerEvents: 'none' }}
            />
          )}
        </AnimatePresence>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '128px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}>
            {photos.length > 0 ? (
              <img src={photos[0]} alt="Recent" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
            ) : (
              <ImageIcon size={24} color="rgba(255,255,255,0.5)" />
            )}
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={takePhoto}
            style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'white', border: '4px solid #ec4899', boxShadow: '0 0 20px rgba(236,72,153,0.5)', outline: 'none', cursor: 'pointer' }}
          />

          <div style={{ width: '56px', height: '56px' }} />
        </div>
      </div>
    </div>
  );
}
