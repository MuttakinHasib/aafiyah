import { useReadLocalStorage } from 'usehooks-ts';
import { useQuery } from '@tanstack/react-query';

import { LOGGED_IN } from '../constant';
import { USERS_API } from '../services';

export const useProfile = () => {
  const loggedIn = useReadLocalStorage<boolean>(LOGGED_IN);

  return useQuery({
    queryKey: ['me'],
    queryFn: USERS_API.getMe,
    enabled: !!loggedIn,
  });
};
