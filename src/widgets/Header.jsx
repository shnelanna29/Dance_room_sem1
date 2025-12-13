import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      background: 'var(--white)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700',
          background: 'linear-gradient(135deg, #7c3aed, #db2777)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none'
        }}>
          💃 Dance Room
        </NavLink>
        
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <NavLink to="/" style={{ textDecoration: 'none', fontWeight: '500', color: 'var(--text-primary)' }}>Главная</NavLink>
          <NavLink to="/about" style={{ textDecoration: 'none', fontWeight: '500', color: 'var(--text-primary)' }}>О нас</NavLink>
          
          {user ? (
            <>
              <NavLink to="/schedule" style={{ textDecoration: 'none', fontWeight: '500', color: 'var(--text-primary)' }}>Расписание</NavLink>
              <NavLink to="/profile" style={{ textDecoration: 'none', color: 'var(--purple)', fontWeight: '600' }}>

                👤 {user.name}
              </NavLink>
              <button onClick={handleLogout} className="gradient-btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={{ textDecoration: 'none', fontWeight: '500', color: 'var(--text-primary)' }}>Войти</NavLink>
              <NavLink to="/register" className="gradient-btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', textDecoration: 'none' }}>
                Регистрация
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
