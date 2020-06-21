const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/api/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/hello") {
    res.write("you are looking at hello page");
    res.end();
  }

  if (req.url === "/api/hello") {
    res.write("You are looking at api hello page");
    res.end();
  }
});
server.listen(3000);
