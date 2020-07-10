const express = require("express");
const router = express.Router();
const {CheckTokenExistsMiddleware} = require("../auth/Token");
const {
  GetEmployeesInRange,
  GetEmployee,
  AddEmployee,
  UpdateEmployee,
  DeleteEmployee,
} = require("../auth/employeeCrudOperations");
const e = require("express");

router.get(
  "/:startIndex/:endIndex",
  CheckTokenExistsMiddleware,
  async (req, res) => {
    const {startIndex, endIndex} = req.params;

    const records = await getUsersInRange(
      parseInt(startIndex),
      parseInt(endIndex)
    );

    if (records) res.json(records);
    else res.status(404).send("No records found");
  }
);

router.get("/:id", CheckTokenExistsMiddleware, async (req, res) => {
  //get specific ID
  const {id} = req.params;
  const record = await GetEmployee(parseInt(id));

  if (record) res.json(record);
  else res.status(404).send("No records found");
});

router.post("/add", CheckTokenExistsMiddleware, async (req, res) => {
  const status = await AddEmployee(req.body);
  if (status === "Success") return res.status(200).send("Success");
  else {
    if (status === "Employee in the database")
      return res.status(403).send(status);
    else return res.status(404).send(status);
  }
});

router.post("/edit", CheckTokenExistsMiddleware, async (req, res) => {
  const status = await UpdateEmployee(req.body);
  if (status === "Success") return res.status(200).send("Success");
  else {
    if (status === "Employee in the database")
      return res.status(403).send(status);
    else return res.status(404).send(status);
  }
});

router.delete(
  "/:id",
  CheckTokenExistsMiddleware,
  async (req, res) => {
    const {id} = req.params;

    const result = await DeleteEmployee(parseInt(id));
    if (result) res.status(200).send("Deleted!!!");
    else res.status(404).send("Internal server Error");
  }
);

module.exports = router;
