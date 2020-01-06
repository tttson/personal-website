const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const errorhandler = require('errorhandler')
const PORT = 3000

const app = express()

// body parsing middleware
app.use(bodyparser.json())

// CORS handling package
app.use(cors())

// error logging
app.use(errorhandler())

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

// include our routes!
app.use('/api', require('./api'))

// GET requests that is not to API route, send index.html
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// handle 404s
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})

app.listen(PORT, ()=> {
  console.log(`
  Listening on port ${PORT}
  http://localhost:3000/
`)
})

module.exports = app
