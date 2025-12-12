import React from 'react';

export const RatingSelect = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label>Оценка</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="1">⭐ 1 звезда</option>
        <option value="2">⭐⭐ 2 звезды</option>
        <option value="3">⭐⭐⭐ 3 звезды</option>
        <option value="4">⭐⭐⭐⭐ 4 звезды</option>
        <option value="5">⭐⭐⭐⭐⭐ 5 звёзд</option>
      </select>
    </div>
  );
};

