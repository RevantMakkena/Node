const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const port = process.env.npm_package_config_port || 4001;

//DB config
const db = require("./config/keys").MongoUri;

//Connect to MOngo
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Body Parser
app.use(express.urlencoded({extended: false}));

//Express session
app.use(
  session({
    secret: "secretNode",
    resave: false,
    saveUninitialized: true,
  })
);

//Flash
app.use(flash());

//Global Var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
