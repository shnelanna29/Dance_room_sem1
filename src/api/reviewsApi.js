// src/api/reviewsApi.js
const EXTERNAL_URL = 'https://jsonplaceholder.typicode.com/comments?_limit=20';

export const reviewsApi = {
  // внешний GET для главной и ЛК (если нужно)
  getReviews: async () => {
    try {
      const res = await fetch(EXTERNAL_URL);
      if (!res.ok) {
        throw new Error('Ошибка загрузки внешних отзывов');
      }
      const data = await res.json();

      // Приводим к формату {id, name, rating, text, date}
      return data.map((item, index) => ({
        id: item.id,
        userId: item.postId ?? index + 1,
        name: item.name.split(' ')[0],
        email: item.email,
        rating: (index % 2) + 4, // 4–5 звёзд
        text: item.body,
        date: new Date().toLocaleDateString('ru-RU'),
      }));
    } catch (e) {
      console.error('GET внешние отзывы ошибка:', e);
      return [];
    }
  },
};
