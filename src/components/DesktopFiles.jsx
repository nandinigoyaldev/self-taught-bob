import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, FolderOpen } from 'lucide-react';

export default function DesktopFiles({ openApp }) {
  const [files, setFiles] = useState([
    { id: 'resume', type: 'file', name: 'Resume.pdf', x: 20, y: 20 },
    { id: 'projects', type: 'folder', name: 'Projects', x: 20, y: 120 },
    { id: 'notes', type: 'folder', name: 'Notes', x: 20, y: 220 }
  ]);

  const handleDoubleClick = (file) => {
    if (file.type === 'folder' && file.id === 'projects') {
      openApp('projects');
    } else if (file.type === 'folder' && file.id === 'notes') {
      openApp('notes');
    } else if (file.id === 'resume') {
      window.open('https://github.com/nandinigoyaldev', '_blank'); // Temporary fallback
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {files.map(file => (
        <motion.div
          key={file.id}
          drag
          dragMomentum={false}
          initial={{ x: file.x, y: file.y }}
          style={{
            position: 'absolute',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '8px', cursor: 'pointer', pointerEvents: 'auto',
            width: '80px'
          }}
          whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
          whileTap={{ scale: 0.95, opacity: 0.8 }}
          onDoubleClick={() => handleDoubleClick(file)}
        >
          {file.type === 'folder' ? (
            <FolderOpen size={48} color="#60a5fa" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} />
          ) : (
            <FileText size={48} color="#f87171" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' }} />
          )}
          <span style={{
            fontSize: '0.8rem', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '4px'
          }}>
            {file.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
