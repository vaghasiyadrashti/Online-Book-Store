const express = require("express");
const router = express.Router();
const { addToCart,removeFromCart,getBooksFromCart } = require("../controllers/cart.controllers.js");
const authenticateToken = require("../middleware/userAuth.middleware.js");

router.put("/add-to-cart",authenticateToken,addToCart);
router.delete("/remove-from-cart",authenticateToken,removeFromCart)
router.get("/get-books-from-cart",authenticateToken,getBooksFromCart);


module.exports = router;