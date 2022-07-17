const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        if(err.name === 'CastError'){
            const message = `Resource not found Invalid: ${err.message}`;
           new ErrorHandler(message,400)
        }
        if(err.name === 'ValidationError'){ 
          const message = Object.values(err.values).map(value=>value.message);
          
           new ErrorHandler(message,400)
        }
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = {...err};
        error.message=err.message
        res.status(err.statusCode).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}