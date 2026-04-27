import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast.jsx';
import { useState } from 'react';

import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import Assignments from './pages/Assignments.jsx';
import Grades from './pages/Grades.jsx';
import WeeklyCalendar from './pages/WeeklyCalendar.jsx';
import ExamCalendar from './pages/ExamCalendar.jsx';
import Groups from './pages/Groups.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

/**
 * Main App Layout - wraps dashboard pages with sidebar and topbar
 */
function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Dashboard Routes - protected routes with the main layout
 */
function DashboardRoutes({ children }) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}

/**
 * Main App Component with Routing
 */
function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <Dashboard />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <Courses />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <Assignments />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grades"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <Grades />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/weekly"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <WeeklyCalendar />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <ExamCalendar />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <Groups />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardRoutes>
                  <Profile />
                </DashboardRoutes>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;