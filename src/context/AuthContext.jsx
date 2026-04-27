import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

/**
 * AuthProvider - Provides authentication state and methods to the app
 */
export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const storedStudent = localStorage.getItem('student');
      const token = localStorage.getItem('access_token');
      
      if (storedStudent && token) {
        try {
          const parsedStudent = JSON.parse(storedStudent);
          setStudent(parsedStudent);
          setIsAuthenticated(true);
        } catch (e) {
          // Invalid stored data, clear it
          localStorage.removeItem('student');
          localStorage.removeItem('access_token');
          setStudent(null);
          setIsAuthenticated(false);
        }
      } else {
        setStudent(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  /**
   * Login a student
   * @param {string} email - Student email
   * @param {string} password - Student password
   * @returns {Promise<boolean>} - Success status
   */
  const login = useCallback(async (email, password) => {
    try {
      setAuthError(null);
      const data = await api.login(email, password);
      
      // Validate response has required data
      if (!data.access_token || !data.student) {
        setAuthError('Invalid response from server');
        return false;
      }
      
      // Store token and student data
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('student', JSON.stringify(data.student));
      setStudent(data.student);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setAuthError(err.message || 'Login failed. Please check your credentials.');
      return false;
    }
  }, []);

  /**
   * Register a new student
   * @param {object} data - Registration data (name, email, password, classId)
   * @returns {Promise<boolean>} - Success status
   */
  const register = useCallback(async (data) => {
    try {
      setAuthError(null);
      const result = await api.register(data);
      
      // Validate response has required data
      if (!result.access_token || !result.student) {
        setAuthError('Invalid response from server');
        return false;
      }
      
      // Store token and student data
      localStorage.setItem('access_token', result.access_token);
      localStorage.setItem('student', JSON.stringify(result.student));
      setStudent(result.student);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      console.error('Register error:', err);
      setAuthError(err.message || 'Registration failed. Please try again.');
      return false;
    }
  }, []);

  /**
   * Logout the current student
   */
  const logout = useCallback(() => {
    api.logout();
    setStudent(null);
    setIsAuthenticated(false);
    setAuthError(null);
  }, []);

  /**
   * Update student data (e.g., after profile update)
   * @param {object} updatedStudent - Updated student data
   */
  const updateStudent = useCallback((updatedStudent) => {
    localStorage.setItem('student', JSON.stringify(updatedStudent));
    setStudent(updatedStudent);
  }, []);

  /**
   * Clear any authentication errors
   */
  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const value = {
    student,
    loading,
    error: authError,
    isAuthenticated,
    login,
    register,
    logout,
    updateStudent,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 * @returns {object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;