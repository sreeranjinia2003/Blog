
const express = require('express')
require('dotenv').config()

const connectDB = require('./config/db')
const router = require('./Routes/routes')

const server = express()


server.use(express.json())

server.use(router)


connectDB()


server.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Blog API Server Running"
    })
})


server.listen(3000, () => {
    console.log("Server started at port 3000")
})
