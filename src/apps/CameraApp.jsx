import { useEffect, useRef, useState } from 'react';
import { Camera, VideoOff } from 'lucide-react';

export default function CameraApp() {
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'black', color: 'white', position: 'relative' }}>
      <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(24, 24, 27, 0.8)', zIndex: 10 }}>
        <Camera size={20} color="#ec4899" />
        <span style={{ fontWeight: 'bold' }}>Camera</span>
      </div>
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        {error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'gray' }}>
            <VideoOff size={48} style={{ marginBottom: '1rem' }} />
            <p>{error}</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        )}
      </div>

      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <button style={{
          width: '60px', height: '60px', borderRadius: '50%', background: 'white', border: '4px solid #ec4899', cursor: 'pointer', outline: 'none'
        }} onClick={() => alert('Photo captured! (Mock)')} />
      </div>
    </div>
  );
}
