import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute - Wrapper component for routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f4f4f7'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px'
        }}>
          <svg 
            className="spinner" 
            viewBox="0 0 50 50" 
            style={{
              width: '48px',
              height: '48px',
              animation: 'spin 1s linear infinite'
            }}
          >
            <circle 
              cx="25" 
              cy="25" 
              r="20" 
              stroke="#534AB7" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="31.4 31.4" 
              strokeLinecap="round"
            />
          </svg>
          <p style={{
            marginTop: '16px',
            color: '#64748b',
            fontSize: '14px'
          }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;