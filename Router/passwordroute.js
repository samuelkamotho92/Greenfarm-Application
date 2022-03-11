const express = require("express");

const authcontroler = require("../controler/authcontroler")

const resetrouter = express.Router();

resetrouter
.route("/passwordRest")
.get(authcontroler.passwordRestUser)
.post(authcontroler.resetRequest)

module.exports = resetrouter;