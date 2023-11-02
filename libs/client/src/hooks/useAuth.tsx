'use client';

import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AUTH_API } from '../services';
import { ILogin, IRegister } from '@aafiyah/types';

export const useAuth = () => {
  const { handleSubmit, ...form } = useForm<ILogin & IRegister>({
    mode: 'all',
  });

  const login = handleSubmit(async (data: ILogin) => {
    try {
      toast.promise(AUTH_API.login(data), {
        loading: 'Logging in...',
        success: (data) => {
          return 'Logged in!';
        },
        error: (err) => {
          return err.message;
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const signUp = handleSubmit(async (data: IRegister) => {
    try {
      toast.promise(AUTH_API.register(data), {
        loading: 'Registering...',
        success: (data) => {
          return 'Registered!';
        },
        error: (err) => {
          console.log(err);
          return err.message;
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  return { login, signUp, ...form };
};
