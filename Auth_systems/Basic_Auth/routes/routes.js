import express from "express";

import {
  publicRoute,
  getProfile,
  getItems,
} from "../controllers/authController.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", publicRoute);

router.get("/profile", authMiddleware, getProfile);

router.get("/items", authMiddleware, getItems);

export default router;
