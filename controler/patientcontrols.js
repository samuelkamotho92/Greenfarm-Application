/* eslint-disable no-empty */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
//patient controler
const doctorbooking = require("../modal/nutritionmodel");

const AppError = require("../utility/appError");

const catchAsync = require("../utility/catchAsync");

const queryops = require("../utility/features");





const get_patientbooking = catchAsync(async (req,resp,next)=>{
   const features = new queryops(doctorbooking.find(),req.query);
  const result = await features.query;
  try{
    resp.status(200).render("doctors",
    { title:"Patient Booking",
    patientDetail:result})
  }catch(err){
alert("NOT PERMITTED")
  }

  })
const get_apatientbook = catchAsync(async (req,resp,next)=>{
    const patientid = req.params.id;
const getonebooking = await doctorbooking.findById(patientid);
if(!getonebooking){
  return next(new AppError('No tour found with that ID', 404));
}
//returns on eobject taht you can get a specific value
resp.status(200).render("detail",
  {title:"Patient Information",detail:getonebooking})
})
const save_patientbooking = catchAsync(async (req,resp,next)=>{
  const nutri = await doctorbooking.create(req.body);
    resp.status(200).redirect("/Client")
  });

  const deletebooking = catchAsync(async (req,resp,next)=>{
    try{
      const id = req.params.id;
      console.log(id);
  const book =  await doctorbooking.findByIdAndDelete(id);
     resp.status(200).json({
status:"success",
redirect:"/api/v1/patients/doctor",
mess:"deleted Suucesfully"
     })
    }catch(err){
      resp.status(404).json({
        status:"error",
        message:"not authoursied"
             })
    }
  next()
})

const patientupdate = catchAsync(async (req,resp,next)=>{
    const id = req.params.id;
    const updates = await doctorbooking.findByIdAndUpdate(id,req.body,{
      runValidators:true,
      new : true
    });
    if(!updates){
      return next(new AppError('No tour found with that ID', 404))
      }
    resp.status(204).json({
      status:"success",
      data:{
        updates
      }
    })
})


//aggregate

const aggrgateFunc = catchAsync(async(req,resp,next)=>{
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
})

//monthly patient booking

const mthbook = catchAsync(async(req,resp)=>{
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

  });
  module.exports = {
      get_patientbooking,
      save_patientbooking,
      get_apatientbook,
      deletebooking,
      patientupdate,
      aggrgateFunc,
      mthbook
  }
  