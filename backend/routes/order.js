const express = require('express');
const router = express.Router();

const { newOrder, getOrderById, myOrders, allOrders } = require('../controllers/orderController');

const { isAuthenticatedUser, authrizedRoles } = require('../middlewares/auth');


router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getOrderById);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

//Admin

router.route('/admin/orders').get(isAuthenticatedUser, authrizedRoles('admin'), allOrders);


module.exports = router

