// const ErrorHandler=(message, statusCode)=>{
 

//       ErrorHandler.captureStackTrace(message,statusCode)
  
// }


const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    res.status(err.statusCode).json({
      success:false,
      message:err.message
  })




  };
  
  module.exports = { notFound, errorHandler };
  