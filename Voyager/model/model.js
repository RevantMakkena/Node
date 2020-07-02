const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;

const RegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const JsonTokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const SignUp = mongoose.model("SignUp", RegistrationSchema);
const Token = mongoose.model("Token", JsonTokenSchema);
module.exports = {SignUp, Token};
