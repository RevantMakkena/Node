const {SignUp} = require("../model/CoreSchema");
const bcrypt = require("bcrypt");
const {
  CheckTokenExists,
  CreateToken,
  CheckTokenInDb,
} = require("../auth/Token");

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

const CheckAndCreateToken = async (email, password) => {
  let response = {};
  let status = {response, userExists: false, passwordMatch: false};
  const doesUserExists = await RegisteredUser(email);

  if (doesUserExists) {
    status.userExists = true;
    const passwordMatch = await CheckPassword(
      password,
      doesUserExists.password
    );

    if (passwordMatch) {
      status.passwordMatch = true;
      
      const getToken = await CheckTokenInDb(email);
      
      if (!getToken) {
        const token = await CreateToken(email);
        if (token) {
          status.response = {
            user: {name: doesUserExists.name},
            token: token,
          };
        }
      } else {
        status.response = {
          user: {name: doesUserExists.name},
          token: getToken,
        };
      }
    }
  }

  return status;
};

module.exports = {
  CreateHashedPassword,
  DoesUserExists,
  RegisterUser,
  CheckPassword,
  RegisteredUser,
  CheckAndCreateToken,
};
