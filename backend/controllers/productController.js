import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import fs from "fs";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      status,
      quantity = 0,
    } = req.body;

    console.log("request body", req.body);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const productExist = await productModel.findOne({ name });
    if (productExist) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists!",
      });
    }
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const product = new productModel({
      name,
      description,
      category,
      price: Number(price),
      image: imagesUrl,
      status: quantity <= 0 ? false : status,
      quantity,
    });
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Product ID is required" });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, product });
  } catch (err) {
    console.error("Error getting product by ID:", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred while getting the product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "Product ID is required" });
    }

    const {
      name,
      description,
      price,
      category,
      bestseller,
      status,
      quantity,
      existingImages,
    } = req.body;
    const existingImagesArray = JSON.parse(existingImages || "[]");

    const totalImages = existingImagesArray.length + (req.files?.length || 0);
    if (totalImages > 4) {
      return res.status(400).json({
        success: false,
        message: "Maximum 4 images allowed",
      });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const imagesToDelete = product.image.filter(
      (img) => !existingImagesArray.includes(img)
    );
    for (const imageUrl of imagesToDelete) {
      try {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
      }
    }

    const newImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          newImages.push(result.secure_url);
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting temp file:", err);
          });
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    }

    const finalImages = [...existingImagesArray, ...newImages];

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name: name || product.name,
        description: description || product.description,
        price: price !== undefined ? Number(price) : product.price,
        category: category || product.category,
        bestseller: bestseller !== undefined ? bestseller : product.bestseller,
        status: status !== undefined ? status : product.status,
        quantity: quantity !== undefined ? Number(quantity) : product.quantity,
        image: finalImages,
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the product",
    });
  }
};

export {
  listProducts,
  addProduct,
  removeProduct,
  updateProduct,
  singleProduct,
  getProductById,
};
