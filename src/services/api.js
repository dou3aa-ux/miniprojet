/**
 * API Service for EduPortal Backend
 * Base URL: http://localhost:3000
 * All authenticated requests require Bearer token in Authorization header
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * Helper function to make API requests
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<any>} - Response data
 */
const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get token from localStorage if available
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists and not explicitly excluded
  if (token && options.auth !== false) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  // Remove auth flag from config before passing to fetch
  if (config.auth !== undefined) {
    delete config.auth;
  }

  try {
    let response;
    
    // Handle network errors
    try {
      response = await fetch(url, config);
    } catch (networkError) {
      throw {
        status: 0,
        message: 'Cannot connect to server. Please make sure the backend is running on port 3000.',
        details: networkError.message
      };
    }

    // Try to parse JSON response
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, create a basic error object
      data = { message: response.statusText || 'An error occurred' };
    }

    if (!response.ok) {
      // Handle common error cases
      if (response.status === 401) {
        // Token expired or invalid - clear storage and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('student');
        // Only redirect if not already on auth pages
        const currentPage = window.location.pathname;
        if (!currentPage.includes('/login') && !currentPage.includes('/register')) {
          window.location.href = '/login';
        }
      }
      
      // Build a more descriptive error message
      let errorMessage = data.message || 'An error occurred';
      
      // If message is an array (validation errors), join them
      if (Array.isArray(errorMessage)) {
        errorMessage = errorMessage.join('. ');
      }
      
      throw {
        status: response.status,
        message: errorMessage,
        error: data.error,
        details: data
      };
    }

    return data;
  } catch (error) {
    // Re-throw if it's our formatted error
    if (error.status !== undefined) {
      throw error;
    }
    // Otherwise, wrap it
    throw {
      status: 0,
      message: error.message || 'Network error or server unreachable',
    };
  }
};

// ============================================
// AUTH ENDPOINTS
// ============================================

/**
 * Register a new student
 * @param {object} data - Registration data
 * @returns {Promise<{access_token: string, student: object}>}
 */
export const register = (data) => {
  return fetchApi('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    auth: false, // No auth required
  });
};

/**
 * Login a student
 * @param {string} email - Student email
 * @param {string} password - Student password
 * @returns {Promise<{access_token: string, student: object}>}
 */
export const login = (email, password) => {
  return fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    auth: false, // No auth required
  });
};

/**
 * Logout - clears local storage
 */
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('student');
};

// ============================================
// CLASSES ENDPOINTS
// ============================================

/**
 * Get all classes
 * @returns {Promise<Array<{id: string, name: string, year: number}>>}
 */
export const getClasses = () => {
  return fetchApi('/classes', { auth: false });
};

/**
 * Get a specific class by ID
 * @param {string} id - Class UUID
 * @returns {Promise<{id: string, name: string, year: number, students: Array}>}
 */
export const getClassById = (id) => {
  return fetchApi(`/classes/${id}`, { auth: false });
};

// ============================================
// STUDENT DASHBOARD ENDPOINT
// ============================================

/**
 * Get current student's dashboard data
 * @returns {Promise<{student: object, class: object|null, grades: Array, todaySchedule: Array, latestAnnouncements: Array}>}
 */
export const getDashboard = () => {
  return fetchApi('/students/me/dashboard');
};

// ============================================
// GRADES ENDPOINTS
// ============================================

/**
 * Get all grades for current student
 * @returns {Promise<Array<{id: string, subject: string, score: string, studentId: string}>>}
 */
export const getGrades = () => {
  return fetchApi('/grades');
};

/**
 * Get a specific grade by ID
 * @param {string} id - Grade UUID
 * @returns {Promise<{id: string, subject: string, score: string, studentId: string}>}
 */
export const getGradeById = (id) => {
  return fetchApi(`/grades/${id}`);
};

/**
 * Create a new grade
 * @param {object} data - Grade data
 * @returns {Promise<{id: string, subject: string, score: string, studentId: string}>}
 */
export const createGrade = (data) => {
  return fetchApi('/grades', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Update a grade
 * @param {string} id - Grade UUID
 * @param {object} data - Updated grade data
 * @returns {Promise<{id: string, subject: string, score: string, studentId: string}>}
 */
export const updateGrade = (id, data) => {
  return fetchApi(`/grades/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * Delete a grade
 * @param {string} id - Grade UUID
 * @returns {Promise<{deleted: boolean, id: string}>}
 */
export const deleteGrade = (id) => {
  return fetchApi(`/grades/${id}`, {
    method: 'DELETE',
  });
};

// ============================================
// SCHEDULE ENDPOINTS
// ============================================

/**
 * Get all schedules
 * @returns {Promise<Array<{id: string, day: string, time: string, subject: string, room: string, classId: string}>>}
 */
export const getSchedules = () => {
  return fetchApi('/schedules');
};

/**
 * Get a specific schedule by ID
 * @param {string} id - Schedule UUID
 * @returns {Promise<{id: string, day: string, time: string, subject: string, room: string, classId: string}>}
 */
export const getScheduleById = (id) => {
  return fetchApi(`/schedules/${id}`);
};

/**
 * Create a new schedule
 * @param {object} data - Schedule data
 * @returns {Promise<{id: string, day: string, time: string, subject: string, room: string, classId: string}>}
 */
export const createSchedule = (data) => {
  return fetchApi('/schedules', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Update a schedule
 * @param {string} id - Schedule UUID
 * @param {object} data - Updated schedule data
 * @returns {Promise<{id: string, day: string, time: string, subject: string, room: string, classId: string}>}
 */
export const updateSchedule = (id, data) => {
  return fetchApi(`/schedules/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * Delete a schedule
 * @param {string} id - Schedule UUID
 * @returns {Promise<{deleted: boolean, id: string}>}
 */
export const deleteSchedule = (id) => {
  return fetchApi(`/schedules/${id}`, {
    method: 'DELETE',
  });
};

// ============================================
// ANNOUNCEMENTS ENDPOINTS
// ============================================

/**
 * Get all announcements
 * @returns {Promise<Array<{id: string, title: string, content: string, date: string}>>}
 */
export const getAnnouncements = () => {
  return fetchApi('/announcements');
};

/**
 * Get a specific announcement by ID
 * @param {string} id - Announcement UUID
 * @returns {Promise<{id: string, title: string, content: string, date: string}>}
 */
export const getAnnouncementById = (id) => {
  return fetchApi(`/announcements/${id}`);
};

/**
 * Create a new announcement
 * @param {object} data - Announcement data
 * @returns {Promise<{id: string, title: string, content: string, date: string}>}
 */
export const createAnnouncement = (data) => {
  return fetchApi('/announcements', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Update an announcement
 * @param {string} id - Announcement UUID
 * @param {object} data - Updated announcement data
 * @returns {Promise<{id: string, title: string, content: string, date: string}>}
 */
export const updateAnnouncement = (id, data) => {
  return fetchApi(`/announcements/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * Delete an announcement
 * @param {string} id - Announcement UUID
 * @returns {Promise<{deleted: boolean, id: string}>}
 */
export const deleteAnnouncement = (id) => {
  return fetchApi(`/announcements/${id}`, {
    method: 'DELETE',
  });
};

// ============================================
// EXPORT API OBJECT
// ============================================

const api = {
  // Auth
  register,
  login,
  logout,
  // Classes
  getClasses,
  getClassById,
  // Dashboard
  getDashboard,
  // Grades
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
  // Schedules
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  // Announcements
  getAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};

export default api;