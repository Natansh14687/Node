const express = require("express");
const app = express();

app.use("/admin", (req, res, next)=>{
    console.log("We're in /admin route");
    const token = "xyz";
    const adiminAuthentication = token === "xyz";
    if(!adiminAuthentication){
        res.status(401).send("UnAuthorised Access");
    }else{
        next();
    }
})

app.get("/admin/getdata", (req, res) => {
    res.send("logged in to admin dashboard to get data");
})

app.post("/admin/postdata", (req, res) => {
    res.send("logged in to admin dashboard to post data");
})



app.listen(7777, ()=>{
    console.log("app is listening on server 7777");
})