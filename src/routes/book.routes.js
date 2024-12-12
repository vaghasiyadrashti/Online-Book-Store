const express = require("express");
const router = express.Router();
const { addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getRecentlyAddedBooksLimit,
    getBooksById } = require("../controllers/book.controllers.js");
const authenticateToken = require("../middleware/userAuth.middleware.js");

router.post("/add-book",authenticateToken,addBook);
router.put("/update-book",authenticateToken,updateBook);
router.delete("/delete-book",authenticateToken,deleteBook);
router.get("/get-all-books",getAllBooks);
router.get("/get-recently-added-books",getRecentlyAddedBooksLimit);
router.get("/get-books-by-id/:id",getBooksById);


module.exports = router;