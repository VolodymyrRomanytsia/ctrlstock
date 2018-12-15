const express = require ('express')
const controler = require ('../controllers/auth')
const router = express.Router()

// http://localhost:5000/api/auth/login
router.post('/login', controler.login)

// http://localhost:5000/api/auth/register
router.post('/register', controler.register)

module.exports = router