const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
let users = require("./data.json");
const {object} = require("joi");

app.get("/api/users", (req, res) => {
  res.json(
    users.map((user) => {
      return {
        Id: user.Id,
        FirstName: user.First_Name,
        LastName: user.Last_Name,
        Email: user.Email,
        Company: user.Company,
      };
    })
  );
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find(
    (_user) => _user.Id === parseInt(req.params.id)
  );
  if (!user) return res.sendStatus(404).send("User not found");

  res.json(user);
});

app.post("/api/users", (req, res) => {
  if (req.body === undefined)
    return res.sendStatus(204).send("Couldn't find the Book Obect");

  const isUserPresent = users.find(
    (_user) => _user.Id === parseInt(req.body.id)
  );
  if (isUserPresent) return res.sendStatus(302);

  // const newUser = {id: users.length + 1, name: req.body.name};
  // books.push(newBook);
  // return res.sendStatus(200);
});

app.put("/api/users", (req, res) => {
  let targetUser = users.find(
    (_user) => _user.Id === parseInt(req.body.user.Id)
  );
  console.log(targetUser);
  if (!targetUser) return res.sendStatus(404);

  targetUser.First_Name = req.body.user.First_Name;
  targetUser.Last_Name = req.body.user.Last_Name;
  targetUser.Email = req.body.user.Email;
  targetUser.PhoneNumber = req.body.user.PhoneNumber;
  targetUser.City = req.body.user.City;
  targetUser.State = req.body.user.State;
  users[targetUser.Id] = targetUser;
  return res.sendStatus(200);
});

app.delete("/api/users/:id", (req, res) => {
  if (!req.params.id) return res.sendStatus(404);
  let user = users.find(
    (user) => user.Id === parseInt(req.params.id)
  );

  if (!user) return res.sendStatus(404);
  users = users.filter((user) => user.Id !== parseInt(req.params.id));
  return res.sendStatus(200);
});

app.listen(3033, () => console.log("Listening on 3033"));
