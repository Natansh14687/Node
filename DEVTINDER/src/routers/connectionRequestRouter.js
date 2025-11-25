const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequests");
const {userAuth} = require("../middlewares/auth");

requestRouter.post(
  "/connectionRequest/send/:status/:toUserId", userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

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
