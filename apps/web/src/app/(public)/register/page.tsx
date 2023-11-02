import { Metadata } from 'next';
import React from 'react';
import RegisterScreen from '.';

export const metadata: Metadata = {
  title: 'Register',
  description: "Let's get started",
};

const RegisterPage = () => <RegisterScreen />;

export default RegisterPage;
