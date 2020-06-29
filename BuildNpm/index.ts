import express from "express";
import path from "path";

const app = express();
const port = process.env.npm_package_config_port || 4005;
let runningMsg = `The server is running on port ${port}`;

// app.get("/", (req, res) => {
//   console.log("Server is successfully requested");
//   res.send(runningMsg);
// });

app.use(express.static(path.resolve(`${__dirname}`, "./")));

const server = app.listen(port, () => {
  console.log(runningMsg);
});

module.exports = server;
