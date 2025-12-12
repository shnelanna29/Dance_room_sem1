import React from 'react';
import { useTeachers } from '../hooks/useTeachers';
import { TeacherCard } from '../components/about/TeacherCard';

const About = () => {
  const { data: teachers = [], isLoading, error } = useTeachers();

  if (isLoading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка загрузки преподавателей</div>;

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <h1 className="section-title">О нас</h1>
      <p style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Наша студия танцев — это место, где каждый может найти свой стиль.
        Мы предлагаем разнообразные направления для всех уровней подготовки.
      </p>

      <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
        Наши преподаватели
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default About;
