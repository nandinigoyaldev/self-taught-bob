import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Shield, Lock } from 'lucide-react';

export default function BrowserApp() {
  const [urlInput, setUrlInput] = useState('https://en.wikipedia.org/wiki/Special:Random');
  const [currentUrl, setCurrentUrl] = useState('https://en.wikipedia.org/wiki/Special:Random');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalUrl = urlInput;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setLoading(true);
    setCurrentUrl(finalUrl);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#1c1c1e', color: 'white' }}>
      
      {/* Browser Toolbar */}
      <div style={{ 
        display: 'flex', alignItems: 'center', padding: '12px 16px', gap: '16px', 
        background: 'rgba(40, 40, 40, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Navigation Controls */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <ChevronLeft size={20} color="rgba(255,255,255,0.4)" style={{ cursor: 'pointer' }} />
          <ChevronRight size={20} color="rgba(255,255,255,0.4)" style={{ cursor: 'pointer' }} />
          <RotateCw size={18} color="rgba(255,255,255,0.8)" style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setLoading(true)} />
        </div>

        {/* Address Bar */}
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '6px 16px', 
            borderRadius: '8px', width: '100%', maxWidth: '600px', border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Lock size={14} color="rgba(255,255,255,0.5)" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '0.9rem'
              }}
            />
          </div>
        </form>

        <Home size={20} color="rgba(255,255,255,0.8)" style={{ cursor: 'pointer' }} onClick={() => { setUrlInput('https://en.wikipedia.org/wiki/Special:Random'); setCurrentUrl('https://en.wikipedia.org/wiki/Special:Random'); }} />
      </div>

      {/* Browser Content (Iframe) */}
      <div style={{ flex: 1, position: 'relative', background: 'white' }}>
        {loading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'var(--accent-blue)', animation: 'progress 1s ease-out forwards' }}>
            <style>
              {`@keyframes progress { from { width: 0%; } to { width: 100%; opacity: 0; } }`}
            </style>
          </div>
        )}
        <iframe 
          src={currentUrl} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          onLoad={() => setLoading(false)}
          title="Browser View"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>

    </div>
  );
}
