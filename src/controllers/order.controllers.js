const Book = require("../models/book.models.js");
const User = require("../models/user.models.js");
const Order = require("../models/order.models.js");
const mongoose = require("mongoose");

/*-------------Place order-------------*/
const placeOrder = async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Log the headers and body for debugging
        console.log("Request Headers:", req.headers);
        console.log("Request Body:", req.body);

        // Check if order is an array
        if (!Array.isArray(order)) {
            return res.status(400).json({
                status: "Failed",
                message: "Order must be an array",
            });
        }

        const orderIds = [];

        for (const orderData of order) {
            console.log("Processing order for book ID:", orderData._id);

            // Convert book ID to ObjectId
            const bookObjectId = new mongoose.Types.ObjectId(orderData._id);
            const newOrder = new Order({ user: id, book: bookObjectId });
            const orderDataFromDb = await newOrder.save();

            // Collecting order IDs to update user once
            orderIds.push(orderDataFromDb._id);

            // Clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: bookObjectId },
            });
        }

        // Saving Order in user model
        await User.findByIdAndUpdate(id, {
            $push: { orders: { $each: orderIds } },
        });

        return res.status(200).json({
            status: "Success",
            message: "Order Placed Successfully",
        });

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Order Place Process: Failed" });
    }
};

/*-------------get Order History -------------*/
const getOrderHistory = async(req,res) => {
    try{
         const { id } = req.headers;
         console.log("User ID:",id);

         const user = await User.findById(id).populate({
            path : "orders",
            populate : { path : "book" },
         });

         console.log("User:",user);

         if (!user || !user.orders || user.orders.length === 0) {
            // If user not found or no orders
            return res.status(404).json({
                status: "Failed",
                message: "No order history available for this user",
            });
        }

         const orderData = user.orders.reverse();

         return res.json({
            status : "Success",
            data : orderData,
         });

    } catch(err){
        console.error(err.message);
        res.status(400).json({messsge : "Internal Server Error "});
    }
};

/*-------------get Order History (admin) -------------*/
const getAllOrders = async(req,res) => {
    try{
        // if(!req.user || req.user.role !== "admin"){
        //     return res.status(403).json({message : "You have not access to perform admin role for order history"});
        //  }
        const orders = await Order.find().populate(
            "user","username role"
         )
         .populate(
             "book"
         )
         .sort({createdAt : -1});

        
         return res.status(200).json({
            status : "Success",
            data : orders,
         })

    } catch(err){
        console.error(err.message);
        res.status(400).json({messsge : "Error Occure while fetching order history (Admin Side)"})
    }
};

/*-------------Update Order Status (admin) -------------*/
const updateOrderStatus = async(req,res) => {
    try{
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id,{
            status : req.body.status
        });

        return res.status(200).json({
            status : "Success",
            message : "Status Updated Successfully",
        });

    } catch(err){
        console.error(err.message);
        res.status(400).json({messsge : "Error Occure while fetching order history (Admin Side)"})
    }
};


module.exports = {
    placeOrder,
    getOrderHistory,
    getAllOrders,
    updateOrderStatus,
};