const nodemailer = require('nodemailer')
const authConfig = require('../config/auth')
const config = process.env

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hoda.hussien@bravvura.com',
    pass: '123hoda456'
  }
})

module.exports.sendEmail = (email, subject, body) => {
  console.log(email)
  transport.sendMail({
    from: authConfig.email,
    to: email,
    subject: subject,
    html: body
  }).catch(err => console.log(err))
}
