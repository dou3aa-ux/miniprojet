import { useState } from 'react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, course: "ALG", title: "Lab Report — Sorting Algorithms", due: "Today 23:59", status: "urgent" },
    { id: 2, course: "DB", title: "ER Diagram — Library System", due: "Apr 17, 23:59", status: "pending" },
    { id: 3, course: "WEB", title: "Responsive Portfolio Page", due: "Submitted Apr 12", status: "submitted" },
    { id: 4, course: "NET", title: "IP Subnetting Worksheet", due: "Graded · Score: 16/20", status: "graded" },
    { id: 5, course: "OS", title: "Process Scheduling Simulation", due: "Apr 20", status: "pending" },
  ]);

  const toggleStatus = (id) => {
    // Simulation de changement de statut (tu peux l'améliorer)
    alert(`Tâche ${id} marquée comme terminée !`);
  };

  return (
    <>
      <div className="greeting">
        <h1>Assignments</h1>
        <p>Track deadlines and submission status</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Submitted', 'Graded'].map((f, i) => (
          <span key={i} className="pill" style={{ cursor: 'pointer', padding: '5px 14px', background: i === 0 ? '#EEEDFe' : 'var(--color-background-secondary)', color: i === 0 ? '#534AB7' : 'var(--color-text-secondary)' }}>
            {f}
          </span>
        ))}
      </div>

      <div className="card">
        {assignments.map((ass) => (
          <div key={ass.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
            <div className={`course-dot dot-${ass.course === 'ALG' ? 'purple' : ass.course === 'DB' ? 'blue' : ass.course === 'WEB' ? 'teal' : ass.course === 'NET' ? 'coral' : 'amber'}`}>
              {ass.course}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>{ass.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                {ass.course === 'ALG' ? 'Algorithms' : ass.course === 'DB' ? 'Databases' : ass.course === 'WEB' ? 'Web Dev' : ass.course === 'NET' ? 'Networks' : 'Operating Systems'} · {ass.due}
              </div>
            </div>
            <span className={`pill ${ass.status === 'urgent' ? 'pill-red' : ass.status === 'submitted' ? 'pill-blue' : ass.status === 'graded' ? 'pill-green' : 'pill-amber'}`}>
              {ass.status === 'urgent' ? 'Urgent' : ass.status === 'submitted' ? 'Submitted' : ass.status === 'graded' ? 'Graded' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Assignments;