import bcrypt from "bcrypt";
import users from "../data/users.js";
import JWT from "jsonwebtoken";
import "dotenv/config";

export const loginController = async (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  if (!reqEmail || !reqPassword) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  const currUser = users.find((user) => user.email === reqEmail);

  if (!currUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const hashPassword = currUser.password;

  try {
    const passwordCheck = await bcrypt.compare(reqPassword, hashPassword);

    if (!passwordCheck) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const SECRET = process.env.JWT_SECRET;

    const token = JWT.sign({ id: currUser.id, email: reqEmail }, SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token: token });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
