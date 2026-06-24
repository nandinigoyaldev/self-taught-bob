import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

export default function LinkedInApp() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Inject the LinkedIn profile badge script
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    
    // Check if the script is already in the document to prevent duplicates
    if (!document.querySelector('script[src="https://platform.linkedin.com/badges/js/profile.js"]')) {
      document.body.appendChild(script);
    } else if (window.LIRenderAll) {
      // If script exists, re-trigger render
      window.LIRenderAll();
    }

    return () => {
      // Cleanup is handled by React component unmount, but the script remains in head/body.
    };
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F3F2EF', color: '#000000', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #EBEBEB', background: '#FFFFFF', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FaLinkedin size={24} color="#0A66C2" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#0A66C2' }}>LinkedIn</span>
        </div>
        <a 
          href="https://linkedin.com/in/nandinigoyaldev" 
          target="_blank" 
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#0A66C2', color: 'white', padding: '6px 16px', borderRadius: '99px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid transparent', cursor: 'pointer' }}
        >
          View Full Profile <ExternalLink size={14} />
        </a>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 16px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div ref={containerRef} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '12px', boxShadow: '0 0 0 1px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <h2 style={{ fontSize: '1.1rem', marginBottom: '24px', color: '#666' }}>Official Profile Badge</h2>
          
          {/* LinkedIn Badge Container */}
          <div 
            className="badge-base LI-profile-badge" 
            data-locale="en_US" 
            data-size="large" 
            data-theme="light" 
            data-type="VERTICAL" 
            data-vanity="nandinigoyaldev" 
            data-version="v1"
            style={{ minHeight: '300px', display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <a 
              className="badge-base__link LI-simple-link" 
              href="https://in.linkedin.com/in/nandinigoyaldev?trk=profile-badge"
            >
              Nandini Goyal
            </a>
          </div>

          <p style={{ marginTop: '32px', fontSize: '0.85rem', color: '#888', textAlign: 'center', lineHeight: '1.5' }}>
            Note: LinkedIn restricts third-party integrations from displaying full activity feeds without an authenticated API server. This badge is loaded directly from LinkedIn's servers to guarantee authenticity.
          </p>

        </div>
      </div>
    </div>
  );
}
