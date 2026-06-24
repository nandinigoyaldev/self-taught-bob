import { useState } from 'react';
import { Folder, FileCode, Search, ChevronRight } from 'lucide-react';

const FILE_SYSTEM = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'Projects',
      type: 'folder',
      children: [
        { name: 'nandini-os.exe', type: 'file', desc: 'The operating system you are currently using.' },
        { name: 'algo-visualizer.js', type: 'file', desc: 'Sorting algorithms visualized in React.' },
      ]
    },
    {
      name: 'Experiments',
      type: 'folder',
      children: [
        { name: 'webgl-shaders.glsl', type: 'file', desc: 'Custom shaders written in WebGL.' },
        { name: 'rust-cli.rs', type: 'file', desc: 'A fast CLI tool for parsing logs.' },
      ]
    },
    {
      name: 'Open Source',
      type: 'folder',
      children: [
        { name: 'react-contributions.md', type: 'file', desc: 'Merged PRs to the React core repository.' }
      ]
    },
    {
      name: 'Future Ideas',
      type: 'folder',
      children: [
        { name: 'ai-companion.py', type: 'file', desc: 'A local LLM wrapper for terminal productivity.' }
      ]
    }
  ]
};

export default function ProjectsApp() {
  const [currentPath, setCurrentPath] = useState([FILE_SYSTEM]);
  const currentFolder = currentPath[currentPath.length - 1];

  const navigateTo = (folder) => {
    setCurrentPath([...currentPath, folder]);
  };

  const navigateUp = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

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
        {currentPath.map((folder, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {index > 0 && <ChevronRight size={14} color="var(--text-secondary)" />}
            <span 
              onClick={() => navigateUp(index)}
              style={{ cursor: 'pointer', color: index === currentPath.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            >
              {folder.name === 'root' ? 'NandiniOS' : folder.name}
            </span>
          </div>
        ))}
      </div>

      {/* Explorer Content */}
      <div style={{ flex: 1, padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem', alignContent: 'start' }}>
        {currentFolder.children?.map((item, i) => (
          <div 
            key={i}
            onClick={() => item.type === 'folder' ? navigateTo(item) : alert(`Opening ${item.name}...`)}
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {item.type === 'folder' ? (
              <Folder size={48} color="var(--accent-blue)" />
            ) : (
              <FileCode size={48} color="var(--text-secondary)" />
            )}
            <span style={{ fontSize: '0.85rem', textAlign: 'center', wordBreak: 'break-word' }}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}