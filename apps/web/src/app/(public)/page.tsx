import { baseURL } from "@/api";
import { ProductShowCase, Slideshow } from "@/components";
import { PRODUCTS } from "@/constants";
import { IProduct } from "@/types";
import React from "react";

const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(baseURL + PRODUCTS + "?");
  console.log("🚀 ~ getProducts ~ baseURL:", baseURL);
  return await response.json();
};

const HomePage = async () => {
  const products = await getProducts();
  return (
    <React.Fragment>
      <Slideshow />
      <ProductShowCase title="Popular Product" {...{ products }} />
    </React.Fragment>
  );
};

export default HomePage;
