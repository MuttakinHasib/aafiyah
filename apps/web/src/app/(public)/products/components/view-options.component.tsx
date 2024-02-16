import { Icons } from "@/components/icons";
import React from "react";

export const ProductViewOptions = () => {
  return (
    <div className="py-3 px-4 shadow-box bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 transition duration-300 group"
            >
              <Icons.grid
                className="stroke-white fill-gray-600 group-hover:fill-brand"
                size={25}
              />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 transition duration-300 group"
            >
              <Icons.column
                className="stroke-white fill-gray-600 group-hover:fill-brand"
                size={25}
              />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 transition duration-300 group"
            >
              <Icons.row
                className="stroke-white fill-gray-600 group-hover:fill-brand"
                size={25}
              />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 transition duration-300 group"
            >
              <Icons.table
                className="stroke-white fill-gray-600 group-hover:fill-brand"
                size={25}
              />
            </button>
          </div>
          <p className="text-sm font-normal whitespace-nowrap">
            Showing 1–8 of 24 products
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-normal">Sort by:</p>
            <select className="text-sm font-normal">
              <option value="featured">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="price-ascending">Price: Low to High</option>
              <option value="price-descending">Price: High to Low</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="oldest">Oldest to Newest</option>
              <option value="newest">Newest to Oldest</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-normal">Show:</p>
            <select className="text-sm font-normal">
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="24">24</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
