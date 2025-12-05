import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDanceStyles } from '../hooks/useDanceStyles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';

const Schedule = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: styles = [] } = useDanceStyles();
  const [successMsg, setSuccessMsg] = useState('');

  const { data: allBookings = [] } = useQuery({
    queryKey: ['bookings'],
    queryFn: dataApi.getBookings,
  });

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

  const bookingMutation = useMutation({
    mutationFn: (booking) => dataApi.postBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      setSuccessMsg('✅ Вы успешно записались на занятие!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
  });

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

    bookingMutation.mutate(bookingToSend);
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
                    <div
                      key={item.id}
                      className="card"
                      style={{
                        borderLeft: `4px solid ${item.color}`,
                        opacity: isFull && !isUserBooked ? 0.7 : 1,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '1rem',
                        }}
                      >
                        <div>
                          <h4 style={{ marginBottom: '0.25rem' }}>{item.styleName}</h4>
                          <p
                            style={{
                              margin: 0,
                              color: 'var(--text-secondary)',
                              fontWeight: 600,
                            }}
                          >
                            🕐 {item.time}
                          </p>
                        </div>
                        {isUserBooked && (
                          <div
                            style={{
                              background: '#dcfce7',
                              color: '#16a34a',
                              padding: '0.4rem 0.8rem',
                              borderRadius: 6,
                              fontSize: '0.85rem',
                              fontWeight: 600,
                            }}
                          >
                            ✅ Записан
                          </div>
                        )}
                      </div>

                      <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        <p>👨‍🏫 {item.teacher}</p>
                        <p>📊 Уровень: {item.level}</p>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            fontSize: '0.9rem',
                          }}
                        >
                          <span>
                            Участников: {item.booked}/{item.capacity}
                          </span>
                          <span
                            style={{
                              color: isFull ? '#dc2626' : '#16a34a',
                            }}
                          >
                            {isFull ? '🚫 Полно' : `✅ ${item.capacity - item.booked} мест`}
                          </span>
                        </div>
                        <div
                          style={{
                            background: '#e2e8f0',
                            borderRadius: 8,
                            height: 6,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              background: `linear-gradient(90deg, ${item.color}, #db2777)`,
                              height: '100%',
                              width: `${(item.booked / item.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {user ? (
                        <button
                          onClick={() => handleBook(item)}
                          disabled={bookingMutation.isLoading || isUserBooked || isFull}
                          className="gradient-btn"
                          style={{ width: '100%' }}
                        >
                          {isUserBooked
                            ? '✅ Вы записаны'
                            : isFull
                            ? '🚫 Мест нет'
                            : '✅ Записаться'}
                        </button>
                      ) : (
                        <button
                          disabled
                          className="gradient-btn"
                          style={{ width: '100%', opacity: 0.5 }}
                        >
                          🔒 Войдите, чтобы записаться
                        </button>
                      )}
                    </div>
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

export default Schedule;
