const express = require("express");

const controller = require("../controler/bookingcontroler");

const authverify = require("../middleware/authjwtverify")

const bookrouter = express.Router();
bookrouter.route("/booking")
.get(controller.get_allbooking)
.post(controller.save_allbooking);
bookrouter.route("/detail/:id")
.get(controller.get_ahousebook)
.patch(controller.houseupdate)
.delete(
    authverify.jwtauthveirify,
    authverify.restrictTo("admin","assistant"),
    controller.deletebooking)

module.exports = bookrouter;