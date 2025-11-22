const adminAuth = (req, res, next)=>{
    console.log("We're in /admin route");
    const token = "xyz";
    const adiminAuthentication = token === "xyz";
    if(!adiminAuthentication){
        res.status(401).send("UnAuthorised Access");
    }else{
        next();
    }
}

const userAuth = (req, res, next)=>{
    console.log("We're in /user route");
    const token = "xyz";
    const userAuthentication = token === "xyz";
    if(!userAuthentication){
        res.status(401).send("UnAuthorised Access");
    }else{
        next();
    }
}

module.exports = {adminAuth, userAuth};

