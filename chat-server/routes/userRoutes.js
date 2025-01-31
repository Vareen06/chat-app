const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.get('/users', userController.getUsers)
router.post('/add', userController.postUsers)
router.post('/login', userController.login)

module.exports = router 