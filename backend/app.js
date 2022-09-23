const express = require('express')
const app = express()
const ErrorHandler = require("./middleware/error.js");
const cookieparser =require('cookie-parser')

app.use(express.json())
app.use(cookieparser())

const product = require("./routes/ProductRoute")

const user = require("./routes/UserRoute")
 app.use("/api/ecommerce",product)
 app.use("/api/user",user)
//  app.use(ErrorHandler);


module.exports = app