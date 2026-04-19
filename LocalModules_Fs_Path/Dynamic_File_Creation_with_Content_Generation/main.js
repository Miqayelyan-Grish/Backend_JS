import generator from "./local.js";
import fs from "node:fs";
import path from "node:path";

const pathName = path.resolve('index.html');
fs.writeFile(pathName, generator("page") , (err) => {
    if(err) throw err;
    console.log("file created");
});

