import React from 'react';
import { useTeachers, TeacherCard } from '../../entities/teacher';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export const AboutPage = () => {
  const { data: teachers = [], isLoading } = useTeachers();

  return (
    <div style={{ background: 'var(--light-bg)' }}>
      <section
        style={{
          background: 'linear-gradient(135deg,#7c3aed,#db2777)',
          color: 'white',
          padding: '4rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>💃 О нас</h1>
          <p
            style={{
              fontSize: '1.1rem',
              maxWidth: 600,
              margin: '0 auto',
              opacity: 0.95,
            }}
          >
            Dance Room — студия современных танцев в Барнауле, где каждый может
            найти свой стиль и раскрыть потенциал вместе с лучшими преподавателями.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>
            👨‍🏫 Наши преподаватели
          </h2>

          {isLoading ? (
            <div className="loading">Загрузка преподавателей...</div>
          ) : teachers.length === 0 ? (
            <div className="loading">Преподаватели не найдены</div>
          ) : (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={4}
              navigation
              autoplay={{ delay: 5000 }}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {teachers.map((teacher) => (
                <SwiperSlide key={teacher.id}>
                  <TeacherCard teacher={teacher} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};

