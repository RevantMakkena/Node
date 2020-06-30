const express = require("express");
const app = express();
const port = process.env.npm_package_config_port || 4444;

app.use("/", require("./router/app"));
app.use("/api/user", require("./router/users"));

app.listen(port, console.log(`Server running on ${port}`));
