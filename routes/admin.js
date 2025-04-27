let {Router} = require ("express");
const  {adminModel} = require  ("../db")
let adminRouter = Router();


adminRouter.post ('/signup', (req,res)=> {

})

adminRouter.post ('/signin', (req,res)=> {
    
})
adminRouter.post ('/create-course', (req,res)=> {
    
}) 

adminRouter.put ('/update-course', (req,res)=> {
    
})
adminRouter.get ('/my-dashboard', (req,res)=> {
    
})

module.exports={adminRouter}