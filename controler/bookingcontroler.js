//booking controler
const housebook = require("../modal/bookingmodel");
const get_allbooking = (req,resp)=>{
    housebook.find().then(result=>{
      console.log(result)
      resp.render("Housebooking",
      { title:"Client Booking Information",
      clientDetail:result})
    }).catch(err=>{
      console.log(err.message)
    })
  }
const save_allbooking = (req,resp)=>{
    console.log(req.body)
    const house = new housebook(req.body);
    house.save().then(result=>{
      resp.redirect("/Client")
      alert("Thank You for booking");
    })
    }

  module.exports = {
    get_allbooking,
    save_allbooking
  }