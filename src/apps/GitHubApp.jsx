import { useState, useEffect } from 'react';
import { BookOpen, Star, GitFork, Circle, MapPin, Link as LinkIcon, Users, Book } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function GitHubApp() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/nandinigoyaldev'),
          fetch('https://api.github.com/users/nandinigoyaldev/repos?sort=updated&per_page=6')
        ]);
        
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        
        setProfile(profileData);
        setRepos(reposData);
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch GitHub data", e);
        setLoading(false);
      }
    }
    
    fetchGitHubData();
  }, []);

  const getLanguageColor = (lang) => {
    const colors = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Go: '#00ADD8', CSS: '#563d7c', HTML: '#e34c26', Python: '#3572A5' };
    return colors[lang] || '#8b949e';
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0d1117', color: '#c9d1d9', overflow: 'hidden', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif' }}>
      
      {/* Header */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', background: '#161b22', borderBottom: '1px solid #30363d', zIndex: 10 }}>
        <FaGithub size={32} color="#ffffff" />
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
          <span style={{ color: '#ffffff', cursor: 'pointer' }}>Overview</span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Repositories <span style={{ background: '#30363d', padding: '2px 6px', borderRadius: '12px', fontSize: '0.75rem' }}>{profile?.public_repos || 0}</span></span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Projects</span>
          <span style={{ color: '#c9d1d9', cursor: 'pointer' }}>Packages</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Profile Sidebar */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px', fontWeight: 'bold', color: 'white', marginBottom: '16px', overflow: 'hidden' }}>
            {profile?.avatar_url ? <img src={profile.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'N'}
          </div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#ffffff' }}>{profile?.name || 'Nandini Goyal'}</h1>
          <p style={{ margin: '4px 0 16px 0', fontSize: '1.2rem', color: '#8b949e', fontWeight: 300 }}>nandinigoyaldev</p>
          
          <button style={{ width: '100%', background: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', padding: '6px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', marginBottom: '16px', transition: 'background 0.2s' }}>
            Follow
          </button>
          
          <p style={{ margin: '0 0 16px 0', fontSize: '1rem', lineHeight: '1.5' }}>
            {profile?.bio || 'Building the web, one line of code at a time.'}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b949e', fontSize: '0.9rem', marginBottom: '16px' }}>
            <Users size={16} /> <span style={{ color: '#ffffff', fontWeight: 600 }}>{profile?.followers || 0}</span> followers · <span style={{ color: '#ffffff', fontWeight: 600 }}>{profile?.following || 0}</span> following
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#c9d1d9', fontSize: '0.9rem' }}>
            {profile?.location && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {profile.location}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><LinkIcon size={16} /> <a href="#" style={{ color: '#58a6ff', textDecoration: 'none' }}>nandinigoyaldev</a></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FaGithub size={16} /> @nandinigoyaldev</div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 400 }}>Latest Repositories</h2>
          </div>
          
          {loading ? (
            <p>Loading repositories...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
              {repos.map(repo => (
                <motion.div 
                  key={repo.id}
                  whileHover={{ y: -2 }}
                  style={{ padding: '16px', border: '1px solid #30363d', borderRadius: '6px', background: '#0d1117', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => window.open(repo.html_url, '_blank')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <BookOpen size={16} color="#8b949e" />
                    <span style={{ color: '#58a6ff', fontWeight: 600, fontSize: '1rem', wordBreak: 'break-all' }}>{repo.name}</span>
                    <span style={{ border: '1px solid #30363d', color: '#8b949e', fontSize: '0.75rem', padding: '0 7px', borderRadius: '12px', marginLeft: 'auto' }}>{repo.visibility}</span>
                  </div>
                  
                  <p style={{ margin: '0 0 16px 0', color: '#8b949e', fontSize: '0.75rem', lineHeight: '1.5', flex: 1 }}>
                    {repo.description || 'No description available.'}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#8b949e', fontSize: '0.75rem' }}>
                    {repo.language && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Circle size={12} fill={getLanguageColor(repo.language)} color={getLanguageColor(repo.language)} />
                        {repo.language}
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} /> {repo.stargazers_count}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <GitFork size={14} /> {repo.forks_count}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
