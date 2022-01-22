const mongoose = require('mongoose')

const checkSchema = new mongoose.Schema({
  name: { type: String, default: null },
  url: { type: String, default: null },
  protocol: { type: String, default: 'HTTP' },
  path: { type: String, default: null },
  port: { type: String, default: null },
  webhook: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  timeout: { type: String, default: 5 },
  interval: { type: String, default: 10 },
  threshold: { type: String, default: 1 },
  authentication: { type: String, default: null },
  httpHeaders: { type: String, default: null },
  assert: { type: String, default: null },
  tags: { type: String, default: null },
  ignoreSSL: { type: Boolean, default: 0 },
  user_id: { type: String }
})

module.exports = mongoose.model('Check', checkSchema)
