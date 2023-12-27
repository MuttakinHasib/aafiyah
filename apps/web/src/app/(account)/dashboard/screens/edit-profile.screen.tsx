"use client";

import { Avatar } from "@radix-ui/themes";

import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useProfile } from "@/hooks";
import { fallbackName } from "@/utils";
import { Button, Label } from "@/components/ui";
import { Input } from "@/components";

const EditProfileScreen = () => {
  const {
    editProfile,
    register,
    getValues,
    formState: { errors },
  } = useProfile();

  return (
    <Theme>
      <div className="shadow-box bg-white font-roboto">
        <h4 className="border-b py-5 px-8 font-medium text-xl">Edit Profile</h4>
        <form onSubmit={editProfile} className="p-8 max-w-md w-full">
          <label
            htmlFor="avatar"
            className="relative overflow-hidden rounded-full group h-[96px] w-[96px] block cursor-pointer"
          >
            <Avatar
              radius="full"
              size="7"
              src={getValues("avatar")}
              fallback={fallbackName(getValues("name"))}
            />
            <input id="avatar" type="file" className="hidden" />
            <div className="absolute inset-0 bg-black/70 z-50 grid place-content-center group-hover:opacity-100 opacity-0 transition duration-300">
              <CameraIcon className="w-6 h-6 text-white" />
            </div>
          </label>
          <div className="space-y-3 py-8">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                error={errors.name?.message}
                {...register("name", {
                  required: "Name is required",
                  maxLength: 20,
                  minLength: 3,
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                disabled
                readOnly
                error={errors.email?.message}
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
                placeholder="+880 1315873250"
                error={errors?.phone?.message}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
            </div>
          </div>
          <Button>Save</Button>
        </form>
      </div>
    </Theme>
  );
};

export default EditProfileScreen;
