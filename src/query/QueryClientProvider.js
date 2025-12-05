import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dataApi from '../api/dataApi';
import reviewsApi from '../api/reviewsApi';
import { NavLink, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Queries с обработкой состояний
  const { data: bookingsList = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await dataApi.getBookings();
      return Array.isArray(res) ? res : [];
    },
  });

  const { data: reviewsList = [], isLoading: reviewsLoading, error: reviewsError } = useQuery({
    queryKey: ['reviews', user?.id],
    queryFn: async () => {
      const res = await dataApi.getReviews();
      const all = Array.isArray(res) ? res : [];
      return all.filter(r => r.userId === user?.id);
    },
    enabled: !!user?.id,
  });

  // Мутации с оптимистичными обновлениями
  const createReviewMutation = useMutation({
    mutationFn: (review) => dataApi.postReview(review),
    onSuccess: (created) => {
      queryClient.setQueryData(['reviews', user?.id], (old = []) => [...old, created]);
      setReviewText('');
      setRating(5);
      setSuccessMsg('Отзыв успешно добавлен!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
    onError: (error) => {
      console.error('Ошибка создания отзыва:', error);
      setSuccessMsg('Ошибка при добавлении отзыва');
    }
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ id, review }) => reviewsApi.updateReview(id, review),
    onSuccess: (updated) => {
      queryClient.setQueryData(['reviews', user?.id], (old = []) =>
        old.map(r => r.id === updated.id ? updated : r)
      );
      setEditingId(null);
      setEditingText('');
      setSuccessMsg('Отзыв обновлен!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id) => reviewsApi.deleteReview(id),
    onMutate: async (id) => {
      // Отменяем активные запросы
      await queryClient.cancelQueries({ queryKey: ['reviews', user?.id] });
      
      // Сохраняем предыдущие данные
      const previousReviews = queryClient.getQueryData(['reviews', user?.id]);
      
      // Оптимистично удаляем отзыв
      queryClient.setQueryData(['reviews', user?.id], (old = []) =>
        old.filter(r => r.id !== id)
      );
      
      return { previousReviews };
    },
    onError: (err, id, context) => {
      // Откатываем при ошибке
      queryClient.setQueryData(['reviews', user?.id], context.previousReviews);
      setSuccessMsg('Ошибка при удалении отзыва');
    },
    onSettled: () => {
      // Всегда инвалидируем после завершения
      queryClient.invalidateQueries({ queryKey: ['reviews', user?.id] });
    },
    onSuccess: () => {
      setSuccessMsg('Отзыв удален!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  });

  const cancelBookingMutation = useMutation({
    mutationFn: (id) => dataApi.deleteBooking(id),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      setSuccessMsg('Бронирование отменено!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  });

  const handlePostReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    
    const reviewToSend = {
      userId: user?.id,
      name: user?.name || 'User',
      email: user?.email || 'user@mail.ru',
      text: reviewText,
      rating: Number(rating),
      date: new Date().toLocaleDateString('ru-RU')
    };
    
    createReviewMutation.mutate(reviewToSend);
  };

  const handleUpdateReview = (id, review) => {
    if (!editingText.trim()) return;
    const updated = { ...review, text: editingText };
    updateReviewMutation.mutate({ id, review: updated });
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Отменить бронирование?')) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  const userBookings = bookingsList.filter(b => b.userId === user?.id);

  if (bookingsLoading || reviewsLoading) {
    return (
      <div style={{ minHeight: '80vh', padding: '2rem 0', background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="loading">Загрузка профиля...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0', background: 'var(--light-bg)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Профиль</h1>
        
        {successMsg && (
          <div className="success">{successMsg}</div>
        )}

        {reviewsError && (
          <div className="error" style={{ marginBottom: '1rem' }}>
            Ошибка загрузки отзывов: {reviewsError.message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginBottom: '2rem' }}>
          <div className="card">
            <div style={{
              width: '100%', height: '100px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, #7c3aed, #db2777)', 
              margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontSize: '2.5rem', fontWeight: '700' }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{user?.name}</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {user?.email}
            </p>
            <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Бронирований:</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--purple)' }}>
                {userBookings.length}
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>Мои бронирования</h2>
            {userBookings.length === 0 ? (
              <div className="card">
                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1rem' }}>
                  У вас нет активных бронирований
                </p>
                <NavLink 
                  to="/schedule" 
                  className="gradient-btn" 
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '0.75rem' }}
                >
                  Забронировать занятие
                </NavLink>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {userBookings.map(booking => (
                  <div key={booking.id} className="card" style={{ borderLeft: '4px solid var(--pink)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>{booking.styleName}</h4>
                        <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                          {booking.teacher}
                        </p>
                        <p style={{ marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>
                          {booking.date} {booking.time}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                          {booking.level}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancelBookingMutation.isLoading}
                        style={{
                          background: '#fee2e2', color: 'var(--error)', border: 'none',
                          padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer',
                          fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '1rem'
                        }}
                      >
                        {cancelBookingMutation.isLoading ? '...' : 'Отменить'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Добавить отзыв</h2>
          <form onSubmit={handlePostReview} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label>Отзыв</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={4}
                placeholder="Поделитесь впечатлениями о занятиях..."
                style={{ resize: 'vertical' }}
                disabled={createReviewMutation.isLoading}
              />
            </div>
            <div className="form-group">
              <label>Оценка</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                disabled={createReviewMutation.isLoading}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={createReviewMutation.isLoading}
              className="gradient-btn"
              style={{ width: '100%', padding: '0.75rem' }}
            >
              {createReviewMutation.isLoading ? '...' : 'Опубликовать'}
            </button>
          </form>
        </div>

        <div>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            Мои отзывы ({reviewsList.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {reviewsList.map(review => (
              <div key={review.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>{review.name}</h4>
                    <p style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                      {'★'.repeat(review.rating)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setEditingId(review.id);
                        setEditingText(review.text);
                      }}
                      style={{
                        background: '#e0e7ff', color: 'var(--purple)', border: 'none',
                        padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Изменить
                    </button>
                    <button
                      onClick={() => deleteReviewMutation.mutate(review.id)}
                      disabled={deleteReviewMutation.isLoading}
                      style={{
                        background: '#fee2e2', color: 'var(--error)', border: 'none',
                        padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                {editingId === review.id ? (
                  <div style={{ marginBottom: '1rem' }}>
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                      style={{ marginBottom: '0.5rem', width: '100%' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleUpdateReview(review.id, review)}
                        disabled={updateReviewMutation.isLoading}
                        className="gradient-btn"
                        style={{ flex: 1, padding: '0.5rem' }}
                      >
                        {updateReviewMutation.isLoading ? '...' : 'Сохранить'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditingText('');
                        }}
                        style={{
                          background: 'var(--border-color)', border: 'none',
                          padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer',
                          flex: 1
                        }}
                      >
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                      {review.text}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {review.date}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
          {reviewsList.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                У вас пока нет отзывов
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
