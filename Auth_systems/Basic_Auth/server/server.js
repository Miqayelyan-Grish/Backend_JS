import express from "express";
import routes from "../basic_auth/routes/routes.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());

app.use("/", routes);

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${HOST}:${PORT}`);
});
