import { useEffect, useRef, useState } from 'react';
import { Camera, Video } from 'lucide-react';

export default function CameraApp() {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let activeStream = null;

    async function setupCamera() {
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(activeStream);
        if (videoRef.current) {
          videoRef.current.srcObject = activeStream;
        }
      } catch (err) {
        console.error("Camera error:", err);
        setError('Camera access denied or unavailable.');
      }
    }

    setupCamera();

    // Cleanup on close
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      
      {error ? (
        <div style={{ color: '#ef4444', textAlign: 'center' }}>
          <Camera size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p>{error}</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Please allow camera permissions in your browser.</p>
        </div>
      ) : (
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden', background: '#111' }}>
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
          />
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
            <button style={shutterStyle}>
              <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%' }} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

const shutterStyle = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  border: '4px solid white',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  outline: 'none',
  padding: 0
};
