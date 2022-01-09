const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  messages_data: [
    {
      messenger_id: {
        type: String,
      },
      messages: [
        {
          received: {
            type: Boolean,
          },
          time: {
            type: Date,
            default: Date.now,
          },
          pic: {
            type: String,
          },
          audio: {
            type: String,
          },
          data: {
            type: String,
          },
        },
      ],
    },
  ],
});

const messages = mongoose.model('Messages', messageSchema);

module.exports = messages;
