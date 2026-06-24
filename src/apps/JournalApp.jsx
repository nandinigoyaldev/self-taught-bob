import { useState } from 'react';
import { Book, Plus, Calendar } from 'lucide-react';

const initialEntries = [
  { id: 1, date: 'Oct 15, 2026', content: 'Started working on NandiniOS. The glassmorphism UI looks amazing.' },
  { id: 2, date: 'Oct 12, 2026', content: 'Learned about WebRTC and implemented the Camera app. Browsers are incredibly powerful.' }
];

export default function JournalApp() {
  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (newEntry.trim()) {
      setEntries([{
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        content: newEntry
      }, ...entries]);
      setNewEntry('');
    }
  };

  return (
    <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', color: 'white', background: 'rgba(24, 24, 27, 0.9)' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#10b981' }}>
        <Book size={28} />
        Dev Journal
      </h2>

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addEntry()}
          placeholder="What did you learn today?"
          style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.5)', color: 'white', outline: 'none' }}
        />
        <button onClick={addEntry} style={{ padding: '0.8rem 1.2rem', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {entries.map(entry => (
          <div key={entry.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'gray', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <Calendar size={14} /> {entry.date}
            </div>
            <p style={{ lineHeight: '1.5' }}>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}