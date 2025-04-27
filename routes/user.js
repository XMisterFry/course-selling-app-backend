let {Router} = require ("express");
const  {userModel, purchasesModel} = require ("../db");
let userRouter = Router();
let jwt = require ('jsonwebtoken')
const JWT_SECRET = "qwerTYuiop"


userRouter.post ('/signup', (req,res)=> {

})

userRouter.post ('/signin', (req,res)=> {
    
})

let auth = (req,res,next) => {
const token = req.headers.token
const decodedData = jwt.verify(token, JWT_SECRET)
if (decodedData) {
req.user.id = decodedData.id
next ();
}

else {
    res.status (403).json({
        msg : "You are not signed in"
    });
}
}


userRouter.get ('/my-purchases', auth, (req,res)=> {
    


    
})

module.exports={userRouter}