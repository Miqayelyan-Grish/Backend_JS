import fs from "node:fs";
import path from "node:path";
import engine from "./template_engine.js";

const obj = {
  name: "John",
  company: "Google"
}

const pathName = path.resolve("./template.txt"); 

const fd = fs.readFileSync(pathName,"utf-8"); 

let res = engine(fd, obj);

fs.writeFileSync("result.txt", res);
