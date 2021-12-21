//patient controler
const doctorbooking = require("../modal/nutritionmodel");
const get_patientbooking = (req,resp)=>{
    doctorbooking.find().then(result=>{
      console.log(result)
      resp.render("doctors",{ title:"Patient Booking",
      patientDetail:result})
    }).catch(err=>{
      console.log(err.message)
    })
  }
const get_apatientbook = (req,resp)=>{
const patientid = req.params.id;
doctorbooking.findById(patientid).then(result=>{
  resp.render("detail",
  {title:"Patient Information",detail:result});
})
}
const save_patientbooking = (req,resp)=>{
    console.log(req.body);
    const nutri = new doctorbooking(req.body);
    console.log(nutri)
nutri.save().then((result)=>{
resp.redirect("/Client");
alert("Thank You For Booking");
    }).catch(err=>{
      console.log(err);
    })
  }
  const deletebooking = (req,resp)=>{
    const id = req.params.id;
    doctorbooking.findByIdAndDelete(id).then(()=>{
    //send back a redirect in json to the frontend upon deleting
  resp.json({redirect:"/doctor"});
    }).catch(err=>{
        console.log(err)
})
}

  module.exports = {
      get_patientbooking,
      save_patientbooking,
      get_apatientbook,
      deletebooking
  }
  