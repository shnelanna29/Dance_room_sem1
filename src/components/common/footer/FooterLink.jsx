import React from 'react';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        display: 'block',
        color: '#cbd5e1',
        textDecoration: 'none',
        marginBottom: '0.5rem',
      }}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
