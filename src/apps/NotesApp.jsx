import { useState, useEffect } from 'react';
import { FileText, Save } from 'lucide-react';

export default function NotesApp() {
  const [note, setNote] = useState(() => localStorage.getItem('nandini-notes') || '');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('nandini-notes', note);
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [note]);

  return (
    <div style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(24, 24, 27, 0.9)', color: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={20} color="var(--accent-purple)" />
          <span style={{ fontWeight: 'bold' }}>Notes</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'gray', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {saveStatus && <Save size={14} />}
          {saveStatus}
        </div>
      </div>
      
      <textarea 
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your notes here... They will be saved automatically."
        style={{
          flex: 1,
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: 'white',
          resize: 'none',
          outline: 'none',
          fontFamily: 'monospace',
          fontSize: '1rem',
          lineHeight: '1.5'
        }}
      />
    </div>
  );
}
