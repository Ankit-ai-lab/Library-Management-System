const mongoose = require("mongoose")

const borrowSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    book:{type:mongoose.Schema.Types.ObjectId,ref:'Book',required:true},
borrowedAt:{type:Date,default:Date.now},
returnedAt:Date,
finePaid:{type:Number,default:0}
})

module.exports = mongoose.Schema("Borrow",'borrowShema')