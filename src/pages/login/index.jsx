import React from 'react';
import { LoginForm } from '../../features/auth';

export const LoginPage = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <LoginForm />
      </div>
    </div>
  );
};

