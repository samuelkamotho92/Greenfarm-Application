/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable prefer-const */
//verify user using decodededtoken
const jwt = require("jsonwebtoken");
const authmodel = require("../modal/authmodel");
//middlware
const jwtauthveirify = async(req,resp,next)=>{
//check for jwt in the cookie  //name of cookie
const token = await req.cookies.jwt;
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
  console.log(currentUser.role,"from decodeed")
    // GRANT ACCESS TO PROTECTED ROUTE
 req.newuser = currentUser;
 next();
}
    })
}else{
    //redirect if no token
    resp.redirect("/login");
}
 // GRANT ACCESS TO PROTECTED ROUTE
}

// const restrictTo = (...roles)=>{
    
//     async(req,resp,next)=>{
// //     if(!roles.includes(req.user.role)){
// // return alert("ONLY ADMIN CAN DELETE")
// //     }
//     //check for jwt in the cookie  //name of cookie

// }}



const restrictto = async(req,resp,next)=>{
        //check for jwt in the cookie  //name of cookie
        const token = req.cookies.jwt;
        if(token){
            jwt.verify(token,"samkam secret",async (err,decodedToken)=>{
                if(err){
                    next()
                }else{
                    //no err we proceed with the route 
                 let user = await authmodel.findById(decodedToken.id);
                 console.log(user)
                
                 if(user.role === "user"){
 return console.log("not permitted")
                 }
                 if(user.role==="admin" || user.role==="owner"){
                    next();
                 }
                 //2nd option call the restricto at this point with the role
                //  restrictTo(user.role,"admin")
                }
            })
        }
        else{
           console.log("wrong token")
        }
        }


        const getuserinfo = async(req,resp,next)=>{
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
                     console.log(user.role)
                    
     
                     resp.locals.user = user;
                     //2nd option call the restricto at this point with the role
                    //  restrictTo(user.role,"admin")
            
                     next();
                    }
                })
            }
            else{
                resp.locals.user = null;
                next();
            }
            }




// const restrictTo = (...roles) => (req, res, next) => {
//       // roles ['admin', 'lead-guide']. role='user'
//       //if role doesnt include ,we send a forbidden error
//     //   if (!roles.includes(req.user.role)) {
     
//     //   }
// //   console.log(req.newuser.role,"newuser")
//       next();
//     };

module.exports = {jwtauthveirify,
    restrictto,
    getuserinfo
};