const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.get("/api/all", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  fs.readFile(path.join(__dirname, "feed.json"), (err, data) => {
    res.send(data);
  });
});

app.post("/api/add", (req, res) => {
  let postData = req.body;
  res.setHeader("Content-Type", "application/json");
  fs.readFile(
    path.join(__dirname, "feed.json"),
    "utf8",
    (err, data) => {
      let posts = JSON.parse(data);
      posts.forEach((post) => {
        if (post.id == postData.id) {
          res.send({msg: "Object is already present"});
        }
      });

      posts.push(req.body);
      fs.writeFile(
        path.join(__dirname, "feed.json"),
        JSON.stringify(posts),
        (err) => {
          console.log(err);
          res.send(posts);
        }
      );
    }
  );
});

app.delete("/api/delete");

//Run the server
app.listen(3000, (e) => {
  console.log("server started on port 3000");
});
