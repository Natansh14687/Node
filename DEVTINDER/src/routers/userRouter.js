const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequests = require("../models/connectionRequests");
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

module.exports = userRouter;
