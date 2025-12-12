import { useQuery } from '@tanstack/react-query';
import { stylesApi } from '../api/styles-api';

export const useDanceStyles = () =>
  useQuery({
    queryKey: ['styles'],
    queryFn: stylesApi.getStyles,
  });

