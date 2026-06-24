import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function CalendarApp() {
  const [currentDate] = useState(new Date());
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const events = [
    { day: 14, title: "Interview Prep", color: "#3b82f6" },
    { day: 18, title: "Deploy BobOS v5", color: "#ef4444" },
    { day: 24, title: "Meeting with Google Recruiter", color: "#22c55e" },
    { day: 28, title: "Hackathon Finals", color: "#c084fc" }
  ];

  const renderCalendar = () => {
    let days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} style={{ height: '80px' }} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = i === currentDate.getDate();
      const dayEvents = events.filter(e => e.day === i);

      days.push(
        <div key={i} style={{ 
          height: '80px', padding: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', flexDirection: 'column', gap: '4px'
        }}>
          <div style={{ 
            width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isToday ? '#ef4444' : 'transparent', color: isToday ? 'white' : 'rgba(255,255,255,0.8)',
            fontWeight: isToday ? 600 : 400, fontSize: '0.9rem'
          }}>
            {i}
          </div>
          {dayEvents.map((evt, idx) => (
            <div key={idx} style={{ 
              background: evt.color, color: 'white', fontSize: '0.7rem', padding: '2px 6px', 
              borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' 
            }}>
              {evt.title}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ display: 'flex', height: '100%', background: 'rgba(24, 24, 27, 0.95)', color: 'white' }}>
      
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 600, margin: '0 0 8px 0' }}>{currentDate.getDate()}</h2>
        <div style={{ fontSize: '1.2rem', color: '#ef4444', fontWeight: 500, marginBottom: '32px' }}>
          {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
        </div>

        <h3 style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
          Upcoming Events
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {events.map((evt, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px' }}>
              <div style={{ width: '4px', borderRadius: '2px', background: evt.color }} />
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{evt.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{monthNames[currentDate.getMonth()]} {evt.day}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Calendar View */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', padding: '4px', color: 'white', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', padding: '4px 12px', color: 'white', fontSize: '0.8rem', cursor: 'pointer' }}>Today</button>
              <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', padding: '4px', color: 'white', cursor: 'pointer' }}><ChevronRight size={16} /></button>
            </div>
          </div>
          <button style={{ background: '#ef4444', border: 'none', borderRadius: '8px', padding: '8px 16px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 500 }}>
            <Plus size={16} /> Add Event
          </button>
        </div>

        {/* Grid Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
              {day}
            </div>
          ))}
        </div>

        {/* Grid Body */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flex: 1, overflowY: 'auto', alignContent: 'start' }}>
          {renderCalendar()}
        </div>

      </div>
    </div>
  );
}
