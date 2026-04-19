import logger from "./local.js";
import fd from "node:fs";
import path from "node:path";

const pathName = path.resolve("result.txt");

fd.appendFile(pathName, logger("barev"), (err) => {
    console.log(err);
});

