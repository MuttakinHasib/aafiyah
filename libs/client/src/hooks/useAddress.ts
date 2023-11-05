'use client';

import { useReadLocalStorage } from 'usehooks-ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LOGGED_IN } from '../constant';
import { USERS_API } from '../services';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IAddress } from '@aafiyah/types';

export const useAddress = () => {
  const loggedIn = useReadLocalStorage<boolean>(LOGGED_IN);
  const queryClient = useQueryClient();

  const { handleSubmit, ...form } = useForm<IAddress>({
    mode: 'all',
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['addAddress'],
    mutationFn: USERS_API.editProfile,
  });

  const addOrEditAddress = handleSubmit(async (data) => {
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
    ...form,
    addOrEditAddress,
  };
};
