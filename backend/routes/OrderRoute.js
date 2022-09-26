const express = require('express');
const { createOrder,getSingleOrder,getAllOrders } = require('../controller/OrderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/createorder").post(isAuthenticatedUser, createOrder);
router.route("/getorder/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/getallorder").get(isAuthenticatedUser, getAllOrders);

module.exports = router
