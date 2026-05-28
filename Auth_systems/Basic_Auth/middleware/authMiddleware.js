import { users } from "../data/users.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.setHeader("WWW-Authenticate", "Basic");

    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const encoded = authHeader.split(" ")[1];

  const decoded = Buffer.from(encoded, "base64").toString("utf-8");

  const [username, password] = decoded.split(":");

  const foundUser = users.find(
    (user) => user.username === username && user.password === password,
  );

  if (!foundUser) {
    res.setHeader("WWW-Authenticate", "Basic");

    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  req.user = foundUser;

  next();
};
