import { useQuery } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';

export const useTeachers = () =>
  useQuery({
    queryKey: ['teachers'],
    queryFn: dataApi.getTeachers,
  });
