import { useQuery } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';

export const useDanceStyles = () => {
  return useQuery({
    queryKey: ['styles'],
    queryFn: dataApi.getDanceStyles,  // ← ДОБАВИТЬ queryFn!
  });
};
