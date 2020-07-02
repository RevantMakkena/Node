const mongoose = require("mongoose");
const {LoginUri, HumansUri, Uri} = require("../config/keys");
mongoose
  .connect(HumansUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Human DB connected"))
  .catch((err) => console.log("Mongo Connect Error " + err));
module.exports = mongoose;
