import { readData } from "../service/fileService.js";

export const authMiddleware = async (req, res, next) => {
  const userId = req.headers["user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const users = await readData("users.json");
  const foundUser = users.find((user) => user.id === Number(userId));

  if (!foundUser) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  req.user = foundUser;

  next();
};
