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

module.exports = requestRouter;
