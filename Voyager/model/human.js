const mongoose = require("mongoose");

var Users = mongoose.model("Users", new mongoose.Schema({}), "Users");
var Employees = mongoose.model(
  "Employees",
  new mongoose.Schema({}),
  "Employees"
);

module.exports = {Users, Employees};
