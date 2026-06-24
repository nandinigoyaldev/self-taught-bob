import { Disc } from 'lucide-react';

export default function MusicApp() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#000', color: 'white', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#121212' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#1DB954' }}>
          <Disc size={24} /> Spotify Player
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        <iframe 
          style={{ borderRadius: '0px', border: 'none', width: '100%', height: '100%' }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?utm_source=generator&theme=0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      </div>
    </div>
  );
}
