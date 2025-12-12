import React from 'react';
import { NavLink } from 'react-router-dom';

export const BookingsList = ({ bookings, onCancel, isCancelling }) => {
  if (bookings.length === 0) {
    return (
      <div className="card">
        <p
          style={{
            color: 'var(--text-secondary)',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          У вас нет записей на занятия
        </p>
        <NavLink
          to="/schedule"
          className="gradient-btn"
          style={{
            display: 'block',
            textAlign: 'center',
            textDecoration: 'none',
            padding: '0.75rem',
          }}
        >
          Записаться на занятие
        </NavLink>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="card"
          style={{ borderLeft: '4px solid var(--pink)' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ marginBottom: '0.5rem' }}>{booking.styleName}</h4>
              <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                👨‍🏫 {booking.teacher}
              </p>
              <p style={{ marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                📅 {booking.date} в {booking.time}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                📊 {booking.level}
              </p>
            </div>
            <button
              onClick={() => onCancel(booking.id)}
              disabled={isCancelling}
              style={{
                background: '#fee2e2',
                color: 'var(--error)',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: 8,
                cursor: 'pointer',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                marginLeft: '1rem',
              }}
            >
              {isCancelling ? '⏳ Отмена...' : '✕ Отменить'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

