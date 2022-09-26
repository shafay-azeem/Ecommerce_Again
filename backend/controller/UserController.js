const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");


exports.createUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body


    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "https://test.com",
            url: "https://test.com"
        }



    });

    sendToken(user, 201, res)
})

//login

exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please Enter Your Email & Password"
        })
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
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

    sendToken(user, 201, res)
})

//logout


exports.logOut = asyncHandler(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(
            Date.now()
        ),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logout Success'
    });


})


//forgot Password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "USER is not found with this email"
        })
    }

    const resetToken = user.getResetToken();

    await user.save({
        validateBeforeSave: false
    })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is : \n\n ${resetPasswordUrl}`

    try {
        await sendMail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });


        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} succesfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTime = undefined;


        await user.save({
            validateBeforeSave: false
        })

        return res.status(404).json({
            success: false,
            message: error.message
        })

    }
})


// Reset Password

exports.resetPassword=asyncHandler(async (req, res, next) => {

    //Create Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
   


    const user = await User.findOne({resetPasswordToken,resetPasswordTime:{$gt:Date.now()}})
    console.log( user,'uuser')


    if(!user){
        return res.status(400).json({
            success: false,
            message: `Reset password url is invalid or has been expired`
        })
        
    }
    
    if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({
            success: false,
            message: `Password Must be same in Both Fields`
        })
    }

    user.password=req.body.password;


    user.resetPasswordToken=undefined
    user.resetPasswordTime= undefined

    await user.save()

    sendToken(user,200,res)
})

// Get user details


exports.userDetails=asyncHandler(async (req, res, next) => {


    const user = await User.findById(req.user.id);


    sendToken(user, 200, res)
})


//Update User Password
exports.updatePassword=asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {

    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Password must be matched"
        })

    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user,200,res)

})

//Update User Profile

exports.updateProfile=asyncHandler(async (req, res, next) => {
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    

    const user= await User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators:true,
        useFindAndModify:false
    })


    sendToken(user,200,res)

    
})

// Get All users ---Admin
exports.getAllUsers = asyncHandler(async (req,res,next) =>{
    const users = await User.find();



    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User Details ---Admin
exports.getSingleUser = asyncHandler(async (req,res,next) =>{
    const user = await User.findById(req.params.id);
   
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User is not found with this id"
        })
    }
    sendToken(user,200,res)
});


// Change user Role --Admin
exports.updateUserRole = asyncHandler(async(req,res,next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
});


// Delete User ---Admin
exports.deleteUser = asyncHandler(async(req,res,next) =>{
  
    const user = await User.findById(req.params.id);
 
    // const imageId = user.avatar.public_id;
 
    // await cloudinary.v2.uploader.destroy(imageId);
 
     if(!user){
        return res.status(400).json({
            success: false,
            message: "User is not found with this id"
        })
     }
 
     await user.remove();
 
     res.status(200).json({
         success: true,
         message:"User deleted successfully"
     })
 });