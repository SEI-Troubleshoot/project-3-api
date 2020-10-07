const express = require('express')
const passport = require('passport')

const Chat = require('./../models/chat.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
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
router.delete('/chatmsg/:id', requireToken, (req, res, next) => {
  Chat.findById(req.params.id)
    .then(handle404)
    .then(data => {
      requireOwnership(req, data)
      data.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
router.patch('/chatmsg/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.chat.owner

  Chat.findById(req.params.id)
    .then(handle404)
    .then(chat => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, chat)

      // pass the result of Mongoose's `.update` to the next `.then`
      return chat.updateOne(req.body.chat)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})
module.exports = router
