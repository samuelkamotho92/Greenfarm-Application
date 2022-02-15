const express = require("express");

const patcontroler = require("../controler/patientcontrols")

const authverify = require("../middleware/authjwtverify")


const patientroutes = express.Router();

//
patientroutes
.route("/patientinfo")
.get(patcontroler.aggrgateFunc)
patientroutes
.route("/monthlybooking/:year").
get(patcontroler.mthbook)
patientroutes.route("/doctor")
.get(patcontroler.get_patientbooking)
.post(patcontroler.save_patientbooking)
patientroutes.route("/detail/:id")
.get(patcontroler.get_apatientbook)
.patch(patcontroler.patientupdate)
.delete(
authverify.jwtauthveirify,
authverify.restrictTo("admin","assistant"),
    patcontroler.deletebooking)

//rendering the patoent bking form
// patientroutes.route("/patientbook")
// .get(patcontroler)
// patient
module.exports  = patientroutes;
