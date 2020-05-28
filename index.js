const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require("./logger");

console.log(`Current environment is ${process.env.NODE_ENV}`);
console.log(app.get("env"));

app.use(express.json());
app.use(logger);
if (app.get("env") === "development") app.use(morgan("tiny")); //third party middleware to log requests

const port = process.env.PORT || 7000;

const courses = [
  {id: 1, name: "MVC"},
  {id: 2, name: "JQuery"},
  {id: 3, name: "TypeScript"},
];

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

//#region  GET
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

//For routes = /api/courses/1
app.get("/api/courses/:id", (req, res) => {
  const matchedCourse = courses.find(
    (x) => x.id === parseInt(req.params.id)
  );
  if (!matchedCourse)
    res.status(404).send("Course with given ID not found");
  res.send(matchedCourse);
});

// //For routes = /api/courses/1/revanth/2020
// app.get("/api/courses/:id/:name/:year", (req, res) => {
//   res.send(req.params.id, req.params.name, req.params.year);
// });

// //For routes = /api/courses?sortBy=year
// app.get("/api/courses", (req, res) => {
//   res.send(req.query.sortBy);
// });
//#endregion

//#region  POST
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(2).required(),
  };

  const result = Joi.validate(req.body, schema);

  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(200).send(course);
});
//#endregion

//#region PUT
app.put("/api/courses/:id", (req, res) => {
  const schema = {
    name: Joi.string().min(2).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const isCourseFound = courses.find(
    (x) => x.id === parseInt(req.params.id)
  );
  if (!isCourseFound) return res.status(404).send("Course not found");

  isCourseFound.name = req.body.name;
  return res.status(200).send(isCourseFound);
});
//#endregion

//#region DELETE
app.delete("/api/courses/:id", (req, res) => {
  const schema = {
    id: Joi.number().required(),
  };

  const result = Joi.validate(req.params, schema);
  if (result.error) return res.status(404).send("Id is required");

  const isCourseFound = courses.find(
    (x) => x.id === parseInt(req.params.id)
  );
  if (!isCourseFound)
    return res.status(404).send("can't find course");

  courses.splice(isCourseFound.id - 1, 1);
  return res.status(200).send("course deleted");
});
//#endregion

app.listen(port, () => console.log(`listening on port ${port}`));
