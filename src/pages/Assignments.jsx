import { useState } from 'react';

const Assignments = () => {
  const [filter, setFilter] = useState('All');

  const allAssignments = [
    { id: 1, course: "ALG", title: "Lab Report — Sorting Algorithms", due: "Today 23:59", status: "urgent" },
    { id: 2, course: "DB", title: "ER Diagram — Library System", due: "Apr 17", status: "pending" },
    { id: 3, course: "WEB", title: "Responsive Portfolio Page", due: "Submitted Apr 12", status: "submitted" },
    { id: 4, course: "NET", title: "IP Subnetting Worksheet", due: "Graded · Score: 16/20", status: "graded" },
    { id: 5, course: "OS", title: "Process Scheduling Simulation", due: "Apr 20", status: "pending" },
  ];

  const filteredAssignments = allAssignments.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return item.status === 'pending';
    if (filter === 'Submitted') return item.status === 'submitted';
    if (filter === 'Graded') return item.status === 'graded';
    return true;
  });

  return (
    <>
      <div className="greeting">
        <h1>Assignments</h1>
        <p>Track deadlines and submission status</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Submitted', 'Graded'].map(f => (
          <span 
            key={f}
            className={`pill ${filter === f ? 'pill-purple' : ''}`}
            style={{ cursor: 'pointer', padding: '6px 18px' }}
            onClick={() => setFilter(f)}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="card">
        {filteredAssignments.map(ass => (
          <div key={ass.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.9rem 0', borderBottom: '1px solid #e2e8f0' }}>
            <div className={`course-dot dot-${ass.course.toLowerCase() === 'alg' ? 'purple' : ass.course.toLowerCase() === 'db' ? 'blue' : ass.course.toLowerCase() === 'web' ? 'teal' : ass.course.toLowerCase() === 'net' ? 'coral' : 'amber'}`}>
              {ass.course}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '500' }}>{ass.title}</div>
              <div style={{ fontSize: '12.5px', color: '#64748b' }}>{ass.due}</div>
            </div>
            <span className={`pill ${ass.status === 'urgent' ? 'pill-red' : ass.status === 'submitted' ? 'pill-blue' : ass.status === 'graded' ? 'pill-green' : 'pill-amber'}`}>
              {ass.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Assignments;