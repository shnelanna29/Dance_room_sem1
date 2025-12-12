// src/components/common/inputs/TextInput.jsx
import React from 'react';

export const TextInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
      {error && <div className="field-error">{error}</div>}
    </div>
  );
};
