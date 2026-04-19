import path from "node:path"

export default function fooRename(name, i){
    
    const extName = path.extname(name);
    const baseName = path.basename(name, extName);
    return `${baseName}(${i + 1})${extName}`;
}

