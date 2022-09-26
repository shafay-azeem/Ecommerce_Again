const express = require('express');
const { createOrder } = require('../controller/OrderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/createorder").post(isAuthenticatedUser, createOrder);

module.exports = router
