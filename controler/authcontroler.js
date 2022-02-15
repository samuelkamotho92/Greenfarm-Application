/* eslint-disable arrow-body-style */
/* eslint-disable prefer-const */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */

const jwt = require("jsonwebtoken");
const authmodels = require("../modal/authmodel");
//jwt 
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
let errors = { useremail:"", userpassword:""}
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
  const { useremail, userpassword } = req.body; 
  try{
    const usersigncred = await authmodels.create({useremail, userpassword});
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

module.exports = {
  loginclient,
  signupclient,
  loginclientpost,
  signupclientpost,
  loggedoutuser,
};
