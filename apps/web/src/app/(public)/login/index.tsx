"use client";

import { Input, Button, Label } from "@/components";

import { useAuth } from "@/hooks";
import Link from "next/link";
import React from "react";

const LoginScreen = () => {
  const {
    register,
    login,
    formState: { errors },
  } = useAuth();

  return (
    <div className="container py-16">
      <form
        onSubmit={login}
        className="max-w-md w-full p-8 shadow-[0_1px_3px_rgba(0,0,0,.09)] mx-auto bg-white"
      >
        <h4 className="text-2xl font-medium pb-2 border-b">Login</h4>
        <div className="space-y-3 py-8">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="customer@example.com"
              error={errors?.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              error={errors?.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
          </div>
          <div className="flex items-center justify-between gap-10 flex-wrap">
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
              Don&apos;t have an account? Register here
            </Link>
          </div>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginScreen;
