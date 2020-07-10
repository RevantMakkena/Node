const {Employees} = require("../model/EmployeeSchema");
const mongoose = require("mongoose");

const ShowAllCollections = () => {
  mongoose.connection.db
    .listCollections()
    .toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        names.forEach(function (e, i, a) {
          console.log("--->>", e.name);
        });
      }
    });
};

const GetEmployee = async (id) => {
  const employee = await Employees.findOne({id: id});
  if (employee) return employee;
  else return "error";
};

const AddEmployee = async (data) => {
  const newEmployee = new Employees({
    First_Name: "",
    Last_Name: "Enriquez",
    "Phone Number": "765-591-1817",
    Email: "oenriquez0@home.pl",
    Gender: "Male",
    Race: "Bolivian",
    University: "National University of Internal Affairs",
    City: "Indianapolis",
    State: "Indiana",
    Company: "Twinder",
    Movies: ["Independent, The", "Chillers", "Sex and the City 2"],
    Vehicles: [
      {
        Make: "Jaguar",
        Model: "XJ Series",
        Year: 1994,
        Vin: "3VW4A7AT0DM204037",
      },
      {
        Make: "Pontiac",
        Model: "Vibe",
        Year: 2007,
        Vin: "WD3PE7DC4F5466744",
      },
      {
        Make: "Mercury",
        Model: "Mariner",
        Year: 2009,
        Vin: "1G6DW677270394832",
      },
      {
        Make: "Infiniti",
        Model: "I",
        Year: 1999,
        Vin: "2HNYB1H49CH654337",
      },
      {
        Make: "Dodge",
        Model: "Dakota",
        Year: 2002,
        Vin: "1N4AA5AP5BC014333",
      },
      {
        Make: "Pontiac",
        Model: "Grand Am",
        Year: 1989,
        Vin: "WAU3GAFR2DA303301",
      },
    ],
    Credit: [
      {
        CreditCardNumber: "30398285464949",
        CardType: "diners-club-carte-blanche",
        CurrencyType: "PEN",
      },
    ],
  });

  //Check if New employee info is already available in the db
  const isEmployeeInDb = await Employees.findOne({Email: ""});

  if (isEmployeeInDb) return "Employee in the database";
  else {
    await newEmployee.save(function (err) {
      if (err) return "Error while saving employee";
      else return "Success";
    });
  }
};

const UpdateEmployee = async (data) => {
  const updatedEmployee = {};
  //Check if New employee info is already available in the db
  const result = Employees.findOneAndUpdate(
    {Email: ""},
    updatedEmployee,
    {
      new: true,
    }
  );
};

const DeleteEmployee = async (id) => {
  const isEmployeeInDb = await Employees.findOne({id: id});

  if (isEmployeeInDb) {
    const result = await Employees.deleteOne({id: id});
    if (result) return "Success";
    else return "Error deleting record";
  } else return "Employee not found";
};

module.exports = {
  GetEmployee,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee,
};
