const express = require('express');
const router = express.Router();
const { isAuthenticatedUser ,authrizedRoles} = require('../middlewares/auth')
const { getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController")


router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('admin/product/new').post(isAuthenticatedUser,authrizedRoles('admin'),newProduct);
router.route('admin/product/:id').put(updateProduct).delete(isAuthenticatedUser,authrizedRoles('admin'),deleteProduct);
module.exports = router