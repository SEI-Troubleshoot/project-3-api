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

router.get('/chatRoom', requireToken, (req, res, next) => {
  Room.find()
    .populate('chats')
    .then(handle404)
    .then(data => res.status(200).json({ data }))
    .catch(next)
})

// router.delete('/chatRoom/:id', requireToken, (req, res, next) => {
//   Room.findById(req.params.id)
//     .then(handle404)
//     .then(room => {
//       // requireOwnership(req, room)
//       if (room.admin === req.user.id){
//       room.deleteOne()
//     } else {res.sendStatus(400)}
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
module.exports = router
