import express from "express";

const app = express();
const port = process.env.npm_package_config_port || 4005;
let runningMsg = `The server is running on port ${port}`;

app.get("/", (req, res) => {
  console.log("Server is successfully requested");
  res.send(runningMsg);
});

const server = app.listen(port, () => {
  console.log(runningMsg);
});

module.exports = server;
