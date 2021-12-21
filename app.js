const express = require("express");
const cookieParser  = require("cookie-parser");
const routehandler = require("./Router/clientauthroutes");
const bookingroutes = require("./Router/bookingrouter");
const patientroutes = require("./Router/patientrouter");
const {jwtauthveirify,getuserinfo} = require("./middleware/authjwtverify");
const fs = require("fs");
const app = express();
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
app.get("/house",jwtauthveirify,(req,resp)=>{
  resp.render("Housebooking");
})
app.get("/setcookies",(req,resp)=>{
  resp.cookie("student","true");
  //options//httpOnly cant be accsed on the  dom ,secure only http
  resp.cookie("employee",true,{maxAge:1000*60*60*24,secure:true,httpOnly:true})
  resp.send("this are the cookies");
})
app.get("/patientbook",jwtauthveirify,(req,resp)=>{
  resp.render("patientbook")
})
app.get("/housebook",jwtauthveirify,(req,resp)=>{
  resp.render("clienthousebook")
})
//booking middlware
app.use(bookingroutes);
//patient middleware
app.use(patientroutes);
//setting our route handler for authroutes middleware
app.use(routehandler);
module.exports = app;
