import { useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Algorithms Lab Report", due: "Due today", urgent: true, done: false },
    { id: 2, name: "DB Project — ER Diagram", due: "Due Apr 17", urgent: false, done: false },
    { id: 3, name: "Web Dev Assignment 2", due: "Submitted Apr 12", urgent: false, done: true },
    { id: 4, name: "Networks Midterm Prep", due: "Due Apr 20", urgent: false, done: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  return (
    <>
      <div className="greeting">
        <h1>Good morning, Eya 👋</h1>
        <p>Here's what's happening today — Tuesday, 14 April 2026</p>
      </div>

      {/* Stats Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px'}}>
        <div className="stat-card card">
          <div className="stat-label">Overall GPA</div>
          <div className="stat-value">15.4</div>
          <div className="stat-change stat-up">▲ +0.6 this semester</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Courses enrolled</div>
          <div className="stat-value">5</div>
          <div className="stat-change" style={{color: 'var(--color-text-tertiary)'}}>3 in progress</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Assignments due</div>
          <div className="stat-value">3</div>
          <div className="stat-change stat-down">2 this week</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Attendance</div>
          <div className="stat-value">91%</div>
          <div className="stat-change stat-up">▲ Above average</div>
        </div>
      </div>

      {/* Today's schedule + Pending tasks */}
      <div className="row row-3" style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px'}}>
        
        {/* Today's Schedule */}
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <span style={{fontWeight:'600'}}>Today's schedule</span>
            <span style={{color:'#534AB7', cursor:'pointer', fontSize:'13px'}} onClick={() => window.location.hash = '#weekly'}>View week →</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 0', borderBottom:'1px solid #e2e8f0'}}>
            <div className="course-dot dot-purple">ALG</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'500'}}>Algorithms</div>
              <div style={{fontSize:'12.5px', color:'var(--color-text-secondary)'}}>08:00 – 10:00 · Room A-101</div>
            </div>
            <span className="pill pill-purple">Now</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 0', borderBottom:'1px solid #e2e8f0'}}>
            <div className="course-dot dot-blue">DB</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:'500'}}>Databases</div>
              <div style={{fontSize:'12.5px', color:'var(--color-text-secondary)'}}>10:15 – 12:15 · Lab-2</div>
            </div>
            <span className="pill pill-blue">Next</span>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <span style={{fontWeight:'600'}}>Pending tasks</span>
            <span style={{color:'#534AB7', cursor:'pointer', fontSize:'13px'}}>All tasks →</span>
          </div>
          
          {tasks.map(task => (
            <div key={task.id} style={{display:'flex', gap:'12px', padding:'10px 0', borderBottom:'1px solid #e2e8f0', alignItems:'flex-start'}}>
              <div 
                onClick={() => toggleTask(task.id)}
                style={{
                  width: '18px', height: '18px', border: '2px solid #94a3b8',
                  borderRadius: '5px', cursor: 'pointer', marginTop: '3px',
                  background: task.done ? '#534AB7' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {task.done && <span style={{color: 'white', fontSize: '11px'}}>✓</span>}
              </div>
              <div style={{flex: 1}}>
                <div style={{ 
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? '#94a3b8' : 'inherit',
                  fontWeight: '500'
                }}>
                  {task.name}
                </div>
                <div style={{fontSize: '12px', color: task.urgent ? '#993C1D' : '#94a3b8'}}>
                  {task.due}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;