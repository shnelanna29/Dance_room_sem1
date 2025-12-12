// src/components/common/inputs/PasswordInput.jsx
import React, { useState } from 'react';
import { TextInput } from './TextInput';

export const PasswordInput = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="password-input-wrapper">
      <TextInput
        {...props}
        type={show ? 'text' : 'password'}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setShow((s) => !s)}
      >
        {show ? 'Скрыть' : 'Показать'}
      </button>
    </div>
  );
};
