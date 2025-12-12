import React from 'react';

export const ReviewTextField = ({ value, onChange, placeholder = 'Поделись своим впечатлением о студии...' }) => {
  return (
    <div className="form-group">
      <label>Твой отзыв</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        rows="4"
        placeholder={placeholder}
        style={{ resize: 'vertical' }}
      />
    </div>
  );
};

