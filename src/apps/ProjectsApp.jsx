import { useState, useEffect } from 'react';
import { Folder, FileCode, Search, ChevronRight, ExternalLink } from 'lucide-react';
import { useGitHubData } from '../hooks/useGitHubData';

export default function ProjectsApp() {
  const { repos, isLoading, error } = useGitHubData('nandinigoyaldev');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'var(--text-primary)' }}>
      {/* Explorer Top Bar */}
      <div style={{
        padding: '0.5rem 1rem',
        borderBottom: '1px solid var(--border-glass-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(24, 24, 27, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Folder size={16} color="var(--accent-blue)" />
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>GitHub Projects (Live Data)</span>
        </div>
      </div>

      {/* Explorer Content */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            Loading live GitHub repositories...
          </div>
        ) : error ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--accent-cyan)' }}>
            Error loading repositories.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', alignContent: 'start' }}>
            {repos.map((repo, i) => (
              <div 
                key={i}
                onClick={() => window.open(repo.html_url, '_blank')}
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-glass-light)',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileCode size={24} color="var(--accent-cyan)" />
                  <span style={{ fontSize: '1rem', fontWeight: 600, wordBreak: 'break-word', color: 'white' }}>{repo.name}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {repo.description || "No description provided."}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }}></span>
                    {repo.language || "Mixed"}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ★ {repo.stargazers_count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}