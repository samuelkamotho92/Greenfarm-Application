const express = require("express");
const controller = require("../controler/bookingcontroler");
const bookrouter = express.Router();
bookrouter.route("/booking")
.get(controller.get_allbooking)
.post(controller.save_allbooking);

module.exports = bookrouter;