import { useState, useEffect } from 'react';
import { Code, Activity, Star, Users } from 'lucide-react';

export default function StatsApp() {
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/nandinigoyaldev')
      .then(res => res.json())
      .then(data => {
        setGithubData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Developer Analytics</h2>
      
      {loading ? (
        <div style={{ color: 'var(--text-secondary)' }}>Connecting to GitHub...</div>
      ) : githubData && !githubData.message ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          
          <div className="stat-card" style={cardStyle}>
            <Code size={32} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{githubData.public_repos}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Public Repositories</p>
          </div>

          <div className="stat-card" style={cardStyle}>
            <Users size={32} color="var(--accent-purple)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{githubData.followers}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Followers</p>
          </div>

          <div className="stat-card" style={cardStyle}>
            <Activity size={32} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>{githubData.public_gists}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Public Gists</p>
          </div>

          <div className="stat-card" style={{ ...cardStyle, gridColumn: '1 / -1' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} color="#eab308" /> GitHub Profile
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>{githubData.bio || 'Self-Taught Developer'}</p>
            <a 
              href={githubData.html_url} 
              target="_blank" 
              rel="noreferrer"
              style={{ color: 'var(--accent-blue)', textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}
            >
              View Full Profile →
            </a>
          </div>
        </div>
      ) : (
        <div style={{ color: '#ef4444' }}>Failed to load GitHub data.</div>
      )}
    </div>
  );
}

const cardStyle = {
  background: 'rgba(24, 24, 27, 0.6)',
  border: '1px solid var(--border-glass-light)',
  padding: '1.5rem',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column'
};