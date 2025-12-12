import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthFormLayout from '../components/common/AuthFormLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Все поля обязательны');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/profile');
    } else {
      setError('Неверные данные');
    }
  };

  return (
    <AuthFormLayout>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Вход</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.ru"
          />
        </div>

        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </div>

        <button type="submit" className="gradient-btn" style={{ width: '100%' }}>
          Войти
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </AuthFormLayout>
  );
};

export default Login;
