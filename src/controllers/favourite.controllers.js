const User = require("../models/user.models.js");
const Book = require("../models/book.models.js");

/*---------------Add to Favourite--------------*/
const addtoFavourite = async(req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id);
        const isBookFavourite = user.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already added to favourite" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favourites" });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Process failed to add favourite" });
    }
};

/*---------------Remove From Favourite--------------*/
const removeFromFavourite = async(req, res) => {
    try {
        const { id, bookid } = req.headers;
        const user = await User.findById(id);
        const isBookFavourite = user.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        return res.status(200).json({ message: "Book removed from favourite" });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Process failed to remove book from favourite" });
    }
};

/*---------------Get  Favourite--------------*/
const getBooksFromFavourite = async(req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id).populate("favourites");
        const favouriteBooks = user.favourites;
        
        return res.status(200).json({ 
         status : "Success",
         data : favouriteBooks,
        });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: "Process failed to remove book from favourite" });
    }
};
module.exports = {
    addtoFavourite,
    removeFromFavourite,
    getBooksFromFavourite,
};