import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '../api/bookings-api';

export const useBookClass = () => {
  const queryClient = useQueryClient();

  const bookingMutation = useMutation({
    mutationFn: (booking) => bookingsApi.postBooking(booking),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: (id) => bookingsApi.deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
    },
  });

  return {
    bookClass: (booking, options) => bookingMutation.mutate(booking, options),
    cancelBooking: cancelBookingMutation.mutate,
    isBooking: bookingMutation.isLoading,
    isCancelling: cancelBookingMutation.isLoading,
  };
};

