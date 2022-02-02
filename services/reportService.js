
const Report = require('../models/report')

exports.create = (data) => {
  const newReport = new Report(data)
  newReport.save((err, Check) => {
    if (err) {
      console.log(err)
    } else { // If no errors, send it back to the client
    //   res.status(201).json({ message: 'Check successfully added!', Check })
      console.log('done')
    }
  })
}
