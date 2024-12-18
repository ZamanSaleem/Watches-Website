import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../store/slices/cartSlice";
import { selectToken } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    dispatch(addToCartAsync({ itemId: id, token }))
      .unwrap()
      .then(() => {
        toast.success("Item added to cart");
      });
  };

  const handleProductDetail = () => {
    navigate(`/product/${id}`)
  } 

  return (
    <div className="flex flex-col items-center p-4" onClick={handleProductDetail}>
      <img
        src={image[0]}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4"
        
      />
      <h3 className="text-lg font-medium text-gray-800">{name}</h3>
      <p className="text-gray-600 mb-4">${price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
