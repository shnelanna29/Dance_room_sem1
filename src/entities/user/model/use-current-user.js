import { useAuth } from '../../../app/providers/with-auth';

export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

