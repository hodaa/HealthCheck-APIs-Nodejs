const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  user_id: { type: String, default: null },
  check_id: { type: String, unique: true },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending'
  }
})

reportSchema.pre('save', next => {
  const now = new Date()
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

module.exports = mongoose.model('Report', reportSchema)
