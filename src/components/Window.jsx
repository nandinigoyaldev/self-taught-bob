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
  const [size, setSize] = useState({ w: defaultWidth, h: defaultHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        setPos(prev => ({
          x: prev.x + e.movementX,
          y: prev.y + e.movementY
        }));
      } else if (isResizing && !isMaximized) {
        setSize(prev => ({
          w: Math.max(300, prev.w + e.movementX), // Min width 300
          h: Math.max(200, prev.h + e.movementY)  // Min height 200
        }));
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, isMaximized]);

  return (
    <div 
      className={`os-window glass-panel ${isMinimized ? 'minimized' : ''}`}
      style={{
        left: isMaximized ? 0 : pos.x,
        top: isMaximized ? 32 : pos.y, // 32px is TopBar height
        width: isMaximized ? '100vw' : size.w,
        height: isMaximized ? 'calc(100vh - 32px)' : size.h,
        zIndex: zIndex,
        position: 'absolute',
        borderRadius: isMaximized ? '0' : '12px',
        transition: (isDragging || isResizing) ? 'none' : 'transform 0.2s ease, opacity 0.2s ease, width 0.3s ease, height 0.3s ease, left 0.3s ease, top 0.3s ease, border-radius 0.3s ease'
      }}
      onMouseDownCapture={onFocus}
    >
      <div 
        className="window-header"
        onMouseDown={() => !isMaximized && setIsDragging(true)}
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        <div className="window-controls">
          <div className="window-control control-close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
          <div className="window-control control-minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }} />
          <div className="window-control control-maximize" onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} />
        </div>
        <div className="window-title">{title}</div>
        <div style={{ width: '44px' }}></div> {/* Spacer for balance */}
      </div>
      <div className="window-content">
        {children}
      </div>
      {!isMaximized && (
        <div 
          className="window-resize-handle"
          onMouseDown={() => setIsResizing(true)}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '15px',
            height: '15px',
            cursor: 'nwse-resize',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
}
