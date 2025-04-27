
const express = require ("express");
let app = express();

const {userRouter} = require ("./routes/user");
const {courseRouter} = require("./routes/courses");
const {adminRouter} = require ("./routes/admin");
const { default: mongoose } = require("mongoose");


app.use ('/api/v1/user',userRouter)
app.use ('/api/v1/course',courseRouter)
app.use ('/api/v1/admin',adminRouter)

    async function main() {
        try {
          await mongoose.connect("mongodb+srv://syedhasanali931:tv3dayvFhF3GzXwY@cluster0.mucrdbx.mongodb.net/course-selling-app");
          console.log("Connected to MongoDB");
      
          app.listen(3000, () => {
            console.log("Server is running on port 3000");
          });
      
        } catch (error) {
          console.error("Error connecting to MongoDB:", error);
        }
      }
    
      main();