const express= require("express")
const {connection} = require("./config/db")
const {userRoutes}= require("./routes/user")
const {notesRoutes}= require("./routes/notes")
const {authentication} = require("./middleware/authentication")
const cors = require('cors')
require('dotenv').config()
const PORT= process.env.PORT || 8080

const app= express()
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{
  res.send("welcome")
})
// amit
// ghosh
// masai
//school
app.use("/user",userRoutes)
app.use(authentication)
app.use("/notes",notesRoutes)

app.listen(PORT, async()=>{
  try{
    await connection;
    console.log("conndected")
  }
  catch(err){
     console.log("something err")

  }
  console.log("started")
})