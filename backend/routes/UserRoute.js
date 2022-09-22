const express = require('express');
const { createUser, loginUser} = require('../controller/UserController');
const router=express.Router();

router.route("/registration").post(createUser);
router.route("/login").post(loginUser);
// router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(singleProduct);

module.exports=router