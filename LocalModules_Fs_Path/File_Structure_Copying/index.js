import nameCreator from "./local.js";
import fs from "node:fs";
import path from "node:path";

const oldPath = path.resolve("./example.txt");
const fileName = path.basename(oldPath);
const newName = nameCreator(fileName);

const destinationPath = path.resolve("../File_Renaming_Utility");
const newPath = path.join(destinationPath, newName)

fs.copyFile(oldPath, newPath, (err) => {
    if(err) {
        console.error("Smth went wrong", err.message);
    }
    else console.log("file copying is successfuly completed");
});
 
