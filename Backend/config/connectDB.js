const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
       const conn= await  mongoose.connect(process.env.MONGO_URI)
        console.log("Data base connected to the server")
    } catch (error) {
        console.error("data base not connected to the server",error.message)
        process.exit(1)
    }
}

module.exports = connectDB;
