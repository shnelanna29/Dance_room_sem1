import { useQuery } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';

export const useTeachers = () => {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: dataApi.getTeachers,  // ← ДОБАВИТЬ queryFn!
  });
};
