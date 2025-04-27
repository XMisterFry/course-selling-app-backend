let {Router} = require ("express");
const  {userModel, purchasesModel} = require ("../db")
let userRouter = Router();


userRouter.post ('/signup', (req,res)=> {

})

userRouter.post ('/signin', (req,res)=> {
    
})

userRouter.get ('/my-purchases', (req,res)=> {
    


    
})

module.exports={userRouter}