const express = require('express');
const { getAllProducts, createProduct,updateProduct ,deleteProduct,singleProduct } = require('../controller/ProductController');
const router=express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(singleProduct);

module.exports=router