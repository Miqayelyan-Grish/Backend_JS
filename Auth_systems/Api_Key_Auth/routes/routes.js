import express from "express";
import {
  getProducts,
  createProduct,
  getServerStatus,
} from "../controllers/productController.js";

import { apiKeyMiddleware } from "../middleware/apiKeyMiddleware.js";
import { permissionMiddleware } from "../middleware/permissionMiddleware.js";

const router = express.Router();

router.get("/status", getServerStatus);

router.get(
  "/products",
  apiKeyMiddleware,
  permissionMiddleware("read"),
  getProducts,
);

router.post(
  "/products",
  apiKeyMiddleware,
  permissionMiddleware("write"),
  createProduct,
);

export default router;
