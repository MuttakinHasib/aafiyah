import { Icons } from "@/components/icons";
import { useProductFilter } from "@/hooks";
import { cn } from "@/utils";
import React, { useState } from "react";

const viewOptions = [
  {
    id: "grid",
    icon: Icons.grid,
  },
  {
    id: "column",
    icon: Icons.column,
  },
  {
    id: "row",
    icon: Icons.row,
  },
  {
    id: "table",
    icon: Icons.table,
  },
];

export const ProductViewOptions = () => {
  const [view, setView] = useState("grid");

  const { filter, handleSortChange } = useProductFilter();
  return (
    <div className="py-3 px-4 shadow-box bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className="p-1 hover:bg-gray-100 transition duration-300 group"
                onClick={() => setView(option.id)}
              >
                <option.icon
                  className={cn(
                    "stroke-white group-hover:fill-brand transition duration-300",
                    view === option.id ? "fill-brand" : "fill-gray-600"
                  )}
                  size={25}
                />
              </button>
            ))}
          </div>
          <p className="text-sm font-normal whitespace-nowrap">
            Showing 1–8 of 24 products
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-normal">Sort by:</p>
            <select
              className="text-sm font-normal"
              value={filter.sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Default</option>
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
