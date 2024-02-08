const {userSch} = require( "../models/UserSchema");
const {userRegJoiSchema ,userLoginJoiSchema} = require( "../models/userJoiSchema");
const{ ValidationError } =require("joi");
const {JWT_SECRET} = require("../../../config");
const userRegValidator = async(req,res,next)=>{
    try {
        try {
           const result= await userRegJoiSchema.validateAsync(req.body);
           req.body=result;
        } catch (err) {
            if(err instanceof ValidationError)
            return res.status(400).json({message:err.message})
        }
        let userExist = await userSch.findOne({userEmail:req.body.userEmail});
        if(Boolean(userExist))
        return res.status(409).json({message: "Already Exist"});
        next();
    } catch (err) {
    console.log("L-5, verfiy---->", err.message);
    return res.status(504).json({
      message: "Something went wrong",
    });
        
    }
}
const userLoginValidator = async(req,res,next)=>{
    try {
        try {
           const result= await userLoginJoiSchema.validateAsync(req.body);
           req.body.userEmail=result.userEmail;
        } catch (err) {
            if(err instanceof ValidationError)
            return res.status(400).json({message:"Email or Password Invalid"})
        }
        let userExist = await userSch.findOne({userEmail:req.body.userEmail});
        if(Boolean(!userExist))
        return res.status(404).json({message: "Does Not Exist"});
        req.query.userPassword=userExist.userPassword;
        req.body.userName=userExist.userName;
        next();
    } catch (err) {
    console.log("L-5, verfiy---->", err.message);
    return res.status(504).json({
      message: "Something went wrong",
    }); 
    }
}




module.exports={userRegValidator,userLoginValidator};

