import React, { useState } from 'react';
import { useAuth } from '../../app/providers/with-auth';
import { useBookings, BookingsList } from '../../entities/booking';
import { useUserReviews, ReviewsList } from '../../entities/review';
import { ReviewForm, useSubmitReview } from '../../features/leave-review';
import { useBookClass } from '../../features/book-class';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { data: allBookings = [] } = useBookings();
  const { data: reviewsList = [] } = useUserReviews(user?.id);
  const { cancelBooking, isCancelling } = useBookClass();
  const { submitReview, updateReview, deleteReview, isSubmitting, isUpdating, isDeleting } = useSubmitReview();

  const userBookings = allBookings.filter((b) => b.userId === user?.id);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Вы уверены, что хотите отменить эту запись?')) {
      cancelBooking(bookingId);
      setSuccessMsg('✅ Запись успешно отменена!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleReviewSuccess = () => {
    setSuccessMsg('✅ Отзыв успешно добавлен!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleEditReview = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSaveEdit = (id, review) => {
    if (!editingText.trim()) return;
    const updated = { ...review, text: editingText };
    updateReview({ id, review: updated });
    setEditingId(null);
    setEditingText('');
    setSuccessMsg('✅ Отзыв успешно обновлен!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleDeleteReview = (id) => {
    deleteReview(id);
    setSuccessMsg('✅ Отзыв успешно удален!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0', background: 'var(--light-bg)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>📱 Личный кабинет</h1>

        {successMsg && <div className="success">{successMsg}</div>}

        {/* профиль + записи */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div className="card">
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#7c3aed,#db2777)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{user?.name}</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {user?.email}
            </p>
            <div
              style={{
                background: '#f1f5f9',
                padding: '1rem',
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <p style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                Записей на занятия
              </p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--purple)' }}>
                {userBookings.length}
              </p>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>📅 Мои записи на занятия</h2>
            <BookingsList
              bookings={userBookings}
              onCancel={handleCancelBooking}
              isCancelling={isCancelling}
            />
          </div>
        </div>

        {/* форма отзыва */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
            ✍️ Оставить отзыв о студии
          </h2>
          <ReviewForm user={user} onSuccess={handleReviewSuccess} />
        </div>

        {/* мои отзывы */}
        {reviewsList.length > 0 && (
          <div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              📝 Мои отзывы ({reviewsList.length})
            </h2>
            <ReviewsList
              reviews={reviewsList}
              onEdit={handleEditReview}
              onDelete={handleDeleteReview}
              editingId={editingId}
              editingText={editingText}
              onUpdateEditingText={setEditingText}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              isDeleting={isDeleting}
              isUpdating={isUpdating}
            />
          </div>
        )}
      </div>
    </div>
  );
};

