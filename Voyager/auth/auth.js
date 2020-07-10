const {SignUp} = require("../model/CoreSchema");
const bcrypt = require("bcrypt");

const CreateHashedPassword = async (password) => {
  const generatedSalt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, generatedSalt);
  return hashedPassword;
};

const DoesUserExists = async (email) => {
  const user = await SignUp.findOne({email: email});
  if (user) return true;
  return false;
};

const RegisterUser = async (name, email, password) => {
  const newUser = new SignUp({name, email, password});
  const saveStatus = await newUser.save();
  return saveStatus;
};

const CheckPassword = async (password, hashedPass) => {
  return await bcrypt.compare(password, hashedPass);
};

const RegisteredUser = async (email) => {
  return await SignUp.findOne({email: email});
};

module.exports = {
  CreateHashedPassword,
  DoesUserExists,
  RegisterUser,
  CheckPassword,
  RegisteredUser,
};
