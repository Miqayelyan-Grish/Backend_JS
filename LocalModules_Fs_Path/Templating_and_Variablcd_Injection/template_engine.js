// import fs from "node:fs";

export default function engine(file, obj){
    return file.replace(/{{(.*?)}}/g, (match, key) => {
        return obj[key] !== undefined ? obj[key] : match;
    })
}