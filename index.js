const http = require('http')
const app = require('./app')
// const monitorService = require('./services/monitor')
const server = http.createServer(app)

const port = process.env.APP_PORT || 4000

// server listening
server.listen(port, () => {
  // monitorService.monitor();
  console.log(`Server running on port ${port}`)
})
