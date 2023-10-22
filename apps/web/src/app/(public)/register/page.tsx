import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Label, Input,Button } from '@aafiyah/ui';

export const metadata: Metadata = {
  title: 'Register',
  description: "Let's get started",
};

const RegisterPage = () => {
  return (
    <div className="container py-16">
      <div className="max-w-md w-full p-8 shadow-[0_1px_3px_rgba(0,0,0,.09)] mx-auto">
        <h4 className="text-2xl font-medium pb-2 border-b">Register</h4>
        <div className="space-y-3 py-8">
          <div className="space-y-2">
            <Label htmlFor='name'>Name</Label>
            <Input id='name' type="text" placeholder="Abdullah Ibn Adam" />
          </div>
          <div className="space-y-2">
            <Label htmlFor='email'>Email address</Label>
            <Input id='email' type="email" placeholder="customer@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type="password" placeholder="********" />
          </div>
          <Link
            href="/login"
            className="mt-1 block text-blue-600 text-[13px] hover:underline"
          >
            Already have an account? Login here
          </Link>
        </div>
        <Button>Sign up</Button>
      </div>
    </div>
  );
};

export default RegisterPage;
