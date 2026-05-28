import express from "express";
import { registerController } from "../controllers/registerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { loginController } from "../controllers/loginController.js";
import {
  getPosts,
  getProfile,
} from "../controllers/privateAccessConrollers.js";
const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/me", authMiddleware, getProfile);

router.get("/posts", authMiddleware, getPosts);

export default router;
