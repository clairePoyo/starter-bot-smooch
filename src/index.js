// MODULES IMPORT
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const config = require("../config");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  }),
  bodyParser.json(),
  routes
);

app.use(bodyParser.json());

app.listen(config.port);
