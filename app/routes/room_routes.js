const express = require('express')
const passport = require('passport')

const Room = require('./../models/room.js')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership
// const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

router.post('/chatRoom', requireToken, (req, res, next) => {
  req.body.room.admin = req.user.id
  Room.create(req.body.room)
    .then(handle404)
    .then(data => {
      res.status(201).json({data: data.toObject()
      })
    })
    .catch(next)
})

module.exports = router
