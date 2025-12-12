import React from 'react';

const ProfileInfo = ({ user, avgRating }) => {
  return (
    <section className="card" style={{ marginBottom: '2rem' }}>
      <h2>Личные данные</h2>
      <p>
        <strong>Имя:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Средний рейтинг:</strong> {avgRating}
      </p>
    </section>
  );
};

export default ProfileInfo;
