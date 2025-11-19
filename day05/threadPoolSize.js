const crypto = require("crypto");

console.log("Threadpool size:", process.env.UV_THREADPOOL_SIZE);

console.time("1");
console.time("2");
console.time("3");

crypto.pbkdf2("pass", "salt", 1000000, 512, "sha512", () => {
    console.timeEnd("1");
});

crypto.pbkdf2("pass", "salt", 1000000, 512, "sha512", () => {
    console.timeEnd("2");
});

crypto.pbkdf2("pass", "salt", 1000000, 512, "sha512", () => {
    console.timeEnd("3");
});

// setTimeout(()=>console.timeEnd("1"),0)
// setTimeout(()=>console.timeEnd("2"),0)
// setTimeout(()=>console.timeEnd("3"),0)
