require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const jwt = require("jsonwebtoken");
app.use(express.json());

const posts = [
  {username: "RMakkena", title: "Hello"},
  {username: "Jaime", title: "Hi"},
];

app.get("/posts", authorizationToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

function authorizationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(port, () => console.log("Listening on " + port));
