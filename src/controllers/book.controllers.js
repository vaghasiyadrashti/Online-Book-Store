const Book = require("../models/book.models.js");
const User = require("../models/user.models.js");
// const jwt = require("jsonwebtoken");

/*-----------Add book (admin role)--------------*/
const addBook = async(req,res) => {
    try{
        const { id } = req.headers;
        const user = await User.findById(id);

        if(user.role !== "admin"){
            return res.status(400).json({message : "You have not access to perform admin role"});
        }

        const newBook = new Book({
            url : req.body.url,
            title : req.body.title,
            author : req.body.author,
            price : req.body.price,
            desc : req.body.desc,
            language : req.body.language,
        })

        await newBook.save();
        return res.status(200).json({message : "Book added successfully"});
    } catch(err) {
        console.error(err.message);
        res.status(500).json({message : "Error Occure while adding book"});
    }
}

/*-----------Update book (admin role)--------------*/
const updateBook = async(req,res) => {
    try{
       const { bookid } = req.headers;
       const updatedBook = await Book.findByIdAndUpdate(bookid,{
        url : req.body.url,
        title : req.body.title,
        author : req.body.author,
        price : req.body.price,
        desc : req.body.desc,
        language : req.body.language
       });

       return res.status(200).json({message : "Book Updated Successfully"});
    } catch(err) {
        console.error(err.message);
        res.status(500).json({message : "Updation details failed"});
    }
}

/*-----------Delete book (admin role)--------------*/
const deleteBook = async(req,res) =>{
    try{
        const { bookid } = req.headers;
        const user = await User.findById(id);

        if(user.role !== "admin"){
            return res.status(400).json({message : "You have not access to delete book"});
        }
        const deletedBook = await Book.findByIdAndDelete(bookid);

        return res.status(200).json({message : "Book deleted successully"});

    }catch(err){
        console.error(err.messsage);
        res.status(400).json({message : "Error Occure while deleting book"});
    }
}

/*-----------Get all books (public)--------------*/
const getAllBooks = async(req,res) =>{
    try{
       const { id } = req.headers;
       const allBooks = await Book.find().sort({createdAt : -1});
       return res.status(200).json({
        status : "Success",
        data : allBooks
       })

    }catch(err){
        console.error(err.messsage);
        res.status(400).json({message : "Error Occure while fetching all books"});
    }
}

/*-----------Get all books (public)--------------*/
const getRecentlyAddedBooksLimit = async(req,res) =>{
    try{
       const { id } = req.headers;
       const recentlyAddedBooks = await Book.find().sort({createdAt : -1}).limit(4);
       return res.status(200).json({
        status : "Success",
        data : recentlyAddedBooks
       })

    }catch(err){
        console.error(err.messsage);
        res.status(400).json({message : "Error Occure while fetching 4 books"});
    }
}

/*-----------Get book By Id (public)--------------*/
const getBooksById = async(req,res) =>{
    try{
       const { id } = req.params;
       const getBookById = await Book.findById(id);
       return res.status(200).json({
        status : "Success",
        data : getBookById
       })

    }catch(err){
        console.error(err.messsage);
        res.status(400).json({message : "Error Occure while fetching books by id"});
    }
}



module.exports = {
    addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getRecentlyAddedBooksLimit,
    getBooksById,
}