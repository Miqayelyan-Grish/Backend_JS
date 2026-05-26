import { readData, writeData } from "../service/fileService.js";

export const getAllProducts = async (req, res) => {
  const products = await readData("products.json");

  res.status(200).json(products);
};

export const getAllProductsById = async (req, res) => {
  const id = Number(req.params.id);

  const products = await readData("products.json");

  const foundProduct = products.find((product) => product.id === id);

  if (!foundProduct) {
    return res.status(404).send("The product doesn't exist");
  }

  res.status(200).json(foundProduct);
};

export const createProduct = async (req, res) => {
  const products = await readData("products.json");

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock_quantity: req.body.stock_quantity,
  };

  products.push(newProduct);

  await writeData("products.json", products);

  res.status(201).json(newProduct);
};

export const updateProductById = async (req, res) => {
  const products = await readData("products.json");
  const id = Number(req.params.id);

  const foundProduct = products.find((product) => product.id === id);

  if (!foundProduct) {
    return res.status(404).send("The product doesn't exist");
  }

  foundProduct.name = req.body.name || foundProduct.name;
  foundProduct.price = req.body.price || foundProduct.price;
  foundProduct.description = req.body.description || foundProduct.description;
  foundProduct.stock_quantity =
    req.body.stock_quantity || foundProduct.stock_quantity;

  await writeData("products.json", products);

  res.status(200).json(foundProduct);
};

export const deleteProductById = async (req, res) => {
  const products = await readData("products.json");
  const id = Number(req.params.id);

  const foundProduct = products.find((product) => product.id === id);

  if (!foundProduct) {
    return res.status(404).send("The product doesn't exist");
  }

  const filteredProducts = products.filter((product) => product.id !== id);

  await writeData("products.json", filteredProducts);

  res.status(200).json({ message: "Successfully deleted" });
};
