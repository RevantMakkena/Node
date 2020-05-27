const express = require("express");
const app = express();
app.use(express.json());
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
  if (!req.body.name || req.body.name.length < 2)
    return res.status(400).send("Invalid course name");
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(200).send(course);
});
//#endregion

app.listen(port, () => console.log(`listening on port ${port}`));
