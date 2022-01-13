const mongoose = require("mongoose");

const Schema =  mongoose.Schema;
const nutriSchema = new Schema({
    name:{
        type:String,
        required:[true,"must have a name"]
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true,
        min:[10,"must be 10 digits and above"]
    },
    illness:{
        type:String,
        required:[true,"Where are you sick?"]
    },
    date:{
        type:String,
        required:[true,"kindly book a date to see the doctor"]
    },
    ceratedAt:{
        type:Date,
        default: Date.now()
    },
    age:{
        type:Number,
        required:[true,"whats the patients age"]
    }
});
//model
const Docsmodel = mongoose.model("nutrition",nutriSchema);
module.exports = Docsmodel;