let {Router} = require ("express");
const express = require ("express");
const {coursesModel, purchasesModel} = require ("../db")
let courseRouter = Router();
let {auth} = require ("./user")
courseRouter.use(express.json());




//auth middleware pending
courseRouter.post ('/purchase-course',async (req,res)=> {
    let userId = req.body.id
    let courseId = req.body.courseId

    await purchasesModel.create({
        userId,
        courseId    
    })

    res.json ({
        success : `you have successfully purchased ${courseId}`
    })
})

courseRouter.get ('/view-courses', async (req,res)=> {

    const allCourses = await coursesModel.find({})

    res.json({
        allCourses
    })
    
})

module.exports = {courseRouter}