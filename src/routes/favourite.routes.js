const express = require("express");
const router = express.Router();
const { addtoFavourite,removeFromFavourite,getBooksFromFavourite } = require("../controllers/favourite.controllers.js");
const authenticateToken = require("../middleware/userAuth.middleware.js");

router.put("/add-to-favourite",authenticateToken,addtoFavourite);
router.delete("/remove-from-favourite",authenticateToken,removeFromFavourite);
router.get("/get-books-favourite",authenticateToken,getBooksFromFavourite);

module.exports = router;