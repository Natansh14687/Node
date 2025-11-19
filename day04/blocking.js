let crypto = require("node:crypto");

console.log("Hello World");
var a = 1078698;
var b = 20986;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key)=>{
    console.log("Key is generated");
})

crypto.pbkdf2Sync("password", "salt", 50000000, 50, "sha512");
console.log("This is after the sync crypto operation");


function multiplyFn(x,y){
    const result = a*b;
    return result;
}

const c = multiplyFn(a,b);
console.log(c);

