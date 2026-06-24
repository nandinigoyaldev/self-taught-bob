import { BarChart, Activity, Cpu, HardDrive } from 'lucide-react';

export default function StatsApp() {
  return (
    <div style={{ padding: '1.5rem', height: '100%', color: 'white', background: 'rgba(24, 24, 27, 0.9)' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#8b5cf6' }}>
        <BarChart size={28} />
        System Stats
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Activity size={32} color="#10b981" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>99.9%</span>
          <span style={{ color: 'gray', fontSize: '0.9rem' }}>Uptime</span>
        </div>
        <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Cpu size={32} color="#3b82f6" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>42%</span>
          <span style={{ color: 'gray', fontSize: '0.9rem' }}>CPU Load</span>
        </div>
      </div>

      <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <HardDrive size={20} color="var(--text-secondary)" />
          <span style={{ fontWeight: '500' }}>Storage Capacity</span>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'gray', fontSize: '0.8rem' }}>
          <span>162 GB Used</span>
          <span>256 GB Total</span>
        </div>
      </div>
    </div>
  );
}