const User = require("../models/user.models.js");
const Book = require("../models/book.models.js");


/*-------------------Add to Cart--------------*/
const addToCart = async(req,res) => {
    try{
        const { id,bookid } = req.headers;
        const user = await User.findById(id);
        const isBookInCart = user.cart.includes(bookid);
        if(isBookInCart){
            return res.status(200).json({
                status : "Success",
                message : "Book is already in cart",
            });
        }
        await User.findByIdAndUpdate(id,{
            $push : { cart : bookid},
        });
        return res.status(200).json({
            status : "Success",
            message : "Book added to cart"
        })
    } catch(err){
        console.error(err.message);
        res.status(400).json({message : "Error Occuring while adding Cart!!"});
    }
};

/*-------------------Remove from the Cart--------------*/
const removeFromCart = async(req,res) => {
    try{
        const { id,bookid } = req.headers;
        const user = await User.findById(id);

        await User.findByIdAndDelete(id,{
            $pull : { cart : bookid},
        });
        
        return res.status(200).json({
            status : "Success",
            message : "Book removed from cart"
        })
    } catch(err){
        console.error(err.message);
        res.status(400).json({message : "Error Occuring while adding Cart!!"});
    }
};

/*-------------------Get Books From The Cart--------------*/
const getBooksFromCart = async(req,res) =>{
    try{

        const { id } = req.headers;
        const user = await User.findById(id).populate("cart");
        const cart = user.cart.reverse();

        return res.status(200).json({
            satus : "Success",
            data : cart,
        });

    } catch(err){
        console.error(err.message);
        res.status(400).json({message : "Error Occur while fetching data of books"});
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getBooksFromCart,
};