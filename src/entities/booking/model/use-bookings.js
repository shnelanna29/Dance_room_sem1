import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '../../../features/book-class/api/bookings-api';

export const useBookings = () =>
  useQuery({
    queryKey: ['bookings'],
    queryFn: bookingsApi.getBookings,
  });

