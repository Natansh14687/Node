const validator = require("validator");

const validateSignupData = (req) => {

    if(!req || !req.body){
        throw new Error("No data Provided");
    }
    const {firstName, lastName, emailId, password, age, skills, gender} = req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter firstName and lastName");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Please enter a valid emailId");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
    if(age<18){
        throw new Error("Person below less than 18 is now allowed to enter");
    }
   

    if(skills!=undefined || skills!=null){
        if(Array.isArray(skills)){
            if(skills > 10){
                throw new Error("Skills can't be more than 10");
            }
        }else if(typeof skills === "string"){
            if(skills.length > 1000){
                throw new Error("Skills String is too long");
            }
        }else{
            throw new Error("Skills must be an array or string");
        }
    };


    if(!["male", "female", "others"].includes(gender)){
        throw new Error("This gender is not allowed to enter");
    }

}

const validateEditProfileData = (req) => {
    const allowedUpdates = ["firstName", "lastName", "age", "gender", "description", "photoURL", "skills"];
    const fieldsToUpdate = req.body;
    const isUpdateAllowed = Object.keys(fieldsToUpdate).every(field => allowedUpdates.includes(field));

    return isUpdateAllowed;
}

module.exports = {validateSignupData, validateEditProfileData};