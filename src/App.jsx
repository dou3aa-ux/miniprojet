import { useState } from 'react';

import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';

import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import Assignments from './pages/Assignments.jsx';
import Grades from './pages/Grades.jsx';
import WeeklyCalendar from './pages/WeeklyCalendar.jsx';
import ExamCalendar from './pages/ExamCalendar.jsx';
import Groups from './pages/Groups.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const pageComponents = {
    dashboard: <Dashboard />,
    courses: <Courses />,
    assignments: <Assignments />,
    grades: <Grades />,
    weekly: <WeeklyCalendar />,
    exams: <ExamCalendar />,
    groups: <Groups />,
    profile: <Profile />,
  };

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main">
        <Topbar title={currentPage === 'dashboard' ? 'Dashboard' : 
          currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} />
        <div className="content">
          {pageComponents[currentPage] || <div>Page not found</div>}
        </div>
      </div>
    </div>
  );
}

export default App;