const {Router}= require("express")
const { NotesModel } = require("../models/notes.model")
const {authentication} =require("../middleware/authentication")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const notesRoutes= Router()


notesRoutes.get("/",async(req,res)=>{
    let userNotes= await NotesModel.find({userId:req.body.userId})
    console.log(userNotes)
    res.send({"all_notes":userNotes})
})


notesRoutes.post("/create", async(req,res)=>{

     console.log(req.body)
    
   
          let {heading,note,tag,userId}= req.body
          let newNote= new NotesModel({
            userId,
            heading,
            note,
            tag

          })
       await newNote.save()
            res.send({"message":"successfully created","saved_note":newNote})
       
})


notesRoutes.delete("/delete/:_id",async(req,res)=>{
    
          let {_id}=req.params
          let {userId}= req.body
          console.log(_id)
          console.log(userId)
          let x= await NotesModel.findOneAndDelete({_id,userId})
          
          if(x){
              res.send({"message":"deleted"})

          }else{
            res.send({"Error":"You are not authorised"})
          }
          

       
})




notesRoutes.patch("/update/:_id",async(req,res)=>{

  
        let {userId}= req.body
        let {_id}= req.params
        console.log(req.body)
          await NotesModel.findOneAndUpdate({userId,_id},{...req.body})
          let updatedData= await NotesModel.find({userId,_id})
     
          res.send({"updated_data": updatedData})
      
  
      
  
})









module.exports={
    notesRoutes
}