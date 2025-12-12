import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '../../../features/leave-review/api/reviews-api';

export const useReviews = () =>
  useQuery({
    queryKey: ['reviews-home'],
    queryFn: reviewsApi.getExternalReviews,
  });

export const useUserReviews = (userId) =>
  useQuery({
    queryKey: ['reviews', userId],
    queryFn: async () => {
      const res = await reviewsApi.getReviews();
      const all = Array.isArray(res) ? res : [];
      return all.filter((r) => r.userId === userId);
    },
    enabled: !!userId,
  });

