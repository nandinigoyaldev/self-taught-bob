import { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, Music, Terminal, Layout, Clock, Download, File, User, Calculator, Camera, Settings, Compass } from 'lucide-react';
import { APPS } from '../components/Dock.jsx';

export default function FinderApp({ openApp }) {
  const [selectedSidebar, setSelectedSidebar] = useState('Applications');

  const SIDEBAR_ITEMS = [
    { id: 'Recents', icon: Clock, label: 'Recents' },
    { id: 'Applications', icon: Layout, label: 'Applications' },
    { id: 'Desktop', icon: Compass, label: 'Desktop' },
    { id: 'Documents', icon: FileText, label: 'Documents' },
    { id: 'Downloads', icon: Download, label: 'Downloads' },
  ];

  const getContents = () => {
    switch (selectedSidebar) {
      case 'Applications':
        return APPS.map(app => ({
          id: app.id,
          name: app.name,
          icon: app.icon,
          color: app.color || 'white',
          type: 'app'
        }));
      case 'Desktop':
        return [
          { id: 'resume', name: 'Resume.pdf', icon: FileText, color: '#f87171', type: 'file', url: 'https://github.com/nandinigoyaldev' },
          { id: 'projects', name: 'Projects', icon: Folder, color: '#60a5fa', type: 'app' },
          { id: 'notes', name: 'Notes', icon: Folder, color: '#60a5fa', type: 'app' },
        ];
      case 'Documents':
        return [
          { id: 'notes', name: 'Ideas', icon: Folder, color: '#60a5fa', type: 'app' },
          { id: 'projects', name: 'Source Code', icon: Folder, color: '#60a5fa', type: 'app' }
        ];
      case 'Recents':
      case 'Downloads':
        return [];
      default:
        return [];
    }
  };

  const items = getContents();

  const handleDoubleClick = (item) => {
    if (item.type === 'app') {
      openApp(item.id);
    } else if (item.type === 'file' && item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', color: 'white', background: 'rgba(24, 24, 27, 0.5)' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ padding: '0 8px', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Favorites
        </div>
        {SIDEBAR_ITEMS.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedSidebar(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '8px',
              cursor: 'pointer', background: selectedSidebar === item.id ? 'rgba(59, 130, 246, 0.4)' : 'transparent',
              color: selectedSidebar === item.id ? 'white' : 'rgba(255,255,255,0.8)'
            }}
          >
            <item.icon size={16} color={selectedSidebar === item.id ? 'white' : '#60a5fa'} />
            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '1.5rem', fontWeight: 500 }}>{selectedSidebar}</h2>
        
        {items.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '100px' }}>
            No items found.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '24px' }}>
            {items.map(item => (
              <div 
                key={item.id}
                onDoubleClick={() => handleDoubleClick(item)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <item.icon size={48} color={item.color} style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
                </div>
                <span style={{ fontSize: '0.85rem', textAlign: 'center', color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
