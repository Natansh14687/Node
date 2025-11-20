const express = require("express");
const app = express();

app.use("/test", (req,res)=>{
    res.send("This is the /test route for server 7777");
});

app.use("/hello", (req, res)=>{
    res.send("This is the /hello route of server 7777");
});

app.use((req,res)=>{
    res.send("The server 7777 is started");
});


app.listen(7777, ()=>{
    console.log("app is listening on server 7777");
})