const {Employee} = require("../model/EmployeeSchema");
const {SignUp} = require("../model/model");

const updateEmployee = async () => {
  //   const x = await Employee.findOneAndUpdate(
  //     {Id: 1},
  //     {Gender: "RK"},
  //     {new: true}
  //   );

  const x = await SignUp.findOneAndUpdate(
    {name: "Revanth"},
    {email: "rk2@gmail.com"}
  );
  console.log(x);
};

module.exports = {updateEmployee};
