const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "User"
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref:"User"
    },
    status : {
        type : String,
        enum : {
            values : ["interested", "ignore", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        }
    }
}, {timestamps : true});

connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre("save", function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("You can't send request to yourself");
    }

    next();
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);