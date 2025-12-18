import { useQuery } from '@tanstack/react-query';
import { dataApi } from '../api/dataApi';

export const useDanceStyles = () =>
  useQuery({
    queryKey: ['styles'],
    queryFn: dataApi.getStyles,
  });
