const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");



exports.isAuthenticatedUser=(asyncHandler(async(req,res,next)=>{
    const {token}=req.cookies

    if(!token){
        return res.status(400).json({
            success: false,
            message: "Please Login for Access Resources"
        })
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decodedData.id)
    console.log(user.role)
    next();
}))

exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`${req.user.role} can not access this resources`));
        };
        next();
    }
}