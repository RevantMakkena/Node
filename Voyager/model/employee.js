const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  Id: {
    type: "Number",
  },
  First_Name: {
    type: "String",
  },
  Last_Name: {
    type: "String",
  },
  "Phone Number": {
    type: "String",
  },
  Email: {
    type: "String",
  },
  Gender: {
    type: "String",
  },
  Race: {
    type: "String",
  },
  University: {
    type: "String",
  },
  City: {
    type: "String",
  },
  State: {
    type: "String",
  },
  Company: {
    type: "String",
  },
  Movies: {
    type: ["String"],
  },
  Vehicles: {
    type: ["Mixed"],
  },
  Credit: {
    type: ["Mixed"],
  },
});

const Employees = mongoose.model("Employees", employeeSchema);
module.exports = {Employees};
