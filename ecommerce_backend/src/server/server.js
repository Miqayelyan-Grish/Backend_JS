import "dotenv/config";
import express from "express";
import productRoutes from "../routes/productRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import cartRoutes from "../routes/cartRoutes.js";
import orderRoutes from "../routes/orderRoutes.js";

const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;

console.log(PORT, HOST);

app.use(express.json());

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/carts", cartRoutes);

app.use("/api/orders", orderRoutes);

app.listen(PORT, HOST, () => {
  console.log(`server is running on ${HOST}:${PORT}`);
});
