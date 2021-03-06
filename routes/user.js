const express = require('express')
const passport = require('passport')
const controller = require('../controllers/user')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.get('/check/:id', passport.authenticate('jwt', {session: false}), controller.getCheck)
router.patch('/check/:id', passport.authenticate('jwt', {session: false}), controller.updateCheck)

module.exports = router