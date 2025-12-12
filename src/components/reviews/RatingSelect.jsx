// src/components/reviews/RatingSelect.jsx
import React from 'react';

export const RatingSelect = ({ value, onChange, label = 'Оценка' }) => {
  return (
    <div className="form-group">
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
