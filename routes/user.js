const {Router}= require("express")
const { UserModel } = require("../models/user.model")
const { NotesModel } = require("../models/notes.model")
const {authentication} =require("../middleware/authentication")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const userRoutes= Router()

userRoutes.get("/",(req,res)=>{
    res.send({"message": "Home page"})
})

userRoutes.post("/signup",(req,res)=>{
    let {email,password,age}= req.body
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.status(500).send({"Error:": "something error"})
        }else{
            const newUser= new UserModel({email,password: hash,age})
            await newUser.save()
            res.status(200).send({"message":"successfully registered"})
        }
    });
    
})


userRoutes.post("/login",async(req,res)=>{
    let {email,password}= req.body
    let user= await UserModel.findOne({email})
    let hash= user.password
    bcrypt.compare(password, hash, async function(err, result) {
        // console.log(result)
       if(user && result){

        var token =  jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        console.log(token)
         res.status(200).send({
            message: "login successful",
            token
         })

       }else{
          res.status(500).send({"Error":"something error"})
       
       }
    });
})


module.exports={
    userRoutes
}