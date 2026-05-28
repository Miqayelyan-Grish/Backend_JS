import bcrypt from "bcrypt";
import users from "../data/users.js";

export const registerController = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  const dublicateCheck = users.some((user) => user.email === email);

  if (dublicateCheck) {
    return res
      .status(409)
      .json({ message: "Email already exists, enter another one" });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {
      email: email,
      password: hashPassword,
    };

    users.push(newUser);

    res.status(200).json({ message: "user successfully created" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
