const express = require("express");
const router = express.Router();
const {
  CreateHashedPassword,
  DoesUserExists,
  RegisterUser,
  CheckPassword,
  RegisteredUser,
} = require("../auth/Auth");
const {
  CreateToken,
  CheckTokenExists,
  DeleteToken,
} = require("../auth/Token");

router.get("/", (req, res) => {
  res.send("App Entry Page");
});

router.post("/register", async (req, res) => {
  const {name, email, password} = req.body;
  const isUserRegistered = await DoesUserExists(email);
  const hashedPassword = await CreateHashedPassword(password);

  if (isUserRegistered)
    res.status(401).send("User already registered!!");
  else {
    //Register User
    const registeredUser = RegisterUser(name, email, hashedPassword);
    if (registeredUser) res.status(200).send("Success");
    else res.status(404).send("Internal Error");
  }
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const _user = await RegisteredUser(email);

  if (_user) {
    //Check Hash
    const passwordMatched = await CheckPassword(
      password,
      _user.password
    );

    //JWT Token
    if (passwordMatched) {
      const isTokenExists = await CheckTokenExists(
        email,
        _user.password
      );
      if (isTokenExists) {
        res.status(200).send(email, isTokenExists);
      } else {
        const token = await CreateToken(email);

        if (token) res.status(200).send({email, token});
        else res.status(403).send("Internal server error");
      }
    } else {
      res.status(403).send("wrong password");
    }
  } else {
    res.status(404).send("Cannot find user");
  }
});

router.post("/logout", async (req, res) => {
  const {email, token} = req.headers;
  //Delete token from DB
  if (await DeleteToken(email, token))
    res.status(200).send("Success");
  else res.status(403).send("error");
});
module.exports = router;
