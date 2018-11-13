const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const courses = require("./routes/courses");
const home = require("./routes/home");

// templating engine
app.set("view engine", "pug");
app.set("views", "./views");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(logger);

app.use("/api/courses", courses);
app.use("/", home);

// configuration
console.log(`Application name: ${config.get("name")}`);
console.log(`Mail server: ${config.get("mail.host")}`);
// console.log(`Mail password: ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}

// db work
dbDebugger("Connected to the database");

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`App: ${app.get("env")}`);
// app.get();
// app.post();
// app.put();
// app.delete();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
