// src/components/common/footer/FooterSection.jsx
import React from 'react';

export const FooterSection = ({ title, children }) => {
  return (
    <div className="footer-section">
      <h3 className="footer-section__title">{title}</h3>
      <div className="footer-section__content">{children}</div>
    </div>
  );
};
import React from 'react';

const FooterSection = ({ title, children }) => {
  return (
    <div>
      <h4 style={{ marginBottom: '1rem' }}>{title}</h4>
      {children}
    </div>
  );
};

export default FooterSection;
