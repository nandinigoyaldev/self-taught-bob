import { useState, useEffect, useRef } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { APPS } from './Dock.jsx';

export default function SearchOverlay({ onClose, openApp }) {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    fetch('https://api.github.com/users/nandinigoyaldev/repos?sort=updated')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      })
      .catch(console.error);
  }, []);

  const filteredApps = APPS.filter(app => app.name.toLowerCase().includes(query.toLowerCase()));
  const filteredRepos = repos.filter(repo => repo.name.toLowerCase().includes(query.toLowerCase()) || (repo.description && repo.description.toLowerCase().includes(query.toLowerCase()))).slice(0, 5);

  const handleAppClick = (appId) => {
    openApp(appId);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)',
        zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '15vh'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel"
        style={{
          width: '600px', maxWidth: '90%', borderRadius: '16px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', background: 'rgba(24, 24, 27, 0.85)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Search size={28} color="rgba(255,255,255,0.5)" style={{ marginRight: '16px' }} />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'white', fontSize: '1.5rem', fontWeight: 300
            }}
          />
        </div>
        
        {query && (
          <div style={{ padding: '8px', maxHeight: '400px', overflowY: 'auto' }}>
            {filteredApps.length > 0 && (
              <div style={{ padding: '8px 16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Applications
              </div>
            )}
            {filteredApps.map(app => {
              const Icon = app.icon;
              return (
                <div 
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', cursor: 'pointer', borderRadius: '8px', color: 'white' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-blue)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Icon color={app.color} size={24} style={{ marginRight: '16px' }} />
                  <span style={{ fontSize: '1.1rem' }}>{app.name}</span>
                </div>
              );
            })}

            {filteredRepos.length > 0 && (
              <div style={{ padding: '16px 16px 8px 16px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                GitHub Repositories
              </div>
            )}
            {filteredRepos.map(repo => (
              <div 
                key={repo.id}
                onClick={() => { window.open(repo.html_url, '_blank'); onClose(); }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', cursor: 'pointer', borderRadius: '8px', color: 'white' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaGithub color="white" size={20} style={{ marginRight: '16px' }} />
                  <div>
                    <div style={{ fontSize: '1rem' }}>{repo.name}</div>
                    {repo.description && <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{repo.description}</div>}
                  </div>
                </div>
                <ExternalLink size={16} color="rgba(255,255,255,0.4)" />
              </div>
            ))}

            {filteredApps.length === 0 && filteredRepos.length === 0 && (
              <div style={{ padding: '24px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
