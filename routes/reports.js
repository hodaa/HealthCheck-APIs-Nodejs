const express = require('express')
const reportController = require('../controllers/reportController')
const auth = require('../middleware/authValidator')

const router = express.Router()
router.get('/', auth.verifyToken, reportController.get)

module.exports = router
