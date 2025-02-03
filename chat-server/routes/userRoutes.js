const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.get('/users', userController.getUsers)
router.post('/add', userController.postUsers)
router.post('/login', userController.login)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router 