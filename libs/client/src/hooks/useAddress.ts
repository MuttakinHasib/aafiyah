'use client';

import { useReadLocalStorage } from 'usehooks-ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { LOGGED_IN } from '../constant';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IAddress } from '@aafiyah/types';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ADDRESSES_API } from '../services/addresses';
import { useProfile } from './useProfile';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';

type AddressHookOptions = {
  fetch: boolean;
};

export const useAddress = (options?: AddressHookOptions) => {
  const { fetch = false } = options || {};

  const queryClient = useQueryClient();
  const { push } = useRouter();
  const loggedIn = useReadLocalStorage<boolean>(LOGGED_IN);
  const { data: user } = useProfile();
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  const [defaultValues, setDefaultValues] = useState({});

  const isNew = id === 'new';

  const { handleSubmit, ...form } = useForm<IAddress>({
    mode: 'all',
  });

  const { mutateAsync } = useMutation({
    mutationKey: [isNew ? 'addAddress' : 'editAddress'],
    mutationFn: ADDRESSES_API[isNew ? 'create' : 'update'],
  });

  const { data: addresses = [] } = useQuery({
    queryKey: ['addresses'],
    queryFn: ADDRESSES_API.getAll,
    enabled: fetch && !!loggedIn,
  });

  const { data: address } = useQuery({
    queryKey: ['addresses', id],
    queryFn: async () => await ADDRESSES_API.getById(id),
    enabled: !!loggedIn && !isNew && !isEmpty(id),
  });

  useEffect(() => {
    if (user) {
      setDefaultValues((prev) => ({
        ...prev,
        ...user,
      }));
    }

    if (address) {
      setDefaultValues((prev) => ({
        ...prev,
        ...address,
      }));
    }
  }, [user, address]);

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

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

  const removeAddress = async (id: string) => {
    try {
      toast.promise(ADDRESSES_API.remove(id), {
        loading: 'Loading...',
        success: (message) => {
          queryClient.invalidateQueries({ queryKey: ['addresses'] });

          if (pathname === '/dashboard') {
            queryClient.invalidateQueries({ queryKey: ['me'] });
          }

          return message;
        },
        error: ({ message }) => message || 'Something went wrong',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...form,
    addresses,
    removeAddress,
    addOrEditAddress,
  };
};
