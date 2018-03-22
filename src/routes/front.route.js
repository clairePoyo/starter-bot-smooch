const express = require("express");
const Router = express.Router;

const router = new Router();

const handleQEMessage = (req, res) => {
  if (!req.body.conversation.last_message.author) {
    console.log("RECAST_MESSAGE");
    return;
  }
  console.log("==================FRONT_MESSAGE====================");
  console.log(req.body.conversation.last_message.author);
};

router.route("/").post(handleQEMessage);

module.exports = router;
