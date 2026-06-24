import { Briefcase, ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useRealData } from '../hooks/useRealData';

export default function LinkedInApp() {
  const profile = useRealData('nandinigoyaldev');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F3F2EF', color: '#000000', overflow: 'hidden', fontFamily: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EBEBEB', background: '#FFFFFF', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaLinkedin size={24} color="#0A66C2" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#0A66C2' }}>LinkedIn</span>
        </div>
        <a 
          href="https://www.linkedin.com/in/nandinigoyaldev/" 
          target="_blank" 
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#0A66C2', color: 'white', padding: '6px 16px', borderRadius: '99px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid transparent', cursor: 'pointer' }}
        >
          Connect <ExternalLink size={14} />
        </a>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Hero Section */}
          <div style={{ background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: '1px solid #EBEBEB' }}>
            <div style={{ height: '150px', background: 'linear-gradient(135deg, #A8C7FA, #0A66C2)' }}></div>
            <div style={{ padding: '0 24px 24px 24px', position: 'relative' }}>
              <div style={{ width: '152px', height: '152px', borderRadius: '50%', border: '4px solid #FFFFFF', background: '#F3F2EF', position: 'absolute', top: '-76px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                 <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
                <a href="https://www.linkedin.com/in/nandinigoyaldev/" target="_blank" rel="noreferrer" style={{ background: '#FFFFFF', border: '1px solid #0A66C2', color: '#0A66C2', padding: '6px 16px', borderRadius: '99px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}>
                  Message
                </a>
              </div>

              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#000000' }}>{profile.name}</h1>
                  <p style={{ margin: '4px 0', fontSize: '1rem', color: '#000000' }}>{profile.bio}</p>
                  <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#666666' }}>{profile.location || 'India'} · <span style={{ color: '#0A66C2', fontWeight: 'bold', cursor: 'pointer' }}>{profile.followers} connections</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #EBEBEB' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem' }}>About</h2>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5', color: '#000000' }}>
              I am {profile.name}, a passionate developer based in {profile.location}. I love building real-world applications and contributing to Open Source. Check out my latest work on GitHub or my blog at nandini.solutions!
            </p>
          </div>

          {/* Experience */}
          <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '24px', border: '1px solid #EBEBEB' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '1.25rem' }}>Experience</h2>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', background: '#F3F2EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={24} color="#666" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>Developer</h3>
                <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#000000' }}>{profile.company || 'Open Source'}</p>
                <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#666666' }}>Present</p>
                <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5' }}>Building applications with React, Javascript, and Python.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
