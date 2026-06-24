import { Search, Bell, Mic, Video, Menu, MoreVertical, ExternalLink } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRealData } from '../hooks/useRealData';
import { useYouTubeData } from '../hooks/useYouTubeData';

export default function YouTubeApp() {
  const profile = useRealData('nandinigoyaldev');
  const { videos, isLoading } = useYouTubeData('UCybVuyrbtdTxwUJe0xRcLCf');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0F0F0F', color: '#FFFFFF', overflow: 'hidden', fontFamily: 'Roboto, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Menu size={24} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <FaYoutube size={28} color="#FF0000" />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>YouTube</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, maxWidth: '600px', margin: '0 32px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flex: 1, background: '#121212', border: '1px solid #303030', borderRadius: '40px', padding: '0 16px', height: '40px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search" 
              style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none', fontSize: '1rem' }} 
            />
          </div>
          <div style={{ background: '#222222', width: '64px', height: '40px', borderRadius: '0 40px 40px 0', marginLeft: '-40px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #303030', cursor: 'pointer' }}>
            <Search size={20} />
          </div>
          <div style={{ background: '#181818', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '12px', cursor: 'pointer' }}>
            <Mic size={20} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Video size={24} />
          <Bell size={24} />
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', overflow: 'hidden' }}>
            <img src={profile.avatar} alt="Me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        
        {/* Channel Banner */}
        <div style={{ width: '100%', height: '200px', background: 'linear-gradient(45deg, #FF0000, #990000)', borderRadius: '16px', marginBottom: '24px' }}></div>
        
        {/* Channel Header */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ width: '128px', height: '128px', borderRadius: '50%', border: '4px solid #0F0F0F', background: '#333', marginTop: '-64px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
             <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '2rem' }}>{profile.name}</h1>
            <p style={{ margin: 0, color: '#AAAAAA', fontSize: '1rem' }}>@nandinigoyaldev</p>
            <p style={{ margin: '8px 0 16px 0', color: '#FFFFFF', fontSize: '0.9rem', maxWidth: '600px' }}>
              {profile.bio}
            </p>
            <a href="https://www.youtube.com/@nandinigoyaldev" target="_blank" rel="noreferrer" style={{ background: '#FFFFFF', color: '#0F0F0F', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', border: 'none', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
              Subscribe
            </a>
          </div>
        </div>

        {/* Video Grid */}
        <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid #303030', paddingBottom: '16px' }}>
          Latest Videos
        </h2>
        
        {isLoading ? (
          <p style={{ color: '#AAAAAA' }}>Loading live videos from YouTube...</p>
        ) : videos.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {videos.map(video => (
              <motion.div 
                key={video.guid || video.id} 
                whileHover={{ scale: 1.02 }}
                style={{ cursor: 'pointer' }}
                onClick={() => window.open(video.link, '_blank')}
              >
                <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', background: '#222', marginBottom: '12px', backgroundImage: `url(${video.thumbnail})`, backgroundSize: 'cover' }}></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#333', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {video.title}
                    </h3>
                    <p style={{ margin: 0, color: '#AAAAAA', fontSize: '0.85rem' }}>{profile.name}</p>
                    <p style={{ margin: 0, color: '#AAAAAA', fontSize: '0.85rem' }}>{new Date(video.pubDate).toLocaleDateString()}</p>
                  </div>
                  <MoreVertical size={20} color="#FFFFFF" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#AAAAAA', fontStyle: 'italic', padding: '24px', background: '#181818', borderRadius: '8px' }}>
            There are no public videos uploaded to this YouTube channel yet. When you upload a video on YouTube, it will automatically appear here!
          </p>
        )}

      </div>
    </div>
  );
}
