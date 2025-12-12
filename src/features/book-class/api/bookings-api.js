import { API_BASE } from '../../../shared/api/base-api';

export const bookingsApi = {
  getBookings: () =>
    fetch(`${API_BASE}/bookings`).then((r) => r.json()),

  postBooking: (booking) =>
    fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    }).then((r) => r.json()),

  deleteBooking: (id) => {
    return fetch(`${API_BASE}/bookings/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok && res.status !== 200 && res.status !== 204) {
        throw new Error('Ошибка удаления брони');
      }
      return { success: true, id };
    });
  },
};

