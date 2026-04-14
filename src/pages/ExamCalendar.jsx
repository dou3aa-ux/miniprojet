const ExamCalendar = () => {
  const upcomingExams = [
    { date: "15", month: "APR", name: "Algorithms — Midterm", time: "08:00 · Amphitheater A", days: "Tomorrow" },
    { date: "18", month: "APR", name: "Databases — Midterm", time: "10:00 · Room C-301", days: "4 days" },
    { date: "20", month: "APR", name: "Networks — Midterm", time: "14:00 · Amphitheater B", days: "6 days" },
    { date: "22", month: "APR", name: "OS — Midterm", time: "09:00 · Room A-211", days: "8 days" },
    { date: "25", month: "APR", name: "Web Dev — Practical", time: "10:00 · Lab-1", days: "11 days" },
  ];

  return (
    <>
      <div className="greeting">
        <h1>Exam calendar</h1>
        <p>Upcoming assessments — April 2026</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="card">
          <div style={{ fontWeight: '500', marginBottom: '1rem' }}>April 2026</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', padding: '4px' }}>{d}</div>)}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 14;
              const hasExam = [10,15,18,20,22,25].includes(day);
              return (
                <div key={i} style={{
                  height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '8px', fontSize: '12.5px', cursor: 'pointer',
                  background: isToday ? '#EEEDFe' : hasExam ? '#FAECE7' : 'transparent',
                  color: isToday ? '#534AB7' : hasExam ? '#993C1D' : '#1f2937'
                }}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: '500', marginBottom: '1rem' }}>Upcoming exams</div>
          {upcomingExams.map((exam, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '0.75rem 0', borderBottom: i < 4 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
              <div style={{ width: '44px', height: '44px', background: '#EEEDFe', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: '500', color: '#534AB7' }}>{exam.date}</div>
                <div style={{ fontSize: '10px', color: '#534AB7' }}>{exam.month}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500' }}>{exam.name}</div>
                <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>{exam.time}</div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '11.5px' }}>
                <span style={{ color: '#854F0B', fontWeight: '500' }}>{exam.days}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExamCalendar;