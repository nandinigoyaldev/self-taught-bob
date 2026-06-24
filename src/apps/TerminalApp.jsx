import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MOCK_FILE_SYSTEM = {
  '~': ['projects', 'documents', 'about.txt', 'socials.txt'],
  '~/projects': ['bob-os.js', 'portfolio.html', 'self-taught-api.go'],
  '~/documents': ['resume.pdf', 'ideas.txt'],
};

const FILE_CONTENTS = {
  'about.txt': 'Hi! I am Nandini Goyal, a passionate developer building extraordinary things.',
  'socials.txt': 'Twitter: @nandinigoyaldev\nYouTube: youtube.com/@nandinigoyaldev\nLinkedIn: linkedin.com/in/nandinigoyaldev\nGitHub: github.com/nandinigoyaldev',
  'ideas.txt': '1. Build BobOS in browser\n2. Make it extra ordinary\n3. Merge all socials\n4. Profit?',
  'bob-os.js': 'console.log("You are looking at it!");',
};

const BOOT_SEQUENCE = [
  "Initializing BobOS kernel...",
  "Loading file system... OK",
  "Mounting virtual drives... OK",
  "Starting display server... OK",
  "Welcome to BobOS Terminal v2.0.0",
  "Type 'help' to see available commands."
];

export default function TerminalApp() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [isBooting, setIsBooting] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Boot sequence
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setHistory(prev => [...prev, { type: 'system', text: BOOT_SEQUENCE[currentLine], color: '#a1a1aa' }]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsBooting(false);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && !isBooting) {
      const cmdStr = input.trim();
      const args = cmdStr.split(' ');
      const cmd = args[0].toLowerCase();
      
      const newHistory = [...history, { type: 'user', text: `bob@os:${cwd}$ ${cmdStr}` }];
      
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
      
      let response = null;
      let color = '#a1a1aa';

      switch (cmd) {
        case 'help':
          response = 'Available commands: help, clear, whoami, ls, cd, cat, echo, date';
          color = '#06b6d4';
          break;
        case 'whoami':
          response = 'visitor@bob-os ~ $ self-taught-bob';
          color = '#eab308';
          break;
        case 'date':
          response = new Date().toString();
          color = '#22c55e';
          break;
        case 'echo':
          response = args.slice(1).join(' ');
          color = '#f4f4f5';
          break;
        case 'ls':
          response = MOCK_FILE_SYSTEM[cwd] ? MOCK_FILE_SYSTEM[cwd].join('  ') : '';
          color = '#3b82f6';
          break;
        case 'cd':
          const target = args[1];
          if (!target || target === '~') {
            setCwd('~');
          } else if (target === '..') {
            setCwd('~');
          } else {
            const potentialPath = cwd === '~' ? `~/${target}` : `${cwd}/${target}`;
            if (MOCK_FILE_SYSTEM[potentialPath]) {
              setCwd(potentialPath);
            } else {
              response = `cd: no such file or directory: ${target}`;
              color = '#ef4444';
            }
          }
          break;
        case 'cat':
          const file = args[1];
          if (!file) {
            response = 'cat: missing file operand';
            color = '#ef4444';
          } else if (FILE_CONTENTS[file]) {
            response = FILE_CONTENTS[file];
            color = '#f4f4f5';
          } else {
            response = `cat: ${file}: No such file or directory`;
            color = '#ef4444';
          }
          break;
        case '':
          break;
        default:
          response = `Command not found: ${cmd}`;
          color = '#ef4444';
      }
      
      if (response) {
        // Split by newline if it's a multiline response
        const lines = response.split('\n');
        lines.forEach(line => newHistory.push({ type: 'system', text: line, color }));
      }
      
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div 
      style={{
        height: '100%',
        backgroundColor: '#09090b',
        fontFamily: '"Fira Code", monospace',
        padding: '1rem',
        overflowY: 'auto',
        fontSize: '0.9rem',
        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)'
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          key={i} 
          style={{ 
            marginBottom: '0.2rem', 
            color: line.type === 'user' ? '#22c55e' : line.color,
            textShadow: '0 0 2px rgba(255,255,255,0.2)'
          }}
        >
          {line.text}
        </motion.div>
      ))}
      {!isBooting && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <span style={{ marginRight: '0.5rem', color: '#22c55e', textShadow: '0 0 2px rgba(34,197,94,0.5)' }}>bob@os:{cwd}$</span>
          <input 
            ref={inputRef}
            autoFocus
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            spellCheck="false"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#f4f4f5',
              fontFamily: '"Fira Code", monospace',
              fontSize: '0.9rem',
              outline: 'none',
              flex: 1,
              textShadow: '0 0 2px rgba(255,255,255,0.2)'
            }}
          />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}