import { Avatar } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { CameraIcon } from '@heroicons/react/24/outline';
import { Label, Input, Button } from '@aafiyah/ui';

export const metadata = {
  title: 'Edit Profile',
};

const EditProfilePage = () => {
  return (
    <Theme>
      <div className="shadow-box bg-white">
        <h4 className="border-b py-5 px-8 font-medium text-xl">Edit Profile</h4>
        <div className="p-8 max-w-md w-full">
          <label
            htmlFor="avatar"
            className="relative overflow-hidden rounded-full group h-[96px] w-[96px] block cursor-pointer"
          >
            <Avatar radius="full" size="7" src="" fallback="MH" />
            <input id="avatar" type="file" className="hidden" />
            <div className="absolute inset-0 bg-black/70 z-50 grid place-content-center group-hover:opacity-100 opacity-0 transition duration-300">
              <CameraIcon className="w-6 h-6 text-white" />
            </div>
          </label>
          <div className="space-y-3 py-8">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+880 1315873250" />
            </div>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </Theme>
  );
};

export default EditProfilePage;
