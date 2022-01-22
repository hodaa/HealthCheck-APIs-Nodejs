
const { body } = require('express-validator')

exports.validateRegister = () => {
  return [
    body('first_name', 'first name is required').exists(),
    body('last_name', 'last name is required').exists(),
    body('email', 'Invalid email').exists().isEmail(),
    body('password', 'password is required').exists()

  ]
}
exports.validateLogin = () => {
  return [
    body('email', 'Invalid email').exists().isEmail(),
    body('password', 'password is required').exists()

  ]
}
