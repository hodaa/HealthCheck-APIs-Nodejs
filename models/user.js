const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  status: {
    type: String,
    enum: ['up', 'down'],
    default: 'up'
  },
  confirmation_code: { type: String, unique: true }
})

userSchema.pre('save', next => {
  const now = new Date()
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('User', userSchema)
