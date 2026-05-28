import { clients } from "../data/clients.js";

export const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({
      message: "API key is missing",
    });
  }

  const foundClient = clients.find((client) => client.apiKey === apiKey);

  if (!foundClient) {
    return res.status(401).json({
      message: "Invalid API key",
    });
  }

  req.client = foundClient;

  next();
};
