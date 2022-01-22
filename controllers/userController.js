const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const emailService = require('../services/emailService')
const crypto = require('crypto')

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body
  console.log(first_name)

  const oldUser = await User.findOne({ email })
  if (oldUser) return res.status(400).send({ message: 'User already registered.' })

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }

  const encryptedPassword = await bcrypt.hash(password.toString(), 10)

  const user = new User({
    first_name,
    last_name,
    email,
    password: encryptedPassword
  })

  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: '2h'
  })

  const confirmationCode = crypto.randomBytes(20).toString('hex')
  user.status = 'Pending'
  user.confirmation_code = confirmationCode
  user.token = token

  user.save(function (err, doc) {
    if (err) return console.error(err)
    console.log('Document inserted successfully!')
  })

  const body = `<h2>Hello ${first_name}</h2><p>Thank you for subscribing.
  This is your confirmation code: ${confirmationCode}
  <br>
  Please confirm your email`

  emailService.sendEmail(user.email, 'Confirmation Email', body)
  res.status(201).json({ message: 'Please check your Email for confirmation' })
}

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.verify = (req, res, next) => {
  // console.log(req.params.confirmation_code)
  User.findOne({ confirmation_code: req.params.confirmation_code })
    .then((user) => {
      // console.log(user)
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }
      console.log(req.params.confirmation_code)
      user.status = 'Active'
      user.confirmation_code = null
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err })
        }
        return res.status(200).send({ message: 'Your email is activated' })
      })
    })
    .catch((e) => console.log('error', e))
}

/**
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email, status: 'Active' })

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: '2h' })

      // save user token
      user.token = token

      // user
      res.status(200).json({ message: 'You logged in successfully', token: token })
    }
    // return new user
    res.status(400).send({ message: 'Invalid Credentials' })
  } catch (err) {
    console.log(err)
  }
}
