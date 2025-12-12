import React, { useState } from 'react';
import { useAuth } from '../../app/providers/with-auth';
import { useDanceStyles } from '../../entities/dance-style';
import { useBookings } from '../../entities/booking';
import { ScheduleCard } from '../../entities/schedule-class';
import { useBookClass } from '../../features/book-class';

export const SchedulePage = () => {
  const { user } = useAuth();
  const { data: styles = [] } = useDanceStyles();
  const { data: allBookings = [] } = useBookings();
  const { bookClass, isBooking } = useBookClass();
  const [successMsg, setSuccessMsg] = useState('');

  const generateSchedule = () => {
    const schedule = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) continue;

      const times = ['10:00', '14:00', '18:00'];
      times.forEach((time, idx) => {
        const style = styles[idx % styles.length];
        if (!style) return;

        const classId = `${date.toISOString().split('T')[0]}-${time}-${style.name}`;
        const classBookings = allBookings.filter((b) => b.classId === classId);

        schedule.push({
          id: classId,
          date: date.toISOString().split('T')[0],
          dateFormatted: date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
          time,
          styleName: style.name,
          teacher: style.teacher,
          level: style.level,
          color: style.color,
          capacity: 15,
          booked: classBookings.length,
          bookedUserIds: classBookings.map((b) => b.userId),
        });
      });
    }

    return schedule;
  };

  const schedule = generateSchedule();

  const scheduleByDay = schedule.reduce((acc, item) => {
    acc[item.dateFormatted] = acc[item.dateFormatted] || [];
    acc[item.dateFormatted].push(item);
    return acc;
  }, {});

  const handleBook = (item) => {
    if (!user) {
      alert('Пожалуйста, войдите в аккаунт');
      return;
    }
    if (item.bookedUserIds.includes(user.id)) {
      alert('Вы уже записаны на это занятие');
      return;
    }
    if (item.booked >= item.capacity) {
      alert('Свободных мест нет');
      return;
    }

    const bookingToSend = {
      userId: user.id,
      classId: item.id,
      styleName: item.styleName,
      teacher: item.teacher,
      date: item.dateFormatted,
      time: item.time,
      level: item.level,
    };

    bookClass(bookingToSend, {
      onSuccess: () => {
        setSuccessMsg('✅ Вы успешно записались на занятие!');
        setTimeout(() => setSuccessMsg(''), 3000);
      },
    });
  };

  return (
    <div style={{ minHeight: '80vh', padding: '2rem 0', background: 'var(--light-bg)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅 Расписание занятий</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          Выбери удобное время и запишись на занятие
        </p>

        {successMsg && <div className="success">{successMsg}</div>}

        <div style={{ display: 'grid', gap: '2rem' }}>
          {Object.entries(scheduleByDay).map(([day, daySchedule]) => (
            <div key={day}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  color: 'white',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px 12px 0 0',
                }}
              >
                <h3 style={{ margin: 0 }}>📆 {day}</h3>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '1rem',
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '0 0 12px 12px',
                }}
              >
                {daySchedule.map((item) => {
                  const isUserBooked = item.bookedUserIds.includes(user?.id);
                  const isFull = item.booked >= item.capacity;

                  return (
                    <ScheduleCard
                      key={item.id}
                      item={item}
                      isUserBooked={isUserBooked}
                      isFull={isFull}
                      onBook={handleBook}
                      isBooking={isBooking}
                      user={user}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

