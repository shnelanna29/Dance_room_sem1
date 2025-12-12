import React from 'react';

export const ScheduleCard = ({ item, isUserBooked, isFull, onBook, isBooking, user }) => {
  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${item.color}`,
        opacity: isFull && !isUserBooked ? 0.7 : 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <div>
          <h4 style={{ marginBottom: '0.25rem' }}>{item.styleName}</h4>
          <p
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontWeight: 600,
            }}
          >
            🕐 {item.time}
          </p>
        </div>
        {isUserBooked && (
          <div
            style={{
              background: '#dcfce7',
              color: '#16a34a',
              padding: '0.4rem 0.8rem',
              borderRadius: 6,
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            ✅ Записан
          </div>
        )}
      </div>

      <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        <p>👨‍🏫 {item.teacher}</p>
        <p>📊 Уровень: {item.level}</p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
          }}
        >
          <span>
            Участников: {item.booked}/{item.capacity}
          </span>
          <span
            style={{
              color: isFull ? '#dc2626' : '#16a34a',
            }}
          >
            {isFull ? '🚫 Полно' : `✅ ${item.capacity - item.booked} мест`}
          </span>
        </div>
        <div
          style={{
            background: '#e2e8f0',
            borderRadius: 8,
            height: 6,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: `linear-gradient(90deg, ${item.color}, #db2777)`,
              height: '100%',
              width: `${(item.booked / item.capacity) * 100}%`,
            }}
          />
        </div>
      </div>

      {user ? (
        <button
          onClick={() => onBook(item)}
          disabled={isBooking || isUserBooked || isFull}
          className="gradient-btn"
          style={{ width: '100%' }}
        >
          {isUserBooked
            ? '✅ Вы записаны'
            : isFull
            ? '🚫 Мест нет'
            : '✅ Записаться'}
        </button>
      ) : (
        <button
          disabled
          className="gradient-btn"
          style={{ width: '100%', opacity: 0.5 }}
        >
          🔒 Войдите, чтобы записаться
        </button>
      )}
    </div>
  );
};

