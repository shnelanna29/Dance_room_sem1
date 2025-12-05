// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/common/Banner';
import StylesSlider from '../components/sliders/StylesSlider';
import ReviewsSlider from '../components/sliders/ReviewsSlider';
import { useDanceStyles } from '../hooks/useDanceStyles';
import { useReviews } from '../hooks/useReviews';

const Home = () => {
  const { data: styles = [], isLoading: stylesLoading } = useDanceStyles();
  const { data: reviews = [], isLoading: reviewsLoading } = useReviews();

  return (
    <div>
      <Banner />

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="section-title">🎭 Наши стили танцев</h2>
          {stylesLoading && <div className="loading">Загрузка стилей...</div>}
          {!stylesLoading && styles.length > 0 && (
            <StylesSlider styles={styles} />
          )}
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: '#f1f5f9' }}>
        <div className="container">
          <h2 className="section-title">⭐ Отзывы учеников</h2>
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

export default Home;
