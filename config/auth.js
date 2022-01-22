
const env = process.env

module.exports = {
  secret: 'bezkoder-secret-key',
  user: env.EMAIL,
  pass: env.EMAIL_PASS
}
