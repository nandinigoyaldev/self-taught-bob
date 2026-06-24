export default function AboutApp() {
  return (
    <div style={{
      padding: '2rem',
      color: 'var(--text-primary)',
      height: '100%',
      overflowY: 'auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))',
          boxShadow: 'var(--shadow-glow)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'white'
        }}>
          N
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Nandini</h1>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-cyan)', fontWeight: '400' }}>
            Self-Taught Software Engineer
          </h2>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            Building the future, one line of code at a time.
          </p>
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-glass-light)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>The Journey</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          My journey started with a simple dream: to become a Software Engineer without the traditional path. 
          Through thousands of hours of coding, debugging, and building in public, I've transformed myself 
          into a capable developer. NandiniOS is a living testament to that journey—a digital brain 
          documenting my failures, achievements, and continuous learning process.
        </p>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-glass-light)',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Connect</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="https://twitter.com/nandinigoyaldev" target="_blank" rel="noreferrer" style={socialStyle}>Twitter</a>
          <a href="https://github.com/nandinigoyaldev" target="_blank" rel="noreferrer" style={socialStyle}>GitHub</a>
          <a href="https://linkedin.com/in/nandinigoyaldev" target="_blank" rel="noreferrer" style={socialStyle}>LinkedIn</a>
          <a href="https://youtube.com/@nandinigoyaldev" target="_blank" rel="noreferrer" style={socialStyle}>YouTube</a>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Core Modules (Skills)</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {['JavaScript (ES6+)', 'React & Next.js', 'Node.js', 'Python', 'Flask', 'OpenCV', 'Tailwind CSS'].map(skill => (
            <span key={skill} style={{
              padding: '0.5rem 1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid var(--accent-blue)',
              borderRadius: '20px',
              fontSize: '0.9rem',
              color: 'var(--accent-blue)'
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-glass-light)',
      }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Experience & Roles</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--accent-cyan)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-cyan)' }}>Founder @ CDN IGNOU</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Community Building</p>
          </div>
          
          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--accent-purple)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-purple)' }}>Creator @ Self Taught Bob</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mentoring & Content</p>
          </div>

          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--accent-blue)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent-blue)' }}>Top 25 @ Apertre (SSOC / GSSOC)</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Open Source Contributions</p>
          </div>

          <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--text-muted)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>GeeksforGeeks & Work2Hire</h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Software Development</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const socialStyle = {
  color: 'var(--accent-blue)',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  background: 'rgba(59, 130, 246, 0.1)',
  borderRadius: '20px',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  transition: 'all 0.2s',
};