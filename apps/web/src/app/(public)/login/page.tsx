import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Label, Input,Button } from '@aafiyah/ui';

export const metadata: Metadata = {
  title: 'Login',
  description: 'To access your account please login',
};

const LoginPage = () => {
  return (
    <div className="container py-16">
      <div className="max-w-md w-full p-8 shadow-[0_1px_3px_rgba(0,0,0,.09)] mx-auto">
        <h4 className="text-2xl font-medium pb-2 border-b">Login</h4>
        <div className="space-y-3 py-8">
          <div className="space-y-2">
            <Label>Email address</Label>
            <Input type="email" placeholder="customer@example.com" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="********" />
          </div>
          <div className='flex items-center justify-between gap-10 flex-wrap'>
          <Link
            target="_blank"
            href="/forget-password"
            className="text-blue-600 text-[13px] hover:underline"
          >
            Forget password?
          </Link>
          <Link
            href="/register"
            className="text-gray-600 text-[13px] hover:underline"
          >
            Don't have an account? Register here
          </Link>
          </div>
        </div>
        <Button>Login</Button>
        
      </div>
    </div>
  );
};

export default LoginPage;
