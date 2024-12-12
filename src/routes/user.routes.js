const express = require("express");
const router = express.Router();
const { signUpUser, signInUser, getUserInformation,updateAddress } = require("../controllers/user.controllers.js");
const authenticateToken = require("../middleware/userAuth.middleware.js");

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.get("/get-user-info", authenticateToken, getUserInformation);
router.put("/update-address",authenticateToken,updateAddress);

module.exports = router;

