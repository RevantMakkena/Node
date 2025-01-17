//only for authorization
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
app.use(express.json());

let refreshTokens = [];
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken))
    return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = generateAccessToken({name: user.name});
      return res.json(accessToken);
    }
  );
});

app.post("/login", (req, res) => {
  const user = {name: req.body.username};
  const jsonToken = generateAccessToken(user);
  const refreshToken = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET
  );
  refreshTokens.push(refreshToken);
  res.json({accessToken: jsonToken, refreshToken: refreshToken});
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.token
  );
  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10h",
  });
}

app.listen(port, () => console.log("Listening on " + port));
