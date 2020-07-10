const {Users} = require("../model/UserSchema");

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
  console.log(user.Id);
  const id = parseInt(user.Id);
  console.log(Users.schema);

  usr1 = {
    First_Name: "RK",
    Last_Name: "Mak",
    Email: "rk@gmail.com",
    PhoneNumber: "3456789678",
  };

  // prettier-ignore
  await Users.findByIdAndUpdate(
    "5ed17316e4c144cbe74c8086",
    {$set: usr1},
    function (err, product) {
      
    }
  );
};

const addUser = async (user) => {
  //Create an instance
  // var book1 = new Book({
  //   name: "Introduction to Mongoose",
  //   price: 10,
  //   quantity: 25,
  // });
};

module.exports = {
  getUsersInRange,
  getUserById,
  deleteUserById,
  updateUser,
};
