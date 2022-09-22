const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError=require("../middleware/catchAsyncError")
const Features = require("../utils/Features")
const asyncHandler = require("express-async-handler");


exports.createProduct = asyncHandler(async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })

})


exports.getAllProducts = asyncHandler(async (req, res) => {
    const resultPerPage = 8
    const productCount = await Product.countDocuments()
    const feature = new Features(Product.find(), req.query)
      .search().filter().pagination(resultPerPage)
    const products = await feature.query;
    res.status(200).json({
      success: true,
      products,
    });
  });


exports.updateProduct = asyncHandler(async (req, res) => {
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
)

exports.deleteProduct = asyncHandler (async (req, res) => {
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
)

exports.singleProduct =asyncHandler( async (req, res ,next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
     

        return res.status(500).json({
            success: false,
            message: "Invalid Id"
        })
    }

    res.status(200).json({
        success: true,
        product,
        // productCount
    })
}

)