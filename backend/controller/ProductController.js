const Product = require("../models/ProductModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError")
const Features = require("../utils/Features")
const asyncHandler = require("express-async-handler");


exports.createProduct = asyncHandler(async (req, res, next) => {
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

exports.deleteProduct = asyncHandler(async (req, res) => {
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

exports.singleProduct = asyncHandler(async (req, res, next) => {
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



exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});


// Get All reviews of a single product
exports.getSingleProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    res.status(400).json({
      success: false,
      message: 'Product is not found with this id'
    })
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


// Delete Review --Admin
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    res.status(404).json({
      success: false,
      message: 'Product is not found with this id'
    })
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewid.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});