class ErrorHandler extends Error{
    constructor(message,statusCode){
        console.log(message,'message')
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor)
    }
}




module.exports = ErrorHandler