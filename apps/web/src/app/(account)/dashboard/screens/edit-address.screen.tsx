'use client';

import React from 'react';

import { Label, Input, Button } from '@aafiyah/ui';
import { useAddress } from '@aafiyah/client';
import { useParams } from 'next/navigation';

const muslimCountries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Brunei',
  'Burkina Faso',
  'Chad',
  'Comoros',
  'Djibouti',
  'Egypt',
  'Gambia',
  'Indonesia',
  'Iran',
  'Iraq',
  'Jordan',
  'Kazakhstan',
  'Kuwait',
  'Kyrgyzstan',
  'Lebanon',
  'Libya',
  'Malaysia',
  'Mali',
  'Mauritania',
  'Morocco',
  'Niger',
  'Nigeria',
  'Oman',
  'Pakistan',
  'Palestine',
  'Qatar',
  'Saudi Arabia',
  'Senegal',
  'Sierra Leone',
  'Somalia',
  'Sudan',
  'Syria',
  'Tajikistan',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'United Arab Emirates',
  'Uzbekistan',
  'Yemen',
];

const EditAddressScreen = () => {
  const { id } = useParams();

  const {
    addOrEditAddress,
    register,
    formState: { errors },
  } = useAddress();

  return (
    <div className="shadow-box bg-white font-roboto">
      <h4 className="border-b py-5 px-8 font-medium text-xl">
        {id === 'new' ? 'New' : 'Edit'} Address
      </h4>
      <form onSubmit={addOrEditAddress} className="p-8 max-w-lg w-full">
        <div className="space-y-4 pb-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              error={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                maxLength: 20,
                minLength: 3,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">
              Company <span className="text-gray-500">(Optional)</span>
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Enter your name"
              error={errors?.company?.message}
              {...register('company', {
                minLength: 3,
              })}
            />
          </div>
          {/* TODO: add country select box */}

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              className="bg-gray-100 w-full border-gray-100 px-3 py-[6px] focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none"
              {...register('country', {
                required: 'Country is required',
              })}
            >
              {muslimCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              type="text"
              placeholder="House number and street name"
              error={errors?.street?.message}
              {...register('street', {
                required: 'Street address is required',
                minLength: 3,
              })}
            />
            <Input
              id="street"
              type="text"
              placeholder="Apartment, suite, unit etc. (optional)"
              error={errors?.apartment?.message}
              {...register('apartment')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter your city"
              error={errors.city?.message}
              {...register('city', {
                required: 'City is required',
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              type="text"
              placeholder="Enter your state"
              error={errors.state?.message}
              {...register('state', {
                required: 'State is required',
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              type="number"
              min={0}
              placeholder="1234"
              error={errors.postcode?.message}
              {...register('postcode', {
                required: 'Postcode is required',
              })}
            />
          </div>
          <div className="flex space-x-2 !mb-2">
            <div className="space-y-2 w-full">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+880 1315873250"
                error={errors?.phone?.message}
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              className="border-gray-300"
              id="default"
              type="checkbox"
              {...register('isDefault')}
            />
            <Label htmlFor="default">Set as my default address</Label>
          </div>
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
};

export default EditAddressScreen;
