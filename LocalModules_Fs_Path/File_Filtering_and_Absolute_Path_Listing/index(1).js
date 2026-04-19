const foo = require("./script");
const fs = require("node:fs");
const path = require("node:path");

const dirPath = path.resolve('../JSON_Data_Transformation_and_Output');

fs.readdir(dirPath, (err, data) => {
    if(err) throw err;
    const filtered = foo(data, '.js');
    const res = [];
    for(let i = 0; i < filtered.length; ++i) {
        res.push(path.resolve(path.join(dirPath, filtered[i])));
    }
    console.log(res);
});


