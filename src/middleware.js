const bodyParser = require('body-parser')
const helmet = require('helmet')

const setGlobalMiddleware = (app) => {
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(helmet())
}

module.exports = setGlobalMiddleware