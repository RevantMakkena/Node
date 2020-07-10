const {Employees} = require("../model/employee");

const updateEmployee = async () => {
  //   const x = await Employee.findOneAndUpdate(
  //     {Id: 1},
  //     {Gender: "RK"},
  //     {new: true}
  //   );

  const x = await Employees.findOne({Id: 1});
  console.log(x);
};

module.exports = {updateEmployee};
