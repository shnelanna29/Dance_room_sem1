import { useQuery } from '@tanstack/react-query';
import { teachersApi } from '../api/teachers-api';

export const useTeachers = () =>
  useQuery({
    queryKey: ['teachers'],
    queryFn: teachersApi.getTeachers,
  });

