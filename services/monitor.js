const Check = require('../models/check')
const emailService = require('./emailService')
const axios = require('axios')
// const userService = require('./userService')

const fetchInterval = 60000

exports.monitor = (req, res) => {
  // console.log("in get checks");
  const query = Check.find()
  query.exec((_err, Checks) => {
    Checks.forEach((element) => fetchUrlRecursively(element))
  })
}

const fetchUrlRecursively = async (check) => {
  // console.log(url)
  axios.get(check.url).then((res) => {
    console.log(res.status)
    if (res.status === 200) {
      // user = userService.getUser("61ea771caf7d66b5a419031a")
      console.log('in')
      emailService.sendEmail('hoda.hussin@gmail.com', ' Your server is Done', 'Please  notice your server is done')
    }
  }).catch((error) => {
    console.log(error)
  })

  setTimeout(() => {
    fetchUrlRecursively(check.url)
  }, fetchInterval)
}

// exports.monitor
