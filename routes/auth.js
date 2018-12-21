const express = require ('express')
const controler = require ('../controllers/auth')
const router = express.Router()

router.post('/login', controler.login)
router.post('/register', controler.register)
router.post('/forgot', controler.forgot)
router.post('/new-password/:token', controler.postNewPassword)

module.exports = router