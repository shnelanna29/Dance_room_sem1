import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="container">
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#7c3aed' }}>
            Dance Room
          </Link>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600 }}>
              Главная
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600 }}>
              О нас
            </Link>
            <Link to="/schedule" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600 }}>
              Расписание
            </Link>

            {user ? (
              <>
                <Link to="/profile" style={{ textDecoration: 'none', color: '#1e293b', fontWeight: 600 }}>
                  Профиль
                </Link>
                <button onClick={logout} className="gradient-btn">
                  Выйти
                </button>
              </>
            ) : (
              <Link to="/login" className="gradient-btn">
                Войти
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
