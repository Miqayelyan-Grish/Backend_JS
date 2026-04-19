const arr = require("./local");
const fs = require("node:fs");
const pathName = require("node:path");

for(let item of arr){
    const dirPath = pathName.resolve(item);
    fs.mkdir(dirPath, {recursive: true}, (err) => {
        if(err){
            throw err;
        } 
        else{
            console.log(`${dirPath} making`);
        }
    })
} 