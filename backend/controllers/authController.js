const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const { use } = require('../routes/auth');
const req = require('express/lib/request');
const sendToken = require('../utils/jwtToken');
const res = require('express/lib/response');
const user = require('../models/user');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: '',
            url: ''
        }
    })

    const token = user.getJwtToken();
    res.status(201).json({
        success: true,
        token
    })
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and passsword', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparepassword(password);
    console.log('user', isPasswordMatched)
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 200, res);

})

exports.forgetPssword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset/${resetToken}`;
    const message = `Your reset password token is as follow::\n\n${resetUrl}\n\n. If you have not request this email ,then ignore it`;


    try {
        await sendEmail({
            email: user.email,
            subject: 'Shopworld email recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to:${user.email}`
        })

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

    }
})

exports.getUserProfile = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  
    const user = await User.findById(req.user.id).select('+password');
    const isMatched = user.comparepassword(req.body.oldPassword);
   
    if (!isMatched) {
        return next(ErrorHandler('Old Password did not matched', 401))
    }
    user.password = req.body.password;
    await user.save();
   sendToken(user, 200, res);

})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newuserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, newuserData, {
        new: false,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, { expires: new Date(Date.now()) });
    res.status(200).json({
        success: true,
        message: 'User Logout'
    })
})


//Admin

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        if (!user) {
            return next(ErrorHandler('User not found ', 404))
        }
    }
    res.status(200).json({
        success: true,
        user
    })
});


exports.updateUser = catchAsyncError(async (req, res, next) => {
    const newuserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newuserData, {
        new: false,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})