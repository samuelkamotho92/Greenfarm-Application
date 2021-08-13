const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");
//define the Schema class
const Schema = mongoose.Schema;
//instance class
const authSchema = new Schema(
    {
useremail:{
    type:String,
    required:[true,"please enter an email"],
    unique:[true,"please enter a unique email"],
    lowercase:true,
    validate:[isEmail,"Please enter a valid email"]
},
userpassword:{
    required:[true,"please enter a password"],
    type:String,
    minlength:[8,"please enter 8 or more character"]
}
    }
);
//after some events
authSchema.post("save",function(doc,next){
    console.log("user saved",doc);
    next();
})
//before pushing pasword we hash and salt the password
authSchema.pre("save",async function(next){
    console.log("user about to be saved",this);
    const salt = await bcrypt.genSalt();
    this.userpassword = await bcrypt.hash(this.userpassword,salt);
    next();
})
//model
const authmodel = mongoose.model("user",authSchema);
module.exports = authmodel;
