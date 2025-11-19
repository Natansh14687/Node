require("./xyz");

let name = "Node Js 03";
let a = 5;
let b = 10;
let c = a+b;
console.log(name);
console.log(c);
console.log(global);
// console.log(window);

console.log(this);
console.log(globalThis);

let {x,calculateSum} = require("./sum");
calculateSum(a,b);
console.log(x);

age = 22
console.log(age);





