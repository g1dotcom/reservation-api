const express = require("express");
const cors = require("cors");
const cokkieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./config/db.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cokkieParser());

db();

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
