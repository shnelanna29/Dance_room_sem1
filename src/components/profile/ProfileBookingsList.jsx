import React from 'react';

const ProfileBookingsList = ({ bookings, onCancel }) => {
  return (
    <section className="card" style={{ marginBottom: '2rem' }}>
      <h2>Мои записи</h2>
      {bookings.length === 0 ? (
        <p>У вас пока нет записей.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map((b) => (
            <li
              key={b.id}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '8px',
              }}
            >
              <strong>{b.styleName}</strong> — {b.teacher}
              <br />
              {b.date} в {b.time}
              <br />
              <button
                type="button"
                className="gradient-btn"
                onClick={() => onCancel(b.id)}
                style={{ marginTop: '0.5rem' }}
              >
                Отменить запись
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProfileBookingsList;
