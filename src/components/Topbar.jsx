import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Map paths to display titles
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/courses': 'Courses',
  '/assignments': 'Assignments',
  '/grades': 'Grades',
  '/weekly': 'Weekly Calendar',
  '/exams': 'Exam Calendar',
  '/groups': 'Groups',
  '/profile': 'Profile',
};

const Topbar = ({ onMenuClick }) => {
  const [showNotif, setShowNotif] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = useAuth();

  // Get current page title from route
  const title = pageTitles[location.pathname] || 'Dashboard';

  // Sample notifications (could be fetched from API)
  const notifications = [
    { id: 1, text: "Your Algorithms midterm grade has been posted", time: "Just now", important: true },
    { id: 2, text: "Web Development assignment deadline extended by 2 days", time: "2 hours ago", important: false },
    { id: 3, text: "Missed OS lecture today - please check with professor", time: "Yesterday", important: true },
    { id: 4, text: "New group project announcement in Databases", time: "3 days ago", important: false },
  ];

  return (
    <div className="topbar">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          marginRight: '8px',
        }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#64748b">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      <div className="topbar-title">{title}</div>

      {/* Search Box */}
      <div className="search-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#94a3b8">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search courses, assignments..." 
        />
      </div>

      {/* Notifications */}
      <div 
        className="icon-btn" 
        title="Notifications"
        style={{ position: 'relative', marginRight: '12px', cursor: 'pointer' }}
        onClick={() => setShowNotif(!showNotif)}
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="#64748b">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
        <div className="badge"></div>

        {showNotif && (
          <div style={{
            position: 'absolute',
            top: '52px',
            right: '0',
            width: '360px',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '14px',
            boxShadow: '0 12px 25px -5px rgba(0,0,0,0.12)',
            zIndex: 200,
            overflow: 'hidden'
          }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', fontWeight: '600' }}>
              Notifications
            </div>
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid #f8fafc',
                  background: notif.important ? '#FEF3F2' : 'transparent',
                  fontWeight: notif.important ? '600' : 'normal',
                  color: notif.important ? '#991B1B' : '#1f2937'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  {notif.important && <div style={{ width: '7px', height: '7px', background: '#EF4444', borderRadius: '50%', marginTop: '6px' }}></div>}
                  <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.45' }}>
                    {notif.text}
                  </div>
                </div>
                <div style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '6px' }}>
                  {notif.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Picture in Topbar */}
      <div 
        onClick={() => navigate('/profile')}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #EEEDFE',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(83, 64, 183, 0.15)',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src="https://i.pinimg.com/1200x/85/49/0f/85490f3eb7408f88b97bc98c229e65e9.jpg" 
          alt={student?.name || 'Profile'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default Topbar;