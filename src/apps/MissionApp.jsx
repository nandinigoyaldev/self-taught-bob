import { Target, CheckCircle2, Circle } from 'lucide-react';

const missions = [
  { id: 1, title: 'Learn React Fundamentals', completed: true },
  { id: 2, title: 'Build a Portfolio OS', completed: true },
  { id: 3, title: 'Master Advanced State Management', completed: false },
  { id: 4, title: 'Contribute to Open Source', completed: false },
  { id: 5, title: 'Get First Developer Role', completed: false },
];

export default function MissionApp() {
  return (
    <div style={{ padding: '1.5rem', height: '100%', color: 'white', background: 'rgba(24, 24, 27, 0.9)' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#f59e0b' }}>
        <Target size={28} />
        Mission & Goals
      </h2>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.5' }}>
        My core mission is to continuously learn, build impactful software, and share my journey as a self-taught developer to inspire others.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {missions.map(mission => (
          <div key={mission.id} style={{
            display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px'
          }}>
            {mission.completed ? <CheckCircle2 color="#10b981" /> : <Circle color="gray" />}
            <span style={{ fontSize: '1.1rem', color: mission.completed ? 'var(--text-primary)' : 'var(--text-secondary)', textDecoration: mission.completed ? 'line-through' : 'none' }}>
              {mission.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}