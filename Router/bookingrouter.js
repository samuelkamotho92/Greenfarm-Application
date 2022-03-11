const express = require("express");

const controller = require("../controler/bookingcontroler");

const authverify = require("../middleware/authjwtverify")

const bookrouter = express.Router();
bookrouter.route("/booking")
.get(
    authverify.jwtauthveirify,
    authverify.restrictto, 
    controller.get_allbooking)
.post(controller.save_allbooking);
bookrouter.route("/detail/:id")
.get(
    authverify.jwtauthveirify,
    authverify.restrictto, 
    controller.get_ahousebook)
.patch(controller.houseupdate)
.delete(
    authverify.jwtauthveirify,
    authverify.restrictto,
    controller.deletebooking)

module.exports = bookrouter;