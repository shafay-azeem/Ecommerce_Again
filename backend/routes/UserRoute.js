const express = require('express');
const { createUser, loginUser, logOut ,forgotPassword} = require('../controller/UserController');
const router=express.Router();

router.route("/registration").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/password/forgot").post(forgotPassword);

module.exports=router