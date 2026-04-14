const WeeklyCalendar = () => {
  const days = ['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18'];
  const times = ['08:00', '10:15', '12:00', '14:00', '16:00'];

  const schedule = {
    '08:00': ['Algorithms A-101', '', 'Algorithms A-101', 'Networks B-210', ''],
    '10:15': ['Databases Lab-2', 'Databases Lab-2', '', '', 'OS C-105'],
    '12:00': ['', '', '', '', ''],
    '14:00': ['Web Dev C-204', 'Web Dev C-204', '', 'DB Lab Lab-1', ''],
    '16:00': ['', '', 'OS Lab Lab-3', '', ''],
  };

  return (
    <>
      <div className="greeting">
        <h1>Weekly calendar</h1>
        <p>Week of 14 – 18 April 2026</p>
      </div>
      <div className="card" style={{ overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(5, 1fr)', gap: '0', border: '1px solid var(--color-border-tertiary)', borderRadius: '12px', overflow: 'hidden' }}>
          {/* Headers */}
          <div></div>
          {days.map((d, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 4px', background: '#f8f9fc', fontWeight: '500', fontSize: '11.5px', borderBottom: '1px solid var(--color-border-tertiary)', color: i === 0 ? '#534AB7' : 'inherit' }}>
              {d}
            </div>
          ))}

          {times.map(time => (
            <>
              <div style={{ padding: '8px 6px', textAlign: 'right', fontSize: '11px', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border-tertiary)', background: '#f8f9fc' }}>
                {time}
              </div>
              {schedule[time].map((event, i) => (
                <div key={i} style={{ padding: '4px', borderBottom: '1px solid var(--color-border-tertiary)', borderRight: i < 4 ? '1px solid var(--color-border-tertiary)' : 'none', minHeight: '60px' }}>
                  {event && (
                    <div style={{ background: '#EEEDFe', color: '#534AB7', padding: '4px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '500' }}>
                      {event}
                    </div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeeklyCalendar;