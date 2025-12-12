// src/components/profile/ProfileReviewsList.jsx
import React from 'react';

export const ProfileReviewsList = ({
  reviews,
  editingId,
  editingText,
  onStartEdit,
  onChangeEditingText,
  onSaveEdit,
  onDelete,
}) => {
  return (
    <section className="profile-section profile-reviews">
      <h2>Мои отзывы</h2>

      {reviews.length === 0 ? (
        <p>Вы ещё не оставляли отзывов.</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => {
            const isEditing = editingId === review.id;
            return (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <strong>{review.styleName || review.name}</strong>
                  <span>Оценка: {review.rating}</span>
                  <span>{review.date}</span>
                </div>

                {isEditing ? (
                  <textarea
                    value={editingText}
                    onChange={(e) => onChangeEditingText(e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p>{review.text}</p>
                )}

                <div className="review-actions">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onSaveEdit(review.id, review)}
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={() => onStartEdit(null, '')}
                      >
                        Отмена
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onStartEdit(review.id, review.text)}
                    >
                      Изменить
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDelete(review.id)}
                  >
                    Удалить
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
