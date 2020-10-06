const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = chatSchema
