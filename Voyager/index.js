const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {HumansUri} = require("./config/keys");
const port = process.env.npm_package_config_port || 4444;

//Connecting to DB
mongoose
  .connect(HumansUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Mongo Connect Error " + err));

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use("/", require("./router/AppApi"));
app.use("/api/emp", require("./router/EmployeeApi"));

app.listen(port, console.log(`Server running on ${port}`));
