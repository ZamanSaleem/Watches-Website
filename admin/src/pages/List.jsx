/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import Update from "./update";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full p-4">
      <p className="mb-4 font-bold text-lg">All Products List</p>

      <div className="grid grid-cols-6 gap-4 p-4 bg-gray-100 font-bold text-sm border-b">
        <span>Image</span>
        <span>Name</span>
        <span>Description</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-6 gap-4 p-4 items-center border-b text-sm"
        >
          <img
            className="w-16 h-16 object-cover"
            src={item.image[0]} // Access first image from array
            alt={item.name}
          />
          <span>{item.name}</span>
          <span>{item.description}</span>
          <span>{item.category}</span>
          <span>
            {currency}
            {item.price}
          </span>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => openEditModal(item)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => removeProduct(item._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto">
            <Update
              token={token}
              productId={selectedProduct._id}
              closeModal={() => {
                closeEditModal();
                fetchList();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
