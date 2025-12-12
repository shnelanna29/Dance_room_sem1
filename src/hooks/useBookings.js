// src/hooks/useBookings.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';

export const useBookings = () => {
  const queryClient = useQueryClient();

  // ✅ МУТАЦИЯ 1: Создание брони (оптимистичное обновление)
  const createBookingMutation = useMutation({
    mutationFn: (booking) => dataApi.postBooking(booking),
    onMutate: async (newBooking) => {
      await queryClient.cancelQueries({ queryKey: ['bookings'] });
      const previousBookings = queryClient.getQueryData(['bookings']);
      
      queryClient.setQueryData(['bookings'], (old = []) => [
        ...old,
        { ...newBooking, id: `temp-${Date.now()}`, status: 'pending' }
      ]);
      
      return { previousBookings };
    },
    onError: (err, newBooking, context) => {
      queryClient.setQueryData(['bookings'], context.previousBookings);
      console.error('Ошибка бронирования:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onSuccess: () => {
      console.log('✅ Бронь создана');
    },
  });

  // ✅ МУТАЦИЯ 2: Удаление брони
  const deleteBookingMutation = useMutation({
    mutationFn: (bookingId) => dataApi.deleteBooking(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Ошибка удаления брони:', error);
    },
  });

  return {
    createBookingMutation,
    deleteBookingMutation,
  };
};
