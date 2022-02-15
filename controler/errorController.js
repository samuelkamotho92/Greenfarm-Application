//mongoose global error handling middleware

const AppError = require("../utility/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
  };
  
  const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
  
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  };
  
  const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
  
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
  };
  


const sendDevError = (err,resp)=>{
    resp.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

const sendProdError = (err,resp)=>{
    if(err.Isoperational){
        resp.status(err.statusCode).json({
            status:err.status,
            message:err.message,
        })
    }else{
           // 1) Log error
    console.error('ERROR 💥', err);
    resp.status(500).json({
        status:"error",
        message:"something went wrong",
    })
    }
 
}

module.exports = (err,req,resp,next)=>{
err.statusCode = err.statusCode || 500;
    err.status = err.status || "internal error";
 if(process.env.NODE_ENV === "development"){
     sendDevError(err,resp)
 }else if(process.env.NODE_ENV === "production"){
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    let error = { ...err };
    if (error.name === 'Error') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
sendProdError(error,resp);
 }

}