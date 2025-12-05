import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const StylesSlider = ({ styles = [] }) => (
  <Swiper
    modules={[Navigation, Autoplay]}
    spaceBetween={30}
    slidesPerView={3}
    navigation
    autoplay={{ delay: 4000 }}
    breakpoints={{
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }}
  >
    {styles.map(style => (
      <SwiperSlide key={style.id}>
        <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            height: '120px',
            backgroundColor: style.color,
            borderRadius: '16px 16px 0 0',
            margin: '-1.5rem -1.5rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h3 style={{ color: 'white', fontSize: '1.8rem' }}>{style.name}</h3>
          </div>
          <p style={{ color: '#64748b', marginBottom: '1rem', flex: 1 }}>{style.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>👨‍🏫 {style.teacher}</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '700', color: style.color }}>{style.price}₽</span>
          </div>
          <button className="gradient-btn" style={{ width: '100%' }}>Подробнее</button>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default StylesSlider;
