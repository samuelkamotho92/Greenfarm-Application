const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const housebookSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    housedescription:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
},{timestamps:true});
const Housebook =  mongoose.model("housebook",housebookSchema);
module.exports = Housebook;