"use client";

import Link from "next/link";
import React from "react";
import { Label, Input, Button } from "@/components";
import { useAuth } from "@/hooks";

const RegisterScreen = () => {
  const {
    register,
    signUp,
    formState: { errors },
  } = useAuth();

  return (
    <div className="container py-16">
      <form
        onSubmit={signUp}
        className="max-w-md w-full p-8 shadow-[0_1px_3px_rgba(0,0,0,.09)] mx-auto bg-white"
      >
        <h4 className="text-2xl font-medium pb-2 border-b">Register</h4>
        <div className="space-y-3 py-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Abdullah Ibn Adam"
              error={errors?.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0131 123 4567"
              error={errors?.phone?.message}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^0[0-9]{10}$/,
                  message: "Invalid phone number",
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
          <Link
            href="/login"
            className="mt-1 block text-blue-600 text-[13px] hover:underline"
          >
            Already have an account? Login here
          </Link>
        </div>
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

export default RegisterScreen;
