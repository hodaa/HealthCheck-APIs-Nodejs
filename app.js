require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()

// const expressValidator = require('express-validator')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
const usersRouter = require('./routes/users')
app.use('/api/v1/users', usersRouter)

const checksRouter = require('./routes/checks')
app.use('/api/v1/checks', checksRouter)

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get('/', async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    res.send(healthcheck)
  } catch (e) {
    healthcheck.message = e
    res.status(503).send()
  }
})

module.exports = app
