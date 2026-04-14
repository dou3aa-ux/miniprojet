// src/components/Sidebar.jsx

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { id: 'courses', label: 'Courses', icon: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3z' },
  { id: 'assignments', label: 'Assignments', icon: 'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
  { id: 'grades', label: 'Grades', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' },
  { id: 'weekly', label: 'Weekly calendar', icon: 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z' },
  { id: 'exams', label: 'Exam calendar', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
  { id: 'groups', label: 'Group list', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
];

const Sidebar = ({ currentPage, setCurrentPage }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm-1 13.99L5 14.08V10l6 3.27 6-3.27v4.08l-6 2.91z"/></svg>
        </div>
        EduPortal
      </div>

      <div className="nav-section">
        <div className="nav-label">Main</div>
        {navItems.slice(0, 4).map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d={item.icon} />
            </svg>
            {item.label}
          </div>
        ))}
      </div>

      <div className="nav-section">
        <div className="nav-label">Schedule</div>
        {navItems.slice(4, 6).map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d={item.icon} />
            </svg>
            {item.label}
          </div>
        ))}
      </div>

      <div className="nav-section">
        <div className="nav-label">Community</div>
        <div
          className={`nav-item ${currentPage === 'groups' ? 'active' : ''}`}
          onClick={() => setCurrentPage('groups')}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d={navItems[6].icon} />
          </svg>
          Group list
        </div>
      </div>

      {/* Profile Picture - Perfectly centered at the very bottom */}
      <div style={{ marginTop: 'auto', padding: '20px 0 24px 0', display: 'flex', justifyContent: 'center' }}>
        <div 
          onClick={() => setCurrentPage('profile')}
          style={{ 
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;