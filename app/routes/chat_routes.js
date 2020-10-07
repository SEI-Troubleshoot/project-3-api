const express = require('express')
const passport = require('passport')

const Chat = require('./../models/chat.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
// create chatmessages//
router.post('/chatmsg', requireToken, (req, res, next) => {
  req.body.chat.ownerId = req.user.id
  req.body.chat.email = req.user.email
  Chat.create(req.body.chat)
    .then(handle404)
    .then(data => {
      res.status(201).json({data: data.toObject()
      })
    })
    .catch(next)
})

router.get('/chatmsg', requireToken, (req, res, next) => {
  Chat.find()
    .then(handle404)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(next)
})

module.exports = router
