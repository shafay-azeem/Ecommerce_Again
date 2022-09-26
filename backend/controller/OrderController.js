const Order = require("../models/OrderModel");
const asyncHandler = require("express-async-handler");

// Create Order
exports.createOrder = asyncHandler(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order
    });
});

//  Get Single order
exports.getSingleOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (!order) {
        // return next(new ErrorHandler("Order not found with this id",404));

        res.status(404).json({
            success: false,
            message: 'Order not found with this id'
        })
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get all orders
exports.getAllOrders = asyncHandler(async (req,res,next) =>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json({
        success: true,
        orders
    });
});