import React from "react";

export const ProductsFilter = () => {
  return (
    <div className="shadow-box lg:w-64 xxl:w-72 bg-white">
      <div className="py-5 px-6 border-b">
        <h4 className="text-xl font-medium">Filters</h4>
      </div>
      <Accordion variant="separated" defaultValue="Apples"></Accordion>
    </div>
  );
};
