const express = require("express");
const authRouter = express.Router();
const {validateSignupData} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");


authRouter.post("/signup", async (req, res)=>{
    
    try{
        // validate signup data
        validateSignupData(req);
        // encrypt password
        const {firstName, lastName, age, emailId, password, gender, description, skills, photoURL} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        
        const user = new User({firstName, lastName, age, emailId, password : passwordHash, gender, description, skills, photoURL});
    
        await user.save();
        res.send("user data sent to the database successfully");
    }catch(err){
        res.status(400).send("user can't be signed up " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId : emailId});
        // console.log(user);
        
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isValidPassword = await user.validatePassword(password);
        
        if(isValidPassword){

            const cookie = await user.getCookie(res);

            res.send("user successfully logged in");
        }else{
            throw new Error("Invalid Credentials");
        }

    }catch(err){
        res.status(400).send(err.message);
    }
    

});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {expires: new Date(Date.now())}).send("user logged out successfully");
});

module.exports = authRouter;