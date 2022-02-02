const express = require('express')
const router = express.Router()
const controller = require('../controllers/checkController')
const auth = require('../middleware/authValidator')
const validator = require('../middleware/checksValidator')

router.get('/', controller.getChecks)
router.get('/:id', controller.getCheck)
router.post('/', [auth.verifyToken, validator.validateChecks], controller.postCheck)
router.delete('/:userId', auth.verifyToken, controller.deleteCheck)
router.put('/:id', auth.verifyToken, controller.deleteCheck)

module.exports = router
