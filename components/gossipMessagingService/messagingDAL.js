require('../../db/mongoose');
const messages = require('../../models/messages');
const Message = require('../../models/messages');

const saveUser = async (userID) => {
  try {
    const newUser = new Message({
      user_id: userID,
    });
    return await newUser.save();
  } catch (err) {
    console.log(err);
  }
};

const saveMessengerID = async (userID, messengerID) =>
  Message.updateOne(
    { user_id: userID },
    {
      $addToSet: {
        messages_data: { messenger_id: messengerID },
      },
    }
  );

const saveMessage = async (userID, messengerID, message) =>
  Message.updateOne(
    {
      user_id: userID,
      messages_data: { $elemMatch: { messenger_id: messengerID } },
    },
    {
      $push: {
        'messages_data.$.messages': message,
      },
    }
  );

module.exports = {
  saveUser,
  saveMessengerID,
  saveMessage,
};
