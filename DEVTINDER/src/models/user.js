const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minLength : 2,
        maxLength : 50,
        required : true
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        lowercase : true,
        unique : true,
        trim : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("This is not a valid email address");
            }
        }
    },
    password : {
        type : String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("This password is not strong enough");
            }
        }
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("This gender is not allowed");
            }
        }
    },
    description : {
        type : String,
        default : "This is the default description using default in schema types"
    },
    photoURL : {
        type : String
    },
    skills : {
        type : [String]
    }
},{ timestamps: true });


module.exports = mongoose.model("User", userSchema);