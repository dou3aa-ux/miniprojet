import { useState, useEffect, Fragment } from 'react';
import api from '../services/api';

const MY_CLASS_ID = (() => {
  try {
    return JSON.parse(localStorage.getItem('student') || '{}')?.classId || null;
  } catch { return null; }
})();

const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
];

const toMinutes = (timeStr) => {
  const part = String(timeStr || '').trim().split('-')[0].trim();
  const [h, m] = part.split(':').map(Number);
  if (isNaN(h)) return -1;
  return h * 60 + (m || 0);
};

const parseRange = (timeStr) => {
  const parts = String(timeStr || '').split('-');
  if (parts.length < 2) return null;
  const start = toMinutes(parts[0]);
  const end = toMinutes(parts[1]);
  if (start === -1 || end === -1) return null;
  return { start, end };
};

const slotOverlaps = (slotStart, range) => {
  return slotStart < range.end && (slotStart + 60) > range.start;
};

const isFirstSlot = (schedule, slotTimeStr) => {
  const slotStart = toMinutes(slotTimeStr);
  const range = parseRange(schedule.time);
  if (!range) return false;
  return !slotOverlaps(slotStart - 60, range);
};

const getColor = (subject) => {
  const map = {
    'algorithms': 'purple',
    'databases': 'blue',
    'web development': 'teal',
    'networks': 'coral',
    'operating systems': 'amber',
  };
  const key = subject.toLowerCase();
  for (const [k, v] of Object.entries(map)) {
    if (key.includes(k)) return v;
  }
  const opts = ['purple', 'blue', 'teal', 'coral', 'amber'];
  return opts[subject.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % opts.length];
};

const mockSchedules = [
  { id: '1', day: 'MONDAY',    time: '08:00-10:00', subject: 'Algorithms',     room: 'A-101', classId: MY_CLASS_ID },
  { id: '2', day: 'MONDAY',    time: '10:15-12:15', subject: 'Databases',      room: 'Lab-2', classId: MY_CLASS_ID },
  { id: '3', day: 'MONDAY',    time: '14:00-16:00', subject: 'Web Development', room: 'B-201', classId: MY_CLASS_ID },
  { id: '4', day: 'TUESDAY',   time: '08:00-10:00', subject: 'Networks',       room: 'A-102', classId: MY_CLASS_ID },
  { id: '5', day: 'TUESDAY',   time: '10:15-12:15', subject: 'Operating Systems', room: 'C-301', classId: MY_CLASS_ID },
  { id: '6', day: 'TUESDAY',   time: '14:00-16:00', subject: 'Algorithms',     room: 'A-101', classId: MY_CLASS_ID },
  { id: '7', day: 'WEDNESDAY', time: '08:00-10:00', subject: 'Web Development', room: 'Lab-1', classId: MY_CLASS_ID },
  { id: '8', day: 'WEDNESDAY', time: '10:15-12:15', subject: 'Databases',      room: 'B-105', classId: MY_CLASS_ID },
  { id: '9', day: 'WEDNESDAY', time: '14:00-16:00', subject: 'Networks',       room: 'A-102', classId: MY_CLASS_ID },
];

const WeeklyCalendar = () => {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const data = await api.getSchedules();
        console.log('WeeklyCalendar: API returned', data.length, 'items');
        console.log('WeeklyCalendar: MY_CLASS_ID is', MY_CLASS_ID);
        console.log('WeeklyCalendar: Sample item:', data[0]);

        if (data && data.length > 0) {
          // 1. Normalize
          const normalized = data.map(item => ({
            ...item,
            day: String(item.day || '').toUpperCase().trim(),
            time: String(item.time || '').trim(),
          }));

          // 2. Filter to student's class only
          const filtered = MY_CLASS_ID
            ? normalized.filter(item => {
                const match = item.classId === MY_CLASS_ID;
                console.log('WeeklyCalendar: classId check:', item.classId, '===', MY_CLASS_ID, '?', match);
                return match;
              })
            : normalized;
          console.log('WeeklyCalendar: After filtering, got', filtered.length, 'items');

          // 3. Deduplicate: keep only one entry per (day + subject)
          //    In case the backend has duplicates for same day/subject
          const seen = new Set();
          const deduped = filtered.filter(item => {
            const key = `${item.day}|${item.subject}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });

          setSchedules(deduped.length > 0 ? deduped : mockSchedules);
        } else {
          setSchedules(mockSchedules);
        }
      } catch (err) {
        console.error('Failed to fetch schedules:', err);
        setSchedules(mockSchedules);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const getScheduleForSlot = (day, slotTime) => {
    const slotStart = toMinutes(slotTime);
    return schedules.find(s => {
      if (s.day !== day) return false;
      const range = parseRange(s.time);
      if (!range) return false;
      return slotOverlaps(slotStart, range);
    }) || null;
  };

  const getCurrentDayIndex = () => {
    const d = new Date().getDay(); // 0=Sun
    return d === 0 ? -1 : d - 1;  // -1 = weekend (not shown)
  };

  const getCurrentHour = () => new Date().getHours();

  if (loading) {
    return (
      <Fragment>
        <div className="greeting">
          <h1>Weekly Calendar</h1>
          <p>Your schedule for the week</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <svg viewBox="0 0 50 50" style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite' }}>
            <circle cx="25" cy="25" r="20" stroke="#534AB7" strokeWidth="4" fill="none"
              strokeDasharray="31.4 31.4" strokeLinecap="round" />
          </svg>
        </div>
      </Fragment>
    );
  }

  const currentDayIndex = getCurrentDayIndex();
  const currentHour = getCurrentHour();

  return (
    <Fragment>
      <div className="greeting">
        <h1>Weekly Calendar</h1>
        <p>Your schedule for the week</p>
      </div>

      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `80px repeat(${days.length}, 1fr)`,
          gap: '4px',
          minWidth: '600px',
        }}>

          {/* Header */}
          <div style={{ padding: '12px 8px', fontWeight: '600', fontSize: '12px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
            Time
          </div>
          {dayLabels.map((label, index) => (
            <div key={label} style={{
              padding: '12px 8px', fontWeight: '600', fontSize: '13px', textAlign: 'center',
              color: index === currentDayIndex ? '#534AB7' : 'var(--color-text-primary)',
              background: index === currentDayIndex ? '#EEEDFE' : 'transparent',
              borderRadius: '8px',
            }}>
              {label}
            </div>
          ))}

          {/* Rows */}
          {timeSlots.map((slotTime) => {
            const slotHour = parseInt(slotTime, 10);
            const isCurrentTime = currentDayIndex >= 0 && slotHour === currentHour;

            return (
              <Fragment key={`row-${slotTime}`}>
                {/* Time label */}
                <div style={{
                  padding: '8px', fontSize: '12px', color: 'var(--color-text-secondary)',
                  textAlign: 'center', borderRadius: '4px',
                  background: isCurrentTime ? '#FEF9C3' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {slotTime}
                </div>

                {/* Cells */}
                {days.map((day, dayIndex) => {
                  const schedule = getScheduleForSlot(day, slotTime);
                  const isCurrentSlot = dayIndex === currentDayIndex && isCurrentTime;
                  const isFirst = schedule ? isFirstSlot(schedule, slotTime) : false;
                  const color = schedule ? getColor(schedule.subject) : null;

                  if (schedule) {
                    return (
                      <div key={`slot-${day}-${slotTime}`} style={{
                        padding: '4px',
                        background: isCurrentSlot ? '#FEF9C3' : `var(--color-background-${color === 'purple' ? 'secondary' : 'tertiary'})`,
                        borderRadius: '8px',
                        border: isCurrentSlot ? '2px solid #534AB7' : '1px solid transparent',
                        minHeight: '56px',
                        display: 'flex',
                        alignItems: 'stretch',
                      }}>
                        {isFirst ? (
                          <div style={{
                            background: `var(--color-background-${color === 'purple' ? 'primary' : 'secondary'})`,
                            padding: '8px', borderRadius: '6px',
                            borderLeft: `3px solid var(--fill-${color})`,
                            width: '100%',
                          }}>
                            <div style={{ fontSize: '12px', fontWeight: '600', color: `var(--text-${color})`, marginBottom: '2px' }}>
                              {schedule.subject}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                              {schedule.room}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                              {schedule.time}
                            </div>
                          </div>
                        ) : (
                          <div style={{
                            borderLeft: `3px solid var(--fill-${color})`,
                            borderRadius: '4px', width: '100%',
                            background: `var(--color-background-${color === 'purple' ? 'primary' : 'secondary'})`,
                            opacity: 0.4,
                          }} />
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={`empty-${day}-${slotTime}`} style={{
                      padding: '8px', minHeight: '56px', borderRadius: '8px',
                      background: isCurrentSlot ? '#FEF9C3' : 'transparent',
                      border: isCurrentSlot ? '2px dashed #534AB7' : '1px dashed var(--color-border-tertiary)',
                    }} />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          <div style={{ width: '12px', height: '12px', background: '#EEEDFE', borderRadius: '4px', border: '2px solid #534AB7' }} />
          Current time
        </div>
        {[
          { color: 'purple', label: 'Algorithms' },
          { color: 'blue', label: 'Databases' },
          { color: 'teal', label: 'Web Development' },
          { color: 'coral', label: 'Networks' },
          { color: 'amber', label: 'Operating Systems' },
        ].map(({ color, label }) => (
          <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            <div style={{
              width: '12px', height: '12px', borderRadius: '4px',
              background: `var(--color-background-${color === 'purple' ? 'secondary' : 'tertiary'})`,
              borderLeft: `3px solid var(--fill-${color})`,
            }} />
            {label}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default WeeklyCalendar;