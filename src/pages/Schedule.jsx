import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDanceStyles } from '../hooks/useDanceStyles';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';
import ScheduleFilters from '../components/schedule/ScheduleFilters';
import ScheduleCard from '../components/schedule/ScheduleCard';

const Schedule = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: styles = [] } = useDanceStyles();
  const [successMsg, setSuccessMsg] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

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

  const rawSchedule = generateSchedule();

  const filteredSchedule = selectedStyle
    ? rawSchedule.filter((item) => item.styleName === selectedStyle)
    : rawSchedule;

  const scheduleByDay = filteredSchedule.reduce((acc, item) => {
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
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 className="section-title">Расписание занятий</h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Выбери удобное время и запишись на занятие
      </p>

      <ScheduleFilters
        styles={styles}
        selectedStyle={selectedStyle}
        onStyleChange={setSelectedStyle}
      />

      {successMsg && <div className="success">{successMsg}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(scheduleByDay).map(([day, items]) => (
          <div key={day}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{day}</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
              }}
            >
              {items.map((item) => (
                <ScheduleCard
                  key={item.id}
                  item={item}
                  user={user}
                  onBook={handleBook}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
