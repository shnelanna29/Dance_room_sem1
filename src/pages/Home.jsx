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
    <div className="page home-page">
      <Banner />

      <section className="section">
        <h2 className="section__title">Наши стили танцев</h2>
        {stylesLoading ? (
          <p>Загрузка стилей...</p>
        ) : (
          <StylesSlider styles={styles} />
        )}
      </section>

      <section className="section">
        <h2 className="section__title">Отзывы наших учеников</h2>
        {reviewsLoading ? (
          <p>Загрузка отзывов...</p>
        ) : (
          <ReviewsSlider reviews={reviews} />
        )}
      </section>
    </div>
  );
};

export default Home;
