import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#1e293b', color: 'white', padding: '3rem 1rem' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h4 style={{ marginBottom: '1rem' }}>О нас</h4>
            <p>Танцевальная студия Dance Room — лучшее место для развития ваших танцевальных навыков.</p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Навигация</h4>
            <Link
              to="/"
              style={{
                display: 'block',
                color: '#cbd5e1',
                textDecoration: 'none',
                marginBottom: '0.5rem',
              }}
            >
              Главная
            </Link>
            <Link
              to="/about"
              style={{
                display: 'block',
                color: '#cbd5e1',
                textDecoration: 'none',
                marginBottom: '0.5rem',
              }}
            >
              О нас
            </Link>
            <Link
              to="/schedule"
              style={{
                display: 'block',
                color: '#cbd5e1',
                textDecoration: 'none',
                marginBottom: '0.5rem',
              }}
            >
              Расписание
            </Link>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem' }}>Контакты</h4>
            <p>Email: info@danceroom.ru</p>
            <p>Тел: +7 (999) 123-45-67</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #475569' }}>
          <p>&copy; 2025 Dance Room. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
