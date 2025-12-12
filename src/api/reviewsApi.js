import axios from 'axios';

// внешний mock-API только для отзывов
const API_BASE = 'https://jsonplaceholder.typicode.com';

export const reviewsApi = {
  getReviews: () =>
    axios.get(`${API_BASE}/comments?_limit=10`).then((res) =>
      // мапим поля внешнего API к формату, который уже ожидает ReviewsSlider
      res.data.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        text: item.body,
        rating: 5,
        date: 'Внешний API',
      }))
    ),

  // эти методы можно заглушить, чтобы не ломать профиль
  updateReview: (id, review) => Promise.resolve({ ...review, id }),
  deleteReview: (id) => Promise.resolve(),
};

export default reviewsApi;
