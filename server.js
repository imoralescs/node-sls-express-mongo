const sls = require('serverless-http')
const app = require('./src/index')

module.exports.run = sls(app);