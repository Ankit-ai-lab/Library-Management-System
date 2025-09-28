const mongoose  = require("mongoose")

const bookSchema = new mongoose.Schema({
    name:{type:String,required:true},
    author:String,
    gener :String,
    publicationDate:Date,
    isbn:{type:String,unique:true},
    available:{type:Boolean, default:true},
    borrowedCount:{type:Number,default:0},

    isEbook:{type:String, default:false},
    reviews:[{type:mongoose.Schema.Types.ObjectId,ref:'Review'}],


},{timestamps:true});

module.exports= mongoose.model("Book",bookSchema)

