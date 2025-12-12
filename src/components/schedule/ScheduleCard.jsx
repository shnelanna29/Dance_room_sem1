import React from 'react';

const ScheduleCard = ({ item, user, onBook }) => {
  const bookingDisabled = !user || item.bookedUserIds.includes(user?.id);

  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${item.color}`,
      }}
    >
      <h3 style={{ marginBottom: '0.5rem' }}>{item.styleName}</h3>
      <p>
        🕐 <strong>{item.time}</strong>
      </p>
      <p>👨‍🏫 {item.teacher}</p>
      <p>📊 Уровень: {item.level || 'Не указан'}</p>
      <p>
        Места: {item.booked}/{item.capacity}
      </p>
      <button
        type="button"
        className="gradient-btn"
        disabled={bookingDisabled}
        onClick={() => onBook(item)}
        style={{ marginTop: '1rem', width: '100%' }}
      >
        {bookingDisabled ? 'Уже записаны' : 'Записаться'}
      </button>
    </div>
  );
};

export default ScheduleCard;
