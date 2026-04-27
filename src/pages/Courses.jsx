import { useState, useEffect } from 'react';
import api from '../services/api';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Get dashboard data which includes class information
        const dashboardData = await api.getDashboard();
        
        // Get grades to calculate progress
        const gradesData = await api.getGrades();
        
        // Get schedules to find next class
        const schedulesData = await api.getSchedules();
        
        // Transform data into courses format
        // Since the API doesn't have a direct courses endpoint, we'll derive courses from grades
        const courseMap = {};
        
        // Initialize courses from grades
        gradesData.forEach(grade => {
          const subject = grade.subject;
          if (!courseMap[subject]) {
            // Determine color based on subject
            const colorMap = {
              'Algorithms': 'purple',
              'Databases': 'blue',
              'Web Development': 'teal',
              'Networks': 'coral',
              'Operating Systems': 'amber',
            };
            
            const color = colorMap[subject] || 'purple';
            
            courseMap[subject] = {
              abbr: subject.substring(0, 3).toUpperCase(),
              name: subject,
              prof: `Prof. ${subject.charAt(0)}`, // Placeholder professor name
              credits: 3, // Default credits
              progress: 0,
              color,
              next: 'TBA',
            };
          }
        });
        
        // Calculate progress from grades (mock calculation)
        gradesData.forEach(grade => {
          const score = typeof grade.score === 'number' ? grade.score : Number(grade.score);
          if (courseMap[grade.subject]) {
            // Mock progress based on score (higher score = more progress)
            courseMap[grade.subject].progress = Math.min(100, Math.max(20, score * 5));
          }
        });
        
        // Find next class for each course
        schedulesData.forEach(schedule => {
          if (courseMap[schedule.subject]) {
            const dayNames = {
              'MONDAY': 'Mon',
              'TUESDAY': 'Tue',
              'WEDNESDAY': 'Wed',
              'THURSDAY': 'Thu',
              'FRIDAY': 'Fri',
              'SATURDAY': 'Sat',
              'SUNDAY': 'Sun',
            };
            const day = dayNames[schedule.day] || schedule.day;
            const time = schedule.time.split('-')[0];
            courseMap[schedule.subject].next = `${day} ${time}`;
          }
        });
        
        setCourses(Object.values(courseMap));
        setError(null);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError(err.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <>
        <div className="greeting">
          <h1>Courses</h1>
          <p>Your enrolled modules this semester</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
          <svg className="spinner" viewBox="0 0 50 50" style={{ width: '48px', height: '48px', animation: 'spin 1s linear infinite' }}>
            <circle cx="25" cy="25" r="20" stroke="#534AB7" strokeWidth="4" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
          </svg>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="greeting">
          <h1>Courses</h1>
          <p>Your enrolled modules this semester</p>
        </div>
        <div style={{ padding: '24px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626' }}>
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="greeting">
        <h1>Courses</h1>
        <p>Your enrolled modules this semester</p>
      </div>
      
      {courses.length > 0 ? (
        <div style={{ display: 'grid', gap: '12px' }}>
          {courses.map((course, i) => (
            <div key={i} className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div className={`course-dot dot-${course.color}`} style={{ width: '48px', height: '48px', borderRadius: '12px', fontSize: '13px' }}>
                  {course.abbr}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>{course.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {course.prof} · {course.credits} credits
                  </div>
                </div>
              </div>
              <div>
                <div className="progress-bar" style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div className={`progress-fill fill-${course.color}`} style={{ width: `${course.progress}%`, height: '100%' }}></div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
                  {course.progress}% complete
                </div>
              </div>
              <span className={`pill pill-${course.color}`} style={{ width: 'fit-content' }}>In progress</span>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Next: {course.next}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.5 }}>
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
          <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>No courses enrolled</p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>You haven't been enrolled in any courses yet</p>
        </div>
      )}
    </>
  );
};

export default Courses;