const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
  },
  group_name: {
    type: String,
    required: true,
  },
  member: [
    {
      type: String,
    },
  ],
  messages: [
    {
      messenger_id: {
        type: String,
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
});

const groups = mongoose.model('groups', groupSchema);

module.exports = groups;
