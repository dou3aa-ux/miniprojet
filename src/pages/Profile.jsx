import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { student, updateStudent, logout } = useAuth();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: student?.name || '',
    email: student?.email || '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchClassData = async () => {
      if (student?.classId) {
        try {
          const data = await api.getClassById(student.classId);
          setClassData(data);
        } catch (err) {
          console.error('Failed to fetch class data:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [student?.classId]);

  // Update form when student data changes
  useEffect(() => {
    if (student) {
      setEditForm({
        name: student.name || '',
        email: student.email || '',
      });
    }
  }, [student]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      // In a real app, you would call an API to update the profile
      // For now, we'll update locally
      const updatedStudent = { ...student, name: editForm.name, email: editForm.email };
      updateStudent(updatedStudent);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setShowEditModal(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      // In a real app, you would call an API to change password
      // For now, we'll just show success
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordModal(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to change password' });
    }
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

  return (
    <>
      <div className="greeting">
        <h1>Profile</h1>
        <p>Your account information</p>
      </div>

      {/* Profile Layout - Fully Responsive */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '24px', 
        maxWidth: '100%'
      }}>
        {/* Profile Card */}
        <div className="card" style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
          <div style={{ marginBottom: '20px' }}>
            <div 
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 16px',
                border: '4px solid #EEEDFE',
                boxShadow: '0 4px 12px rgba(83, 74, 183, 0.15)',
              }}
            >
              <img 
                src="https://i.pinimg.com/1200x/85/49/0f/85490f3eb7408f88b97bc98c229e65e9.jpg" 
                alt={student?.name || 'Profile'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
              {student?.name || 'Student'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              Student
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
            <div style={{ padding: '12px', background: 'var(--color-background-secondary)', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#534AB7' }}>3.5</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>GPA</div>
            </div>
            <div style={{ padding: '12px', background: 'var(--color-background-secondary)', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: '600', color: '#3B6D11' }}>91%</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Attendance</div>
            </div>
          </div>
        </div>

        {/* Account Details - Full Width */}
        <div style={{ width: '100%' }}>
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border-tertiary)' }}>
              Personal Information
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Full Name
                </label>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {student?.name || 'Not available'}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {student?.email || 'Not available'}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Student ID
                </label>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)' }}>
                  {student?.id || 'Not available'}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border-tertiary)' }}>
              Academic Information
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Class
                </label>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {classData?.name || 'Not assigned'}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Academic Year
                </label>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {classData?.year ? `Year ${classData.year}` : 'Not assigned'}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Class Size
                </label>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>
                  {classData?.studentCount ? `${classData.studentCount} students` : 'Not available'}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border-tertiary)' }}>
              Account Actions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                style={{
                  padding: '12px 16px',
                  background: 'var(--color-background-secondary)',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s',
                }}
                onClick={() => setShowEditModal(true)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#EEEDFE';
                  e.currentTarget.style.borderColor = '#534AB7';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--color-background-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border-tertiary)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                Edit Profile
              </button>

              <button 
                style={{
                  padding: '12px 16px',
                  background: 'var(--color-background-secondary)',
                  border: '1px solid var(--color-border-tertiary)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s',
                }}
                onClick={() => setShowPasswordModal(true)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#EAF3DE';
                  e.currentTarget.style.borderColor = '#3B6D11';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'var(--color-background-secondary)';
                  e.currentTarget.style.borderColor = 'var(--color-border-tertiary)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H3V12h18v10z"/>
                </svg>
                Change Password
              </button>

              <button 
                style={{
                  padding: '12px 16px',
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#DC2626',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s',
                }}
                onClick={handleLogout}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#FEE2E2';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#FEF2F2';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px',
        }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => { setShowEditModal(false); setMessage({ type: '', text: '' }); }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'var(--color-text-secondary)',
              }}
            >
              ×
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Edit Profile</h3>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
              </div>
              {message.text && (
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  background: message.type === 'success' ? '#EAF3DE' : '#FEF2F2',
                  color: message.type === 'success' ? '#3B6D11' : '#DC2626',
                  fontSize: '13px',
                }}>
                  {message.text}
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => { setShowEditModal(false); setMessage({ type: '', text: '' }); }}
                  style={{
                    padding: '10px 20px',
                    background: 'var(--color-background-secondary)',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    background: '#534AB7',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px',
        }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%', position: 'relative' }}>
            <button
              onClick={() => { setShowPasswordModal(false); setMessage({ type: '', text: '' }); }}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'var(--color-text-secondary)',
              }}
            >
              ×
            </button>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
              </div>
              {message.text && (
                <div style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  background: message.type === 'success' ? '#EAF3DE' : '#FEF2F2',
                  color: message.type === 'success' ? '#3B6D11' : '#DC2626',
                  fontSize: '13px',
                }}>
                  {message.text}
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setMessage({ type: '', text: '' }); }}
                  style={{
                    padding: '10px 20px',
                    background: 'var(--color-background-secondary)',
                    border: '1px solid var(--color-border-tertiary)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    background: '#534AB7',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;