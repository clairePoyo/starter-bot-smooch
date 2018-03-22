const request = require("superagent");
const jwt = require("jsonwebtoken");

const config = require("../../config");
// POST requests Listening

const header = {
  alg: "HS256",
  typ: "JWT",
  kid: config.smooch.keyId
};

const payload = {
  scope: "app"
};

const jwtToken = jwt.sign(JSON.stringify(payload), config.smooch.secret, {
  header
});

// Message sending
const sendMessage = (text, recipient) => {
  return new Promise(resolve => {
    const message = {
      role: "appMaker",
      text
    };
    request
      .post(`https://api.smooch.io/v1/appusers/${recipient}/messages`)
      .send(message)
      .set("content-type", "application/json")
      .set("authorization", `Bearer ${jwtToken}`)
      .end(() => {
        return resolve();
      });
  });
};

module.exports = { sendMessage };
