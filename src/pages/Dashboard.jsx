import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { student } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const data = await api.getDashboard();
        setDashboardData(data);
        
        // Transform grades into tasks/assignments
        if (data.grades && data.grades.length > 0) {
          const assignmentTasks = data.grades.map((grade, index) => ({
            id: `grade-${grade.id || index}`,
            name: grade.subject,
            due: `Score: ${typeof grade.score === 'number' ? grade.score : Number(grade.score).toFixed(1)}`,
            urgent: typeof grade.score === 'number' ? grade.score < 10 : Number(grade.score) < 10,
            done: true,
          }));
          setTasks(assignmentTasks);
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Format date helper
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
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

  // Calculate GPA from grades (mock calculation if no data)
  const calculateGPA = () => {
    if (!dashboardData || !dashboardData.grades || dashboardData.grades.length === 0) {
      return '15.4'; // Default mock value
    }
    const scores = dashboardData.grades.map(g => typeof g.score === 'number' ? g.score : Number(g.score));
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avg.toFixed(1);
  };

  return (
    <>
      <div className="greeting">
        <h1>{getGreeting()}, {student?.name?.split(' ')[0] || 'Student'} 👋</h1>
        <p>Here's what's happening today — {formatDate(new Date())}</p>
      </div>

      {/* Stats */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px'}}>
        <div className="stat-card card">
          <div className="stat-label">Overall GPA</div>
          <div className="stat-value">{calculateGPA()}</div>
          <div className="stat-change stat-up">▲ +0.6 this semester</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Courses enrolled</div>
          <div className="stat-value">{dashboardData?.class?.studentCount || 5}</div>
          <div className="stat-change" style={{color: 'var(--color-text-tertiary)'}}>3 in progress</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Assignments due</div>
          <div className="stat-value">{tasks.filter(t => !t.done).length}</div>
          <div className="stat-change stat-down">2 this week</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Attendance</div>
          <div className="stat-value">91%</div>
          <div className="stat-change stat-up">▲ Above average</div>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px'}}>
        {/* Today's schedule */}
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'16px'}}>
            <span style={{fontWeight:'600'}}>Today's schedule</span>
            <span 
              style={{color:'#534AB7', cursor:'pointer', fontSize:'13px'}}
              onClick={() => navigate('/weekly')}
            >
              View week →
            </span>
          </div>
          
          {dashboardData?.todaySchedule && dashboardData.todaySchedule.length > 0 ? (
            dashboardData.todaySchedule.map((slot, index) => (
              <div key={slot.id || index} style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 0', borderBottom: index < dashboardData.todaySchedule.length - 1 ? '1px solid #e2e8f0' : 'none'}}>
                <div className={`course-dot dot-${['purple', 'blue', 'teal', 'coral', 'amber'][index % 5]}`}>
                  {slot.subject.substring(0, 3).toUpperCase()}
                </div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'500'}}>{slot.subject}</div>
                  <div style={{fontSize:'12.5px', color:'var(--color-text-secondary)'}}>{slot.time} · {slot.room}</div>
                </div>
                <span className={`pill pill-${['purple', 'blue', 'teal', 'coral', 'amber'][index % 5]}`}>
                  {index === 0 ? 'Now' : index === 1 ? 'Next' : 'Upcoming'}
                </span>
              </div>
            ))
          ) : (
            // Mock schedule data
            <>
              <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 0', borderBottom:'1px solid #e2e8f0'}}>
                <div className="course-dot dot-purple">ALG</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'500'}}>Algorithms</div>
                  <div style={{fontSize:'12.5px', color:'var(--color-text-secondary)'}}>08:00 – 10:00 · Room A-101</div>
                </div>
                <span className="pill pill-purple">Now</span>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 0'}}>
                <div className="course-dot dot-blue">DB</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:'500'}}>Databases</div>
                  <div style={{fontSize:'12.5px', color:'var(--color-text-secondary)'}}>10:15 – 12:15 · Lab-2</div>
                </div>
                <span className="pill pill-blue">Next</span>
              </div>
            </>
          )}
        </div>

        {/* Pending tasks */}
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'16px'}}>
            <span style={{fontWeight:'600'}}>Pending tasks</span>
            <span 
              style={{color:'#534AB7', cursor:'pointer', fontSize:'13px'}}
              onClick={() => navigate('/assignments')}
            >
              All tasks →
            </span>
          </div>
          {tasks.length > 0 ? (
            tasks.slice(0, 5).map(task => (
              <div key={task.id} style={{display:'flex', gap:'12px', padding:'10px 0', borderBottom:'1px solid #e2e8f0'}}>
                <div onClick={() => toggleTask(task.id)} style={{
                  width:'18px', height:'18px', border:'2px solid #94a3b8', borderRadius:'5px',
                  background: task.done ? '#534AB7' : 'transparent', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  {task.done && <span style={{color:'white', fontSize:'11px'}}>✓</span>}
                </div>
                <div style={{flex:1}}>
                  <div style={{textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#94a3b8' : 'inherit'}}>
                    {task.name}
                  </div>
                  <div style={{fontSize:'12px', color: task.urgent ? '#993C1D' : '#94a3b8'}}>{task.due}</div>
                </div>
              </div>
            ))
          ) : (
            // Mock tasks
            <>
              <div style={{display:'flex', gap:'12px', padding:'10px 0', borderBottom:'1px solid #e2e8f0'}}>
                <div onClick={() => toggleTask(1)} style={{
                  width:'18px', height:'18px', border:'2px solid #94a3b8', borderRadius:'5px',
                  background: 'transparent', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                </div>
                <div style={{flex:1}}>
                  <div>Algorithms Lab Report</div>
                  <div style={{fontSize:'12px', color: '#993C1D'}}>Due today</div>
                </div>
              </div>
              <div style={{display:'flex', gap:'12px', padding:'10px 0', borderBottom:'1px solid #e2e8f0'}}>
                <div onClick={() => toggleTask(2)} style={{
                  width:'18px', height:'18px', border:'2px solid #94a3b8', borderRadius:'5px',
                  background: 'transparent', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                </div>
                <div style={{flex:1}}>
                  <div>DB Project — ER Diagram</div>
                  <div style={{fontSize:'12px', color: '#94a3b8'}}>Due Apr 17</div>
                </div>
              </div>
              <div style={{display:'flex', gap:'12px', padding:'10px 0'}}>
                <div onClick={() => toggleTask(3)} style={{
                  width:'18px', height:'18px', border:'2px solid #94a3b8', borderRadius:'5px',
                  background: '#534AB7', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                  <span style={{color:'white', fontSize:'11px'}}>✓</span>
                </div>
                <div style={{flex:1}}>
                  <div style={{textDecoration: 'line-through', color: '#94a3b8'}}>Web Dev Assignment 2</div>
                  <div style={{fontSize:'12px', color: '#94a3b8'}}>Submitted Apr 12</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Announcements Section */}
      {dashboardData?.latestAnnouncements && dashboardData.latestAnnouncements.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{fontWeight:'600', marginBottom:'16px'}}>Latest Announcements</div>
          {dashboardData.latestAnnouncements.slice(0, 3).map((announcement, index) => (
            <div key={announcement.id || index} style={{ padding: '12px 0', borderBottom: index < dashboardData.latestAnnouncements.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
              <div style={{ fontWeight: '500', marginBottom: '4px' }}>{announcement.title}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{announcement.content}</div>
              <div style={{ fontSize: '11.5px', color: 'var(--color-text-tertiary)' }}>{formatDate(announcement.date)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;