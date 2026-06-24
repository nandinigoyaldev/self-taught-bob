import { useState, useEffect } from 'react';

const bootLogs = [
  "Booting BobOS...",
  "Loading core kernel modules...",
  "Mounting /projects filesystem...",
  "Loading learning logs...",
  "Initializing glassmorphism engine...",
  "Loading achievements...",
  "Loading memories...",
  "System Ready."
];

export default function BootSequence() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let delay = 0;
    bootLogs.forEach((log, index) => {
      delay += 300 + Math.random() * 200; // Random delay between logs
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, delay);
    });
  }, []);

  return (
    <div className="boot-screen">
      <div className="boot-logo">BobOS</div>
      <div className="boot-logs">
        {logs.map((log, i) => (
          <div key={i} className="boot-log">{log}</div>
        ))}
      </div>
    </div>
  );
}
