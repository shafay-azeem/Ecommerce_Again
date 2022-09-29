const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");



exports.isAuthenticatedUser=(asyncHandler(async(req,res,next)=>{
    // const {token}=req.cookies

    // if(!token){
    //     return res.status(400).json({
    //         success: false,
    //         message: "Please Login for Access Resources"
    //     })
    // }

    // const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY)

    // req.user = await User.findById(decodedData.id)

    // next();
    let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      const decoded = jwt.verify(token, "i hate potatoes");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}))



exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                success: false,
                message:`${req.user.role} cannot have access to add products`
            })
        };
        next();
    }
}