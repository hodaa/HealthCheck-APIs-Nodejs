const http = require('http')
const app = require('./app')
const monitorService = require('./services/monitorService')
const server = http.createServer(app)

const port = process.env.APP_PORT || 4000

// var req = https.request({ 
//   host: '192.168.1.1', 
//   port: 443,
//   path: '/',
//   ca: [fs.readFileSync([certificate path], {encoding: 'utf-8'})],
//   method: 'GET',
//   rejectUnauthorized: true,
//   requestCert: true,
//   agent: false
// });

// server listening
server.listen(port, () => {
  monitorService.monitor()
  console.log(`Server running on port ${port}`)
})
