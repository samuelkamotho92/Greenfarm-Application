const express = require("express");

const authcontroller = require("../controler/authcontroler");

const routes = express.Router();
routes
  .route("/login")
  .get(authcontroller.loginclient)
  .post(authcontroller.loginclientpost);
routes
  .route("/signup")
  .get(authcontroller.signupclient)
  .post(authcontroller.signupclientpost);
routes
.route("/logout")
.get(authcontroller.loggedoutuser);
module.exports = routes;
