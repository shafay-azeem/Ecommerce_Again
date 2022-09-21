const app = require("./app")
const dotenv =require('dotenv')
const connectDataBase= require("./db/Database")

dotenv.config({path:"backend/config/.env"})

connectDataBase();

//Creating Server
const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})