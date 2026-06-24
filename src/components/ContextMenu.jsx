import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, Settings, RefreshCw, Info, Code } from 'lucide-react';

export default function ContextMenu({ x, y, isVisible, onClose, onAction }) {
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isVisible) {
      document.addEventListener('click', handleClickOutside);
      // Also close on escape
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isVisible, onClose]);

  // Prevent menu from going off screen
  const getStyle = () => {
    const style = {
      position: 'absolute',
      top: y,
      left: x,
      zIndex: 9999,
    };
    
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      if (x + rect.width > window.innerWidth) {
        style.left = window.innerWidth - rect.width - 10;
      }
      if (y + rect.height > window.innerHeight) {
        style.top = window.innerHeight - rect.height - 10;
      }
    }
    
    return style;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1 }}
          style={getStyle()}
          className="context-menu glass-panel"
        >
          <div className="context-menu-inner">
            <button className="context-menu-item" onClick={() => onAction('new_folder')}>
              <FolderPlus size={16} /> New Folder
            </button>
            <div className="context-menu-divider" />
            <button className="context-menu-item" onClick={() => onAction('settings')}>
              <Settings size={16} /> Change Wallpaper
            </button>
            <button className="context-menu-item" onClick={() => { window.location.reload(); }}>
              <RefreshCw size={16} /> Reload OS
            </button>
            <div className="context-menu-divider" />
            <button className="context-menu-item" onClick={() => window.open('https://github.com/nandinigoyaldev', '_blank')}>
              <Code size={16} /> View Source Code
            </button>
            <button className="context-menu-item" onClick={() => onAction('about')}>
              <Info size={16} /> About BobOS
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
