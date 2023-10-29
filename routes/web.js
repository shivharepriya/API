const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()


// UserController
router.get('/getalluser', UserController.getAllUser)
router.post('/userinsert', UserController.userInsert)




module.exports = router