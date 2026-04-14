const Groups = () => {
  const students = [
    { init: "EB", name: "Eya Ben Ali", id: "21CS-001", me: true, color: "purple" },
    { init: "AT", name: "Ahmed Trabelsi", id: "21CS-002", me: false, color: "blue" },
    { init: "SM", name: "Sarra Mzali", id: "21CS-003", me: false, color: "teal" },
    { init: "YB", name: "Youssef Bouraoui", id: "21CS-004", me: false, color: "coral" },
    { init: "LK", name: "Lina Khelifi", id: "21CS-005", me: false, color: "amber" },
  ];

  return (
    <>
      <div className="greeting">
        <h1>Group list</h1>
        <p>L3 Computer Science — Group A (25 students)</p>
      </div>
      <div style={{ display: 'grid', gap: '10px' }}>
        {students.map((student, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.25rem' }}>
            <div className={`course-dot dot-${student.color}`} style={{ width: '40px', height: '40px', borderRadius: '50%', fontSize: '13px' }}>
              {student.init}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500' }}>
                {student.name} {student.me && <span className="pill pill-purple" style={{ marginLeft: '8px' }}>You</span>}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>{student.id}</div>
            </div>
            <span className="pill pill-teal">Active</span>
          </div>
        ))}
        <div style={{ textAlign: 'center', padding: '1rem', fontSize: '13px', color: 'var(--color-text-tertiary)' }}>
          Showing 5 of 25 students
        </div>
      </div>
    </>
  );
};

export default Groups;