const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("App Entry Page");
});

router.post("/register", (req, res) => {
  //Register User
});

router.post("/login", (req, res) => {
  //Login user
});

module.exports = router;
