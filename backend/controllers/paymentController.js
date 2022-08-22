const res = require('express/lib/response');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const strip = require('strip')(process.env.STRIP_SECRET_KEY)

exports.processPayment = catchAsyncError(async (req, res, next) => {
    const paymentIntent = strip.paymentIntent.create({
        amount: req.body.amount,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' }
    })
    res.status(200).json({
        success: true,
        client_Secret: paymentIntent.client_Secret
    })
})

exports.sendStripeApi = catchAsyncError(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})