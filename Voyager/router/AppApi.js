const express = require("express");
const router = express.Router();
const {
  CreateHashedPassword,
  DoesUserExists,
  RegisterUser,
  CheckPassword,
  RegisteredUser,
  CheckAndCreateToken,
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

  if (isUserRegistered)
    res.status(401).send("User already registered!!");
  else {
    //Register User
    const hashedPassword = await CreateHashedPassword(password);
    const registeredUser = await RegisterUser(
      name,
      email,
      hashedPassword
    );

    if (registeredUser) res.status(200).send("Success");
    else res.status(404).send("Internal Error");
  }
});

router.post("/login", async (req, res) => {
  const {email, password} = req.body;

  const userObj = await CheckAndCreateToken(email, password);

  if (Object.keys(userObj).length !== 0) {
    if (!userObj.userExists) res.status(404).send("Cannot find user");
    else if (!userObj.passwordMatch)
      res.status(403).send("wrong password");
    else res.send(userObj.response);
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
