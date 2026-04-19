import parseToObj from "./local.js";
import path from "node:path";
import fs from "node:fs";

const pathName = path.resolve("config.env");
// console.log(pathName);

const fd = fs.readFile(pathName, "utf8", (err, data) => {
    if(err) throw err;
    const res = parseToObj(data);
    console.log(res);
    
})



