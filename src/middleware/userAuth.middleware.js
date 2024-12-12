// userAuth.routes.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('authorization');
    console.log("Token: ", token); // Debugging output

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, "bookStore123");
        console.log("Decoded: ", decoded); // Debugging output
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error: ", err.message); // Debugging output
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authenticateToken;



