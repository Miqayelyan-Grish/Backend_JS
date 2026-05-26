import express from "express";
import {
  createProduct,
  getAllProducts,
  getAllProductsById,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getAllProductsById);

router.post("/", authMiddleware, adminMiddleware, createProduct);

router.put("/:id", authMiddleware, adminMiddleware, updateProductById);

router.delete("/:id", authMiddleware, adminMiddleware, deleteProductById);

export default router;
