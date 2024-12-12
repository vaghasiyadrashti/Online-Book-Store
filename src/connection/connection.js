const mongoose = require("mongoose");

const connect = async (req,res) => {
     try {
        await mongoose.connect(`${process.env.URI}`);
        console.log(`CONNECTION ESTABLISHED SUCCESSFULLY`)
     } catch (error) {
        console.log(`MONGODB ERROR :`,error);
     }
}

connect();