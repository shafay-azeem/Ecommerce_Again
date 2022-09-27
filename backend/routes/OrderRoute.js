const express = require('express');
const { createOrder, getSingleOrder, getAllOrders, getAdminAllOrders, updateAdminOrder ,deleteOrder} = require('../controller/OrderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route("/createorder").post(isAuthenticatedUser, createOrder);
router.route("/getorder/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/getallorder").get(isAuthenticatedUser, getAllOrders);
router.route("/admin/order").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminAllOrders);
router.route("/admin/updateorder/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateAdminOrder);
router.route("/admin/deleteorder/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router
