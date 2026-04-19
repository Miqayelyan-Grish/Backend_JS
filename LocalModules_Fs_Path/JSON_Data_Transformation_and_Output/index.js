const foo = require("./data_processor.js");
const fs = require("node:fs");
const path = require("node:path");
const json = path.resolve("input.json");

try{
    const data = JSON.parse(fs.readFileSync(json));
    let obj = foo(data);
    obj = JSON.stringify(obj, null, 2);
    fs.writeFileSync('res.json', obj);
}
catch(err){
    console.log(err);
};


