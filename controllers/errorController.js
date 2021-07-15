import AppError from "../utils/appError.js";
import logger from "../utils/logger.js";
import winston from "../utils/winston.js";
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.val}.`;
    return new AppError(message, 400);
}

const handleDuplicateFieldDB = err =>{
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
    console.log(value);
    const message = `Duplicate field value ${value} Please use another value`;
    return new AppError(message, 400)
}

const handleValidationErrorDB = err =>{
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400)   
}

const sendErrorDev = (err,res)=>{
    res.status(err.statusCode).json({
        error: err
    })
}


const globalError = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500,
    err.status = err.status || 'error'

        let error = {...err};
        
        if(error.name === 'CastError') error = handleCastErrorDB(error);
        if(error.code === 11000) error = handleDuplicateFieldDB(error);
        if(error.name === 'ValidationError') error = handleValidationErrorDB(error);
        
    logger.error(error);
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    // winston.error(error);
        sendErrorDev(error,res);
    
}

export default globalError;