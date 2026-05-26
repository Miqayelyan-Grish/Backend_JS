import { readData, writeData } from "../service/fileService.js";

export const createOrder = async (req, res) => {
  const authUser = req.user;
  const reqUserId = req.params.user_id;

  if (authUser.id !== Number(reqUserId)) {
    return res.status(403).json({
      message: "Unauthorized!",
    });
  }

  const userCarts = await readData("carts.json");
  const products = await readData("products.json");
  const orders = await readData("orders.json");

  const cart = userCarts.find((cart) => cart.user_id === Number(reqUserId));

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty!" });
  }

  let totalPrice = 0;

  const orderItems = cart.items.map((item) => {
    const product = products.find((product) => product.id === item.product_id);

    if (!product) {
      throw new Error("Product not found");
    }

    const total = product.price * item.quantity;
    totalPrice += total;

    return {
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: product.price,
    };
  });

  const newOrder = {
    id: Date.now(),
    user_id: Number(reqUserId),
    order_date: new Date().toISOString(),
    total_amount: totalPrice,
    status: "pending",
    items: orderItems,
  };

  orders.push(newOrder);
  cart.items = [];

  await writeData("orders.json", orders);
  await writeData("carts.json", userCarts);

  res.status(201).json(newOrder);
};

export const getListOfOrdersById = async (req, res) => {
  const authUser = req.user;
  const reqUserId = req.params.user_id;

  if (authUser.id !== Number(reqUserId)) {
    return res.status(403).json({
      message: "Unauthorized!",
    });
  }

  const orders = await readData("orders.json");
  const userOrderList = orders.filter(
    (order) => order.user_id === Number(reqUserId),
  );

  if (!userOrderList) {
    return res
      .status(200)
      .json({ message: "User doesn't have any orders yet!" });
  }

  res.status(200).json(userOrderList);
};

export const getOrdersDetailsById = async (req, res) => {
  const authUser = req.user;
  const reqUserId = Number(req.params.user_id);
  const orderId = Number(req.params.id);

  if (authUser.id !== reqUserId) {
    return res.status(403).json({
      message: "Unauthorized!",
    });
  }

  const orders = await readData("orders.json");

  const specialOrder = orders.find(
    (order) => order.id === orderId && order.user_id === reqUserId,
  );

  if (!specialOrder) {
    return res.status(404).json({ message: "Resource cant be found" });
  }

  res.status(200).json(specialOrder);
};

export const changeOrderStatus = async (req, res) => {
  const orderId = Number(req.params.id);

  const orders = await readData("orders.json");

  const specialOrder = orders.find((order) => order.id === orderId);

  if (!specialOrder) {
    return res.status(404).json({ message: "Resource cant be found" });
  }

  const newStatus = req.body.status;
  specialOrder.status = newStatus;

  await writeData("orders.json", orders);

  res
    .status(200)
    .json({ message: "Order status updated!", order: specialOrder });
};
