const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequests = require("../models/connectionRequests");
const User = require("../models/user");
const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const requestsReceived = await connectionRequests
      .find({
        toUserId: loggedInUserId,
        status: "interested",
      })
      .populate("fromUserId", "firstName lastName age gender");
    if (requestsReceived.length === 0) {
      throw new Error("NO Requests Yet !!");
    }

    res.send(requestsReceived);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const userConnections = await connectionRequests
      .find({
        $or: [{ fromUserId: loggedInUserId, status: "accepted"}, { toUserId: loggedInUserId, status:"accepted" }],
        // status: "accepted",
      })
      .populate("fromUserId", "firstName lastName age gender")
      .populate("toUserId", "firstName lastName age gender");
      if(userConnections.length === 0){
        throw new Error("User has no connections");
      }

      const data = userConnections.map(k => {
        if(loggedInUserId.toString() === k.fromUserId._id.toString()){
            return k.toUserId;
        }else{
            return k.fromUserId;
        }
      })


      res.send(data);

  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try{
    const loggedInUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const max = limit<50 ? limit : 50;
    const skip = (page-1)*max;
    



    const userConnections = await connectionRequests.find({
      $or : [
        {toUserId : loggedInUserId},
        {fromUserId : loggedInUserId}
      ]
    }).select("fromUserId toUserId");


    const hideUsersFromFeed = new Set();

    userConnections.forEach(connection => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });

    const userFeed = await User.find({
      _id : {$nin : Array.from(hideUsersFromFeed)}
    }).select("firstName lastName").skip(skip).limit(max);

    res.send(userFeed);



  }catch(err){
    res.status(400).send(err.message);
  }
})

module.exports = userRouter;
