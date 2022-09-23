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

    const user = await User.findById(decodedData.id)
    console.log(user.role)
    next();
}))

exports.isAuthorizedRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                success: false,
                message: res
            })
        }
        next ();
        console.log('nextt')
    }

}