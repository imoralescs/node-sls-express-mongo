const express = require('express')
const noteRouter = require('./resources/note')
const apiErrorHandler = require('./modules/errorHandler')

const restRouter = express.Router()

restRouter.use('/note', noteRouter)
restRouter.use(apiErrorHandler)

module.exports = restRouter