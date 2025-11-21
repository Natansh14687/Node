const express = require("express");
const app = express();

require("./config/database");

app.listen(7777, ()=>{
    console.log("app is listening on server 7777");
})