/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { XCircle } from "lucide-react";

const Update = ({ token, productId, closeModal }) => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const maxImages = 4;
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/${productId}`,
          { headers: { token } }
        );
        if (response.data.success) {
          const product = response.data.product;
          Object.keys(product).forEach((key) => {
            if (key !== "image") {
              setValue(key, product[key]);
            }
          });
          const validImages = (product.image || []).filter(
            (url) => typeof url === "string" && url.startsWith("https://")
          );
          setExistingImages(validImages);
        }
      } catch (error) {
        toast.error("Failed to fetch product details");
      }
    };
    fetchProductData();
  }, [productId, token, setValue]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && existingImages.length + newImages.length < maxImages) {
      setValue(`images`, file);
      setNewImages((prev) => [...prev, URL.createObjectURL(file)]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("existingImages", JSON.stringify(existingImages));
      if (data.images) {
        if (Array.isArray(data.images)) {
          data.images.forEach((img) => formData.append("images", img));
        } else {
          formData.append("images", data.images);
        }
      }
      Object.keys(data).forEach((key) => {
        if (!key.startsWith("image") && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      const response = await axios.put(
        `${backendUrl}/api/product/${productId}`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        closeModal();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={closeModal}
        className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
      >
        <XCircle size={24} />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Product Name</label>
            <input
              {...register("name", { required: true })}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            {...register("description")}
            className="border p-2 rounded"
            rows={3}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Category</label>
            <select {...register("category")} className="border p-2 rounded">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Quantity</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const currentValue = parseInt(watch("quantity") || 0);
                  setValue("quantity", Math.max(0, currentValue - 1));
                }}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <input
                type="number"
                {...register("quantity")}
                className="border p-2 rounded w-20 text-center"
                min="0"
              />
              <button
                type="button"
                onClick={() => {
                  const currentValue = parseInt(watch("quantity") || 0);
                  setValue("quantity", currentValue + 1);
                }}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("bestseller")} />
            <label className="text-sm font-semibold">Best Seller</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("status")}
              disabled={watch("quantity") === 0}
            />
            <label className="text-sm font-semibold">Active</label>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold">Product Images</label>
            <input
              type="file"
              id="imageUpload"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={existingImages.length + newImages.length >= maxImages}
            />
            <label
              htmlFor="imageUpload"
              className={`cursor-pointer px-4 py-2 rounded text-sm ${
                existingImages.length + newImages.length >= maxImages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Add Image ({existingImages.length + newImages.length}/{maxImages})
            </label>
          </div>

          <div className="flex gap-4 flex-wrap">
            {existingImages.map((imgUrl, index) => (
              <div key={`existing-${index}`} className="relative w-32 h-32">
                <img
                  src={imgUrl}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setExistingImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <XCircle size={16} />
                </button>
              </div>
            ))}

            {newImages.map((previewUrl, index) => (
              <div key={`new-${index}`} className="relative w-32 h-32">
                <img
                  src={previewUrl}
                  alt={`New upload ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setNewImages((prev) => prev.filter((_, i) => i !== index));
                    setValue(`images.${index}`, null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <XCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-black text-white rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default Update;
