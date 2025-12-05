import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { dataApi } from '../api/dataApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const users = await dataApi.getUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        login({ id: user.id, name: user.name, email: user.email });
        navigate('/profile');
      } else {
        setError('Неверный email или пароль');
      }
    } catch (err) {
      setError('Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="card">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>🎭 Вход</h2>
          
          {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>{error}</div>}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b' }}>
            Нет аккаунта? <NavLink to="/register" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'none' }}>Зарегистрируйся</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
