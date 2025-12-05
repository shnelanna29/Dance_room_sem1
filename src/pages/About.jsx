import React from 'react';
import { useTeachers } from '../hooks/useTeachers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const About = () => {
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

      {/* ...блоки «Почему выбирают нас» и контакты можно оставить как у тебя... */}

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
                  <div className="card" style={{ height: '100%' }}>
                    <img
                      src={teacher.photo || 'https://via.placeholder.com/200x200'}
                      alt={teacher.name}
                      style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 12,
                        marginBottom: '1rem',
                      }}
                    />
                    <h4 style={{ marginBottom: '0.5rem' }}>{teacher.name}</h4>
                    <p
                      style={{
                        marginBottom: '0.5rem',
                        color: 'var(--purple)',
                        fontWeight: 600,
                      }}
                    >
                      {teacher.specialty}
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                      ⭐ Опыт: <strong>{teacher.experience}</strong>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
