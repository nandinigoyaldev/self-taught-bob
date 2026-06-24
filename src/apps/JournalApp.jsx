export default function JournalApp() {
  const entries = [
    { date: '2026-06-24', title: 'Building NandiniOS', content: 'Started the migration to a full OS web experience today. Used Vite, React, and Vanilla CSS for glassmorphism.', type: 'lesson' },
    { date: '2026-06-20', title: 'React Performance', content: 'Struggled with unnecessary re-renders. Learned about useMemo and useCallback to optimize my components.', type: 'mistake' },
    { date: '2026-06-15', title: 'First PR Merged!', content: 'Successfully contributed to an open-source library. Felt amazing to give back.', type: 'achievement' }
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'lesson': return '#3b82f6';
      case 'mistake': return '#ef4444';
      case 'achievement': return '#10b981';
      default: return '#71717a';
    }
  };

  return (
    <div style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <h2 style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>Build-in-Public Journal</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {entries.map((entry, i) => (
          <div key={i} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: getTypeColor(entry.type),
              boxShadow: `0 0 10px ${getTypeColor(entry.type)}`,
              marginTop: '0.3rem',
              zIndex: 1
            }} />
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '16px',
              bottom: '-2rem',
              width: '2px',
              background: 'var(--border-glass-light)',
              zIndex: 0
            }} />
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-glass-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{entry.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{entry.date}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {entry.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}