// ###################################
// USER DATA BASED ON CUSTOMER CHANNEL
// ###################################

// ###################################
// CHAT =>
// req.body.appUser = {
//   userId,
//   surname,
//   givenName
//   email,
//   properties:  {
//     qorner
//   }
// }
// ###################################

// ###################################
// TWILIO =>
// phoneNumber = req.body.appUser.clients.displayName
// ###################################

// ###################################
// FACEBOOK =>
// req.body.appUser = {
//   surname,
//   givenName
// }
// ###################################

// define user's identity based on message attached informations
const setUserPayload = messagePayload => {
  return {
    userId: messagePayload.appUser.userId || undefined,
    surname: messagePayload.appUser.surname || undefined,
    givenName: messagePayload.appUser.givenName || undefined,
    email: messagePayload.appUser.email || undefined,
    phoneNumber:
      messagePayload.appUser.clients[0].info.phoneNumber || undefined,
    qorner: messagePayload.appUser.properties.qorner || undefined,
    platform: messagePayload.messages[0].source.type || undefined
  };
};

module.exports = {
  setUserPayload
};
