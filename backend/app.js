const express = require('express')
const app = express()
const ErrorHandler = require("./middleware/error.js");

app.use(express.json())

const product = require("./routes/ProductRoute")

const user = require("./routes/UserRoute")
 app.use("/api/ecommerce",product)
 app.use("/api/user",user)
 app.use(ErrorHandler);


module.exports = app