const express = require("express");
const app = express();

app.get("/user",(req, res)=>{
    console.log(req.query);
    res.send({firstName:"Natansh", lastName:"Khurana"});
    
})

app.get("/hello/:userid/:name/:password",(req, res)=>{
    console.log(req.params);
    res.send("Server is running");
})


app.listen(7777, ()=>{
    console.log("app is listening on server 7777");
})