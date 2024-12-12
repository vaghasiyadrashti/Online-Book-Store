const User = require("../models/user.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*---------------Sign-Up--------------*/
const signUpUser = async(req,res) => {
    try{
       const {username,email,password,address} = req.body;

       const user = await User.findOne({username});
       if(user) return res.status(400).json({message : "Username already exists"});

       const existingEmail = await User.findOne({email});
       if(existingEmail) return res.status(401).json({message :"email already exists" });

       const existingPassword = await User.findOne({password});
       if(existingPassword) return res.status(401).json({message :"password already exists" });

        const hashPass = await bcrypt.hash(password,10);

        const newUser = new User({
          username : username,
          email : email,
          password : hashPass,
          address : address,
       }) 

       await newUser.save();

       return res.status(200).json({message : "SignUp Successfully"});

    } catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

/*---------------Sign-In--------------*/
const signInUser = async(req,res) => {
    try{
       const {username ,password} = req.body;

       const existingUser = await User.findOne({username});
       if(!existingUser) {
        return res.status(400).json({message : "User is not existing"});
       }
       await bcrypt.compare(password,existingUser.password,(err,data) => {
        if(data){
            const authClaims = [
                {name : existingUser.username},
                {role : existingUser.role},
            ];
         const token = jwt.sign({authClaims},"bookStore123",{expiresIn : "365d"});

         res.status(200)
         .json({
            id : existingUser._id,
            role : existingUser.role,
            token : token,
        });
        }
       
       else res.status(400).json({message : "Invalid Credential"});
       })

    } catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error");
    }
};

/*---------------Get-user-information--------------*/
const getUserInformation = async(req,res) => {
    try{
       const { id } = req.headers;
       const getUserInfo = await User.findById(id).select("-password");
       return res.status(200).json(getUserInfo).select("-password");
    } catch(err){
        console.error(err.message);
        res.staus(500).json({message : "Error Occur while fetching user information"})
    }
}

/*--------------Update Address-----------*/
const updateAddress = async(req,res) => {
    try{
        const {id} = req.headers;
        const { address } = req.body;

        const update = await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message : "Address Updated Successfully"});

    } catch(err){
        console.error(err.message);
        res.status(500).json({message : "Address Updation Failed"});
    }
}

module.exports = {
    signUpUser,
    signInUser,
    getUserInformation,
    updateAddress,
};

