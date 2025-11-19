const fs = require("node:fs");
console.log("Hello World");

let a = 123;

setImmediate(()=>{
    console.log("This is call back of setImmediate function");
});

setTimeout(()=>{
    console.log("setTimeOut CB");
}, 0);

Promise.resolve("Promise").then(console.log);

fs.readFile("./file.txt", "utf-8", (err, data)=>{
    setImmediate(()=>console.log("second setImmediate inside readFile"));
    process.nextTick(()=>console.log("Second process.nextTick inside readfile CB"));
    setTimeout(()=>console.log("second timer inside readfile CB"),0);
    console.log("Call back for file reading");  
});



process.nextTick(()=>console.log("process.nextTick"));

function printA(){
    console.log("The value of a = ", a);
}

printA();

console.log("This is the end of file...");
