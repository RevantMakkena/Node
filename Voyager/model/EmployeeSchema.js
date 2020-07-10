const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
  Email: {
    type: String,
  },
  Gender: {
    type: String,
  },
  Race: {
    type: String,
  },
  University: {
    type: String,
  },
  City: {
    type: String,
  },
  State: {
    type: String,
  },
  Company: {
    type: String,
  },
  Movies: [
    {
      type: String,
    },
  ],
  Vehicles: [
    {
      Make: String,
      Model: String,
      Year: Number,
      Vin: String,
    },
  ],
  Credit: [
    {
      CreditCardNumber: String,
      CardType: String,
      CurrencyType: String,
    },
  ],
});

const Employees = mongoose.model("Employees", employeeSchema);
module.exports = {Employees};
