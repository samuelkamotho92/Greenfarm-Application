/* eslint-disable camelcase */
//booking controler
const housebook = require("../modal/bookingmodel");

const Queryoperations = require("../utility/features")

//catch block
// const catchAsync = fn(req,resp,next)=>{
// return fn(req,resp,next).catch(err=>next(err))
// }

const get_allbooking = async (req,resp)=>{
  try{
const features = new Queryoperations(housebook.find(),req.query);
const result = await features.query;
resp.render("Housebooking",
{ title:"Client Booking Information",
clientDetail:result})
  }catch(err){
resp.status(404).json({
  status:"error",
err
})
  }
}

const get_ahousebook = async (req,resp)=>{
  try{
    const houseid = req.params.id;
const getonebooking = await housebook.findById(houseid);
resp.status(200).render("ahouse",
  {title:"House booking",detail:getonebooking})
  }catch(err){
resp.status(404).json({
  status:"error",
  err
})
  }
}

const save_allbooking = async (req,resp)=>{
  try{
    const house = await housebook.create(req.body);
    resp.status(200).redirect("/Client")
  }catch(err){
    resp.status(404).json({
      status:"error",
      err
    })
  }
 
  // .json({
  //   status:"success",
  //   data:{
  //     house
  //   }
  // }).alert("booking saved successfuly")

    // house.save().then(result=>{
    //   resp.redirect("/Client")
    //   alert("Thank You for booking");
    // })
    }

    const deletebooking = async (req,resp)=>{
      try{
        const id = req.params.id;
     await housebook.findByIdAndDelete(id);
       resp.status(200).json({
  status:"success",
  data:null,
 redirect:"/api/v1/house/booking",
 mess:"deleted successfully"
       })
      }catch(err){
        resp.status(404).json({
          status:"err"
               })
      }
  }

  const houseupdate = async function(req,resp){
    try{
      const id = req.params.id;
      const updates = 
      await housebook.findByIdAndUpdate(id,req.body,{
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

  
const aggrgateFunc = async(req,resp)=>{
  try{
    const pipeline = [
      {
        $match:{
         price :{$gte:1000}
        }
      },
      {
        $group:{
          _id:"$housedescription",
        housenumbers: { $sum: 1 },
      }
    },
    {
      $sort:{
      price :1
      }
    }
    ]
    const aggreagted = await housebook.aggregate(pipeline);
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

  const mthbook = async(req,resp)=>{
    try{
      const year = req.params.year;
      const pipeline  = [
        {
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
        price:1
      }
    }]
    const result = await housebook.aggregate(pipeline);
    resp.status(200).json({
      status:"success",
      data:{
        result
      }
    })
    }catch(err){
      resp.status(404).json({
        status:"error",
        err
      })
    }

}

module.exports = {
     get_allbooking,
    save_allbooking,
    deletebooking,
    get_ahousebook,
    aggrgateFunc,
    houseupdate,
    mthbook
}