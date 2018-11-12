const EventEmitter = require("events");

var url = "http://mylogger.io/log";

class Logger extends EventEmitter {
  log(message) {
    // send http request
    console.log(message);

    // raise an event
    this.emit("messageLogged", { id: 1, url: "http://www.google.com" }); // making a noise or producing something
  }
}

module.exports = Logger;
