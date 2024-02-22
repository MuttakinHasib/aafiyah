import { IProduct } from "@/types";
import React from "react";
import { ProductCard } from "..";

type Props = {
  title: string;
  products: IProduct[];
};

export const ProductShowCase = (props: Props) => {
  const { title, products } = props;

  return (
    <div className="bg-white py-16">
      <div className="container space-y-5">
        <div className="flex items-center justify-between pb-2 border-b-2 gap-5 border-gray-100">
          <h4 className="text-xl font-bold">{title}</h4>
        </div>
        <div className="flex flex-wrap">
          {products?.map((product) => (
            <ProductCard key={product.id} {...{ product }} />
          ))}
        </div>
      </div>
    </div>
  );
};
