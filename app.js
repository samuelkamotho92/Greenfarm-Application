/* eslint-disable eqeqeq */
const express = require("express");
const morgan = require("morgan");
const cookieParser  = require("cookie-parser");
const routehandler = require("./Router/clientauthroutes");
const bookingroutes = require("./Router/bookingrouter");
const patientroutes = require("./Router/patientrouter");
const AppError = require("./utility/appError")
const globalError = require("./controler/errorController")
const {jwtauthveirify,getuserinfo} = require("./middleware/authjwtverify");

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// serve your css as static
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());


//html templatimg
app.set("view engine", "ejs");
app.get("*",getuserinfo);
app.get("/", (req, resp) => {
  resp.status(200).render("index");
});
app.get("/About", (req, resp) => {
  resp.render("About us");
});
app.get("/Client", (req, resp) => {
  resp.render("Clients");
});
app.get("/Order",jwtauthveirify ,(req,resp)=>{
  resp.render("orderonline");
})
//get all the house bookings , admin
app.get("/house",jwtauthveirify,(req,resp)=>{
  resp.render("Housebooking");
})

app.get("/setcookies",(req,resp)=>{
  resp.cookie("student","true");
  //options//httpOnly cant be accsed on the  dom ,secure only http
  resp.cookie("employee",true,{maxAge:1000*60*60*24,secure:true,httpOnly:true})
  resp.send("this are the cookies");
})
//have to verify before house booking and patient booking
             //user
app.get("/patientbook",jwtauthveirify,(req,resp)=>{
  resp.render("patientbook")
})
app.get("/housebook",jwtauthveirify,(req,resp)=>{
  resp.render("clienthousebook")
})


//administrator routes to access data
//booking middlware
app.use("/api/v1/house",bookingroutes);
//patient middleware
app.use("/api/v1/patients",patientroutes);
//setting our route handler for authroutes middleware
app.use(routehandler);

//incase of a wrong route
 //create an error
app.all("*",(req,resp,next)=>
next(new AppError(`cannot find the path of ${req.originalUrl} try again`,404)))
//call the global error handling middleware
app.use(globalError);
module.exports = app;
