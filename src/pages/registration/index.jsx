import React from 'react';
import { RegisterForm } from '../../features/auth';

export const RegistrationPage = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <RegisterForm />
      </div>
    </div>
  );
};

