import { useState } from 'react';

const Topbar = ({ title }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      
      <div className="search-box">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#94a3b8">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input 
          type="text" 
          placeholder="Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="icon-btn" title="Notifications">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#64748b">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
        <div className="badge" style={{position:'absolute', top:'4px', right:'4px', width:'7px', height:'7px', background:'#D85A30', borderRadius:'50%', border:'1.5px solid white'}}></div>
      </div>
    </div>
  );
};

export default Topbar;