var Logger = require("./logger");
const path = require("path");
const os = require("os");
const fs = require("fs");
const http = require("http");

// log("Hello, world!");
let pathObj = path.parse(__filename);
console.log(pathObj);

let totalMemory = os.totalmem();
let freeMemory = os.freemem();
console.log(`Total memory: ${totalMemory}\n Free memory: ${freeMemory}`);

let files = fs.readdirSync("./");
console.log(files);

fs.readdir("./", (err, files) => {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});

const logger = new Logger();

// register a listener
logger.on("messageLogged", eventArg => {
  console.log("message logged", eventArg);
});

logger.log("message");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello, world!");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.on("connection", socket => {
  console.log("New connection...");
});

server.listen(3000);

console.log("Listening to port 3000...");
