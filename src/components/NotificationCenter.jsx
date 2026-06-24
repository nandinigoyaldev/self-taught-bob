import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Mail, UserPlus, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function NotificationCenter({ isOpen, onClose }) {
  const notifications = [
    {
      id: 1,
      title: "New Star on GitHub",
      message: "someone starred your self-taught-bob repository!",
      icon: <FaGithub size={20} color="white" />,
      time: "Just now",
      color: "#333"
    },
    {
      id: 2,
      title: "Profile View",
      message: "A recruiter from New York viewed your LinkedIn profile.",
      icon: <UserPlus size={20} color="white" />,
      time: "2h ago",
      color: "#0A66C2"
    },
    {
      id: 3,
      title: "Email Received",
      message: "You have a new inquiry about a freelance project.",
      icon: <Mail size={20} color="white" />,
      time: "5h ago",
      color: "#ef4444"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
              zIndex: 99998
            }}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: 350, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 350, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute', top: '40px', right: '16px', width: '320px', height: 'calc(100vh - 80px)',
              background: 'rgba(24, 24, 27, 0.7)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px', padding: '24px', zIndex: 99999, color: 'white', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Notifications</h2>
              <button 
                onClick={onClose}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
              {notifications.map(notif => (
                <div key={notif.id} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: notif.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {notif.icon}
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{notif.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{notif.time}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>
                      {notif.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
