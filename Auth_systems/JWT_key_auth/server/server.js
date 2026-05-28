import "dotenv/config";
import express from "express";
import authRoutes from "../routes/authRoutes.js";
import cors from "cors";

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);

app.listen(PORT, HOST, () => {
  console.log(`server is running on ${HOST}:${PORT}`);
});
