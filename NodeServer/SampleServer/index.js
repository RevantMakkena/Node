const http = require("http");
const {debug} = require("console");
const hostName = "127.0.0.1";
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("content-type", "text");
  res.end("Hello World");
});

server.listen(port, hostName, () => {
  console.log("Server listening on " + port);
});
