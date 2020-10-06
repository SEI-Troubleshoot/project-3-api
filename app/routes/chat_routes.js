const express = require('express')
const passport = require('passport')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const Room = require('./../models/room.js')

const router = express.Router()

// create a chat msg:: /chatRoom/id-ofChatRoom
router.post('/chatRoom/:id', requireToken, (req, res, next) => {
  Room.findById(req.params.id)
    .then(handle404)
    .then(room => {
      req.body.chats.owner = req.user.id
      room.chats.push(req.body.chats)
      return room.save()
    })
    .then(res.status(201).send('Chat OK'))
    .catch(next)
})

module.exports = router
