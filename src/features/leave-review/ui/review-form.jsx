import React, { useState } from 'react';
import { ReviewTextField } from './review-text-field';
import { RatingSelect } from './rating-select';
import { useSubmitReview } from '../model/use-submit-review';

export const ReviewForm = ({ user, onSuccess }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const { submitReview, isSubmitting } = useSubmitReview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const reviewToSend = {
      userId: user?.id,
      name: user?.name || 'Аноним',
      email: user?.email || 'user@mail.ru',
      text: reviewText,
      rating: Number(rating),
      date: new Date().toLocaleDateString('ru-RU'),
    };

    submitReview(reviewToSend, {
      onSuccess: () => {
        setReviewText('');
        setRating(5);
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ReviewTextField value={reviewText} onChange={setReviewText} />
      <RatingSelect value={rating} onChange={setRating} />
      <button
        type="submit"
        disabled={isSubmitting}
        className="gradient-btn"
        style={{ width: '100%', padding: '0.75rem' }}
      >
        {isSubmitting ? '⏳ Отправка...' : '✅ Отправить отзыв'}
      </button>
    </form>
  );
};

