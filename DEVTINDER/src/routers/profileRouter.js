const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const { validateEditProfileData } = require("../helpers/validation");




profileRouter.get("/profile/view", userAuth , (req, res) => {

    try{

        const user = req.user;
        res.send(user);

    }catch(err){
        res.status(401).status(err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth , async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Some fields are not allowed to update");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((k) => loggedInUser[k] = req.body[k]);

        await loggedInUser.save();

        res.json({message : `The user ${loggedInUser.firstName} is updated successfully`, data : loggedInUser});


    }catch(err){
        res.status(401).send(err.message);
    }
    
})

module.exports = profileRouter;