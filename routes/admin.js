let {Router} = require ("express");
const express = require ("express");
const  {adminModel,coursesModel } = require  ("../db")
let adminRouter = Router();
let jwt = require ('jsonwebtoken')
const {JWT_SECRET_ADMIN} = require ("../config")

// const JWT_SECRET_ADMIN = "qwerTYuiopqq"
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

        res.json({
            success: "Admin created"
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
    }, JWT_SECRET_ADMIN)

    res.json ({
        token : userToken
    })
}

else {
    res.status(403).json({
        msg: "Incorrect Credentials"
      });
}
    
})



let auth = (req,res,next) => {
const token = req.headers.token

console.log("Token received:", req.headers.token);
const decodedData = jwt.verify(token, JWT_SECRET_ADMIN)
if (decodedData) {
req.userId = decodedData.id
next ();
}

else {
    res.status (403).json({
        msg : "You are not signed in"
    });
}
}



adminRouter.post ('/create-course', auth , async (req,res)=> {
    const creatorId= req.userId

    const {title,description, price , imageUrl} = req.body;

    const course = await coursesModel.create ({
        title, description, price, imageUrl, creatorId
    })

    res.json ({
        success : `course ${title} is successfully created`,
        courseId : course._id     
}) 
})

adminRouter.put ('/update-course', auth,  async (req,res)=> {
    const creatorId= req.userId

    const {title,description, price , imageUrl, courseId} = req.body;

    const course = await coursesModel.updateOne ({
        _id : courseId,
        creatorId : creatorId
    }
    ,{
        title, description, price, imageUrl, courseId
    })

    res.json ({
        success : `course ${title} is successfully updated`,
        courseId : course._id     
}) 
})



adminRouter.get ('/my-dashboard', auth , (req,res)=> {
    
})

module.exports={adminRouter}