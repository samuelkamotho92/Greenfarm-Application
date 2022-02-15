/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
//verify user using decodededtoken
const jwt = require("jsonwebtoken");
const authmodel = require("../modal/authmodel");
//middlware
const jwtauthveirify = (req,resp,next)=>{
//check for jwt in the cookie  //name of cookie
const token = req.cookies.jwt;
if(token){
    //verify 
    //comapre the jwt,secrete
    jwt.verify(token,"samkam secret",(err,decodedToken)=>{
if(err){
    //redirect
    console.log(err.message)
    resp.redirect("/login");
}else{
    //no err we proceed with the route 
    console.log({decodedToken});
   const currentUser = authmodel.findById(decodedToken._id);
   req.user = currentUser
next()
}
    })
}else{
    //redirect if no token
    resp.redirect("/login");
}
}

const restrictTo = (...roles)=>(req,resp,next)=>{
    if(!roles.includes(req.user.role)){
return alert("NO PERMISSON TO PERFORM THE ACTION")
    }
    next();
}




const getuserinfo = (req,resp,next)=>{
//check for jwt in the cookie  //name of cookie
const token = req.cookies.jwt;
if(token){
    jwt.verify(token,"samkam secret",async (err,decodedToken)=>{
        if(err){
            resp.locals.user = null;
            next()
        }else{
            //no err we proceed with the route 
         let user = await authmodel.findById(decodedToken.id);
         console.log(user);
         resp.locals.user = user;
         next();
        }
    })
}
else{
    resp.locals.user = null;
    next();
}
}
module.exports = {jwtauthveirify,
    getuserinfo,
    restrictTo
};