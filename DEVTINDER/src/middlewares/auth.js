const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token){
        throw new Error("token doesn't exist");
    }

    const decodedMsg = jwt.verify(token, "DEV@TINDER123");
    const { _id } = decodedMsg;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("user does not exist");
    }else{
        req.user = user;
        next();
    }
  }catch(err){
    res.status(401).send(err.message);
  }
};

module.exports = { userAuth };
