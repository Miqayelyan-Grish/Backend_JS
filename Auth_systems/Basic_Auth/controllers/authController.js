export const publicRoute = (req, res) => {
  res.json({
    message: "Public route accessible to everyone",
  });
};

export const getProfile = (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    user: req.user.username,
  });
};

export const getItems = (req, res) => {
  const items = ["Laptop", "Keyboard", "Mouse", "Monitor"];

  res.json({
    items: items,
  });
};
