const express  = require("express");

const admincontroller = require("../controler/admincontroller")


const authverify = require("../middleware/authjwtverify")

const adminrouter = express.Router();

adminrouter
.route("/admin")
.get(
    authverify.jwtauthveirify,
    authverify.restrictto,
    admincontroller.getadminPage)
    module.exports = adminrouter