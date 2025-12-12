import React from 'react';

const AuthFormLayout = ({ children }) => {
  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <div
        className="card"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
