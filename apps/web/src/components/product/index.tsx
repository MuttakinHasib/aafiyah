import { IProduct } from "@/types";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { ScanIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

interface Props {
  product: IProduct;
}

export const ProductCard = memo(({ product }: Props) => {
  return (
    <div className="w-[calc((100%-60px)/4)] shadow-box bg-gray-50 rounded-sm relative group">
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
        className="aspect-square relative flex items-center justify-center p-5"
      >
        <Image
          src={product.image.secure_url}
          height={product.image.height}
          width={product.image.width}
          alt={product.name}
          priority
        />
      </Link>
    </div>
  );
});

ProductCard.displayName = "ProductCard";
