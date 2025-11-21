const express = require("express");
const app = express();

const {adminAuth, userAuth} = require("../middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getdata", (req, res) => {
    res.send("logged in to admin dashboard to get data");
})

app.post("/admin/postdata", (req, res) => {
    res.send("logged in to admin dashboard to post data");
})

app.get("/user/profile", userAuth, (req, res)=>{
    res.send("You have got profile data");
})



app.listen(7777, ()=>{
    console.log("app is listening on server 7777");
})