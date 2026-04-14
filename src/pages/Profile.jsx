const Profile = () => {
  return (
    <>
      <div className="greeting">
        <h1>Profile</h1>
      </div>
      <div className="card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', marginBottom: '1.25rem' }}>
        <div style={{ width: '72px', height: '72px', background: '#EEEDFe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '500', color: '#534AB7', flexShrink: 0 }}>
          EB
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '18px', fontWeight: '500' }}>Eya Ben Ali</div>
          <div style={{ color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Student ID: 21CS-001 · L3 Computer Science, Group A · ISSATSO</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span className="pill pill-purple">Year 3</span>
            <span className="pill pill-green">Active</span>
            <span className="pill pill-blue">Scholarship</span>
          </div>
          <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Email</label><div>eya.benali@student.issatso.tn</div></div>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Phone</label><div>+216 98 765 432</div></div>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Date of birth</label><div>12 March 2003</div></div>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Nationality</label><div>Tunisian</div></div>
          </div>
          <button style={{ marginTop: '16px', padding: '6px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
            Edit profile
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="card">
          <div style={{ fontWeight: '500', marginBottom: '1rem' }}>Academic info</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Faculty</label><div>ISSATSO</div></div>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Department</label><div>Computer Science</div></div>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>Class</label><div>L3-CS-A</div></div>
            <div><label style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>GPA</label><div>14.6 / 20</div></div>
          </div>
        </div>
        <div className="card">
          <div style={{ fontWeight: '500', marginBottom: '1rem' }}>Recent activity</div>
          <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
            • Submitted Web Dev Assignment 2 — Apr 12<br />
            • Grade posted: Networks worksheet 16/20 — Apr 10<br />
            • Missed session: OS lecture — Apr 8<br />
            • Enrolled in semester 6 courses — Mar 28
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;