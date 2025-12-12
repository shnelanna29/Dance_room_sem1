// src/components/profile/ProfileReviewForm.jsx
import React from 'react';
import { ReviewForm } from '../reviews/ReviewForm';

export const ProfileReviewForm = ({
  reviewText,
  rating,
  onChangeText,
  onChangeRating,
  onSubmit,
  loading,
}) => {
  return (
    <section className="profile-section profile-review-form">
      <h2>Оставить отзыв</h2>
      <ReviewForm
        text={reviewText}
        rating={rating}
        onChangeText={onChangeText}
        onChangeRating={onChangeRating}
        onSubmit={onSubmit}
        loading={loading}
      />
    </section>
  );
};
