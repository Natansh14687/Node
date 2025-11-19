console.log("Hello World");

let a = 107;
let b = 20;

let fs = require("fs");
let https = require("https");

fs.readFileSync("./file.txt", "utf-8");
console.log("This will execute only after the file read");

https.get("https://dummyjson.com/products", (res) => {
    console.log("Fetched data success");
});

setTimeout(()=>{
    console.log("setTimeOut called after 5 seconds");
    
}, 5000);

fs.readFile("./file.txt", "utf-8", (err, data) => {
    console.log("File Data : ", data);
})

function multiplyFn(x,y){
    const result = a*b;
    return result;
}

const c = multiplyFn(a,b);
console.log(c);
console.log("The last line of sync console...");



