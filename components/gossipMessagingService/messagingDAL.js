require('../../db/mongoose');
const Message = require('../../models/messages');

const redisClient = require('./helpers/redisClient');

let client;
const DEFAULT_EXPIRATION = 86400;

const connectRedis = async () => {
  client = await redisClient();
};
connectRedis();

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

const cacheSocketID = async (userID, socketID) => {
  await client.SETEX(`${userID}_socketID`, DEFAULT_EXPIRATION, socketID);
};

const retrieveCachedSocketID = async (userID) =>
  client.GET(`${userID}_socketID`);

module.exports = {
  saveUser,
  saveMessengerID,
  saveMessage,
  cacheSocketID,
  retrieveCachedSocketID,
};
