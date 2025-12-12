import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #7c3aed, #db2777)',
        color: 'white',
        padding: '6rem 1rem',
        textAlign: 'center',
      }}
    >
      <div className="container">
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'white' }}>
          Танцевальная студия Dance Room
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Раскрой свой потенциал вместе с нами!
        </p>
        <Link to="/schedule" className="gradient-btn" style={{ background: 'white', color: '#7c3aed' }}>
          Посмотреть расписание
        </Link>
      </div>
    </section>
  );
};

export default Banner;
