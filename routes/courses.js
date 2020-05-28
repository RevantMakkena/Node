const express = require("express");
const router = express.Router();

const courses = [
  {id: 1, name: "MVC"},
  {id: 2, name: "JQuery"},
  {id: 3, name: "TypeScript"},
];

//#region  GET
router.get("/", (req, res) => {
  res.send(courses);
});

//For routes = /api/courses/1
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
