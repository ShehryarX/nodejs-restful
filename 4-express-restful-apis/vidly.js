const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const genres = require("./routes/genres");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
