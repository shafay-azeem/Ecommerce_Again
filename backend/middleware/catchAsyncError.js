module.exports =(theFunc)=>(Req,res,next)=>{
 Promise.resolve(theFunc(Req,res,next)).catch(next);
};