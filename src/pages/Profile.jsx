import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { student, updateStudent } = useAuth();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', maxWidth: '900px' }}>
        {/* Profile Card */}
        <div className="card" style={{ textAlign: 'center' }}>
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

        {/* Account Details */}
        <div>
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
    </>
  );
};

export default Profile;