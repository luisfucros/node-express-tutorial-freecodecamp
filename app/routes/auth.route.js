const express = require('express')
const router = express.Router()
const { login } = require('../controllers/auth.controller.js')


router.route('/login').post(login)

module.exports = router