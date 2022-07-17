
const res = require('express/lib/response');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures')

exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        succes: true,
        product
    })
}
exports.getProducts = catchAsyncError(async (req, res, next) => {
    const resultPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        succes: true,
        count: products.length,
        productCount,
        products
    })
})

exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            succes: false,
            message: 'product not found'
        })
    }
    res.status(200).json({
        succes: true,
        product
    })
}

exports.updateProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        succes: true,
        product
    })
}

exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({
            succes: false,
            message: 'product not found'
        })
    }

    await product.remove();
    res.status(200).json({
        succes: true,
        message: 'product deleted successfully'
    })

}