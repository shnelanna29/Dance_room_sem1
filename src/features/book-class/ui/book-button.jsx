import React from 'react';

export const BookButton = ({ item, isUserBooked, isFull, onBook, isBooking, user }) => {
  if (!user) {
    return (
      <button
        disabled
        className="gradient-btn"
        style={{ width: '100%', opacity: 0.5 }}
      >
        🔒 Войдите, чтобы записаться
      </button>
    );
  }

  return (
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
  );
};

