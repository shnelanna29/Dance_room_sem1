import React from 'react';

export const TeacherCard = ({ teacher }) => {
  return (
    <div className="card">
      <h3 style={{ marginBottom: '0.5rem' }}>{teacher.name}</h3>
      <p style={{ color: '#7c3aed', fontWeight: 600, marginBottom: '0.5rem' }}>
        {teacher.specialty}
      </p>
      <p style={{ color: '#64748b' }}>{teacher.bio}</p>
    </div>
  );
};
