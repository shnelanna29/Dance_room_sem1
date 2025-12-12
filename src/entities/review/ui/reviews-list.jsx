import React from 'react';

export const ReviewsList = ({ reviews, onEdit, onDelete, editingId, editingText, onUpdateEditingText, onSaveEdit, onCancelEdit, isDeleting, isUpdating }) => {
  if (reviews.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          background: 'white',
          borderRadius: 12,
        }}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          📝 Вы еще не оставили ни одного отзыва
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
      }}
    >
      {reviews.map((review) => (
        <div key={review.id} className="card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '1rem',
            }}
          >
            <div>
              <h4 style={{ marginBottom: '0.25rem' }}>Ваш отзыв</h4>
              <p style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                {'★'.repeat(review.rating)}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onEdit(review.id, review.text)}
                style={{
                  background: '#e0e7ff',
                  color: 'var(--purple)',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(review.id)}
                disabled={isDeleting}
                style={{
                  background: '#fee2e2',
                  color: 'var(--error)',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                🗑️
              </button>
            </div>
          </div>

          {editingId === review.id ? (
            <div style={{ marginBottom: '1rem' }}>
              <textarea
                value={editingText}
                onChange={(e) => onUpdateEditingText(e.target.value)}
                rows="3"
                style={{ marginBottom: '0.5rem' }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => onSaveEdit(review.id, review)}
                  disabled={isUpdating}
                  className="gradient-btn"
                  style={{ flex: 1, padding: '0.5rem' }}
                >
                  {isUpdating ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button
                  onClick={onCancelEdit}
                  style={{
                    background: 'var(--border-color)',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <p
              style={{
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem',
                lineHeight: 1.6,
              }}
            >
              "{review.text}"
            </p>
          )}
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{review.date}</p>
        </div>
      ))}
    </div>
  );
};

