import React from 'react';

const ProfileReviewForm = ({
  reviewText,
  rating,
  onTextChange,
  onRatingChange,
  onSubmit,
}) => {
  return (
    <section className="card" style={{ marginBottom: '2rem' }}>
      <h2>Оставить отзыв</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Ваш отзыв</label>
          <textarea
            value={reviewText}
            onChange={(e) => onTextChange(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="Расскажите о своём опыте в студии..."
          />
          <small>
            {reviewText.length}/500
          </small>
        </div>

        <div className="form-group">
          <label>Оценка</label>
          <select value={rating} onChange={(e) => onRatingChange(e.target.value)}>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>

        <button type="submit" className="gradient-btn">
          Оставить отзыв
        </button>
      </form>
    </section>
  );
};

export default ProfileReviewForm;
