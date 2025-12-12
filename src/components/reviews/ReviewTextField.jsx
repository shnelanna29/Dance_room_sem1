// src/components/reviews/ReviewTextField.jsx
import React from 'react';

export const ReviewTextField = ({ value, onChange, label = 'Ваш отзыв' }) => {
  const maxLength = 500;
  return (
    <div className="form-group">
      <label>
        {label}
        <textarea
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={4}
        />
      </label>
      <div className="field-hint">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};
