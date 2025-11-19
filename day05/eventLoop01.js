const fs = require("node:fs");
console.log("Hello World");

let a = 123;

setImmediate(()=>{
    console.log("This is call back of setImmediate function");
});

fs.readFile("./file.txt", "utf-8", (err, data)=>{
    console.log("Call back for file reading");  
});

setTimeout(()=>{
    console.log("setTimeOut CB");
}, 0);

function printA(){
    console.log("The value of a = ", a);
}

printA();

console.log("This is the end of file...");

