import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const dataApi = {
  getUsers: () => axios.get(`${API_BASE}/users`).then(res => res.data),
  postUser: (user) => axios.post(`${API_BASE}/users`, user).then(res => res.data),
  getBookings: () => axios.get(`${API_BASE}/bookings`).then(res => res.data),
  postBooking: (booking) => axios.post(`${API_BASE}/bookings`, booking).then(res => res.data),
  deleteBooking: (id) => axios.delete(`${API_BASE}/bookings/${id}`),
  getReviews: () => axios.get(`${API_BASE}/reviews`).then(res => res.data),
  postReview: (review) => axios.post(`${API_BASE}/reviews`, review).then(res => res.data),
  getDanceStyles: () => axios.get(`${API_BASE}/styles`).then(res => res.data),
  getTeachers: () => axios.get(`${API_BASE}/teachers`).then(res => res.data),
};

export default dataApi;
