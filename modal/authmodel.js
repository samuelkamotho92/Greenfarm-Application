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
    type:String,
    required:[true,"please enter a password"],
    minlength:[8,"please enter 8 or more character"]
},
userpasswordConfirm:{
    type:String,
    required:[true,"please enter password confirm"],
    validate:{
        validator:function(el){
            return el === this.userpassword
        },
        message:`Enter the correct password confirmation`
    }
},
role:{
    type:String,
    enum:["user","admin","owner"],
    default:"user"
}

    }
);
//after some events
authSchema.post("save",(doc,next)=> {
    // console.log("user saved",doc);
    next();
})
//mongose pre hook
//before pushing pasword we hash and salt the password
authSchema.pre("save",async function(next){
    if(!this.isModified("userpassword")){
next()
    }
    // console.log("user about to be saved",this);
    const salt = await bcrypt.genSalt();
    this.userpassword = await bcrypt.hash(this.userpassword,salt);
//dont save it in the database
    this.userpasswordConfirm = undefined;
    next();
})
// static method to login user
authSchema.statics.login = async function (useremail,userpassword) {
    //this reffers to the model  
    //returns the colection that matches
    const user = await this.findOne({useremail}); 
    if(user)
    {
        //comapres the password
  const auth = await bcrypt.compare(userpassword,user.userpassword);
  if(auth){
 return user;
  }
  throw Error("incorrect password");
    }
    throw Error("incorrect email");
  }
//model
const authmodel = mongoose.model("user",authSchema);
module.exports = authmodel;
