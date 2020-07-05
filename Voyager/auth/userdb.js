const {Users} = require("../model/human");

const getUsersInRange = async (startIndex, endIndex) => {
  const res = await Users.find({})
    .where("Id")
    .gt(startIndex - 1)
    .lt(endIndex + 1)
    .sort("Id");

  if (res) return res;
  else return null;
};

const getUserById = async (id) => {
  const res = await Users.findOne({Id: id});
  if (res) return res;
  else return null;
};

const deleteUserById = async (id) => {
  const res = await Users.deleteOne({Id: id});
  if (res.deletedCount === 1) return true;
  else return false;
};

const updateUser = async (user) => {
  const id = parseInt(user.Id);
  // prettier-ignore
  const y = await Users.update({Id: id}, {"Gender": "M", "Email":"RK"});
  console.log(y);
};
module.exports = {
  getUsersInRange,
  getUserById,
  deleteUserById,
  updateUser,
};
