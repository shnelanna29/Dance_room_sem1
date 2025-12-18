import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviewsApi';

export const useReviews = () =>
  useQuery({
    queryKey: ['reviews-home'],
    queryFn: reviewsApi.getReviews,
  });
