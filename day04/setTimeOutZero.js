console.log("Hello World");
var a = 7575;
var b = 21;

setTimeout(()=>{
    console.log("Call me right now");
}, 0);

setTimeout(()=>{
    console.log("Call me after 3 seconds");
}, 3000);

function multiply(x,y){
    const result = x*y;
    return result;
}

const c = multiply(a,b);

console.log(c);
console.log("This is the end of the code...");

