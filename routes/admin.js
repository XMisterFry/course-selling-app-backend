let {Router} = require ("express");
const  {adminModel} = require  ("../db")
let adminRouter = Router();
let jwt = require ('jsonwebtoken')
const JWT_SECRET = "qwerTYuiop"


adminRouter.post ('/signup', (req,res)=> {

})

adminRouter.post ('/signin', (req,res)=> {
    
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



adminRouter.post ('/create-course', auth , (req,res)=> {
    
}) 

adminRouter.put ('/update-course', auth,  (req,res)=> {
    
})
adminRouter.get ('/my-dashboard', auth , (req,res)=> {
    
})

module.exports={adminRouter}