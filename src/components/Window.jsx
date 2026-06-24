import { useState, useRef, useEffect } from 'react';

export default function Window({ 
  id, 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onFocus, 
  zIndex, 
  isMinimized,
  defaultWidth = 600,
  defaultHeight = 400
}) {
  const [pos, setPos] = useState({ x: window.innerWidth / 2 - defaultWidth / 2 + (zIndex * 20), y: window.innerHeight / 2 - defaultHeight / 2 + (zIndex * 20) });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPos(prev => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY
        }));
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className={`os-window glass-panel ${isMinimized ? 'minimized' : ''}`}
      style={{
        left: pos.x,
        top: pos.y,
        width: defaultWidth,
        height: defaultHeight,
        zIndex: zIndex,
        position: 'absolute'
      }}
      onMouseDownCapture={onFocus}
    >
      <div 
        className="window-header"
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="window-controls">
          <div className="window-control control-close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          <div className="window-control control-minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }} />
          <div className="window-control control-maximize" />
        </div>
        <div className="window-title">{title}</div>
        <div style={{ width: '44px' }}></div> {/* Spacer for balance */}
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}
