const express = require("express");
const app = express();

app.get("/user",(req, res, next)=>{
    console.log("/user route is handling response 1");
    next() 
    res.send("This is result from 1st response");   
}, (req, res, next)=>{
    console.log("/user route is handling response 2");
    res.send("This is result from 2nd response");
})

app.use("/hello", (req, res, next)=>{
    console.log("This is log 1 from route /hello");
    next();
});
app.get("/hello", (req, res, next)=>{
    console.log("This is log 2 from route /hello");
    res.send("This is response from route hello app.get")
})



app.listen(7777, ()=>{
    console.log("app is listening on server 7777");
})