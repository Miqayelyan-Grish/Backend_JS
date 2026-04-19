const path = require("node:path")

function ListFiles(files, ext){
        const matches = files.filter(file => path.extname(file) === ext);
        return matches;
}

module.exports = ListFiles; 
