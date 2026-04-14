const Courses = () => {
  const courses = [
    { abbr: "ALG", name: "Algorithms", prof: "Prof. M. Kacem", credits: 3, progress: 72, color: "purple", next: "Wed 15 Apr, 08:00" },
    { abbr: "DB", name: "Databases", prof: "Prof. H. Jarray", credits: 3, progress: 80, color: "blue", next: "Tue 14 Apr, 10:15" },
    { abbr: "WEB", name: "Web Development", prof: "Prof. S. Ben Romdhane", credits: 4, progress: 85, color: "teal", next: "Tue 14 Apr, 14:00" },
    { abbr: "NET", name: "Networks", prof: "Prof. A. Belhaj", credits: 3, progress: 60, color: "coral", next: "Thu 16 Apr, 08:00" },
    { abbr: "OS", name: "Operating Systems", prof: "Prof. W. Chihaoui", credits: 3, progress: 68, color: "amber", next: "Fri 17 Apr, 10:00" },
  ];

  return (
    <>
      <div className="greeting">
        <h1>Courses</h1>
        <p>Your enrolled modules this semester</p>
      </div>
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
                {course.progress}% complete · {Math.round(course.progress / 5)} / 20 sessions
              </div>
            </div>
            <span className={`pill pill-${course.color}`} style={{ width: 'fit-content' }}>In progress</span>
            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Next: {course.next}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Courses;