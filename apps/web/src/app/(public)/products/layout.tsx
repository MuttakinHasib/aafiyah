import React, { PropsWithChildren } from "react";
import { ProductLayoutWrapper } from "./components/wrapper.layout";

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return <ProductLayoutWrapper>{children}</ProductLayoutWrapper>;
};

export default ProductsLayout;
