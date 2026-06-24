import { Settings, Monitor, LayoutTemplate } from 'lucide-react';

export default function SettingsApp({ settings, updateSettings }) {
  const currentDockPosition = settings?.dockPosition || 'bottom';
  const currentDockSize = settings?.dockSize || 50;

  return (
    <div style={{ padding: '2rem', color: 'white', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Settings size={32} color="var(--accent-purple)" />
        <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>System Preferences</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Dock Settings */}
        <section>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutTemplate size={18} /> Dock
          </h3>
          <div style={cardStyle}>
            
            <div style={settingRowStyle}>
              <label>Position on screen:</label>
              <select 
                value={currentDockPosition} 
                onChange={(e) => updateSettings({ dockPosition: e.target.value })}
                style={inputStyle}
              >
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>

            <div style={settingRowStyle}>
              <label>Icon Size:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input 
                  type="range" 
                  min="32" 
                  max="80" 
                  value={currentDockSize} 
                  onChange={(e) => updateSettings({ dockSize: Number(e.target.value) })}
                  style={{ width: '150px' }}
                />
                <span>{currentDockSize}px</span>
              </div>
            </div>

          </div>
        </section>

        {/* Display Settings */}
        <section>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Monitor size={18} /> Display
          </h3>
          <div style={cardStyle}>
            <div style={settingRowStyle}>
              <div>
                <div style={{ fontWeight: 500 }}>Preset Themes</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Choose a gorgeous predefined wallpaper.</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => {
                    localStorage.removeItem('nandini-wallpaper');
                    window.location.reload();
                  }}
                  style={{ ...buttonStyle, background: 'rgba(147, 51, 234, 0.2)', color: '#c084fc', border: '1px solid rgba(147, 51, 234, 0.4)' }}
                >
                  Interactive
                </button>
                <button 
                  onClick={() => {
                    localStorage.setItem('nandini-wallpaper', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
                    window.location.reload();
                  }}
                  style={{ ...buttonStyle, background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                >
                  Abstract
                </button>
                <button 
                  onClick={() => {
                    localStorage.setItem('nandini-wallpaper', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2500&auto=format&fit=crop');
                    window.location.reload();
                  }}
                  style={{ ...buttonStyle, background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}
                >
                  Landscape
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Custom Wallpaper</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Upload your own image.</div>
              </div>
              <button 
                onClick={() => document.getElementById('wallpaper-upload')?.click()}
                style={buttonStyle}
              >
                Upload Image
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const cardStyle = {
  background: 'rgba(24, 24, 27, 0.6)',
  border: '1px solid var(--border-glass-light)',
  padding: '1.5rem',
  borderRadius: '12px',
};

const settingRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
};

const inputStyle = {
  background: 'rgba(0,0,0,0.5)',
  color: 'white',
  border: '1px solid var(--border-glass-light)',
  padding: '0.5rem',
  borderRadius: '6px',
  outline: 'none'
};

const buttonStyle = {
  background: 'rgba(59, 130, 246, 0.1)',
  color: 'var(--accent-blue)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontWeight: 500
};
