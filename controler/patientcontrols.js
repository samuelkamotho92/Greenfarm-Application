/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
//patient controler
const doctorbooking = require("../modal/nutritionmodel");

const queryops = require("../utility/features");

const get_patientbooking = async (req,resp)=>{
 try{
   const features = new queryops(doctorbooking.find(),req.query);
  const result = await features.query;
  resp.status(200).render("doctors",
  { title:"Patient Booking",
  patientDetail:result})
 }catch(err){
resp.status(404).json({
status:"error",
err
})
 }
  }
const get_apatientbook = async (req,resp)=>{
  try{
    const patientid = req.params.id;
const getonebooking = await doctorbooking.findById(patientid);
resp.status(200).render("detail",
  {title:"Patient Information",detail:getonebooking})
  }catch(err){
resp.status(404).json({
  status:"error",
  err
})
  }
}
const save_patientbooking = async (req,resp)=>{
  try{
  const nutri = await doctorbooking.create(req.body);
    resp.status(200).json({
      status:"success",
      data:{
        nutri
      }
    })
  }catch(err){
resp.status(404).json({
  status:"error",
  err
})
  }
  }
  const deletebooking = async (req,resp)=>{
    try{
      const id = req.params.id;
   await doctorbooking.findByIdAndDelete(id);
     resp.status(200).json({
status:"success",
data:null,
redirect:"/doctor"
     })
    }catch(err){
      resp.status(404).json({
        status:"err"
             })
    }
}

const patientupdate = async function(req,resp){
  try{
    const id = req.params.id;
    const updates = await doctorbooking.findByIdAndUpdate(id,req.body,{
      runValidators:true,
      new : true
    });
    resp.status(204).json({
      status:"success",
      data:{
        updates
      }
    })
  }catch(err){
    resp.status(404).json({
      status:"error",
      err
           })
  }
  
}


//aggregate

const aggrgateFunc = async(req,resp)=>{
  try{
    const pipeline = [
      {
        $match:{
          age:{$gte:1}
        }
      },
      {
        $group:{
          _id:"$age",
          sumAges: { $sum: 1 },
      }
    },
    {
      $sort:{
        age:1
      }
    }
    ]
    const aggreagted = await doctorbooking.aggregate(pipeline);
    resp.status(200).json({
      status:"success",
      data:{
        aggreagted 
      }
    })
  }catch(err){
resp.status(404).json({
  status:"erro",
  err
})
console.log(err)
  }


}

//monthly patient booking

const mthbook = async(req,resp)=>{
  try{
    const year = req.params.year;
    console.log(year)
    const pipeline  = [{
      $match:{
        date:{
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
      }
      }
    },
    {
      $group:{
        _id:{$month:"$date"}
      }
    },
  {
    $sort:{
      age:1
    }
  }];
  const result = await doctorbooking.aggregate(pipeline);
  resp.status(200).json({
    status:"success",
  result
  })
  }catch(err){
resp.status(404).json({
  status:"error",
  err
})
  }
 
  


  
}


  module.exports = {
      get_patientbooking,
      save_patientbooking,
      get_apatientbook,
      deletebooking,
      patientupdate,
      aggrgateFunc,
      mthbook
  }
  