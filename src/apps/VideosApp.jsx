import { PlayCircle, ThumbsUp, Eye, Clock } from 'lucide-react';

const mockVideos = [
  { id: 1, title: 'How to Build an OS in React', views: '1.2M', duration: '12:05', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop' },
  { id: 2, title: 'My Journey as a Self-Taught Dev', views: '845K', duration: '18:20', thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop' },
  { id: 3, title: '10 Tips for Portfolio Portals', views: '420K', duration: '08:45', thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop' },
  { id: 4, title: 'Glassmorphism UI Tutorial', views: '210K', duration: '15:10', thumb: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop' }
];

export default function VideosApp() {
  return (
    <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', color: 'white', overflowY: 'auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <PlayCircle size={28} color="#ef4444" />
        Video Dashboard
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {mockVideos.map(video => (
          <div key={video.id} style={{ 
            background: 'rgba(255,255,255,0.05)', 
            borderRadius: '12px', 
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.2s, background 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
            <div style={{ position: 'relative', height: '150px' }}>
              <img src={video.thumb} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>
                {video.duration}
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{video.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'gray', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Eye size={14} /> {video.views}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14} /> 2 days ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}