require('dotenv').config()
const mongoose  = require("mongoose")
const express  = require("express")
const connectDB = require("./config/connectDB")
const dotenv = require("dotenv")


connectDB();
const PORT = process.env.MONGO_URI || 3000

const app = express()
app.use(express.json())


app.get('/test',(req,res)=>{
    res.status(200).json({message:"server is runing"})
})



app.listen(PORT,()=>{
    console.log(`server is runng on port ${PORT}`)
})

