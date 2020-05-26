const Logger = require("./logger");
const logger = new Logger();

logger.on("Message", (args) => {
  console.log("Listener called" + JSON.stringify(args));
});

logger.log("msg");
