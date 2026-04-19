import obj from "./local.js";
import fs from "node:fs";
import path from "node:path";

const pathName = path.resolve('./local.js');

fs.stat(pathName, (err, stats) => {
    if(err) {
        console.error("failed", err.message);
    }
    else if(stats.size < 1024){
        fs.writeFile("file.txt", JSON.stringify(obj, null, 2), (err) => {
            if(err) console.error("failed", err.message);
            else console.log("all is okay");
        })
    }
})


