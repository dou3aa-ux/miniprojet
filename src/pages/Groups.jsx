import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { student } = useAuth();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        
        // Get class information
        if (student?.classId) {
          const classData = await api.getClassById(student.classId);
          setClassStudents(classData.students || []);
        }
        
        // Since there's no direct groups endpoint, we'll create mock groups from classmates
        // In a real app, you'd have a dedicated groups endpoint
        const mockGroups = [
          {
            id: 'group-1',
            name: 'Database Project Team',
            course: 'Databases',
            color: 'blue',
            members: 4,
            description: 'ER Diagram and normalization project',
            nextMeeting: 'Tomorrow, 14:00',
          },
          {
            id: 'group-2',
            name: 'Web Dev Study Group',
            course: 'Web Development',
            color: 'teal',
            members: 3,
            description: 'React and CSS practice sessions',
            nextMeeting: 'Friday, 10:00',
          },
          {
            id: 'group-3',
            name: 'Algorithms Lab Partners',
            course: 'Algorithms',
            color: 'purple',
            members: 2,
            description: 'Weekly lab report collaboration',
            nextMeeting: 'Monday, 09:00',
          },
        ];
        
        setGroups(mockGroups);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
        setError(err.message || 'Failed to load groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [student?.classId]);

  // Get color class for group
  const getColorClass = (color) => {
    return `dot-${color}`;
  };

  if (loading) {
    return (
      <>
        <div className="greeting">
          <h1>Group List</h1>
          <p>Collaborate with your classmates</p>
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
          <h1>Group List</h1>
          <p>Collaborate with your classmates</p>
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
        <h1>Group List</h1>
        <p>Collaborate with your classmates</p>
      </div>

      {/* Class Overview */}
      {classStudents.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ fontWeight: '600', marginBottom: '12px' }}>Your Class</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {classStudents.slice(0, 8).map((s, i) => (
                <div
                  key={s.id || i}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `hsl(${(i * 45) % 360}, 60%, 70%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#1f2937',
                  }}
                  title={s.name}
                >
                  {s.name.charAt(0)}
                </div>
              ))}
              {classStudents.length > 8 && (
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#64748b',
                  }}
                >
                  +{classStudents.length - 8}
                </div>
              )}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              {classStudents.length} students in your class
            </div>
          </div>
        </div>
      )}

      {/* Groups List */}
      {groups.length > 0 ? (
        <div style={{ display: 'grid', gap: '12px' }}>
          {groups.map((group, index) => (
            <div key={group.id} className="card">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div className={`course-dot ${getColorClass(group.color)}`} style={{ width: '40px', height: '40px', fontSize: '11px' }}>
                      {group.course.substring(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '15px' }}>{group.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                        {group.course} · {group.members} members
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                    {group.description}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#534AB7' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    Next meeting: {group.nextMeeting}
                  </div>
                </div>
                <button
                  style={{
                    padding: '8px 16px',
                    background: '#EEEDFE',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#534AB7',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    height: 'fit-content',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#DDD6FE';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#EEEDFE';
                  }}
                >
                  View Group
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.5 }}>
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
          </svg>
          <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>No groups yet</p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>You haven't been added to any study groups</p>
        </div>
      )}
    </>
  );
};

export default Groups;