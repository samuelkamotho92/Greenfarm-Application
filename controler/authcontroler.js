const authmodels = require("../modal/authmodel");
const jwt = require("jsonwebtoken");
//jwt 
let maxAge = 3*24*60*60;
const creatjwt = (id)=>{
    return jwt.sign({id},"samkam secret",{
        expiresIn:maxAge
    })
}
//error handling
const handleError = (err)=>{
console.log(err.message,err.code);
let errors = { useremail:"", userpassword:""}
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
  const { useremail, userpassword } = req.body;
  try{
const userlogincred = await authmodels.create({useremail, userpassword});
resp.status(200).json(userlogincred);
  }
  catch(err){
resp.status(404).send("OOPS!Erorr")
  }
  console.log(req.body);
};
const signupclientpost = async (req, resp) => {
  const { useremail, userpassword } = req.body;
  try{
    const usersigncred = await authmodels.create({useremail, userpassword});
    const tk  = creatjwt(usersigncred._id);
    resp.cookie("jwt",tk,{httpOnly:true,maxAge: maxAge* 1000})
    //json data sent to client
    resp.status(201).json({usersigncred:usersigncred._id});
  }
  catch(err){
    const authErrors =  handleError(err);
    resp.status(404).json({authErrors});
    console.log(authErrors)
  }
};
module.exports = {
  loginclient,
  signupclient,
  loginclientpost,
  signupclientpost,
};
