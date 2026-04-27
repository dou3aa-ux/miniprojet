import { useState, useEffect } from 'react';
import api from '../services/api';

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const data = await api.getGrades();
      setGrades(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch grades:', err);
      setError(err.message || 'Failed to load grades');
    } finally {
      setLoading(false);
    }
  };

  // Calculate average grade
  const calculateAverage = () => {
    if (grades.length === 0) return 'N/A';
    const scores = grades.map(g => typeof g.score === 'number' ? g.score : Number(g.score));
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avg.toFixed(2);
  };

  // Get grade color based on score
  const getGradeColor = (score) => {
    const numScore = typeof score === 'number' ? score : Number(score);
    if (numScore >= 16) return { bg: '#EAF3DE', text: '#3B6D11', pill: 'pill-green' };
    if (numScore >= 14) return { bg: '#E6F1FB', text: '#185FA5', pill: 'pill-blue' };
    if (numScore >= 12) return { bg: '#FAEEDA', text: '#854F0B', pill: 'pill-amber' };
    if (numScore >= 10) return { bg: '#FAECE7', text: '#993C1D', pill: 'pill-red' };
    return { bg: '#FCEBEB', text: '#A32D2D', pill: 'pill-red' };
  };

  // Get grade mention
  const getMention = (score) => {
    const numScore = typeof score === 'number' ? score : Number(score);
    if (numScore >= 16) return 'Excellent';
    if (numScore >= 14) return 'Good';
    if (numScore >= 12) return 'Satisfactory';
    if (numScore >= 10) return 'Pass';
    return 'Fail';
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

  if (error) {
    return (
      <div style={{ padding: '24px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#DC2626' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="greeting">
        <h1>Grades</h1>
        <p>Your academic performance overview</p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <div className="stat-card card">
          <div className="stat-label">Average Grade</div>
          <div className="stat-value">{calculateAverage()}</div>
          <div className="stat-change" style={{ color: 'var(--color-text-tertiary)' }}>
            out of 20
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Total Subjects</div>
          <div className="stat-value">{grades.length}</div>
          <div className="stat-change" style={{ color: 'var(--color-text-tertiary)' }}>
            graded
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Highest Grade</div>
          <div className="stat-value">
            {grades.length > 0 ? Math.max(...grades.map(g => typeof g.score === 'number' ? g.score : Number(g.score))).toFixed(1) : 'N/A'}
          </div>
          <div className="stat-change stat-up">Best performance</div>
        </div>
        <div className="stat-card card">
          <div className="stat-label">Passing Rate</div>
          <div className="stat-value">
            {grades.length > 0 ? Math.round((grades.filter(g => (typeof g.score === 'number' ? g.score : Number(g.score)) >= 10).length / grades.length) * 100) : 0}%
          </div>
          <div className="stat-change" style={{ color: 'var(--color-text-tertiary)' }}>
            {grades.filter(g => (typeof g.score === 'number' ? g.score : Number(g.score)) < 10).length} failing
          </div>
        </div>
      </div>

      {/* Grades List */}
      <div className="card">
        <div style={{ fontWeight: '600', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Grade Details</span>
          <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 'normal' }}>
            {grades.length} subjects
          </span>
        </div>

        {grades.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Header */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr 1fr 1fr', 
              gap: '12px', 
              padding: '10px 12px', 
              background: '#f8fafc', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              <span>Subject</span>
              <span>Score</span>
              <span>Status</span>
              <span style={{ textAlign: 'right' }}>Grade</span>
            </div>

            {/* Grades */}
            {grades.map((grade, index) => {
              const score = typeof grade.score === 'number' ? grade.score : Number(grade.score);
              const color = getGradeColor(score);
              const mention = getMention(score);

              return (
                <div 
                  key={grade.id || index}
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr 1fr 1fr', 
                    gap: '12px', 
                    padding: '14px 12px', 
                    borderBottom: index < grades.length - 1 ? '1px solid #e2e8f0' : 'none',
                    alignItems: 'center',
                    transition: 'background 0.15s',
                    borderRadius: '8px',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontWeight: '500' }}>{grade.subject}</span>
                  <span style={{ fontSize: '16px', fontWeight: '600', color: color.text }}>
                    {score.toFixed(1)}
                  </span>
                  <span className={`pill ${color.pill}`} style={{ width: 'fit-content' }}>
                    {mention}
                  </span>
                  <span style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-tertiary)' }}>
                    ID: {grade.id?.substring(0, 8)}...
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '48px 24px', 
            color: 'var(--color-text-tertiary)' 
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style={{ marginBottom: '12px', opacity: 0.5 }}>
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
            <p style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>No grades yet</p>
            <p style={{ fontSize: '13px' }}>Your grades will appear here once they are posted</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Grades;