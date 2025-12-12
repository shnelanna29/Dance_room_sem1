import { API_BASE } from '../../../shared/api/base-api';

const EXTERNAL_URL = 'https://jsonplaceholder.typicode.com/comments?_limit=20';

export const reviewsApi = {
  // Внешние отзывы для главной страницы
  getExternalReviews: async () => {
    try {
      const res = await fetch(EXTERNAL_URL);
      if (!res.ok) {
        throw new Error('Ошибка загрузки внешних отзывов');
      }
      const data = await res.json();

      return data.map((item, index) => ({
        id: item.id,
        userId: item.postId ?? index + 1,
        name: item.name.split(' ')[0],
        email: item.email,
        rating: (index % 2) + 4,
        text: item.body,
        date: new Date().toLocaleDateString('ru-RU'),
      }));
    } catch (e) {
      console.error('GET внешние отзывы ошибка:', e);
      return [];
    }
  },

  // Локальные отзывы из json-server
  getReviews: () =>
    fetch(`${API_BASE}/reviews`).then((r) => r.json()),

  postReview: (review) => {
    return fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    }).then((r) => r.json());
  },

  updateReview: (id, review) => {
    return fetch(`${API_BASE}/reviews/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    }).then((r) => r.json());
  },

  deleteReview: (id) => {
    return fetch(`${API_BASE}/reviews/${id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (!res.ok && res.status !== 200 && res.status !== 204) {
        throw new Error('Ошибка удаления отзыва');
      }
      return { success: true, id };
    });
  },
};

