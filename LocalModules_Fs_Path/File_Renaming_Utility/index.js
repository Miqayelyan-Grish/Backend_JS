import fooRename from "./local.js";
import fs from "node:fs";
import path from "node:path";

const  pathName = path.resolve("../File_Filtering_and_Absolute_Path_Listing");

fs.readdir(pathName, (err, files) => {
    if(err) throw err;
    console.log("file reading");

    files.forEach((file, i) => {
        const renamed = fooRename(file, i);

        const oldPath = path.resolve(pathName, file);
        const newPath = path.join(pathName, renamed);

        fs.rename(oldPath, newPath, (err) => {
            if(err) {
                console.error("failed", err.message);
            }
            else console.log(`${file} is successfully renamed`);
        });
    }) 
})
 