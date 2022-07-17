const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getUserProfile, updatePassword, updateProfile, getAllUsers, getUserDetails,updateUser } = require('../controllers/authController');
const { isAuthenticatedUser, authrizedRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

//Admin
router.route('/admin/users').get(isAuthenticatedUser, authrizedRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authrizedRoles('admin'), getUserDetails).put(isAuthenticatedUser, authrizedRoles('admin'), updateUser);

module.exports = router;