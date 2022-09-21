const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,res,req,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}


