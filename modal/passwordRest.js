const mongoose  =  require("mongoose");

const Schema = mongoose.Schema;
const passRest = new Schema({
userId:String,
resetString:String,
createdAt:Date,
expiresAt:Date
})

const Passwordreset = mongoose.model("passwordReset",passRest);
module.exports = Passwordreset;