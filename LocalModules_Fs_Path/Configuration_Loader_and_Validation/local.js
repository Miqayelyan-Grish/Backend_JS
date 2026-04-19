import { error } from "node:console";


export default function foo(file){
    const item = file.split("\n");
    const obj = {};
    const req = [];

    for(let i = 0; i < item.length; ++i){
        item[i] = item[i].trim();
        if (!item[i] || item[i].startsWith("#")) continue;

        let res = item[i].split("=");
        obj[res[0]] = res[1];
        req[i] = res[0];
    }
    validateObj(obj, req);
    return obj;
}

function validateObj(obj, arr){
    for(let item of arr) {
        if(!obj[item]){
            throw new Error("missing key");
        }
    }
}`  `