const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {name: req.body.name, password: hashedPassword};
    users.push(user);
    res.json(users);
  } catch (exception) {
    res.statusCode(500);
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (user === null)
    return res.statusCode(400).send("cannot find user");

  try {
    if (await bcrypt.compare(user.password, req.body.password))
      res.send("success");
    else res.send("Not allowed");
  } catch {
    res.statusCode(500);
  }
});

app.listen(3000, () => console.log("Listening on 3000"));
