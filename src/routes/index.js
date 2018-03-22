const express = require("express");
const Router = express.Router;

const smooch = require("./smooch.route");
const front = require("./front.route");

const routes = new Router();

routes.use("/front", front);
routes.use("/smooch", smooch);

module.exports = routes;
