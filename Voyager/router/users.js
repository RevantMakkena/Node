const express = require("express");
const router = express.Router();
const mongoose = require("../model/humanDb");
const {CheckTokenExistsMiddleware} = require("../auth/token");

router.get("/", CheckTokenExistsMiddleware, async (req, res) => {
  console.log(mongoose.Collection());
});

router.get("/:id", (req, res) => {
  //get specific ID
});

router.post("/", (req, res) => {
  //adding new user
});

router.delete("/:id", (req, res) => {
  //delete user
});

module.exports = router;
