import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  getProductById,
  // updateProductStatus,
  // updateProductQuantity,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);
productRouter.get("/:id", adminAuth, getProductById);
productRouter.put("/:id", adminAuth, upload.array("images", 4), updateProduct);
// productRouter.post("/update-status", adminAuth, updateProductStatus);
// productRouter.post("/update-quantity", adminAuth, updateProductQuantity);

export default productRouter;
