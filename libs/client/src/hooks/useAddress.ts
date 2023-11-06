'use client';

import { useReadLocalStorage } from 'usehooks-ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LOGGED_IN } from '../constant';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IAddress } from '@aafiyah/types';
import { useParams, useRouter } from 'next/navigation';
import { ADDRESSES_API } from '../services/addresses';
import { useProfile } from './useProfile';
import { useEffect } from 'react';

export const useAddress = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  const loggedIn = useReadLocalStorage<boolean>(LOGGED_IN);
  const { data: user } = useProfile();
  const { id } = useParams<{ id: string }>();

  const isNew = id === 'new';

  const { handleSubmit, ...form } = useForm<IAddress>({
    mode: 'all',
  });

  const { mutateAsync } = useMutation({
    mutationKey: [isNew ? 'addAddress' : 'editAddress'],
    mutationFn: ADDRESSES_API['create'],
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addOrEditAddress = handleSubmit(async (data) => {
    try {
      toast.promise(
        mutateAsync(data, {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['addresses'] });
            push('/dashboard/address-book');
          },
        }),
        {
          loading: 'Loading...',
          success: (message) => message,
          error: ({ message }) => message || 'Something went wrong',
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
