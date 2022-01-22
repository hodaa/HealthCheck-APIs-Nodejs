const express = require('express')
const router = express.Router()
const controller = require('../controllers/checkController')
const auth = require('../middleware/authValidator')
const validator = require('../middleware/checksValidator')

/**
 * @swagger
 * /checks:
 *   post:
 *     description: get allchecks
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */

router.get('/', controller.getChecks)

/**
 * @swagger
 * /checks:
 *   get:
 *     description: get all checks
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */

router.get('/:id', controller.getCheck)

/**
 * @swagger
 * /checks:
 *   post:
 *     description: get allchecks
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */
router.post('/', [auth.verifyToken, validator.validateChecks], controller.postCheck)

/**
 * @swagger
 * /checks:
 *   delete:
 *     description: delete all checks
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */

router.delete('/:userId', auth.verifyToken, controller.deleteCheck)

/**
 * @swagger
 * /checks/user_id:
 *   PUT:
 *     description: update checks by user
 *     responses:
 *       200:
 *         description: Returns all the catachphrases
 */
router.put('/:userId', auth.verifyToken, controller.deleteCheck)

module.exports = router
