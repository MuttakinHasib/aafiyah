'use client';

import { useReadLocalStorage } from 'usehooks-ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LOGGED_IN } from '../constant';
import { USERS_API } from '../services';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { pick } from 'lodash';
import { IUser } from '@aafiyah/types';

export type EditProfileFields = Pick<
  IUser,
  'avatar' | 'name' | 'email' | 'phone'
>;

export const useProfile = () => {
  const loggedIn = useReadLocalStorage<boolean>(LOGGED_IN);
  const queryClient = useQueryClient();
  const { handleSubmit, ...form } = useForm<EditProfileFields>({
    mode: 'all',
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['editProfile'],
    mutationFn: USERS_API.editProfile,
  });

  const userData = useQuery({
    queryKey: ['me'],
    queryFn: USERS_API.getMe,
    enabled: !!loggedIn,
  });

  useEffect(() => {
    if (userData.data) {
      form.reset(pick(userData.data, ['avatar', 'name', 'email', 'phone']));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.data]);

  const editProfile = handleSubmit(async (data) => {
    try {
      toast.promise(
        mutateAsync(data, {
          onSuccess: async () =>
            await queryClient.invalidateQueries({ queryKey: ['me'] }),
        }),
        {
          loading: 'Loading...',
          success: 'Profile updated!',
          error: 'Something went wrong',
        }
      );
    } catch (error) {
      console.error(error);
    }
  });

  return {
    ...userData,
    ...form,
    editProfile,
  };
};
