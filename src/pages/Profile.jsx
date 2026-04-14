import { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: "Eya Ben Ali",
    studentId: "21CS-001",
    email: "eya.benali@student.issatso.tn",
    phone: "+216 98 765 432",
    birthDate: "12 March 2003",
    nationality: "Tunisian",
    class: "L3-CS-A",
    gpa: "14.6 / 20",
    faculty: "ISSATSO",
    department: "Computer Science"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <>
      <div className="greeting">
        <h1>Profile</h1>
      </div>

      <div className="card" style={{ display: 'flex', gap: '2.5rem', padding: '2rem', alignItems: 'flex-start' }}>
        {/* Profile Picture - Just like your example */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #EEEDFE',
            boxShadow: '0 4px 12px rgba(83, 64, 183, 0.15)'
          }}>
            <img 
              src="https://i.pinimg.com/1200x/85/49/0f/85490f3eb7408f88b97bc98c229e65e9.jpg" 
              alt="Eya Ben Ali"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            style={{
              marginTop: '20px',
              padding: '10px 24px',
              background: isEditing ? '#993C1D' : '#534AB7',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontSize: '13.5px',
              fontWeight: '500'
            }}
          >
            {isEditing ? 'Cancel Editing' : 'Edit Profile'}
          </button>
        </div>

        <div style={{ flex: 1 }}>
          {isEditing ? (
            // Edit Form
            <div>
              <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Edit Your Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Full Name</label>
                  <input name="name" value={studentInfo.name} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Student ID</label>
                  <input name="studentId" value={studentInfo.studentId} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Email</label>
                  <input name="email" value={studentInfo.email} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                  <input name="phone" value={studentInfo.phone} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Date of Birth</label>
                  <input name="birthDate" value={studentInfo.birthDate} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12.5px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Nationality</label>
                  <input name="nationality" value={studentInfo.nationality} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1' }} />
                </div>
              </div>

              <button 
                onClick={handleSave}
                style={{ marginTop: '28px', padding: '12px 28px', background: '#3B6D11', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '500' }}
              >
                Save Changes
              </button>
            </div>
          ) : (
            // Display Mode
            <>
              <div style={{ fontSize: '26px', fontWeight: '600', marginBottom: '8px' }}>{studentInfo.name}</div>
              <div style={{ color: '#64748b', fontSize: '15px', marginBottom: '24px' }}>
                {studentInfo.studentId} • {studentInfo.class} • ISSATSO
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', fontSize: '14.5px' }}>
                <div><strong>Email:</strong> {studentInfo.email}</div>
                <div><strong>Phone:</strong> {studentInfo.phone}</div>
                <div><strong>Date of Birth:</strong> {studentInfo.birthDate}</div>
                <div><strong>Nationality:</strong> {studentInfo.nationality}</div>
                <div><strong>Faculty:</strong> {studentInfo.faculty}</div>
                <div><strong>Department:</strong> {studentInfo.department}</div>
                <div><strong>GPA:</strong> <span style={{ color: '#3B6D11', fontWeight: '600' }}>{studentInfo.gpa}</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;