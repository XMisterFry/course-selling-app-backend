let {Router} = require ("express");
const express = require ("express");
const  {userModel,purchasesModel} = require ("../db");
let userRouter = Router();
let jwt = require ('jsonwebtoken');
const {JWT_SECRET_USER} = require ("../config")
userRouter.use(express.json());

userRouter.post ('/signup', async (req,res)=> {
    let {email , password, firstName, lastName} = req.body;


    try {
    await userModel.create ({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        msg: "You are signed up"
    })

}

catch (e) {
    console.log(e)
    res.status(403).json ({
        error : "User with same email id exists"

    })
}


})

userRouter.post ('/signin', async (req,res)=> {

let reqEmail = req.body.email 
let reqPassword = req.body.password

let targetUser = await userModel.find({
    email : reqEmail
})

if (!targetUser) {
    res.send(403).json ({
        error : "User does not exist"
    })

    return
}

if (!targetUser.password == reqPassword ) {
    res.status(403).json({
        msg: "Incorrect Credentials",
      });
}

else {
    let userToken = jwt.sign ({
        id : targetUser._id
    },JWT_SECRET_USER)

    res.json ({
        token : userToken
    })


}


})

let auth = (req,res,next) => {
const token = req.headers.token
const decodedData = jwt.verify(token, JWT_SECRET_USER)
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


userRouter.get ('/my-purchases', auth, async (req,res)=> {
    let userId = req.user.id
    

    const myPurchases = await purchasesModel.find({
        userId

    })

res.json({
    myPurchases
})

    
})

module.exports={userRouter, auth}