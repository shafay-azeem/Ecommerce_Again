// create token and saving that in cookies
const sendToken = (user,statusCode,res) =>{

    const token = user.getJwtToken();

    // Options for cookies
   const options = {
       expires: new Date(
           Date.now() + 3600000
       ),
       httpOnly: true
   };

   res.status(statusCode).cookie("token",token,options).json({
       success: true,
       user,
       token
   });
}

module.exports = sendToken;