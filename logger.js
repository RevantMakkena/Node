const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    this.emit("Message", {id: 1, url: "http:/"});
  }
}

module.exports = Logger;
