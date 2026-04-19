function JSONtransformation(obj) {
    let res = {};

    for (let [key, value] of Object.entries(obj)) {
        let newKey = key;
        if(key.includes('_')) {
            newKey = key.split("_");
            for(let i = 1; i < newKey.length; ++i){
                newKey[i] = newKey[i][0].toUpperCase() + newKey[i].slice(1);   
            }
            newKey = newKey.join("");
            
            if(typeof value === "object" && value !== null){
                res[newKey] = JSONtransformation(value);
                
                if(Array.isArray(value)){
                    res[newKey] = value.map(item => typeof item == "object" && item != null ? JSONtransformation(item) : item)
                }
                else {
                    res[newKey] = JSONtransformation(value);
                }
            }
            else{
                res[newKey] = value;
            }
        }
    }
    return res;
}

module.exports = JSONtransformation;