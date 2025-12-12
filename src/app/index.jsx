import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '../shared/ui/header/header';
import { Footer } from '../shared/ui/footer/footer';
import { ProtectedRoute } from '../shared/lib/react-router/protected-route';
import { HomePage } from '../pages/home/index.jsx';
import { LoginPage } from '../pages/login/index.jsx';
import { RegistrationPage } from '../pages/registration/index.jsx';
import { ProfilePage } from '../pages/profile/index.jsx';
import { SchedulePage } from '../pages/schedule/index.jsx';
import { AboutPage } from '../pages/about/index.jsx';

export const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

