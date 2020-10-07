const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Chat', chatSchema)
