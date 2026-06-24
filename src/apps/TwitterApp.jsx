import { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { FaTwitter } from 'react-icons/fa';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export default function TwitterApp() {
  const [key, setKey] = useState(0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#000000', color: 'white', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaTwitter size={24} color="#1DA1F2" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Timeline</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setKey(prev => prev + 1)}
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Refresh Timeline"
          >
            <RefreshCw size={20} />
          </button>
          <a 
            href="https://x.com/nandinigoyaldev" 
            target="_blank" 
            rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#1DA1F2', color: 'white', padding: '6px 12px', borderRadius: '99px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            Open in X <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', background: '#15202B' }}>
        <div style={{ width: '100%', maxWidth: '600px', height: '100%' }}>
          <TwitterTimelineEmbed
            key={key}
            sourceType="profile"
            screenName="nandinigoyaldev"
            options={{ height: '100%', width: '100%' }}
            theme="dark"
            noHeader={true}
            noFooter={true}
            noBorders={true}
            transparent={true}
          />
        </div>
      </div>
    </div>
  );
}
