const express = require("express");
const joi = require("joi");
const app = express();

app.use(express.json());
const port = process.env.PORT || 8080;
const courses = [
  {
    id: 1,
    name: "Name1",
  },
  {
    id: 2,
    name: "Name2",
  },
  {
    id: 3,
    name: "Name3",
  },
  {
    id: 4,
    name: "Name4",
  },
];

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const schema = {
    name: joi.string().min(3).required(),
  };
  const result = joi.validate(req.body, schema);
  if (result.error)
    return res.send(result.error.details[0].message).status(404);
  res.send(req.body);
});

app.get("/api/courses/:id", (req, res) => {
  const queriedCourse = courses.find(
    (course) => course.id === parseInt(req.params.id)
  );
  if (!queriedCourse) res.send("Course not found").status(404);
  res.send(queriedCourse);
});

app.post("/api/courses/");

//Route params
app.get("/api/posts/:id/:text", (req, res) => {
  res.send(req.params);
});

//Query string params
app.get("/api/users/:id", (req, res) => {
  res.send(req.query);
});
app.listen(port, () => console.log("Listening on " + port));
