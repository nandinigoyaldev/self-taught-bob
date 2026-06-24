import { Trophy, Star, Zap, Award } from 'lucide-react';

const achievements = [
  { id: 1, title: 'First Deploy', icon: Zap, color: '#eab308', desc: 'Deployed your first application to the web.' },
  { id: 2, title: 'Bug Squasher', icon: Award, color: '#ef4444', desc: 'Resolved 100 bugs in production.' },
  { id: 3, title: 'Star Gazer', icon: Star, color: '#3b82f6', desc: 'Earned 50 stars on a GitHub repository.' }
];

export default function AchievementsApp() {
  return (
    <div style={{ padding: '1.5rem', height: '100%', color: 'white', background: 'rgba(24, 24, 27, 0.9)', overflowY: 'auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#eab308' }}>
        <Trophy size={28} />
        Achievements
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        {achievements.map(ach => {
          const Icon = ach.icon;
          return (
            <div key={ach.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <div style={{ padding: '1rem', background: `rgba(255,255,255,0.1)`, borderRadius: '50%' }}>
                <Icon size={32} color={ach.color} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{ach.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ach.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}