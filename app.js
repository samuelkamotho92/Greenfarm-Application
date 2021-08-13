const express = require("express");
const cookieParser  = require("cookie-parser");
const routehandler = require("./Router/clientauthroutes");
const fs = require("fs");
const app = express();
// serve your css as static
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//html templatimg
app.set("view engine", "ejs");
app.get("/", (req, resp) => {
  resp.status(200).render("index");
});
app.get("/About", (req, resp) => {
  resp.render("About us");
});
app.get("/Order", (req, resp) => {
  resp.render("orderonline");
});
app.get("/Client", (req, resp) => {
  resp.render("Clients");
});
app.get("/setcookies",(req,resp)=>{
  resp.cookie("student","true");
  resp.cookie("employee",true,{maxAge:1000*60*60*24,secure:true,httpOnly:true})
  resp.send("this are the cookies");
})
//setting our route handler middleware
app.use(routehandler);
module.exports = app;
