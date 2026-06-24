export default function MissionApp() {
  const quests = [
    { title: 'React Mastery', progress: 85, color: '#06b6d4' },
    { title: 'Internship Search', progress: 40, color: '#8b5cf6' },
    { title: 'Open Source Contributions', progress: 60, color: '#10b981' },
    { title: 'System Design', progress: 25, color: '#f59e0b' }
  ];

  return (
    <div style={{ padding: '2rem', color: 'white', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Main Quest</h2>
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid var(--accent-blue)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
        }}>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>Become a Software Engineer</h1>
          <div style={{ background: 'rgba(255,255,255,0.1)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', boxShadow: '0 0 10px var(--accent-cyan)' }} />
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Overall Progress: Level 7</p>
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Side Quests</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {quests.map((q, i) => (
            <div key={i} style={{
              background: 'rgba(24, 24, 27, 0.6)',
              border: '1px solid var(--border-glass-light)',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{q.title}</h3>
                <span style={{ color: q.color }}>{q.progress}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${q.progress}%`, height: '100%', background: q.color, boxShadow: `0 0 10px ${q.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}