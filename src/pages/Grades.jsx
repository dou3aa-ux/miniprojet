const Grades = () => {
  const subjects = [
    { name: "Algorithms", score: 14.5, grade: "B+", color: "purple" },
    { name: "Databases", score: 16.0, grade: "A", color: "blue" },
    { name: "Web Development", score: 17.0, grade: "A+", color: "teal" },
    { name: "Networks", score: 12.0, grade: "C+", color: "coral" },
    { name: "Operating Systems", score: 13.5, grade: "B", color: "amber" },
  ];

  return (
    <>
      <div className="greeting">
        <h1>Grades</h1>
        <p>Your academic performance this semester</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>
        <div className="card"><div style={{fontSize:'12px',color:'#64748b'}}>Semester average</div><div style={{fontSize:'24px',fontWeight:'600'}}>14.6</div><div style={{color:'#3B6D11'}}>▲ Above class avg (13.2)</div></div>
        <div className="card"><div style={{fontSize:'12px',color:'#64748b'}}>Best subject</div><div style={{fontSize:'18px',fontWeight:'600'}}>Web Dev</div><div style={{color:'#3B6D11'}}>17.0 / 20</div></div>
        <div className="card"><div style={{fontSize:'12px',color:'#64748b'}}>Needs attention</div><div style={{fontSize:'18px',fontWeight:'600'}}>Networks</div><div style={{color:'#993C1D'}}>12.0 / 20</div></div>
        <div className="card"><div style={{fontSize:'12px',color:'#64748b'}}>Credits earned</div><div style={{fontSize:'24px',fontWeight:'600'}}>12</div><div style={{color:'#64748b'}}>of 16 total</div></div>
      </div>

      <div className="card">
        <div style={{ fontWeight: '500', marginBottom: '1rem' }}>Subject breakdown</div>
        {subjects.map((sub, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '12px', alignItems: 'center', padding: '10px 0', borderBottom: i < subjects.length-1 ? '0.5px solid var(--color-border-tertiary)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className={`course-dot dot-${sub.color}`} style={{ width: '30px', height: '30px', fontSize: '10px' }}>{sub.name.slice(0,3).toUpperCase()}</div>
              <span>{sub.name}</span>
            </div>
            <div>
              <div className="progress-bar" style={{ height: '6px' }}>
                <div className={`progress-fill fill-${sub.color}`} style={{ width: `${(sub.score / 20) * 100}%` }}></div>
              </div>
            </div>
            <div style={{ fontWeight: '500' }}>{sub.score}/20</div>
            <span className={`pill ${sub.score >= 16 ? 'pill-green' : sub.score >= 14 ? 'pill-blue' : 'pill-amber'}`}>{sub.grade}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grades;