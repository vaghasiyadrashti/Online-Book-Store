const express = require("express");
const router = express.Router();
const { placeOrder,getOrderHistory,getAllOrders,updateOrderStatus } = require("../controllers/order.controllers.js");
const authenticateToken = require("../middleware/userAuth.middleware.js");

router.post("/place-order",authenticateToken,placeOrder);
router.get("/get-order-history",authenticateToken,getOrderHistory);
router.get("/get-all-history",authenticateToken,getAllOrders);
router.put("/update-order-status",authenticateToken,updateOrderStatus);

module.exports = router;