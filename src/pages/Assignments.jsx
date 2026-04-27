import { useState, useEffect } from 'react';
import api from '../services/api';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        // Since there's no direct assignments endpoint, we'll use grades and dashboard data
        // In a real app, you'd have a dedicated assignments endpoint
        const grades = await api.getGrades();
        
        // Transform grades into assignments format
        const transformedAssignments = grades.map((grade, index) => {
          const score = typeof grade.score === 'number' ? grade.score : Number(grade.score);
          let status = 'pending';
          let due = 'Due date TBA';
          
          if (score > 0) {
            status = 'graded';
            due = `Graded · Score: ${score.toFixed(1)}/20`;
          } else {
            status = 'pending';
            due = 'Due date TBA';
          }
          
          return {
            id: grade.id || `assignment-${index}`,
            course: grade.subject.substring(0, 3).toUpperCase(),
            courseFull: grade.subject,
            title: `${grade.subject} Assignment`,
            due,
            status,
            score: score > 0 ? score : null,
          };
        });
        
        setAssignments(transformedAssignments);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
        setError(err.message || 'Failed to load assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const filteredAssignments = assignments.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return item.status === 'pending';
    if (filter === 'Submitted') return item.status === 'submitted';
    if (filter === 'Graded') return item.status === 'graded';
    return true;
  });

  // Get color for course dot
  const getCourseColor = (course) => {
    const colors = {
      'ALG': 'purple',
      'DB': 'blue',
      'WEB': 'teal',
      'NET': 'coral',
      'OS': 'amber',
    };
    return colors[course] || 'purple';
  };

  // Get status pill color
  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'pill-red';
      case 'pending': return 'pill-amber';
      case 'submitted': return 'pill-blue';
      case 'graded': return 'pill-green';
      default: return 'pill-amber';
    }
  };

  if (loading) {
    return (
      <>
        <div className="greeting">
          <h1>Assignments</h1>
          <p>Track deadlines and submission status</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <svg className="spinner" viewBox="0 0 50 50" style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite' }}>
            <circle cx="25" cy="25" r="20" stroke="#534AB7" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
          </svg>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="greeting">
          <h1>Assignments</h1>
          <p>Track deadlines and submission status</p>
        </div>
        <div style={{ padding: '24px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626' }}>
          <p>{error}</p>
        </div>
      </>
    );
  }

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
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((ass, index) => (
            <div key={ass.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.9rem 0', borderBottom: index < filteredAssignments.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              <div className={`course-dot dot-${getCourseColor(ass.course)}`}>
                {ass.course}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500' }}>{ass.title}</div>
                <div style={{ fontSize: '12.5px', color: '#64748b' }}>{ass.due}</div>
              </div>
              <span className={`pill ${getStatusColor(ass.status)}`}>
                {ass.status.toUpperCase()}
              </span>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--color-text-tertiary)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.5 }}>
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
            </svg>
            <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>No assignments found</p>
            <p style={{ fontSize: '13px' }}>
              {filter === 'All' ? 'You have no assignments yet' : `No ${filter.toLowerCase()} assignments`}
            </p>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginTop: '20px' }}>
        <div className="stat-card card">
          <div className="stat-label">Total</div>
          <div className="stat-value">{assignments.length}</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Pending</div>
          <div className="stat-value" style={{ color: '#854F0B' }}>{assignments.filter(a => a.status === 'pending').length}</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Graded</div>
          <div className="stat-value" style={{ color: '#3B6D11' }}>{assignments.filter(a => a.status === 'graded').length}</div>
        </div>
      </div>
    </>
  );
};

export default Assignments;