const recastai = require("recastai");

const config = require("../../config");
const client = new recastai.build(config.recast.token, config.recast.language);

const smoochService = require("./smooch.service");
// CALL TO RECAST.AI: 'sender' is a unique ID of your conversation with the user
// The conversationToken is what lets Recast.AI identify your conversation.
// As 'sender' is what identifies your conversation with the channel used, you can use it as conversationToken.
// Message handling
const handleMessage = message => {
  const sender = message.messages[0]["authorId"];
  const text = message.messages[0]["text"];
  console.log("======================SENDER=====================");
  console.log(sender);
  console.log("======================TEXT=====================");
  console.log(text);

  // CALL TO RECAST.AI: 'sender' is a unique ID of your conversation with the user
  // The conversationToken is what lets Recast.AI identify your conversation.
  // As 'sender' is what identifies your conversation with the channel used, you can use it as conversationToken.
  client
    .dialog({ type: "text", content: text }, { conversationId: sender })
    .then(res => {
      console.log("======================RES=====================");
      console.log(res);

      if (res.messages.length === 0) {
        smoochService.sendMessage("Je n'ai pas compris, désolé :(", sender);
        return;
      }
      console.log(
        "======================res.messages[0].content====================="
      );
      console.log(res.messages[0].content);
      const reply = res.messages[0].content;

      smoochService.sendMessage(reply, sender);
    })
    .catch(error => {
      console.log("======================ERROR=====================");
      console.log(error);
      smoochService.sendMessage(
        "I need some sleep right now... Talk to me later!",
        sender
      );
    });
};

module.exports = { handleMessage };
