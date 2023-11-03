import { Metadata } from 'next';

import React from 'react';
import LoginScreen from '.';

export const metadata: Metadata = {
  title: 'Login',
  description: 'To access your account please login',
};

const LoginPage = () => <LoginScreen />;

export default LoginPage;
