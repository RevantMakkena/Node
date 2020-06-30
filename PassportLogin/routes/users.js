const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const {name, email, password, password2} = req.body;
  let errors = [];
  if (!name || !email || !password || !password2)
    errors.push({msg: "Please fill all fields!!"});

  if (password !== password2) errors.push("Passwords should match");

  if (password.length < 6)
    errors.push({
      msg: "Password should be greater than 6 characters ",
    });

  if (errors.length > 0) {
    res.render("register", {
      errors,
      email,
      name,
      password,
      password2,
    });
  } else {
    User.findOne({email: email}).then((user) => {
      if (user) {
        errors.push({msg: "Email already exists"});
        res.send("User exists");
      } else {
        const newUser = new User({name, email, password});
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(() => {
                req.flash("success_msg", "Registered!!");
                res.render("login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

router.post("/login", (req, res) => {
  const {email, password} = req.body;
  User.res.send("Post Login");
});

module.exports = router;
