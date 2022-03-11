
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const nodemailer = require("nodemailer");

//create a path
dotenv.config({ path: './config.env' });
const app = require('./app');
const PORT = process.env.PORT || 8080

// database connectionn
const dbURI =
  "mongodb+srv://sam:37874493@nodetuts.4ka00.mongodb.net/Greenfarm?retryWrites=true";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
.then(()=>{
   app.listen(PORT,()=>{
console.log("connected to mongdb database");
    })
  }).catch(err=>{
console.log(err);
  });

  