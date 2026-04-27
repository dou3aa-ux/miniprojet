import { useState, useEffect } from 'react';
import api from '../services/api';

const WeeklyCalendar = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Days of the week
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Time slots for the day
  const timeSlots = [
    '08:00-09:00',
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00',
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const data = await api.getSchedules();
        setSchedules(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch schedules:', err);
        setError(err.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // Color mapping for subjects
  const getColorClass = (subject) => {
    const colors = {
      'Algorithms': 'purple',
      'Databases': 'blue',
      'Web Development': 'teal',
      'Networks': 'coral',
      'Operating Systems': 'amber',
    };
    
    // Try to match partial subject name
    for (const [key, color] of Object.entries(colors)) {
      if (subject.toLowerCase().includes(key.toLowerCase())) {
        return color;
      }
    }
    
    // Default colors based on hash
    const colorOptions = ['purple', 'blue', 'teal', 'coral', 'amber'];
    const hash = subject.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorOptions[hash % colorOptions.length];
  };

  // Get schedule for a specific day and time
  const getScheduleForSlot = (day, timeSlot) => {
    return schedules.find(s => s.day === day && s.time === timeSlot);
  };

  // Get current day and time highlight
  const getCurrentDayIndex = () => {
    const today = new Date().getDay();
    // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    return today === 0 ? 6 : today - 1;
  };

  const getCurrentHour = () => {
    return new Date().getHours();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <svg className="spinner" viewBox="0 0 50 50" style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite' }}>
          <circle cx="25" cy="25" r="20" stroke="#534AB7" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626' }}>
        <p>{error}</p>
      </div>
    );
  }

  const currentDayIndex = getCurrentDayIndex();
  const currentHour = getCurrentHour();

  return (
    <>
      <div className="greeting">
        <h1>Weekly Calendar</h1>
        <p>Your schedule for the week</p>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', gap: '4px', minWidth: '800px' }}>
          {/* Header Row */}
          <div style={{ padding: '12px 8px', fontWeight: '600', fontSize: '12px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
            Time
          </div>
          {dayLabels.map((day, index) => (
            <div 
              key={day}
              style={{ 
                padding: '12px 8px', 
                fontWeight: '600', 
                fontSize: '13px',
                textAlign: 'center',
                color: index === currentDayIndex ? '#534AB7' : 'var(--color-text-primary)',
                background: index === currentDayIndex ? '#EEEDFE' : 'transparent',
                borderRadius: '8px',
              }}
            >
              {day}
            </div>
          ))}

          {/* Time Slots */}
          {timeSlots.map((timeSlot) => (
            timeSlots.map((_, slotIndex) => null) // We'll render all slots below
          ))}
          
          {timeSlots.map((timeSlot, slotIndex) => {
            const hour = parseInt(timeSlot.split('-')[0]);
            const isCurrentTime = currentDayIndex >= 0 && currentDayIndex <= 6 && 
                                  hour >= currentHour && hour < currentHour + 1;

            return (
              <>
                {/* Time Label */}
                <div 
                  key={`time-${timeSlot}`}
                  style={{ 
                    padding: '8px', 
                    fontSize: '12px', 
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                    background: isCurrentTime ? '#FEF9C3' : 'transparent',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {timeSlot.split('-')[0]}
                </div>

                {/* Day Slots */}
                {days.map((day, dayIndex) => {
                  const schedule = getScheduleForSlot(day, timeSlot);
                  const isCurrentSlot = dayIndex === currentDayIndex && isCurrentTime;

                  if (schedule) {
                    const color = getColorClass(schedule.subject);
                    return (
                      <div
                        key={`${day}-${timeSlot}`}
                        style={{
                          padding: '8px',
                          background: isCurrentSlot ? '#FEF9C3' : `var(--color-background-${color === 'purple' ? 'secondary' : 'tertiary'})`,
                          borderRadius: '8px',
                          border: isCurrentSlot ? '2px solid #534AB7' : '1px solid transparent',
                          minHeight: '60px',
                        }}
                      >
                        <div style={{ 
                          background: `var(--color-background-${color === 'purple' ? 'primary' : 'secondary'})`,
                          padding: '8px',
                          borderRadius: '6px',
                          borderLeft: `3px solid var(--fill-${color})`,
                        }}>
                          <div style={{ fontSize: '12px', fontWeight: '600', color: `var(--text-${color})`, marginBottom: '2px' }}>
                            {schedule.subject}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                            {schedule.room}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={`${day}-${timeSlot}`}
                      style={{
                        padding: '8px',
                        background: isCurrentSlot ? '#FEF9C3' : 'transparent',
                        borderRadius: '8px',
                        border: isCurrentSlot ? '2px dashed #534AB7' : '1px dashed var(--color-border-tertiary)',
                        minHeight: '60px',
                      }}
                    />
                  );
                })}
              </>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: '12px', height: '12px', background: '#EEEDFE', borderRadius: '4px', border: '2px solid #534AB7' }}></div>
          Current time
        </div>
        {['purple', 'blue', 'teal', 'coral', 'amber'].map(color => (
          <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            <div style={{ width: '12px', height: '12px', background: `var(--color-background-${color === 'purple' ? 'secondary' : 'tertiary'})`, borderRadius: '4px', borderLeft: `3px solid var(--fill-${color})` }}></div>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </div>
        ))}
      </div>
    </>
  );
};

export default WeeklyCalendar;