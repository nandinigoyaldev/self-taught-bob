import { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, Wifi, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActivityMonitorApp() {
  const [dataPoints, setDataPoints] = useState(Array(30).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newArr = [...prev.slice(1), 20 + Math.random() * 60];
        return newArr;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPath = () => {
    const max = 100;
    const dx = 400 / 29;
    const pts = dataPoints.map((val, i) => `${i * dx},${100 - (val / max) * 100}`).join(' L ');
    return `M 0,100 L ${pts} L 400,100 Z`;
  };

  const apps = [
    { name: 'Finder', cpu: '0.1%', mem: '45 MB', pid: '204' },
    { name: 'Vite Server', cpu: '12.4%', mem: '142 MB', pid: '391' },
    { name: 'BobOS Kernel', cpu: '2.0%', mem: '84 MB', pid: '0' },
    { name: 'WindowServer', cpu: '5.6%', mem: '210 MB', pid: '112' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#1c1c1e', color: 'white' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}><Cpu size={14} /> CPU</button>
        <button style={{ background: 'transparent', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}><HardDrive size={14} /> Memory</button>
        <button style={{ background: 'transparent', border: 'none', padding: '6px 12px', borderRadius: '6px', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px' }}><Wifi size={14} /> Network</button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Table */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
              <tr>
                <th style={{ padding: '8px 16px', fontWeight: 500 }}>Process Name</th>
                <th style={{ padding: '8px 16px', fontWeight: 500 }}>% CPU</th>
                <th style={{ padding: '8px 16px', fontWeight: 500 }}>Memory</th>
                <th style={{ padding: '8px 16px', fontWeight: 500 }}>PID</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={14} color="#3b82f6" /> {app.name}
                  </td>
                  <td style={{ padding: '8px 16px' }}>{app.cpu}</td>
                  <td style={{ padding: '8px 16px' }}>{app.mem}</td>
                  <td style={{ padding: '8px 16px', color: 'rgba(255,255,255,0.5)' }}>{app.pid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Graph Bottom Section */}
        <div style={{ height: '150px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', padding: '16px' }}>
          <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>CPU Load</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{Math.round(dataPoints[dataPoints.length - 1])}%</div>
            <div style={{ fontSize: '0.8rem', color: '#3b82f6' }}>System: 12%</div>
            <div style={{ fontSize: '0.8rem', color: '#22c55e' }}>User: {Math.round(dataPoints[dataPoints.length - 1] - 12)}%</div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Idle: {100 - Math.round(dataPoints[dataPoints.length - 1])}%</div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="25" x2="400" y2="25" stroke="rgba(255,255,255,0.1)" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.1)" />
              <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(255,255,255,0.1)" />
              <path d={getPath()} fill="url(#cpuGrad)" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
