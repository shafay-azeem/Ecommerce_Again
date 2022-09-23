const express = require('express');
const { createUser, loginUser, logOut} = require('../controller/UserController');
const router=express.Router();

router.route("/registration").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);

module.exports=router