const catchAsyncError = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { removeListener } = require('../models/user');
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401))
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();

})

exports.authrizedRoles = (...roles) => {
    
    return ((req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log('role not found')
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access the resource `, 403))
        }
        next();
    })

    
}