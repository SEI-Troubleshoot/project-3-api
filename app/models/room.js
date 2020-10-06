const mongoose = require('mongoose')
const chatSchema = require('./chats.js')

const roomSchema = new mongoose.Schema({
  chatName: {
    type: String,
    required: true
  },
  membersId: {
    type: [],
    required: true
  },
  chats: [chatSchema],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Room', roomSchema)
