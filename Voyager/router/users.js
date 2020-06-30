const express = require("express");
const router = express.Router();

router.get("/api/users", (req, res) => {
  //Get users with infinite scrolling
});

router.get("/api/users/:id", (req, res) => {
  //get specific ID
});

router.post("/api/users", (req, res) => {
  //adding new user
});

router.delete("/api/users/:id", (req, res) => {
  //delete user
});

module.exports = router;
