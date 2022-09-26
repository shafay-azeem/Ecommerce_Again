const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,res,req,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

//wrong mongo id err
if(err.name==="CastError"){
    const message=`Resources not Found with this id...Invalid ${err.path}`
    err=new ErrorHandler(message,404)
}

 // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }

     // Wrong Jwt error
     if (err.name === "JsonWebTokenError") {
     const message = `Your url is invalid please try again`;
     err = new ErrorHandler(message, 400);
     }

      //Jwt expired error
      if (err.name === "TokenExpiredError") {
        const message = `Your url is expired please try again`;
        err = new ErrorHandler(message, 400);
        }




    res.status(err.statusCode).json({
        success:false,
        message:err.stack
    })
}


