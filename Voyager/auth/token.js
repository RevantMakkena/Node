const jwt = require("jsonwebtoken");
const {Token} = require("../model/model");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../config/keys");

const CreateToken = async (email) => {
  const token = await jwt.sign(email, ACCESS_TOKEN_SECRET);
  if (token) {
    //Save in db
    var newToken = new Token({email, token});
    const tokenSaved = await newToken.save();
    if (tokenSaved) {
      return token;
    }
  } else {
    return null;
  }
};

const CheckTokenExists = async (email, token) => {
  const tokenInDb = await Token.findOne({email, token});

  if (tokenInDb) {
    //Decode JWT
    const isMatch = await jwt.verify(token, ACCESS_TOKEN_SECRET);

    if (isMatch) return true;
    else return null;
  } else return null;
};

const DeleteToken = async (email) => {
  const tokenInDb = await Token.findOneAndDelete({email: email});
  if (tokenInDb) return true;
  else return false;
};

const CheckTokenExistsMiddleware = async (req, res, next) => {
  const {email, token} = req.headers;
  const valid = await CheckTokenExists(email, token);

  if (valid) next();
  else res.status(404).send("User not logged");
};

module.exports = {
  CreateToken,
  CheckTokenExists,
  DeleteToken,
  CheckTokenExistsMiddleware,
};
