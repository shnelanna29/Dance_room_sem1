// src/components/reviews/ReviewForm.jsx
import React from 'react';
import { ReviewTextField } from './ReviewTextField';
import { RatingSelect } from './RatingSelect';

export const ReviewForm = ({
  text,
  rating,
  onChangeText,
  onChangeRating,
  onSubmit,
  loading,
}) => {
  return (
    <form onSubmit={onSubmit} className="review-form">
      <ReviewTextField value={text} onChange={onChangeText} />
      <RatingSelect value={rating} onChange={onChangeRating} />
      <button type="submit" disabled={loading}>
        {loading ? 'Отправка...' : 'Оставить отзыв'}
      </button>
    </form>
  );
};
