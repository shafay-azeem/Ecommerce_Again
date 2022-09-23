const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");



exports.createUser = asyncHandler(async(req, res, next) => {
 const {name , email, password}= req.body
 

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"https://test.com",
            url:"https://test.com"
        }
 

    
    });

    sendToken(user,201,res)
})

//login

exports.loginUser= asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please Enter Your Email & Password"
        })
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            success: false,
            message: "USER is not found with this email and password"
        }) 
    }
    

    const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({
        success: false,
        message: "USER is not found with this email and password"
    }) 
  }

  sendToken(user,201,res)
})

//logout


exports.logOut= asyncHandler(async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(
            Date.now()
        ),
        httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message:'Logout Success'
    });


})
