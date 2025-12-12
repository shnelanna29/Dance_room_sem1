import React, { useState } from 'react';
import { getTeacherImagePath } from '../../../shared/utils/image-loader';

export const TeacherCard = ({ teacher }) => {
  const [imageError, setImageError] = useState(false);
  
  const localImagePath = getTeacherImagePath(teacher.name);
  const showLocalImage = !imageError;
  const fallbackImage = teacher.photo || 'https://via.placeholder.com/200x200';

  return (
    <div className="card" style={{ height: '100%' }}>
      <img
        src={showLocalImage ? localImagePath : fallbackImage}
        alt={teacher.name}
        onError={() => {
          if (showLocalImage) {
            setImageError(true);
          }
        }}
        style={{
          width: '100%',
          height: 200,
          objectFit: 'cover',
          borderRadius: 12,
          marginBottom: '1rem',
        }}
      />
      <h4 style={{ marginBottom: '0.5rem' }}>{teacher.name}</h4>
      <p
        style={{
          marginBottom: '0.5rem',
          color: 'var(--purple)',
          fontWeight: 600,
        }}
      >
        {teacher.specialty}
      </p>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
        Опыт: <strong>{teacher.experience}</strong>
      </p>
    </div>
  );
};

