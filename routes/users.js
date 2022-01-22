const express = require('express')
const controller = require('../controllers/userController')
const validator = require('../middleware/validator')

const router = express.Router()
router.post('/register', validator.validateRegister(), controller.register)
router.post('/login', validator.validateLogin(), controller.login)
router.get('/confirm/:confirmation_code', controller.verify)

module.exports = router
