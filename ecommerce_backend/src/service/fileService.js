import fs from "node:fs/promises";
import path from "node:path";

const dataPath = path.resolve("data");

export const readData = async (fileName) => {
  const filePath = path.join(dataPath, fileName);

  const data = await fs.readFile(filePath, "utf-8");

  return JSON.parse(data);
};

export const writeData = async (fileName, data) => {
  const filePath = path.resolve(dataPath, fileName);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
