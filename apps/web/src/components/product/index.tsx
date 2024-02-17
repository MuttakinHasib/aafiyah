import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";

interface Props {
  product: IProduct;
}

export const ProductCard = memo(({ product }: Props) => {
  return (
    <div className="w-[calc((100%-60px)/4)] shadow-box bg-white rounded-sm">
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
