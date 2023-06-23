const mongoose = require('mongoose');

const Chat = new mongoose.Schema({
  project: { type: String },
  participants: [{ type: String }],
  messages: [
    {
      sender: { type: String },
      message: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
},
{ collection: 'chats' }
);

const model = mongoose.model('ChatData', Chat);

module.exports = model;
