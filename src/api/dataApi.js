const API_BASE = 'http://localhost:3001';

export const dataApi = {
  // Стили
  getStyles: () =>
    fetch(`${API_BASE}/styles`).then((r) => r.json()),

  // Преподаватели
  getTeachers: () =>
    fetch(`${API_BASE}/teachers`).then((r) => r.json()),

  // Пользователи
  getUsers: () =>
    fetch(`${API_BASE}/users`).then((r) => r.json()),

  postUser: (user) =>
    fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((r) => r.json()),

  // Бронирования
  getBookings: () =>
    fetch(`${API_BASE}/bookings`).then((r) => r.json()),

  postBooking: (booking) =>
    fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    }).then((r) => r.json()),

  deleteBooking: (id) => {
    console.log('DELETE booking', id);
    return fetch(`${API_BASE}/bookings/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      console.log('Статус удаления брони:', res.status);
      if (!res.ok && res.status !== 200 && res.status !== 204) {
        throw new Error('Ошибка удаления брони');
      }
      return { success: true, id };
    });
  },

  // Отзывы (для ЛК создаём через json-server)
  getReviews: () =>
    fetch(`${API_BASE}/reviews`).then((r) => r.json()),

  postReview: (review) => {
    console.log('POST review', review);
    return fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    }).then((r) => r.json());
  },
};
