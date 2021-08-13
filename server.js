const app = require("./app");
const mongoose = require("mongoose");
// database connection
const dbURI =
  "mongodb+srv://sam:37874493@nodetuts.4ka00.mongodb.net/Greenfarm?retryWrites=true";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(8000, () => {
      console.log("connected");
    })
  )
  .catch((err) => console.log(err));
