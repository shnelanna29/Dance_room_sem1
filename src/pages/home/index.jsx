import React from 'react';
import { Banner } from '../../shared/ui/banner/banner';
import { StylesSlider, useDanceStyles } from '../../entities/dance-style';
import { ReviewsSlider, useReviews } from '../../entities/review';

export const HomePage = () => {
  const { data: styles = [], isLoading: stylesLoading } = useDanceStyles();
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();

  return (
    <div>
      <Banner />

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title">Наши стили танцев</h2>
          {stylesLoading && <div className="loading">Загрузка стилей...</div>}
          {!stylesLoading && styles.length > 0 && (
            <StylesSlider styles={styles} />
          )}
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <h2 className="section-title">Отзывы учеников</h2>
          {reviewsLoading && (
            <div className="loading">Загрузка отзывов...</div>
          )}
          {!reviewsLoading && reviews.length > 0 && (
            <ReviewsSlider reviews={reviews} />
          )}
        </div>
      </section>
    </div>
  );
};

