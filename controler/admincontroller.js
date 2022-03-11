
const getadminPage = async (req,resp)=>{
  try{
resp.render("admin",{title:"Admin Page"})
  }catch(err){
resp.status(404).json({
    status:"fail",
    message:"Seems there is an Error"
})
  }
}
const createAdmin = async (req,resp)=>{
    try{
  resp.staus(200).json({
      status:"success",
      message:"Admin Created"
  })
    }catch(err){
  resp.status(404).json({
      status:"fail",
      message:"Seems there is an Error"
  })
    }
  }

// eslint-disable-next-line no-unused-expressions
module.exports =  {
    getadminPage,
    createAdmin
 }