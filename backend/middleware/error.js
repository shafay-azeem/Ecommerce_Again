const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,res,req,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

//wrong mongo id err
if(err.name==="CastError"){
    const message=`Resources not Found with this id...Invalid ${err.path}`
    err=new ErrorHandler(message,404)
}




    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}


