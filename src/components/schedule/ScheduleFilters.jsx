import React from 'react';

const ScheduleFilters = ({ styles, selectedStyle, onStyleChange }) => {
  return (
    <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto 2rem' }}>
      <label>Стиль:</label>
      <select value={selectedStyle} onChange={(e) => onStyleChange(e.target.value)}>
        <option value="">Все стили</option>
        {styles.map((style) => (
          <option key={style.id} value={style.name}>
            {style.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ScheduleFilters;
