import React from "react";
import ProductsScreen from "./screens/products.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our wide range of products and find what you need.",
};

const ProductsPage = () => <ProductsScreen />;

export default ProductsPage;
