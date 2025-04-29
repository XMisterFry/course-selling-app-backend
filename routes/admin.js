let {Router} = require ("express");
const express = require ("express");
const  {adminModel} = require  ("../db")
let adminRouter = Router();
let jwt = require ('jsonwebtoken')
const JWT_SECRET = "qwerTYuiop"
const {z} = require ("zod")
adminRouter.use(express.json());



adminRouter.post ('/signup', async (req,res)=> {
     let email = req.body.email
     let password = req.body.password
     let firstName = req.body.firstName
     let lastName = req.body.lastName

     try {
       
        await adminModel.create ({
            email,
            password,
            firstName,
            lastName
        })

     }

     catch (e) {
        console.log (e)
        res.status (400).json({
            error : "Use already exists "
        })
     }

     
})

adminRouter.post ('/signin', async (req,res)=> {

    let reqemail = req.body.email
    let reqpassword = req.body.password

    let targetUser = await adminModel.findOne ({
        email : reqemail
    })

    if (!targetUser) {
        res.status (403).json ({
            error : "User does not exist"
        })
        return
    }

if (targetUser.password == reqpassword) {
    const userToken = jwt.sign ({
        id : targetUser._id
    }, JWT_SECRET)

    res.json ({
        token : userToken
    })
}

else {
    res.status(403).json({
        msg: "Incorrect Credentials",
      });
}
    
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