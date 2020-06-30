const localStrategy = require("passport-local").Strategy;
// const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {usernameField: "email"},
      (email, password, done) => {
        //Match user
        User.findOne({email: email})
          .then((user) => {
            //Check user
            if (!user) {
              return done(null, false, {
                message: "Email is not registered",
              });
            }

            //Match Password
            bcrypt.compare(
              password,
              user.password,
              (err, isMatch) => {
                if (err) {
                  console.log(err);
                }
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, {
                    message: "Password incorrect",
                  });
                }
              }
            );
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
