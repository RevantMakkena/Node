const mongoose = require("mongoose");

var Users = mongoose.model("Users", new mongoose.Schema({}), "Users");

module.exports = {Users};
