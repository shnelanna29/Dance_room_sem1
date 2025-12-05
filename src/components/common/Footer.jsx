import { NavLink } from 'react-router-dom';

const Footer = () => (
  <footer style={{
    background: 'linear-gradient(135deg, #1e293b, #334155)',
    color: 'white',
    padding: '3rem 0 1rem',
    marginTop: 'auto'
  }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* О студии */}
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>💃 Dance Room</h4>
          <p style={{ color: '#cbd5e1', marginBottom: '1rem', lineHeight: 1.6 }}>
            Студия современных танцев в Барнауле. Раскрой свой талант с лучшими преподавателями!
          </p>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
            © 2025 Dance Room. Все права защищены.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>Навигация</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <NavLink to="/" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }} 
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
              >
                🏠 Главная
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
              >
                ℹ️ О нас
              </NavLink>
            </li>
            <li>
              <NavLink to="/schedule" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
              >
                📅 Расписание
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
              >
                👤 Личный кабинет
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>Контакты</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#cbd5e1' }}>
            <a href="tel:+79601234567" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              📱 +7 (960) 123-45-67
            </a>
            <a href="mailto:info@danceroom.ru" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
            >
              📧 info@danceroom.ru
            </a>
            <p style={{ margin: 0 }}>📍 ул. Красивая, 123, Барнаул</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>⏰ Пн-Пт: 10:00-22:00 | Сб-Вс: 11:00-20:00</p>
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
          Сделано с 💜 в Барнауле • Dance Room Studio 2025
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
