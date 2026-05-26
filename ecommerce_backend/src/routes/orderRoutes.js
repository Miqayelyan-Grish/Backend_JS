import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getListOfOrdersById,
  getOrdersDetailsById,
  changeOrderStatus,
} from "../controllers/orderController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/orders/:user_id", authMiddleware, createOrder);

router.get("/orders/:user_id", authMiddleware, getListOfOrdersById);

router.get("/orders/:id", authMiddleware, getOrdersDetailsById);

router.put(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  changeOrderStatus,
);

export default router;
