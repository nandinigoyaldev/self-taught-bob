import { useState, useRef, useEffect } from 'react';

const SYSTEM_COMMANDS = {
  help: 'Available commands: help, projects, videos, mission, stats, journal, contact, clear, whoami',
  whoami: 'visitor@nandini-os ~ $ self-taught-developer',
  contact: 'Twitter: @nandinigoyaldev | GitHub: github.com/nandinigoyaldev | LinkedIn: linkedin.com/in/nandinigoyaldev | YouTube: youtube.com/@nandinigoyaldev',
  projects: 'Opening Projects explorer...',
  videos: 'Opening Videos dashboard...',
  mission: 'Displaying Mission logs...',
  stats: 'Loading Stats...',
  journal: 'Opening Journal...'
};

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Welcome to NandiniOS Terminal v1.0.0' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      const newHistory = [...history, { type: 'user', text: `nandini@os:~$ ${cmd}` }];
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (SYSTEM_COMMANDS[cmd]) {
        newHistory.push({ type: 'system', text: SYSTEM_COMMANDS[cmd] });
        setHistory(newHistory);
        // Note: In a full implementation, you could dispatch an event here to open other apps from the Terminal!
      } else if (cmd !== '') {
        newHistory.push({ type: 'system', text: `Command not found: ${cmd}` });
        setHistory(newHistory);
      }
      
      setInput('');
    }
  };

  return (
    <div style={{
      height: '100%',
      backgroundColor: '#000',
      color: '#0f0',
      fontFamily: '"Fira Code", monospace',
      padding: '1rem',
      overflowY: 'auto',
      fontSize: '0.9rem'
    }}>
      {history.map((line, i) => (
        <div key={i} style={{ marginBottom: '0.5rem', opacity: line.type === 'system' ? 0.8 : 1 }}>
          {line.text}
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '0.5rem' }}>nandini@os:~$</span>
        <input 
          autoFocus
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#0f0',
            fontFamily: '"Fira Code", monospace',
            fontSize: '0.9rem',
            outline: 'none',
            flex: 1
          }}
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}