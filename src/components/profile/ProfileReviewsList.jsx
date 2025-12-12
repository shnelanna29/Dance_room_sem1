import React from 'react';

const ProfileReviewsList = ({
  reviews,
  editingId,
  editingText,
  onEditStart,
  onEditCancel,
  onEditTextChange,
  onUpdate,
  onDelete,
}) => {
  return (
    <section className="card">
      <h2>Мои отзывы</h2>
      {reviews.length === 0 ? (
        <p>Вы ещё не оставляли отзывов.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {reviews.map((r) => (
            <li
              key={r.id}
              style={{
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '8px',
              }}
            >
              <p>
                <strong>{r.name}</strong> Оценка: {r.rating}/5
              </p>
              <p>
                <em>{r.date}</em>
              </p>

              {editingId === r.id ? (
                <div>
                  <textarea
                    value={editingText}
                    onChange={(e) => onEditTextChange(e.target.value)}
                    rows={3}
                    style={{ width: '100%', marginBottom: '0.5rem' }}
                  />
                  <button
                    type="button"
                    className="gradient-btn"
                    onClick={() => onUpdate(r.id, r)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Изменить
                  </button>
                  <button
                    type="button"
                    className="gradient-btn"
                    onClick={onEditCancel}
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <>
                  <p>{r.text}</p>
                  <button
                    type="button"
                    className="gradient-btn"
                    onClick={() => onEditStart(r.id, r.text)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Изменить
                  </button>
                  <button
                    type="button"
                    className="gradient-btn"
                    onClick={() => onDelete(r.id)}
                  >
                    Удалить
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProfileReviewsList;
