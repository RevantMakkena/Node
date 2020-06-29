const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = process.env.npm_package_config_port || 4001;

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
