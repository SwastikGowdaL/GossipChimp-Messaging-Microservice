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
});

const groups = mongoose.model('groups', groupSchema);

module.exports = groups;
