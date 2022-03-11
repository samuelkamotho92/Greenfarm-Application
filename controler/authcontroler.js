/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt")

const authmodels = require("../modal/authmodel");

const random = require("../random");

const passwordRest = require("../modal/passwordRest")
//jwt 

//transporter



let maxAge = 3*24*60*60;
//pass the id to create the jwt
const creatjwt = (id)=>{
  //payload ,//secret
  //headerjwt.sign(payload, secretOrPrivateKey, [options, callback])
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:maxAge
    })
}
//error handling
const handleError = (err)=>{
console.log(err.message,err.code);
//object to be updated 
let errors = { useremail:"", userpassword:"",userpasswordConfirm:""}
if(err.message === "incorrect email"){
  errors.useremail = "email not regesterd"
  }
  if(err.message === "incorrect password"){
      errors.userpassword = "password not regesterd"
      }
if(err.code === 11000){
    //duplicate email
    errors.useremail ="Duplicate email enter a unique one";
    return errors;
}
//checking specific error
if(err.message.includes("user validation failed")){
    Object.values(err.errors).forEach(errAuth=>{
        errors[errAuth.properties.path] = errAuth.properties.message;
    })
}
return errors;
};


const loginclient = (req, resp) => {
  resp.status(200).render("login");
};
const signupclient = (req, resp) => {
    resp.status(200).render("signup");
  };
const loginclientpost = async (req, resp) => {
  const {useremail,userpassword} = req.body
  console.log(useremail,userpassword);
  try {
    //pass the creditials about the user
     const user = await authmodels.login(useremail,userpassword);
     //if the user is retured,create a jwt,and a cookie
     const tk  = creatjwt(user._id);
resp.cookie("jwt",tk,{httpOnly:true,maxAge: maxAge* 1000})
     resp.status(200).json({user:user._id});
  } catch (err) {
      const error =  handleError(err);
    resp.status(400).json({error})
  }
};
const signupclientpost = async (req, resp) => {
  const { useremail, userpassword ,userpasswordConfirm } = req.body; 
  try{
    const usersigncred = 
    await authmodels.create({useremail, userpassword , userpasswordConfirm});
    //create a jwt upon creating the user
    const tk  = creatjwt(usersigncred._id);
    //cookie creation 
    resp.cookie("jwt",tk,{httpOnly:true,maxAge: maxAge* 1000})
    //json data sent to client
    resp.status(201).json({usersigncred:usersigncred._id});
  }
  catch(err){
    //error handling 
    const authErrors =  handleError(err);
    resp.status(404).json({authErrors});
    console.log(authErrors)
  }
};
const loggedoutuser = (req,resp)=>{
  resp.cookie("jwt","",{maxAge: 1 });
  resp.redirect("/Client");
}

const passwordRestUser = (req,resp)=>{
  resp.status(200).render("passwordreset");
}
const resetRequest = (req,resp)=>{
  //email and the url to direct 
  //the user to a frontend page to insert new password
const {useremail,redirectUrl} = req.body;
//check if the email exist in the database
try{
authmodels.find({useremail}).then((data)=>{
  console.log(data)
  if(data.length){
    // resp.status(200).json({
    //   status:"success",
    // })
    sendEmailReset(data[0],redirectUrl,resp)
  }else{
    resp.status(404).json({
      status:"fail",
      message:"user does not exist"
    })
  }

})
}catch(err){
 console.log(err)
  resp.status(404).json({
    status:"fail",
    message:err.message
  })
}
}
 
const sendEmailReset = (({_id,useremail},redirectUrl,resp)=>{
  //reset string 
  const resetString = random + _id;
  console.log(resetString)
  //clear the data existing reset records
try{
  passwordRest.deleteMany({userId:_id}).then((data)=>{
  //upon deleting the previous record send the email
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:"samuelkamotho47@gmail.com",
      pass:"37874493"
    },
    // tls: {
    //   rejectUnauthorized: false
    // }
  })


  const mailOptions = {
    from:"samuelkamotho47@gmail.com",
    to:useremail,
    subject: "password reset",
    // html:
    html:`<p>We heard you lose your password 
    dont worry,click the link to reset it
    <a href=${`${redirectUrl  }/${  _id  }/${  resetString}`}>HERE
    </a>to proceed And Expires In 60min</p>`
  };
  //hash the reset String
const saltRounds = 10;
bcrypt.hash(resetString,saltRounds).then(hashed=>{
  const newResetCollection = new passwordRest({
    //same id as the one in the user model
    userId:_id,
    resetString:hashed,
    createdAt:Date.now(),
    expiresAt:Date.now() + 3600000
  })
  newResetCollection.save().then(result=>{
//create our transporter
transporter.sendMail(mailOptions,(err,data)=>{
if(err){
  console.log(err)
}else{
  console.log("SENT SUCCESFULLY")
  resp.status(200).json({
    status:"PENDING",
    message:"SENT CHECK YOUR EMAIL"
  })
}
})
  }).catch(err=>{
console.log(err)
resp.status(404).json({
  status:"fail",
  message:err.message
})
  })
}).catch(err=>{
  console.log(err);
  resp.status(404).json({
    status:"fail",
    message:err.message
  })
})
//add to database

  })
}catch(err){
console.log(err)
resp.status(404).json({
  status:"fail",
  message:err.message
})
}
});


module.exports = {
  loginclient,
  signupclient,
  loginclientpost,
  signupclientpost,
  loggedoutuser,
  passwordRestUser,
  resetRequest
};
