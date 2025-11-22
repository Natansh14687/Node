const express = require("express");
const app = express();
app.use(express.json());

const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res)=>{
    const userData = req.body;
    console.log(req.body);
    
    const user = new User(userData);
    try{
        await user.save();
        res.send("user data sent to the database successfully");
    }catch(err){
        res.send("unable to connect to the database");
    }
})


connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(7777, ()=>{
        console.log("app is listening on server 7777");
    })
}).catch((err)=>{
    console.log("Database can't be connected");
})

