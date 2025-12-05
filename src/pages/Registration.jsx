import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dataApi } from '../api/dataApi';

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const users = await dataApi.getUsers();
      if (users.some(u => u.email === formData.email)) {
        setError('Этот email уже зарегистрирован');
        setLoading(false);
        return;
      }

      const newUser = { name: formData.name, email: formData.email, password: formData.password };
      await dataApi.postUser(newUser);
      
      login({ name: formData.name, email: formData.email });
      navigate('/profile');
    } catch (err) {
      setError('Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>✨ Регистрация</h2>
          
          {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
          
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Повтори пароль</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button type="submit" disabled={loading} className="gradient-btn" style={{ width: '100%', padding: '0.75rem' }}>
              {loading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
            Уже есть аккаунт? <NavLink to="/login" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>Войди</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
