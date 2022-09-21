const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler.js");


exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })

}

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}


exports.updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Invalid Id"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useUnified: false
    });

    res.status(200).json({
        success: true,
        product
    })

}


exports.deleteProduct = async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Invalid Id"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })

}


exports.singleProduct = async (req, res ,next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found with this id", 404));

        // return res.status(500).json({
        //     success: false,
        //     message: "Invalid Id"
        // })
    }

    res.status(200).json({
        success: true,
        product
    })
}

