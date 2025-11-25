const express = require("express");
const app = express();
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const connectDB = require("./config/database");
const User = require("./models/user");
const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/connectionRequestRouter");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(7777, ()=>{
        console.log("app is listening on server 7777");
    })
}).catch((err)=>{
    console.log("Database can't be connected");
})

