const express = require("express");
const router = express.Router();
const {CheckTokenExistsMiddleware} = require("../auth/Token");
const {
  getUsersInRange,
  getUserById,
  deleteUserById,
  updateUser,
} = require("../auth/UserCrudOperations");
const {updateEmployee} = require("../auth/employeeCrudOperations");

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
  const record = await getUserById(parseInt(id));

  if (record) res.json(record);
  else res.status(404).send("No records found");
});

router.post("/", async (req, res) => {
  //adding new user
  const y = await updateEmployee();
  // const x = await updateUser(req.body);
  res.status(200);
});

router.delete(
  "/:id",
  CheckTokenExistsMiddleware,
  async (req, res) => {
    const {id} = req.params;

    const result = await deleteUserById(parseInt(id));
    if (result) res.status(200).send("Deleted!!!");
    else res.status(404).send("Internal server Error");
  }
);

module.exports = router;
