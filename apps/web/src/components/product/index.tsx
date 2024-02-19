import { IProduct } from "@/types";
import { Rating } from "@mantine/core";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { ScanIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Button } from "..";

interface Props {
  product: IProduct;
}

export const ProductCard = memo(({ product }: Props) => {
  return (
    <div className="w-[calc((100%-60px)/4)] shadow-box bg-white rounded-sm relative group flex flex-col">
      <div className="absolute top-0 right-0 z-50 flex flex-col overflow-hidden">
        <button
          type="button"
          className="p-2 bg-white transition duration-300 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          aria-label="Quick View"
        >
          <ScanIcon size={18} />
        </button>
        <button
          type="button"
          className="p-2 bg-white transition duration-300 hover:bg-gray-100 text-gray-500 hover:text-gray-700 animate__animated hidden group-hover:inline-block animate__fadeInRight"
          aria-label="Add to wishlist"
        >
          <HeartFilledIcon className="w-[18px] h-[18px]" />
        </button>
      </div>
      <Link
        href={{ pathname: `/products/${product.slug}` }}
        className="aspect-square relative flex items-center justify-center p-5 bg-gray-200"
      >
        <Image
          src={product.image.secure_url}
          height={product.image.height}
          width={product.image.width}
          alt={product.name}
          priority
        />
      </Link>
      <div className="px-4 pt-2 bg-white flex flex-col justify-between flex-1">
        <div className="space-y-1">
          <div className="text-xs text-gray-500 uppercase">
            SKU:{" "}
            {product.type === "simple" ? product.sku : product.variants[0]?.sku}
          </div>
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="text-gray-800 font-medium"
            >
              {product.name}
            </Link>
          </div>
          <div className="flex gap-3 items-center justify-between">
            {/* TODO: fix rating */}
            <Rating readOnly value={3.5} fractions={2} size="xs" />
            {/* TODO: Add review count */}
            <span className="text-xs text-gray-500">3 reviews</span>
          </div>
        </div>
        <div className="py-4 flex items-center justify-between gap-5">
          <div className="text-lg font-medium space-x-2">
            {/* TODO: Set dynamic currency */}
            <span>
              $
              {product.type === "simple"
                ? product.sale_price
                : product.variants[0].sale_price}
            </span>
            <span className="line-through text-sm text-gray-400 font-light">
              $
              {product.type === "simple"
                ? product.price
                : product.variants[0].price}
            </span>
          </div>
          <Button
            variant="link"
            className="text-gray-600 bg-transparent z-[1] p-2 -m-1 relative before:content-[''] before:absolute before:inset-0 before:bg-brand before:z-[-1] before:rounded-full before:scale-50 before:opacity-0 before:transition-all before:duration-300 group-hover:before:scale-105 group-hover:before:opacity-100 group-hover:text-white"
          >
            <ShoppingBag size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
