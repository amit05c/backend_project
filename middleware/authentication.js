const jwt = require('jsonwebtoken');
require('dotenv').config()
const authentication= (req,res,next)=>{
    const token= req.headers?.authorization?.split(" ")[1]
    console.log(token)
    
    jwt.verify(token, process.env.JWT_SECRET, async function(err, decoded) {
        // console.log(decoded)
        if(err){
            console.log(err)
            res.send("err")
        }else{
           req.body.userId=decoded.userId
          next()
        }
    
        
      });
}

module.exports={
    authentication
}