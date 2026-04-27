import { useState, useEffect } from 'react';
import api from '../services/api';

const ExamCalendar = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        // Since there's no direct exams endpoint, we'll use schedules data
        // In a real app, you'd have a dedicated exams endpoint
        const schedulesData = await api.getSchedules();
        
        // Get grades to identify courses with exams
        const gradesData = await api.getGrades();
        
        // Transform schedules into exam-like entries
        // For demo purposes, we'll create mock exam entries based on courses
        const courseExams = [];
        const processedCourses = new Set();
        
        // Create exam entries for each course that has a grade
        gradesData.forEach(grade => {
          if (!processedCourses.has(grade.subject)) {
            processedCourses.add(grade.subject);
            
            // Find a schedule for this course
            const schedule = schedulesData.find(s => s.subject === grade.subject);
            
            // Determine color based on subject
            const colorMap = {
              'Algorithms': 'purple',
              'Databases': 'blue',
              'Web Development': 'teal',
              'Networks': 'coral',
              'Operating Systems': 'amber',
            };
            const color = colorMap[grade.subject] || 'purple';
            
            // Create mock exam date (in a real app, this would come from the API)
            const examDate = new Date();
            examDate.setDate(examDate.getDate() + Math.floor(Math.random() * 30) + 7); // 7-37 days from now
            
            courseExams.push({
              id: `exam-${grade.id || grade.subject}`,
              subject: grade.subject,
              abbr: grade.subject.substring(0, 3).toUpperCase(),
              date: examDate.toISOString().split('T')[0],
              time: schedule ? schedule.time.split('-')[0] : '09:00',
              room: schedule ? schedule.room : 'TBA',
              type: 'Midterm',
              color,
            });
          }
        });
        
        setExams(courseExams);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch exams:', err);
        setError(err.message || 'Failed to load exam calendar');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  // Check if exam is today
  const isToday = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
  };

  // Check if exam is upcoming (within next 7 days)
  const isUpcoming = (dateStr) => {
    const today = new Date();
    const examDate = new Date(dateStr);
    const diffDays = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  };

  if (loading) {
    return (
      <>
        <div className="greeting">
          <h1>Exam Calendar</h1>
          <p>Upcoming examinations and assessments</p>
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
          <h1>Exam Calendar</h1>
          <p>Upcoming examinations and assessments</p>
        </div>
        <div style={{ padding: '24px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626' }}>
          <p>{error}</p>
        </div>
      </>
    );
  }

  // Sort exams by date
  const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className="greeting">
        <h1>Exam Calendar</h1>
        <p>Upcoming examinations and assessments</p>
      </div>

      {sortedExams.length > 0 ? (
        <>
          {/* Summary Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            <div className="stat-card card">
              <div className="stat-label">Total Exams</div>
              <div className="stat-value">{sortedExams.length}</div>
            </div>
            <div className="stat-card card">
              <div className="stat-label">This Week</div>
              <div className="stat-value" style={{ color: '#993C1D' }}>{sortedExams.filter(e => isUpcoming(e.date)).length}</div>
            </div>
            <div className="stat-card card">
              <div className="stat-label">Today</div>
              <div className="stat-value" style={{ color: '#534AB7' }}>{sortedExams.filter(e => isToday(e.date)).length}</div>
            </div>
          </div>

          {/* Exams List */}
          <div className="card">
            {sortedExams.map((exam, index) => {
              const todayClass = isToday(exam.date) ? 'pill-red' : isUpcoming(exam.date) ? 'pill-amber' : `pill-${exam.color}`;
              const todayLabel = isToday(exam.date) ? 'TODAY' : isUpcoming(exam.date) ? 'UPCOMING' : exam.type.toUpperCase();

              return (
                <div 
                  key={exam.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: index < sortedExams.length - 1 ? '1px solid #e2e8f0' : 'none',
                  }}
                >
                  {/* Date */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: isToday(exam.date) ? '#534AB7' : 'var(--color-text-primary)' }}>
                      {new Date(exam.date).getDate()}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                      {new Date(exam.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                  </div>

                  {/* Exam Info */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <div className={`course-dot dot-${exam.color}`} style={{ width: '32px', height: '32px', fontSize: '10px' }}>
                        {exam.abbr}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>{exam.subject}</div>
                        <div style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)' }}>
                          {exam.time} · Room {exam.room}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <span className={`pill ${todayClass}`} style={{ fontSize: '10px', padding: '4px 12px' }}>
                    {todayLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px', opacity: 0.5 }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>No exams scheduled</p>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>There are no upcoming exams in your calendar</p>
        </div>
      )}
    </>
  );
};

export default ExamCalendar;