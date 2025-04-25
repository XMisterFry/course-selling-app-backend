const express = require ("express");
let app = express();

const {userRouter} = require ("./routes/user");
const {courseRouter} = require("./routes/courses")


app.use ('/api/v1/user',userRouter)
app.use ('/api/v1/course',courseRouter)
pp.use ('/api/v1/admin',adminRouter)

app.listen(3000)