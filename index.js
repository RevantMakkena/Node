const morgan = require("morgan");
const Joi = require("joi");
const courses = require("./routes/courses");
const home = require("./routes/homePage");
const genres = require("./routes/genres");
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const config = require("config");
const startupDebugger = require("debug")("app:startup"); //export DEBUG=app:startup //if no debug then DEBUG=

// console.log(`Current environment is ${process.env.NODE_ENV}`);
// console.log(app.get("env"));

console.log("Config is" + config.get("name"));
app.use(express.json());
app.use(logger);
app.use("/api/courses", courses);
app.use("/api/genre", genres);
app.use("/", home);

if (app.get("env") === "development") {
  //third party middleware to log requests
  app.use(morgan("tiny"));
  startupDebugger("morgan is enabled");
}

const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`listening on port ${port}`));
