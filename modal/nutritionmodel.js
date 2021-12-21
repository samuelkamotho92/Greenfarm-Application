const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const nutriSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    illness:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
});
//model
const Docsmodel = mongoose.model("nutrition",nutriSchema);
module.exports = Docsmodel;