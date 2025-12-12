import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews-api';

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (review) => reviewsApi.postReview(review),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, review }) => reviewsApi.updateReview(id, review),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => reviewsApi.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
  });

  return {
    submitReview: (review, options) => createMutation.mutate(review, options),
    updateReview: (data, options) => updateMutation.mutate(data, options),
    deleteReview: (id, options) => deleteMutation.mutate(id, options),
    isSubmitting: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
};

