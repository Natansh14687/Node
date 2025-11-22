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
        res.status(400).send("user can't be signed up " + err.message);
    }
})

app.get("/user", async (req, res)=>{
    const lastName = req.body.lastName;
    console.log(lastName);
    
    try{
        const users = await User.find({lastName : lastName});
        console.log(users);
        res.send(users);
    }catch(err){
        res.send("unable to connect to the database");
    }
})

app.get("/feed", async (req, res)=>{
    
    try{
        const users = await User.find({});
        console.log(users);
        res.send(users);
    }catch(err){
        res.send("unable to connect to the database");
    }
})

app.get("/search", async (req, res)=>{
    const id = req.body.id;
    console.log(id);;
    
    try{
        const users = await User.findById(id);
        console.log(users);
        res.send(users);
    }catch(err){
        res.send("unable to connect to the database");
    }
})

app.get("/searchbyage", async (req, res)=>{
    const age = req.body.age;
    console.log(age);
    
    try{
        const users = await User.findOne({age : age});
        console.log(users);
        res.send(users);
    }catch(err){
        res.send("unable to connect to the database");
    }
});

app.delete("/user", async (req, res) => {
    const id = req.body.id;
    console.log(id);
    
    try{
        const user = await User.findByIdAndDelete(id);
        res.send("user deleted successfully");
    }catch(err){
        console.log("user can't be deleted");
        
    }
});

app.delete("/userbyfirstname", async (req, res)=>{
    const firstName = req.body.firstName;
    console.log(firstName);
    
    try{
        const user = await User.deleteOne({firstName : firstName});
        res.send("User with provided firstName deleted successfully");
    }catch(err){
        res.status(400).send("user can't be deleted");
    }
})

app.patch("/user/:id", async (req, res) => {
    
    const data = req.body;
    const id = req.params.id;
    console.log(data);
    

    try{
        updateFields = ["firstName", "lastName", "age", "description", "skills", "photoURL"];
        const isUpdateAllowed = Object.keys(data).every((k) => updateFields.includes(k));
        if(!isUpdateAllowed){
            throw new Error("field update error, some fields can't be allowed to update");
        }
        if(data?.skills.length > 10){
            throw new Error("Can't insert more than 10 skills");
        }
        const user = await User.findByIdAndUpdate(id, data, {runValidators : true});
        res.send("user " + user + " updated successfully");
    }catch(err){
        res.status(400).send("User can't be updated " + err.message);
    }
});

app.patch("/userbydesc", async (req, res) => {
    const data = req.body;
    console.log(data);
    

    try{
        const user = await User.findOneAndUpdate({description : data.description}, {firstName : data.firstName}, {returnDocument : 'after', runValidators : true});
        res.send("user " + user + " updated successfully");
    }catch(err){
        console.error("User can't be updated");
    }
});




connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(7777, ()=>{
        console.log("app is listening on server 7777");
    })
}).catch((err)=>{
    console.log("Database can't be connected");
})

