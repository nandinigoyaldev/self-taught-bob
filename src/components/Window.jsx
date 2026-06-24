import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [snapPreview, setSnapPreview] = useState(null);
  
  const windowRef = useRef(null);

  // Resize Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing && !isMaximized) {
        setSize(prev => ({
          w: Math.max(300, prev.w + e.movementX),
          h: Math.max(200, prev.h + e.movementY)
        }));
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, isMaximized]);

  // Framer Motion Drag Handlers for Aero Snap
  const handleDrag = (event, info) => {
    const { x, y } = info.point;
    const { innerWidth, innerHeight } = window;
    
    if (x < 20) {
      setSnapPreview('left');
    } else if (x > innerWidth - 20) {
      setSnapPreview('right');
    } else if (y < 40) { // Top bar is 32px
      setSnapPreview('maximize');
    } else {
      setSnapPreview(null);
    }
  };

  const handleDragEnd = (event, info) => {
    if (snapPreview) {
      if (snapPreview === 'maximize') {
        setIsMaximized(true);
      } else if (snapPreview === 'left') {
        setPos({ x: 0, y: 32 });
        setSize({ w: window.innerWidth / 2, h: window.innerHeight - 32 });
      } else if (snapPreview === 'right') {
        setPos({ x: window.innerWidth / 2, y: 32 });
        setSize({ w: window.innerWidth / 2, h: window.innerHeight - 32 });
      }
      setSnapPreview(null);
    } else {
      // Update pos manually since we use controlled drag or let framer handle it.
      // We will let framer-motion handle the transform for dragging, but save the position.
      // To keep it simple, we use framer motion's drag on the container but we manage layout state.
    }
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      // Save current size/pos before maximizing
      windowRef.current.dataset.prevW = size.w;
      windowRef.current.dataset.prevH = size.h;
      windowRef.current.dataset.prevX = pos.x;
      windowRef.current.dataset.prevY = pos.y;
      
      setPos({ x: 0, y: 32 });
      setSize({ w: window.innerWidth, h: window.innerHeight - 32 });
      setIsMaximized(true);
    } else {
      // Restore
      setSize({ 
        w: parseInt(windowRef.current.dataset.prevW) || defaultWidth, 
        h: parseInt(windowRef.current.dataset.prevH) || defaultHeight 
      });
      setPos({ 
        x: parseInt(windowRef.current.dataset.prevX) || window.innerWidth/2, 
        y: parseInt(windowRef.current.dataset.prevY) || window.innerHeight/2 
      });
      setIsMaximized(false);
    }
  };

  return (
    <>
      {/* Aero Snap Preview Overlay */}
      <AnimatePresence>
        {snapPreview && !isMaximized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '12px',
              zIndex: zIndex - 1,
              left: snapPreview === 'right' ? '50%' : 0,
              top: 32,
              width: snapPreview === 'maximize' ? '100%' : '50%',
              height: 'calc(100vh - 32px)',
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        ref={windowRef}
        className={`os-window ${isMinimized ? 'minimized' : ''} ${zIndex > 10 ? 'active-window' : 'inactive-window'}`}
        drag={!isMaximized}
        dragMomentum={false}
        dragElastic={0.05}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onMouseDownCapture={onFocus}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={isMinimized ? { opacity: 0, scale: 0.8, y: 100 } : { 
          opacity: 1, 
          scale: 1, 
          x: pos.x, 
          y: pos.y, 
          width: size.w, 
          height: size.h,
          borderRadius: isMaximized ? '0px' : '14px'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          opacity: { duration: 0.2 }
        }}
        style={{
          zIndex: zIndex,
          position: 'absolute',
        }}
      >
        {/* Dynamic Light Beam top border */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-50 pointer-events-none" />
        
        <div 
          className="window-header"
          onDoubleClick={toggleMaximize}
        >
          <div className="window-controls">
            <div className="window-control control-close" onClick={(e) => { e.stopPropagation(); onClose(); }} />
            <div className="window-control control-minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }} />
            <div className="window-control control-maximize" onClick={(e) => { e.stopPropagation(); toggleMaximize(); }} />
          </div>
          <div className="window-title">{title}</div>
          <div style={{ width: '44px' }}></div> {/* Spacer for balance */}
        </div>
        
        <div className="window-content" onPointerDownCapture={(e) => e.stopPropagation()}>
          {children}
        </div>
        
        {!isMaximized && (
          <div 
            className="window-resize-handle"
            onPointerDown={(e) => {
              e.stopPropagation(); // Prevent drag from starting
              setIsResizing(true);
            }}
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
      </motion.div>
    </>
  );
}
