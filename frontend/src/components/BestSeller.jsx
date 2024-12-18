import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../store/slices/productSlice";
// import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const products = useSelector(selectAllProducts);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    setBestSeller(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 px-4 py-8 bg-gray-100">
      <div className="text-center py-8">
        <h2 className="text-4xl font-semibold text-gray-800">BEST SELLERS</h2>
        <hr className="w-full mx-auto mt-4 border-t-2 border-gray-300" />
      </div>
      <div className="grid gap-6 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-around w-[75%]">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
