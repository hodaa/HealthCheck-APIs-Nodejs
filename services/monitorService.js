const Check = require('../models/check')
const emailService = require('./emailService')
const axios = require('axios')
const User = require('../models/user')
const Report = require('../models/report')
// const userService = require('./userService')
const reportService = require('./reportService')

const fetchInterval = 6000

exports.monitor = (req, res) => {
  // console.log("in get checks");
  const query = Check.find()
  query.exec((_err, Checks) => {
    Checks.forEach((element) => fetchUrlRecursively(element))
  })
}

const fetchUrlRecursively = async (check) => {
  const user = await User.findById(check.user_id)

  // console.log(check)
  axios.get(check.url).then((res) => {
    let status = 'up'
  //   console.log(check.user_id)
    if (res.status !== 200) {
      status = 'down'
    //   emailService.sendEmail(user.email, 'Your server is Down', 'Please  notice your server is done')
    }
    reportService.create(check.url, check.user_id, status)
  // }).catch((error) => {
    // console.log(error)
  })

  // setTimeout(() => {
  //   fetchUrlRecursively(check.url)
  // }, fetchInterval)
}

// exports.monitor
