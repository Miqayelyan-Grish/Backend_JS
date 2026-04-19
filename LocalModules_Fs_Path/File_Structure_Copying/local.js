import path from "node:path";

export default function nameCreator(file) {
    
    const extName = path.extname(file); 
    const baseName = path.basename(file, extName);
    return `${baseName}__backup${extName}`;
}
