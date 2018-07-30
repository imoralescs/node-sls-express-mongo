const express = require('express')
const setupMiddware = require('./middleware')
const connect = require('./db')
const restRouter = require('./api')

// Declare an app from express
const app = express()

setupMiddware(app)
connect()

// Setup basic routing for index route
app.use('/api', restRouter)

// Catch all or 404
app.all('*', (req, res) => {
    res.json({ok: true})
})

// Development with Nodemon
// app.listen(3000, '0.0.0.0');

module.exports = app