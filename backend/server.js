const app = require("./app")
const dotenv = require('dotenv')
const connectDataBase = require("./db/Database")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")

process.on("handledException", (err) => {
    console.log(`Error : ${err.message}`)
    console.log(`Shutting down Server for handled Exception`)
})

dotenv.config({ path: "backend/config/.env" })

connectDataBase();



app.use(notFound);
app.use(errorHandler);


//Creating Server
const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`)
})
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down Server for ${err.message}`)
    console.log(`Shutting down Server due to unhandled Rejection`)
    server.close(() => {
        process.exit(1);
    })

})