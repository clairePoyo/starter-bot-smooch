const express = require("express");
const Router = express.Router;

const recastService = require("../services/recast.service");
const userService = require("../services/user.service");

const router = new Router();

const handleUserMessage = (req, res) => {
  userPayload = userService.setUserPayload(req.body);
  console.log("+++++++++++++++++++++USER+++++++++++++++++++++++++");
  console.log(userPayload);
  recastService.handleMessage(req.body);
  res.send("OK");
};

router.route("/").post(handleUserMessage);

module.exports = router;
