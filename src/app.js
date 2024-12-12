const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { connection } = require("mongoose");

require("dotenv").config();
require("./connection/connection.js");

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const user = require("./routes/user.routes.js");
const book = require("./routes/book.routes.js");
const favourite = require("./routes/favourite.routes.js");
const cart = require("./routes/cart.routes.js");
const order = require("./routes/order.routes.js");

// app.use(bodyParser.json());

// routes
app.use("/api/v1",user);
app.use("/api/v1/book",book);
app.use("/api/v1/favourite",favourite);
app.use("/api/v1/cart",cart);
app.use("/api/v1/order",order);


app.listen(process.env.PORT || 1000 ,() => {
        console.log(`Server is running on ${process.env.PORT}`);
})

