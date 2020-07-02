const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {LoginUri, HumansUri, Uri} = require("./config/keys");
const port = process.env.npm_package_config_port || 4444;

//Connecting to DB
// mongoose
//   .connect(LoginUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("User DB connected"))
//   .catch((err) => console.log("Mongo Connect Error " + err));

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use("/", require("./router/app"));
app.use("/api/users", require("./router/users"));

app.listen(port, console.log(`Server running on ${port}`));
