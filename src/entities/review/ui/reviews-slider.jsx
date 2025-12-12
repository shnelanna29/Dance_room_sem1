import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ReviewsSlider = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return <div className="loading">Загрузка отзывов...</div>;
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={3}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
      style={{ paddingBottom: '60px' }}
    >
      {reviews.map(review => (
        <SwiperSlide key={review.id}>
          <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '1.2rem' }}>
                  {review.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', fontWeight: '600' }}>
                  {review.name}
                </h4>
                <div style={{ color: '#fbbf24', fontSize: '0.9rem' }}>
                  {'★'.repeat(review.rating)}
                </div>
              </div>
            </div>
            <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>
              "{review.text}"
            </p>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              {review.date}
            </p>
          </div>
        </SwiperSlide>
      ))}

      {/* Кнопки навигации */}
      <div className="swiper-button-prev" style={{
        color: 'var(--purple)',
        background: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }} />
      <div className="swiper-button-next" style={{
        color: 'var(--purple)',
        background: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }} />
    </Swiper>
  );
};

