import { readData, writeData } from "../service/fileService.js";

export const getUserCart = async (req, res) => {
  const authUser = req.user;
  const reqUserId = req.params.user_id;

  if (authUser.id != Number(reqUserId)) {
    return res.status(403).json({
      message: "Cant find User",
    });
  }
  const userCarts = await readData("carts.json");

  const currentUserCart = userCarts.find(
    (cart) => cart.user_id === Number(reqUserId),
  );

  if (!currentUserCart) {
    return res.status(200).json({ items: [] });
  }

  res.status(200).json(currentUserCart);
};

//update
export const updateUserCart = async (req, res) => {
  const authUser = req.user;
  const reqUserId = req.params.user_id;

  if (authUser.id != Number(reqUserId)) {
    return res.status(403).json({
      message: "Cant find User",
    });
  }
  const userCarts = await readData("carts.json");
  const products = await readData("products.json");

  const productId = req.body.product_id;
  const quantityOfProduct = req.body.quantity;

  if (
    !quantityOfProduct ||
    !productId ||
    quantityOfProduct <= 0 ||
    productId <= 0
  ) {
    return res
      .status(400)
      .json({ message: "quantity & id of product must be > 0" });
  }

  const foundProduct = products.find((product) => product.id === productId);

  if (!foundProduct) {
    return res.status(400).json({
      message: "Product doesnt exist",
    });
  }

  let currentUserCart = userCarts.find(
    (cart) => cart.user_id === Number(reqUserId),
  );

  if (!currentUserCart) {
    currentUserCart = {
      id: Date.now(),
      user_id: Number(reqUserId),
      items: [],
    };

    userCarts.push(currentUserCart);
  }

  const dublicateProduct = currentUserCart.items.find(
    (item) => item.product_id === productId,
  );

  if (dublicateProduct) {
    dublicateProduct.quantity += quantityOfProduct;
  } else {
    currentUserCart.items.push({
      product_id: productId,
      quantity: quantityOfProduct,
    });
  }

  await writeData("carts.json", userCarts);

  res.status(201).json(currentUserCart);
};

//delete

export const deleteItemFromCart = async (req, res) => {
  const authUser = req.user;
  const reqUserId = req.params.user_id;

  if (authUser.id !== Number(reqUserId)) {
    return res.status(403).json({ message: "Access denied!" });
  }

  const userCarts = await readData("carts.json");

  let currentUserCart = userCarts.find(
    (cart) => cart.user_id === Number(reqUserId),
  );

  if (!currentUserCart) {
    return res.status(404).json({ message: "User cart can't be found" });
  }

  currentUserCart.items = [];

  await writeData("carts.json", userCarts);

  res.status(200).json({ message: "success" });
};

export const deleteItemFromCartById = async (req, res) => {
  const authUser = req.user;
  const reqUserId = Number(req.params.user_id);
  const productId = Number(req.params.product_id);

  if (authUser.id !== reqUserId) {
    return res.status(403).json({ message: "Access denied!" });
  }

  const userCarts = await readData("carts.json");

  const currentUserCart = userCarts.find((cart) => cart.user_id === reqUserId);

  if (!currentUserCart) {
    return res.status(404).json({ message: "User cart can't be found" });
  }

  const itemExists = currentUserCart.items.some(
    (item) => item.product_id === productId,
  );

  console.log("REQ USER:", reqUserId);
  console.log("CART USER:", currentUserCart.user_id);
  console.log("ITEMS:", currentUserCart.items);
  console.log("PRODUCT ID:", productId);
  if (!itemExists) {
    return res.status(404).json({
      message: "Product not in cart",
    });
  }

  currentUserCart.items = currentUserCart.items.filter(
    (item) => item.product_id !== productId,
  );

  await writeData("carts.json", userCarts);

  res
    .status(200)
    .json({ message: "Item deleted successfully", cart: currentUserCart });
};
