const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://natansh522:aziPBkEyJCZJugP5@namastenode.r1xep4y.mongodb.net/DEVTINDER");
}

connectDB()
.then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Database can't be connected");
})


