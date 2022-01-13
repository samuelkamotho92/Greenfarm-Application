const mongoose = require("mongoose");
const app = require("./app");


// database connection
const dbURI =
  "mongodb+srv://sam:37874493@nodetuts.4ka00.mongodb.net/Greenfarm?retryWrites=true";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
.then(()=>{
   app.listen(8080,()=>{
console.log("connected to mongdb database");
    })
  }).catch(err=>{
console.log(err);
  });
