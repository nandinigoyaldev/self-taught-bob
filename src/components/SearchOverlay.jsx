import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { APPS } from './Dock.jsx';

export default function SearchOverlay({ onClose, openApp }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredApps = APPS.filter(app => app.name.toLowerCase().includes(query.toLowerCase()));

  const handleAppClick = (appId) => {
    openApp(appId);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '15vh'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-panel"
        style={{
          width: '500px',
          maxWidth: '90%',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(24, 24, 27, 0.8)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Search size={24} color="gray" style={{ marginRight: '1rem' }} />
          <input 
            ref={inputRef}
            type="text"
            placeholder="Search apps..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '1.2rem'
            }}
          />
        </div>
        
        {query && (
          <div style={{ padding: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
            {filteredApps.length > 0 ? filteredApps.map(app => {
              const Icon = app.icon;
              return (
                <div 
                  key={app.id}
                  onClick={() => handleAppClick(app.id)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '8px', color: 'white'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Icon color={app.color} size={24} style={{ marginRight: '1rem' }} />
                  <span>{app.name}</span>
                </div>
              );
            }) : (
              <div style={{ padding: '1rem', color: 'gray', textAlign: 'center' }}>No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
