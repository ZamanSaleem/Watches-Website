import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../store/slices/productSlice";
// import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const products = useSelector(selectAllProducts);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10)); // Limit to 10 products for display
  }, [products]);

  return (
    <div className="my-10 px-4 py-8 bg-gray-100">
      <div className="text-center py-8">
        <h2 className="text-4xl font-semibold text-gray-800">
          LATEST COLLECTIONS
        </h2>
        <hr className="w-full mx-auto mt-4 border-t-2 border-gray-300" />
      </div>

      <div className="grid gap-6 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-around w-[75%]">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
