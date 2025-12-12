import { useAuth as useAuthContext } from '../../../app/providers/with-auth';

export const useAuth = () => {
  return useAuthContext();
};

