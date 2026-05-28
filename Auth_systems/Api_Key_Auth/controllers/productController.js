import { products } from "../data/products.js";

export const getServerStatus = (req, res) => {
  res.json({
    status: "Server is running",
  });
};

export const getProducts = (req, res) => {
  res.json(products);
};

export const createProduct = (req, res) => {
  const { title, price } = req.body;

  if (!title || !price) {
    return res.status(400).json({
      message: "Title and price are required",
    });
  }

  const newProduct = {
    id: Date.now(),
    title,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};
