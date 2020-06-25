const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
const users = require("./data.json");

app.get("/api/users", (req, res) => {
  res.json(users.filter((user) => user.Id <= 10));
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
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
  if (isUserPresent)
    return res.sendStatus(302).send("Data is already present");

  // const newUser = {id: users.length + 1, name: req.body.name};
  // books.push(newBook);
  return res.sendStatus(200);
});

app.listen(3033, () => console.log("Listening on 3033"));
