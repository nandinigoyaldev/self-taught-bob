import { ExternalLink } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';

export default function YouTubeApp() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0F0F0F', color: '#FFFFFF', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10, background: '#0F0F0F', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <FaYoutube size={28} color="#FF0000" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>YouTube</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a 
            href="https://www.youtube.com/@nandinigoyaldev" 
            target="_blank" 
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 16px', borderRadius: '99px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            Open App <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* We use an iframe to embed YouTube search results as a fallback, 
            since we don't have a specific Channel ID or Playlist ID. 
            YouTube allows embedding search query results! */}
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube.com/embed?listType=search&list=nandinigoyaldev" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          title="YouTube Results for nandinigoyaldev"
          style={{ position: 'absolute', top: 0, left: 0 }}
        ></iframe>
      </div>
    </div>
  );
}
