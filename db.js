const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId



let UserSchema = new Schema ({
    
    email : {type : String, unique : true} ,
    password : String,
    firstName : String,
    lastName : String
})

let AdminSchema = new Schema ({
   
    email : {type : String, unique : true} ,
    password : String,
    firstName : String,
    lastName : String
})

let CoursesSchema = new Schema ({
    
    title : String,
    description : String,
    price : Number,
    imageUrl : String,
    creatorId : ObjectId
})

let PurchasesSchema = new Schema ({
    courseId : ObjectId,
    userId : ObjectId
})


const userModel = mongoose.model ("user-collection", UserSchema)
const adminModel = mongoose.model ("admin-collection", AdminSchema)
const coursesModel = mongoose.model ("courses-collection", CoursesSchema)
const purchasesModel = mongoose.model ("purchases-collection", PurchasesSchema)


module.exports = {
userModel,
adminModel,
coursesModel,
purchasesModel

}