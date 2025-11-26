const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequests");
const {userAuth} = require("../middlewares/auth");
const User = require("../models/user");


requestRouter.post(
  "/connectionRequest/send/:status/:toUserId", userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // status validations
      const userStatusAllowed = ["interested", "ignore"];
      const isUserStatusAllowed = userStatusAllowed.includes(status);
      if(!isUserStatusAllowed){
        throw new Error("Bad Request");
      }

      //Existing request validations
      const existingRequestSent = await ConnectionRequest.findOne({
        $or : [
            {fromUserId, toUserId},
            {fromUserId : toUserId, toUserId : fromUserId}
        ]
      });
      if(existingRequestSent){
        throw new Error("Request already exists");
      }

      //toUserId should exist in the database
      const userIdExist = await User.findById(toUserId);
      console.log(userIdExist);
      
      if(!userIdExist){
        throw new Error("the user you are sending request does not exist");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({message : "connection request sent successfully!!", data});
    } catch (err) {
        res.status(401).send(err.message);
    }
  }
);

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try{
    const loggedInUserId = req.user._id;
    const {status, requestId} = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if(!allowedStatus.includes(status)){
      throw new Error("You can either accept or reject the request");
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestId,
      toUserId : loggedInUserId,
      status : "interested",
    });
    console.log(connectionRequest);
    
    if(!connectionRequest){
      throw new Error("No connection request found");
    }


    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({message : "user is reviewed successfully !!", data});

  }catch(err){
    res.status(400).send(err.message);
  }
})

module.exports = requestRouter;
