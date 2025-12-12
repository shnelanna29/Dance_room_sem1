// src/hooks/useProfilePage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchBookings,
  deleteBooking,
  selectBookingsByUser,
  selectBookingsLoading,
  selectBookingsError,
  clearBookingsError,
} from '../store/slices/bookingsSlice';
import {
  fetchUserReviews,
  createReview,
  updateReview,
  deleteReview,
  selectAverageRating,
  clearReviewsError,
} from '../store/slices/reviewsSlice';
import { setError, clearError as clearAuthError } from '../store/slices/authSlice';

export const useProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const bookingsLoading = useAppSelector(selectBookingsLoading);
  const bookingsError = useAppSelector(selectBookingsError);
  const userBookings = useAppSelector((state) =>
    selectBookingsByUser(state, user ? user.id : null),
  );

  const reviewsState = useAppSelector((state) => state.reviews);
  const reviewsList = reviewsState.items;
  const reviewsLoading = reviewsState.loading;
  const reviewsError = reviewsState.error;
  const avgRating = useAppSelector(selectAverageRating);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    dispatch(fetchBookings());
    dispatch(fetchUserReviews(user.id));
  }, [user, dispatch]);

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !user) return;

    const reviewToSend = {
      userId: user.id,
      name: user.name || 'User',
      email: user.email || 'user@mail.ru',
      text: reviewText,
      rating: Number(rating),
      date: new Date().toLocaleDateString('ru-RU'),
    };

    try {
      await dispatch(createReview(reviewToSend)).unwrap();
      setReviewText('');
      setRating(5);
      setSuccessMsg('Отзыв добавлен');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      dispatch(setError(err.message || 'Ошибка при добавлении отзыва'));
    }
  };

  const handleUpdateReview = async (id, review) => {
    if (!editingText.trim()) return;

    const updatedReview = { ...review, text: editingText };

    try {
      await dispatch(updateReview({ id, review: updatedReview })).unwrap();
      setEditingId(null);
      setEditingText('');
      setSuccessMsg('Отзыв обновлен');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      dispatch(setError(err.message || 'Ошибка при обновлении отзыва'));
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Удалить отзыв?')) return;
    try {
      await dispatch(deleteReview(id)).unwrap();
      setSuccessMsg('Отзыв удален');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      dispatch(setError(err.message || 'Ошибка при удалении отзыва'));
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Отменить запись?')) return;
    try {
      await dispatch(deleteBooking(bookingId)).unwrap();
      setSuccessMsg('Запись отменена');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      dispatch(setError(err.message || 'Ошибка при отмене записи'));
    }
  };

  const handleClearError = () => {
    dispatch(clearBookingsError());
    dispatch(clearReviewsError());
    dispatch(clearAuthError());
  };

  const redirectIfNoUser = () => {
    if (!user) {
      navigate('/login');
      return true;
    }
    return false;
  };

  return {
    user,
    bookingsLoading,
    bookingsError,
    userBookings,
    reviewsLoading,
    reviewsError,
    reviewsList,
    avgRating,
    reviewText,
    setReviewText,
    rating,
    setRating,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    successMsg,
    handlePostReview,
    handleUpdateReview,
    handleDeleteReview,
    handleCancelBooking,
    handleClearError,
    redirectIfNoUser,
  };
};
