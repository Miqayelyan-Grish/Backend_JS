import { readData, writeData } from "../service/fileService.js";

export const registerUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  if (!username) {
    return res.status(400).json({ message: "The username is required." });
  } else if (!email) {
    return res.status(400).json({ message: "The email is required." });
  } else if (!password) {
    return res.status(400).json({ message: "The password is required." });
  }

  const users = await readData("users.json");

  const emailDublicateCheck = users.some((user) => user.email === email);

  if (emailDublicateCheck) {
    return res.status(409).json({
      message: "This Email already exicting, please enter another one",
    });
  }

  const newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password,
    role: "costomer",
  };

  users.push(newUser);

  await writeData("users.json", users);

  delete newUser.password;

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });
  if (!password) return res.status(400).json({ message: "Password required" });

  const users = await readData("users.json");

  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.status(200).json({
    id: user.id,
    username: user.username,
    role: user.role,
  });
};

export const getProfile = (req, res) => {
  const user = req.user;

  res.status(200).json({
    id: user.id,
    username: user.username,
    role: user.role,
  });
};
