"use client";

import { ProductCard } from "@/components";
import { useProduct } from "@/hooks";
import React from "react";

const ProductsScreen = () => {
  const {
    data: { products },
  } = useProduct({ fetch: true });
  return (
    <div className="flex flex-wrap gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} {...{ product }} />
      ))}
    </div>
  );
};

export default ProductsScreen;
