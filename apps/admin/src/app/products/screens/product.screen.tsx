"use client";

import { Input, Label } from "@/components";
import React from "react";

export const ProductScreen = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2 space-y-8">
        <div className="bg-white rounded p-6 shadow-box">
          <h3 className="text-xl font-medium">Description</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Customize the basic information of your product
          </p>
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter product name"
                className="text-sm bg-slate-50"
                // error={errors?.email?.message}
                // {...register('email', {
                //   required: 'Email is required',
                //   pattern: {
                //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                //     message: 'Invalid email address',
                //   },
                // })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="textarea"
                placeholder="Enter product description"
                className="text-sm bg-slate-50"
                // error={errors?.email?.message}
                // {...register('email', {
                //   required: 'Email is required',
                //   pattern: {
                //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                //     message: 'Invalid email address',
                //   },
                // })}
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded p-6 shadow-box">
          <h3 className="text-xl font-medium">Pricing</h3>
          <p className="text-sm mt-1 text-gray-500 pb-5">
            Set your pricing strategies to stay ahead of the competition
          </p>
          <div className="space-y-5">
            <div className="flex gap-5">
              <div className="space-y-2 w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min={10}
                  placeholder="Set the product regular price"
                  className="text-sm bg-slate-50"
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="sale_price">Sale Price</Label>
                <Input
                  id="sale_price"
                  type="number"
                  min={0}
                  placeholder="Set the product offer price"
                  className="text-sm bg-slate-50"
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="space-y-2 w-full">
                <Label htmlFor="cost_price">Cost Price</Label>
                <Input
                  id="cost_price"
                  type="number"
                  min={10}
                  placeholder="Set the cost price of the product"
                  className="text-sm bg-slate-50"
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="tax"> Tax Amount (%)</Label>
                <Input
                  id="tax"
                  type="number"
                  min={0}
                  placeholder="Set the product tax amount in percentage (%)"
                  className="text-sm bg-slate-50"
                  // error={errors?.email?.message}
                  // {...register('email', {
                  //   required: 'Email is required',
                  //   pattern: {
                  //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  //     message: 'Invalid email address',
                  //   },
                  // })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white rounded p-6 shadow-box sticky top-20"></div>
      </div>
    </div>
  );
};
