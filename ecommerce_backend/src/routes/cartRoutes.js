import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getUserCart,
  updateUserCart,
  deleteItemFromCart,
  deleteItemFromCartById,
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/:user_id", authMiddleware, getUserCart);

router.post("/:user_id", authMiddleware, updateUserCart);

router.delete("/:user_id", authMiddleware, deleteItemFromCart);

router.delete("/:user_id/items/:product_id", authMiddleware, deleteItemFromCartById);

export default router;
