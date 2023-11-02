import { useReadLocalStorage } from 'usehooks-ts';
import { useQuery } from '@tanstack/react-query';
import { baseURL } from '../api';
import { IUser } from '@aafiyah/types';

export const useProfile = () => {
  const loggedIn = useReadLocalStorage<boolean>('loggedIn');

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: (): Promise<IUser> =>
      fetch(`${baseURL}/users/me`).then((res) => res.json()),
    enabled: !!loggedIn,
  });

  return {
    data,
  };
};
